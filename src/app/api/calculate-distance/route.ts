import { NextRequest, NextResponse } from "next/server"

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")

  if (!origin || !destination) {
    return NextResponse.json(
      { error: "Origen y destino son requeridos" },
      { status: 400 }
    )
  }

  // ── Google Routes API (preferred) ────────────────────────────────────────
  if (GOOGLE_MAPS_API_KEY) {
    try {
      const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters"
        },
        body: JSON.stringify({
          origin: { address: origin },
          destination: { address: destination },
          travelMode: "DRIVE",
          routingPreference: "TRAFFIC_AWARE"
        })
      })
      const data = await response.json()

      if (data.error) throw new Error(data.error.message)
      if (!data.routes?.length) throw new Error("Sin rutas")

      const route = data.routes[0]
      const durationSecs = parseInt(route.duration.replace("s", ""))

      return NextResponse.json({
        distance: route.distanceMeters,
        duration: durationSecs,
        origin,
        destination,
        mode: "google"
      })
    } catch (error) {
      console.error("Google Routes API error:", error)
      // fall through to OSRM
    }
  }

  // ── OSRM fallback (no API key needed) ────────────────────────────────────
  try {
    const geocode = async (place: string) => {
      const query = /madrid|barcelona|valencia|sevilla|bilbao|málaga|malaga|zaragoza|granada/i.test(place)
        ? place : `${place}, Madrid`
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=es&viewbox=-4.6,41.2,-3.0,39.8&bounded=1`
      const res = await fetch(url, { headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" } })
      const data = await res.json()
      if (!data?.length) return null
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
    }

    const [o, d] = await Promise.all([geocode(origin), geocode(destination)])
    if (!o) return NextResponse.json({ error: `No se encontró: "${origin}"` }, { status: 400 })
    if (!d) return NextResponse.json({ error: `No se encontró: "${destination}"` }, { status: 400 })

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${o.lon},${o.lat};${d.lon},${d.lat}?overview=false`
    const routeRes = await fetch(osrmUrl, { headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" } })
    const routeData = await routeRes.json()

    if (routeData.code !== "Ok" || !routeData.routes?.length) throw new Error("OSRM sin ruta")

    return NextResponse.json({
      distance: Math.round(routeData.routes[0].distance),
      duration: Math.round(routeData.routes[0].duration * 1.4), // urban traffic factor
      origin, destination, mode: "osrm"
    })
  } catch (error) {
    console.error("OSRM error:", error)

    // ── Deterministic static fallback ────────────────────────────────────
    const seed = (origin + destination).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const r = ((seed * 9301 + 49297) % 233280) / 233280
    const dist = 2 + r * 16
    const speed = 28 + r * 8

    return NextResponse.json({
      distance: Math.round(dist * 1000),
      duration: Math.round((dist / speed) * 3600),
      origin, destination, mode: "fallback"
    })
  }
}

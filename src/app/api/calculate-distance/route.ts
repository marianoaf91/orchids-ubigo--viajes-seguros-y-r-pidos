import { NextRequest, NextResponse } from "next/server"

async function geocode(place: string): Promise<{ lat: number; lon: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`
  const res = await fetch(url, {
    headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" }
  })
  const data = await res.json()
  if (!data || data.length === 0) return null
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }
}

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

  try {
    // Geocode both addresses in parallel
    const [originCoords, destCoords] = await Promise.all([
      geocode(origin),
      geocode(destination)
    ])

    if (!originCoords) {
      return NextResponse.json({ error: `No se encontró la dirección de origen: "${origin}"` }, { status: 400 })
    }
    if (!destCoords) {
      return NextResponse.json({ error: `No se encontró la dirección de destino: "${destination}"` }, { status: 400 })
    }

    // Get real route from OSRM (motorcycle uses car profile)
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`
    const routeRes = await fetch(osrmUrl, {
      headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" }
    })
    const routeData = await routeRes.json()

    if (routeData.code !== "Ok" || !routeData.routes || routeData.routes.length === 0) {
      throw new Error("No se pudo calcular la ruta")
    }

    const route = routeData.routes[0]
    const distanceMeters: number = route.distance  // meters
    const durationSeconds: number = route.duration  // seconds

    return NextResponse.json({
      distance: Math.round(distanceMeters),
      duration: Math.round(durationSeconds),
      origin,
      destination,
      mode: "osrm"
    })
  } catch (error) {
    console.error("OSRM routing error:", error)

    // Deterministic fallback based on origin+destination text
    const seed = (origin + destination).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const pseudoRandom = ((seed * 9301 + 49297) % 233280) / 233280
    const estimatedDistance = 2 + pseudoRandom * 16
    const avgSpeedKmH = 28 + pseudoRandom * 8
    const estimatedDurationMin = (estimatedDistance / avgSpeedKmH) * 60

    return NextResponse.json({
      distance: Math.round(estimatedDistance * 1000),
      duration: Math.round(estimatedDurationMin * 60),
      origin,
      destination,
      mode: "fallback"
    })
  }
}

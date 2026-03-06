import { NextRequest, NextResponse } from "next/server"

// Madrid bounding box: covers the full Comunidad de Madrid
const MADRID_VIEWBOX = "-4.6,41.2,-3.0,39.8" // left,top,right,bottom

async function geocode(place: string): Promise<{ lat: number; lon: number; displayName: string } | null> {
  const hasCityHint = /madrid|barcelona|valencia|sevilla|bilbao|málaga|malaga|zaragoza|granada/i.test(place)
  const query = hasCityHint ? place : `${place}, Madrid`

  // First try bounded search within Madrid area
  const boundedUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=es&viewbox=${MADRID_VIEWBOX}&bounded=1`
  const res = await fetch(boundedUrl, { headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" } })
  const data = await res.json()

  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), displayName: data[0].display_name }
  }

  // Fallback: unbounded search within Spain
  const fallbackUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=es`
  const res2 = await fetch(fallbackUrl, { headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" } })
  const data2 = await res2.json()
  if (!data2 || data2.length === 0) return null
  return { lat: parseFloat(data2[0].lat), lon: parseFloat(data2[0].lon), displayName: data2[0].display_name }
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
    const [originCoords, destCoords] = await Promise.all([
      geocode(origin),
      geocode(destination)
    ])

    if (!originCoords) {
      return NextResponse.json({ error: `No se encontró: "${origin}". Intenta con una dirección más completa.` }, { status: 400 })
    }
    if (!destCoords) {
      return NextResponse.json({ error: `No se encontró: "${destination}". Intenta con una dirección más completa.` }, { status: 400 })
    }

    // Get real route from OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originCoords.lon},${originCoords.lat};${destCoords.lon},${destCoords.lat}?overview=false`
    const routeRes = await fetch(osrmUrl, {
      headers: { "User-Agent": "UbiGo/1.0 (ubigo.app)" }
    })
    const routeData = await routeRes.json()

    if (routeData.code !== "Ok" || !routeData.routes || routeData.routes.length === 0) {
      throw new Error("No se pudo calcular la ruta")
    }

    const route = routeData.routes[0]
    const distanceMeters: number = route.distance
    // OSRM gives ideal speed times — add 1.4x urban traffic factor for motorcycles
    const durationSeconds: number = route.duration * 1.4

    return NextResponse.json({
      distance: Math.round(distanceMeters),
      duration: Math.round(durationSeconds),
      origin,
      destination,
      mode: "osrm"
    })
  } catch (error) {
    console.error("OSRM routing error:", error)

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

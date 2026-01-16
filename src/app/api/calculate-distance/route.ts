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

  if (!GOOGLE_MAPS_API_KEY) {
    const estimatedDistance = Math.random() * 15 + 2
    const estimatedDuration = estimatedDistance * 3 + Math.random() * 10

    return NextResponse.json({
      distance: Math.round(estimatedDistance * 1000),
      duration: Math.round(estimatedDuration * 60),
      origin,
      destination,
      mode: "estimated"
    })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&language=es&region=es&key=${GOOGLE_MAPS_API_KEY}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error(`Google API error: ${data.status}`)
    }

    const element = data.rows[0]?.elements[0]

    if (!element || element.status !== "OK") {
      throw new Error(`No se pudo calcular la ruta: ${element?.status || "UNKNOWN"}`)
    }

    return NextResponse.json({
      distance: element.distance.value,
      duration: element.duration.value,
      distanceText: element.distance.text,
      durationText: element.duration.text,
      origin: data.origin_addresses[0],
      destination: data.destination_addresses[0],
      mode: "google"
    })
  } catch (error) {
    console.error("Distance Matrix API error:", error)
    
    const estimatedDistance = Math.random() * 15 + 2
    const estimatedDuration = estimatedDistance * 3 + Math.random() * 10

    return NextResponse.json({
      distance: Math.round(estimatedDistance * 1000),
      duration: Math.round(estimatedDuration * 60),
      origin,
      destination,
      mode: "fallback"
    })
  }
}

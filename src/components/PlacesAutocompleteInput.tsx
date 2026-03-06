"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface Props {
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon: React.ReactNode
  className?: string
}

declare global {
  interface Window {
    google: typeof google
  }
}

export function PlacesAutocompleteInput({ placeholder, value, onChange, icon, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = () => {
      if (!inputRef.current || !window.google?.maps?.places) return
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "es" },
        fields: ["formatted_address", "name"],
        types: ["geocode", "establishment"]
      })
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current!.getPlace()
        const address = place.formatted_address || place.name || ""
        onChange(address)
      })
      setReady(true)
    }

    if (window.google?.maps?.places) {
      init()
    } else {
      // Poll until Google Maps script loads
      const interval = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(interval)
          init()
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [onChange])

  return (
    <div className="relative">
      <div className="absolute left-3 top-3.5 z-10 pointer-events-none">{icon}</div>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        className={`pl-10 h-14 bg-zinc-100 border-none rounded-xl text-black focus-visible:ring-red-600 ${className ?? ""}`}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

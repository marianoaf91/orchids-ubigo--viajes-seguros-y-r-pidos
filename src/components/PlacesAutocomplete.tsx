"use client"

import * as React from "react"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PlacesAutocompleteProps {
  placeholder: string
  icon: "origin" | "destination"
  onSelect?: (address: string, lat: number, lng: number) => void
  className?: string
}

export function PlacesAutocomplete({ 
  placeholder, 
  icon, 
  onSelect,
  className 
}: PlacesAutocompleteProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "es" },
    },
    debounce: 300,
  })

  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setShowSuggestions(true)
  }

  const handleSelect = async (description: string) => {
    setValue(description, false)
    clearSuggestions()
    setShowSuggestions(false)

    try {
      const results = await getGeocode({ address: description })
      const { lat, lng } = await getLatLng(results[0])
      onSelect?.(description, lat, lng)
    } catch (error) {
      console.error("Error getting geocode:", error)
    }
  }

  const Icon = icon === "origin" ? MapPin : Navigation
  const iconColor = icon === "origin" ? "text-red-600" : "text-zinc-400"

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Icon className={cn("absolute left-3 top-3.5 z-10", iconColor)} size={20} />
      <Input
        value={value}
        onChange={handleInput}
        onFocus={() => setShowSuggestions(true)}
        disabled={!ready}
        placeholder={placeholder}
        className="pl-10 h-14 bg-zinc-100 border-none rounded-xl text-black focus-visible:ring-red-600"
      />
      {!ready && (
        <Loader2 className="absolute right-3 top-4 animate-spin text-zinc-400" size={18} />
      )}
      
      {showSuggestions && status === "OK" && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden z-50 max-h-60 overflow-y-auto">
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion

            return (
              <li
                key={place_id}
                onClick={() => handleSelect(suggestion.description)}
                className="px-4 py-3 hover:bg-zinc-100 cursor-pointer transition-colors border-b border-zinc-100 last:border-none"
              >
                <p className="font-medium text-black text-sm">{main_text}</p>
                <p className="text-zinc-500 text-xs">{secondary_text}</p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

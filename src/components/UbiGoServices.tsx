"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bike, MapPin, Clock, Shield, Star, ChevronLeft, ChevronRight, X, Navigation, ArrowRight, Loader2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlacesAutocompleteInput } from "@/components/PlacesAutocompleteInput"
import Image from "next/image"

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const pricingTiers = [
  { id: "basic", name: "UbiGo Basic", description: "Viajes económicos y confiables.", pricePerKm: 0.85, basePrice: 2.50 },
  { id: "comfort", name: "UbiGo Comfort", description: "Espacio extra y conductores mejor calificados.", pricePerKm: 1.20, basePrice: 3.50 },
]

const drivers = [
  { name: "Carlos Martínez", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", rating: 4.9, trips: 1247, plate: "1234 GHT", bike: "Honda PCX 125" },
  { name: "Miguel Ángel López", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", rating: 4.8, trips: 892, plate: "5678 BCD", bike: "Yamaha NMAX 125" },
  { name: "David García", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", rating: 4.95, trips: 2103, plate: "9012 KLM", bike: "Kymco Agility 125" },
]

function CalendarWidget() {
  const today = new Date()
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() })
  const [selected, setSelected] = useState(today.getDate())

  const days = useMemo(() => {
    const first = new Date(current.year, current.month, 1).getDay()
    const offset = first === 0 ? 6 : first - 1
    const total = new Date(current.year, current.month + 1, 0).getDate()
    return { offset, total }
  }, [current])

  const prev = () => setCurrent(c => c.month === 0 ? { month: 11, year: c.year - 1 } : { month: c.month - 1, year: c.year })
  const next = () => setCurrent(c => c.month === 11 ? { month: 0, year: c.year + 1 } : { month: c.month + 1, year: c.year })
  const isToday = (d: number) => d === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear()
  const isPast = (d: number) => new Date(current.year, current.month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const cells = Array.from({ length: days.offset + days.total }, (_, i) => i < days.offset ? null : i - days.offset + 1)

  return (
    <div className="bg-zinc-900 p-6 w-full h-full select-none rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><ChevronLeft size={18} /></button>
        <div className="text-center">
          <p className="text-white font-black text-lg">{MONTHS[current.month]}</p>
          <p className="text-zinc-500 text-sm">{current.year}</p>
        </div>
        <button onClick={next} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-zinc-500 uppercase py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day && (
              <button onClick={() => !isPast(day) && setSelected(day)} disabled={isPast(day)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all
                  ${isPast(day) ? "text-zinc-700 cursor-not-allowed" : ""}
                  ${!isPast(day) && day !== selected ? "text-zinc-300 hover:bg-zinc-700" : ""}
                  ${isToday(day) && day !== selected ? "ring-1 ring-red-600 text-red-400" : ""}
                  ${day === selected && !isPast(day) ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]" : ""}
                `}
              >{day}</button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Fecha seleccionada</p>
          <p className="text-white font-black">{selected} {MONTHS[current.month]}, {current.year}</p>
        </div>
        <div className="bg-red-600/10 border border-red-600/30 rounded-xl px-3 py-2 text-center">
          <p className="text-red-400 text-[9px] uppercase tracking-widest font-bold">Disponible</p>
          <p className="text-white font-black">24h</p>
        </div>
      </div>
    </div>
  )
}

type Step = "date" | "route" | "pricing" | "driver" | "confirmed"

function BookingModal({ onClose }: { onClose: () => void }) {
  const today = new Date()
  const [step, setStep] = useState<Step>("date")
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [priceResult, setPriceResult] = useState<{ distance: number; duration: number; prices: { id: string; name: string; price: number }[] } | null>(null)
  const [selectedTier, setSelectedTier] = useState<{ id: string; name: string; price: number } | null>(null)
  const [assignedDriver, setAssignedDriver] = useState<typeof drivers[0] | null>(null)

  const days = useMemo(() => {
    const first = new Date(current.year, current.month, 1).getDay()
    const offset = first === 0 ? 6 : first - 1
    const total = new Date(current.year, current.month + 1, 0).getDate()
    return { offset, total }
  }, [current])

  const prev = () => setCurrent(c => c.month === 0 ? { month: 11, year: c.year - 1 } : { month: c.month - 1, year: c.year })
  const next = () => setCurrent(c => c.month === 11 ? { month: 0, year: c.year + 1 } : { month: c.month + 1, year: c.year })
  const isToday = (d: number) => d === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear()
  const isPast = (d: number) => new Date(current.year, current.month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const cells = Array.from({ length: days.offset + days.total }, (_, i) => i < days.offset ? null : i - days.offset + 1)

  const calculate = async () => {
    if (!origin.trim() || !destination.trim()) { setError("Introduce origen y destino"); return }
    setError(""); setLoading(true)
    try {
      const res = await fetch(`/api/calculate-distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al calcular")
      const distanceKm = data.distance / 1000
      const durationMin = Math.round(data.duration / 60)
      const displayDistance = distanceKm < 10 ? Math.round(distanceKm * 10) / 10 : Math.round(distanceKm)
      setPriceResult({
        distance: displayDistance,
        duration: durationMin,
        prices: pricingTiers.map(t => ({ id: t.id, name: t.name, price: Math.round((t.basePrice + distanceKm * t.pricePerKm) * 100) / 100 }))
      })
      setStep("pricing")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al calcular")
    } finally { setLoading(false) }
  }

  const selectTier = (tier: { id: string; name: string; price: number }) => {
    setSelectedTier(tier)
    setAssignedDriver(drivers[Math.floor(Math.random() * drivers.length)])
    setStep("driver")
  }

  const stepLabel = { date: "1", route: "2", pricing: "3", driver: "4", confirmed: "✓" }
  const stepNames = ["Fecha", "Ruta", "Tarifa", "Confirmar"]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors z-10">
          <X size={22} className="text-zinc-400" />
        </button>

        {/* Progress bar */}
        {step !== "confirmed" && (
          <div className="px-8 pt-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              {stepNames.map((name, i) => {
                const stepOrder: Step[] = ["date", "route", "pricing", "driver"]
                const currentIdx = stepOrder.indexOf(step)
                const done = i < currentIdx
                const active = i === currentIdx
                return (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all
                      ${done ? "bg-red-600 text-white" : active ? "bg-black text-white" : "bg-zinc-100 text-zinc-400"}`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide ${active ? "text-black" : "text-zinc-400"}`}>{name}</span>
                  </div>
                )
              })}
            </div>
            <div className="h-1 bg-zinc-100 rounded-full mt-1">
              <div className="h-1 bg-red-600 rounded-full transition-all duration-500"
                style={{ width: `${(["date","route","pricing","driver"].indexOf(step)) * 33.3}%` }} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* STEP 1 — Date + Time */}
          {step === "date" && (
            <motion.div key="date" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="px-8 pb-8">
              <h2 className="text-2xl font-black text-black mb-1">¿Cuándo viajas?</h2>
              <p className="text-zinc-400 text-sm mb-5">Selecciona fecha y hora de recogida</p>

              {/* Calendar */}
              <div className="bg-zinc-50 rounded-2xl p-4 mb-4 select-none">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prev} className="p-2 rounded-xl hover:bg-zinc-200 text-zinc-400 transition-colors"><ChevronLeft size={18} /></button>
                  <div className="text-center">
                    <p className="text-black font-black text-base">{MONTHS[current.month]}</p>
                    <p className="text-zinc-400 text-xs">{current.year}</p>
                  </div>
                  <button onClick={next} className="p-2 rounded-xl hover:bg-zinc-200 text-zinc-400 transition-colors"><ChevronRight size={18} /></button>
                </div>
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-zinc-400 uppercase py-1">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, i) => (
                    <div key={i} className="aspect-square flex items-center justify-center">
                      {day && (
                        <button onClick={() => !isPast(day) && setSelectedDay(day)} disabled={isPast(day)}
                          className={`w-8 h-8 rounded-lg text-sm font-bold transition-all
                            ${isPast(day) ? "text-zinc-300 cursor-not-allowed" : ""}
                            ${!isPast(day) && day !== selectedDay ? "text-zinc-600 hover:bg-zinc-200" : ""}
                            ${isToday(day) && day !== selectedDay ? "ring-1 ring-red-600 text-red-500" : ""}
                            ${day === selectedDay && !isPast(day) ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]" : ""}
                          `}
                        >{day}</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time picker — shown once a day is selected */}
              <AnimatePresence>
                {selectedDay && (
                  <motion.div
                    key="timepicker"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-red-600" />
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Hora de recogida</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
                        "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"].map(h => (
                        <button
                          key={h}
                          onClick={() => setSelectedHour(h)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all
                            ${selectedHour === h
                              ? "bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                              : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                            }`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button onClick={() => selectedDay && selectedHour && setStep("route")} disabled={!selectedDay || !selectedHour}
                className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl disabled:opacity-40 gap-2">
                Continuar <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}

          {/* STEP 2 — Route */}
          {step === "route" && (
            <motion.div key="route" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="px-8 pb-8">
              <button onClick={() => setStep("date")} className="flex items-center gap-1 text-zinc-400 hover:text-black text-sm mb-4 transition-colors">
                <ChevronLeft size={16} /> Volver
              </button>
              <h2 className="text-2xl font-black text-black mb-1">¿De dónde a dónde?</h2>
              <p className="text-zinc-400 text-sm mb-5">
                <span className="font-bold text-black">{selectedDay} {MONTHS[current.month]}, {current.year}</span>
                {selectedHour && <> · <span className="font-bold text-red-600">{selectedHour}</span></>}
              </p>
              <div className="space-y-3 mb-5">
                <PlacesAutocompleteInput placeholder="Ubicación de origen" value={origin} onChange={setOrigin}
                  icon={<MapPin className="text-red-600" size={18} />} />
                <PlacesAutocompleteInput placeholder="Destino" value={destination} onChange={setDestination}
                  icon={<Navigation className="text-zinc-400" size={18} />} />
                {error && <p className="text-red-500 text-xs">{error}</p>}
              </div>
              <Button onClick={calculate} disabled={loading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin" size={18} />Calculando...</> : <>Ver Precios <ArrowRight size={16} /></>}
              </Button>
            </motion.div>
          )}

          {/* STEP 3 — Pricing */}
          {step === "pricing" && priceResult && (
            <motion.div key="pricing" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="px-8 pb-8">
              <button onClick={() => setStep("route")} className="flex items-center gap-1 text-zinc-400 hover:text-black text-sm mb-4 transition-colors">
                <ChevronLeft size={16} /> Volver
              </button>
              <h2 className="text-2xl font-black text-black mb-1">Elige tu tarifa</h2>
              <p className="text-zinc-400 text-sm mb-4">
                {selectedDay} {MONTHS[current.month]}{selectedHour && <> · <span className="font-bold text-red-600">{selectedHour}</span></>} · {origin} → {destination.split(",")[0]}
              </p>
              <div className="flex gap-3 mb-5">
                <div className="bg-red-50 rounded-xl p-3 flex-1 text-center">
                  <p className="text-xl font-black text-red-600">{priceResult.distance} km</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Distancia</p>
                </div>
                <div className="bg-zinc-100 rounded-xl p-3 flex-1 text-center">
                  <p className="text-xl font-black text-black">{priceResult.duration} min</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Duración</p>
                </div>
              </div>
              <div className="space-y-3">
                {priceResult.prices.map(tier => (
                  <div key={tier.id} onClick={() => selectTier(tier)}
                    className="border-2 border-zinc-200 hover:border-red-600 rounded-xl p-4 cursor-pointer transition-all group hover:bg-red-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-zinc-100 group-hover:bg-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors">
                          {tier.id === "basic" ? <Bike size={20} className="text-red-600" /> : <Zap size={20} className="text-red-600" />}
                        </div>
                        <div>
                          <p className="font-bold text-black text-sm">{tier.name}</p>
                          <p className="text-xs text-zinc-500">{pricingTiers.find(t => t.id === tier.id)?.description}</p>
                        </div>
                      </div>
                      <p className="text-xl font-black text-black">{tier.price.toFixed(2)}€</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Driver */}
          {step === "driver" && assignedDriver && selectedTier && priceResult && (
            <motion.div key="driver" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="px-8 pb-8">
              <button onClick={() => setStep("pricing")} className="flex items-center gap-1 text-zinc-400 hover:text-black text-sm mb-4 transition-colors">
                <ChevronLeft size={16} /> Volver
              </button>
              <h2 className="text-2xl font-black text-black mb-1">Tu conductor</h2>
              <p className="text-zinc-400 text-sm mb-5">Listo para llevarte a tu destino</p>
              <div className="bg-zinc-100 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <Image src={assignedDriver.photo} alt={assignedDriver.name} width={72} height={72} className="rounded-full object-cover border-4 border-white shadow" />
                  <div>
                    <p className="font-bold text-black text-base">{assignedDriver.name}</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-black text-sm">{assignedDriver.rating}</span>
                      <span className="text-zinc-400 text-xs">({assignedDriver.trips} viajes)</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-xl p-3"><p className="text-xs text-zinc-400 uppercase mb-1">Matrícula</p><p className="font-black text-black">{assignedDriver.plate}</p></div>
                  <div className="bg-white rounded-xl p-3"><p className="text-xs text-zinc-400 uppercase mb-1">Vehículo</p><p className="font-bold text-black text-sm">{assignedDriver.bike}</p></div>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-black text-sm">{selectedTier.name}</p>
                  <p className="text-xs text-zinc-500">{selectedDay} {MONTHS[current.month]}{selectedHour && ` · ${selectedHour}`} · {priceResult.distance} km · {priceResult.duration} min</p>
                </div>
                <p className="text-2xl font-black text-black">{selectedTier.price.toFixed(2)}€</p>
              </div>
              <Button onClick={() => setStep("confirmed")} className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
                Confirmar Viaje
              </Button>
              <p className="text-xs text-zinc-400 text-center mt-3">Al confirmar, aceptas nuestros términos y condiciones</p>
            </motion.div>
          )}

          {/* CONFIRMED */}
          {step === "confirmed" && (
            <motion.div key="confirmed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-8 py-10 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                  className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
              <h2 className="text-2xl font-black text-black mb-2">¡Reserva Confirmada!</h2>
              <p className="text-zinc-500 mb-1">Tu transporte ha sido programado</p>
              <p className="text-red-600 font-bold text-sm mb-6">
                {selectedDay} {MONTHS[current.month]}, {current.year}{selectedHour && ` · ${selectedHour}`}
              </p>
              {assignedDriver && (
                <div className="bg-zinc-100 rounded-xl p-4 mb-6 flex items-center gap-4 text-left">
                  <Image src={assignedDriver.photo} alt={assignedDriver.name} width={52} height={52} className="rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-black">{assignedDriver.name}</p>
                    <p className="text-red-600 font-black">{assignedDriver.plate}</p>
                  </div>
                </div>
              )}
              <p className="text-sm text-zinc-400">Recibirás un recordatorio <span className="font-bold text-black">15 min antes</span> de la recogida.</p>
              <Button onClick={onClose} className="mt-6 w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold rounded-xl">Cerrar</Button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const steps = [
  { n: "01", title: "Elige fecha y hora", desc: "Planifica con días de antelación o reserva para hoy mismo." },
  { n: "02", title: "Indica tu ruta", desc: "Origen y destino en Madrid. Calculamos precio al instante." },
  { n: "03", title: "Conductor asignado", desc: "Conductor verificado con rating 4.8+ confirmado para tu viaje." },
]

export function UbiGoServices() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <section id="servicios" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-600/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        {/* Header */}
        <div className="max-w-xl mb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest">Cómo funciona</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.05] mb-5">
            Reserva tu transporte<br /><span className="text-red-500">con antelación</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base leading-relaxed">
            UbiGo! se enfoca exclusivamente en el transporte de personas mediante reservas anticipadas, garantizando puntualidad y seguridad absoluta.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 group"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center font-black text-sm text-red-500 group-hover:bg-red-600/10 group-hover:border-red-500/30 transition-all">
                  {s.n}
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-bold text-base mb-1">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
              className="pt-4">
              <Button onClick={() => setShowBooking(true)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold h-12 px-7 rounded-xl text-sm shadow-[0_0_24px_rgba(220,38,38,0.4)] hover:shadow-[0_0_36px_rgba(220,38,38,0.6)] transition-all active:scale-[0.98] gap-2">
                Reservar ahora
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
              </Button>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Shield size={20} />, title: "Conductores verificados", desc: "Todos con antecedentes y formación certificada." },
              { icon: <Clock size={20} />, title: "Puntualidad garantizada", desc: "Llegamos antes que tú lo necesites." },
              { icon: <MapPin size={20} />, title: "Cobertura total Madrid", desc: "Centro, barrios y área metropolitana." },
              { icon: <Star size={20} />, title: "Valoración 4.9 / 5", desc: "Miles de usuarios satisfechos en Madrid." },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-zinc-900/50 border border-white/5 rounded-2xl p-5 hover:border-red-500/25 hover:bg-zinc-900/80 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-600/20 transition-colors">
                  {card.icon}
                </div>
                <p className="text-white font-bold text-sm mb-1">{card.title}</p>
                <p className="text-zinc-500 text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </section>
  )
}

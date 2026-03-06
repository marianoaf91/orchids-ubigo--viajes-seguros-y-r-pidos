"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bike, MapPin, Clock, Shield, Star, ChevronLeft, ChevronRight, Navigation, ArrowRight, Loader2, X, Zap, ChevronLeft as Back, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlacesAutocompleteInput } from "@/components/PlacesAutocompleteInput"
import Image from "next/image"

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const pricingTiers = [
  { id: "basic", name: "UbiGo Basic", description: "Viajes económicos y confiables.", pricePerKm: 0.85, basePrice: 2.50, features: ["Capacidad: 1 persona", "Casco incluido", "Motos estándar"] },
  { id: "comfort", name: "UbiGo Comfort", description: "Espacio extra y conductores mejor calificados.", pricePerKm: 1.20, basePrice: 3.50, features: ["Capacidad: 1 persona", "Espacio para maleta", "Casco premium incluido"] },
]

const drivers = [
  { name: "Carlos Martínez", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", rating: 4.9, trips: 1247, plate: "1234 GHT", bike: "Honda PCX 125" },
  { name: "Miguel Ángel López", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", rating: 4.8, trips: 892, plate: "5678 BCD", bike: "Yamaha NMAX 125" },
  { name: "David García", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", rating: 4.95, trips: 2103, plate: "9012 KLM", bike: "Kymco Agility 125" },
]

function BookingCalendar() {
  const today = new Date()
  const [current, setCurrent] = useState({ month: today.getMonth(), year: today.getFullYear() })
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [priceResult, setPriceResult] = useState<{ distance: number; duration: number; prices: { id: string; name: string; price: number; features: string[]; description: string }[] } | null>(null)
  const [selectedTier, setSelectedTier] = useState<{ id: string; name: string; price: number } | null>(null)
  const [assignedDriver, setAssignedDriver] = useState<typeof drivers[0] | null>(null)
  const [confirmed, setConfirmed] = useState(false)

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
        prices: pricingTiers.map(t => ({ id: t.id, name: t.name, price: Math.round((t.basePrice + distanceKm * t.pricePerKm) * 100) / 100, features: t.features, description: t.description }))
      })
      setShowModal(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al calcular")
    } finally { setLoading(false) }
  }

  const selectTier = (tier: typeof selectedTier) => {
    setSelectedTier(tier)
    setAssignedDriver(drivers[Math.floor(Math.random() * drivers.length)])
  }

  const closeModal = () => { setShowModal(false); setSelectedTier(null); setAssignedDriver(null); setConfirmed(false) }

  return (
    <>
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 w-full">
        {/* Calendar header */}
        <div className="p-5 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-1">
            <button onClick={prev} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="text-center">
              <p className="text-white font-black text-lg">{MONTHS[current.month]}</p>
              <p className="text-zinc-500 text-sm">{current.year}</p>
            </div>
            <button onClick={next} className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Day grid */}
        <div className="p-5 select-none">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-zinc-500 uppercase py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => (
              <div key={i} className="aspect-square flex items-center justify-center">
                {day && (
                  <button
                    onClick={() => !isPast(day) && setSelectedDay(day)}
                    disabled={isPast(day)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all
                      ${isPast(day) ? "text-zinc-700 cursor-not-allowed" : ""}
                      ${!isPast(day) && day !== selectedDay ? "text-zinc-300 hover:bg-zinc-700" : ""}
                      ${isToday(day) && day !== selectedDay ? "ring-1 ring-red-600 text-red-400" : ""}
                      ${day === selectedDay && !isPast(day) ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)]" : ""}
                    `}
                  >{day}</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking form */}
        <div className="px-5 pb-5 border-t border-zinc-800 pt-4 space-y-3">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            Viaje para el {selectedDay} {MONTHS[current.month]}
          </p>
          <PlacesAutocompleteInput
            placeholder="Ubicación de origen"
            value={origin}
            onChange={setOrigin}
            icon={<MapPin className="text-red-600" size={18} />}
          />
          <PlacesAutocompleteInput
            placeholder="Destino"
            value={destination}
            onChange={setDestination}
            icon={<Navigation className="text-zinc-400" size={18} />}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <Button
            onClick={calculate}
            disabled={loading}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? <><Loader2 className="animate-spin" size={18} />Calculando...</> : <>Ver Precios <ArrowRight size={18} /></>}
          </Button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && priceResult && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={24} className="text-zinc-500" />
              </button>

              <AnimatePresence mode="wait">
                {confirmed ? (
                  <motion.div key="confirmed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>
                    <h2 className="text-2xl font-black text-black mb-2">¡Reserva Confirmada!</h2>
                    <p className="text-zinc-500 mb-2">Tu transporte ha sido programado</p>
                    <p className="text-sm font-bold text-red-600 mb-6">{selectedDay} {MONTHS[current.month]}, {current.year}</p>
                    {assignedDriver && (
                      <div className="bg-zinc-100 rounded-xl p-4 mb-6">
                        <div className="flex items-center gap-4">
                          <Image src={assignedDriver.photo} alt={assignedDriver.name} width={60} height={60} className="rounded-full object-cover" />
                          <div className="text-left">
                            <p className="font-bold text-black">{assignedDriver.name}</p>
                            <p className="text-lg font-black text-red-600">{assignedDriver.plate}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-zinc-400">Recibirás un recordatorio <span className="font-bold text-black">15 minutos antes</span> de la recogida.</p>
                  </motion.div>
                ) : selectedTier && assignedDriver ? (
                  <motion.div key="driver" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                    <button onClick={() => { setSelectedTier(null); setAssignedDriver(null) }} className="flex items-center gap-1 text-zinc-500 hover:text-black transition-colors mb-4">
                      <ChevronLeft size={20} /><span className="text-sm">Volver</span>
                    </button>
                    <h2 className="text-2xl font-black text-black mb-2">Tu conductor</h2>
                    <p className="text-zinc-500 mb-6">Listo para llevarte a tu destino</p>
                    <div className="bg-zinc-100 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Image src={assignedDriver.photo} alt={assignedDriver.name} width={80} height={80} className="rounded-full object-cover border-4 border-white shadow-lg" />
                        <div>
                          <p className="font-bold text-black text-lg">{assignedDriver.name}</p>
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-black">{assignedDriver.rating}</span>
                            <span className="text-zinc-400 text-sm">({assignedDriver.trips} viajes)</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-xl p-3"><p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Matrícula</p><p className="font-black text-black text-lg">{assignedDriver.plate}</p></div>
                        <div className="bg-white rounded-xl p-3"><p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">Vehículo</p><p className="font-bold text-black text-sm">{assignedDriver.bike}</p></div>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-black">{selectedTier.name}</p>
                        <p className="text-xs text-zinc-500">{priceResult.distance} km · {priceResult.duration} min · {selectedDay} {MONTHS[current.month]}</p>
                      </div>
                      <p className="text-2xl font-black text-black">{selectedTier.price.toFixed(2)}€</p>
                    </div>
                    <Button onClick={() => setConfirmed(true)} className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl">Confirmar Viaje</Button>
                    <p className="text-xs text-zinc-400 text-center mt-4">Al confirmar, aceptas nuestros términos y condiciones</p>
                  </motion.div>
                ) : (
                  <motion.div key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }}>
                    <h2 className="text-2xl font-black text-black mb-1">Tu viaje</h2>
                    <p className="text-sm text-red-600 font-bold mb-4">{selectedDay} {MONTHS[current.month]}, {current.year}</p>
                    <div className="bg-zinc-100 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                        <div><p className="text-xs text-zinc-500 uppercase tracking-wide">Origen</p><p className="text-black font-medium">{origin}</p></div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Navigation size={18} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                        <div><p className="text-xs text-zinc-500 uppercase tracking-wide">Destino</p><p className="text-black font-medium">{destination}</p></div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <div className="bg-red-50 rounded-xl p-4 flex-1 text-center">
                        <p className="text-2xl font-black text-red-600 truncate">{priceResult.distance} km</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">Distancia</p>
                      </div>
                      <div className="bg-zinc-100 rounded-xl p-4 flex-1 text-center">
                        <p className="text-2xl font-black text-black truncate">{priceResult.duration} min</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">Duración aprox.</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-black mb-4">Elige tu tarifa</h3>
                    <div className="space-y-3">
                      {priceResult.prices.map(tier => (
                        <div key={tier.id} onClick={() => selectTier({ id: tier.id, name: tier.name, price: tier.price })}
                          className="border-2 border-zinc-200 hover:border-red-600 rounded-xl p-4 cursor-pointer transition-colors group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-zinc-100 group-hover:bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                                {tier.id === "basic" ? <Bike size={24} className="text-red-600" /> : <Zap size={24} className="text-red-600" />}
                              </div>
                              <div><p className="font-bold text-black">{tier.name}</p><p className="text-xs text-zinc-500">{tier.description}</p></div>
                            </div>
                            <p className="text-2xl font-black text-black">{tier.price.toFixed(2)}€</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 text-center mt-6">Precios estimados. El precio final puede variar según el tráfico.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function UbiGoServices() {
  return (
    <section id="servicios" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-red-600 font-bold tracking-widest uppercase text-sm">
            Nuestros Servicios
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mt-4 mb-6 tracking-tighter">
            Reserva tu transporte <br /><span className="text-red-600">con antelación</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto">
            UbiGo! se enfoca exclusivamente en el transporte de personas mediante reservas, garantizando puntualidad y seguridad.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <div className="relative">
                <BookingCalendar />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h3 className="text-3xl font-black text-white mb-4">Reservas</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">Planifica tus traslados con antelación y asegura tu transporte con los mejores conductores.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Agenda hasta con 7 días", "Prioridad de asignación", "Recordatorios vía app", "Cancelación flexible"].map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 hover:border-red-600/50 transition-colors">
                  <div className="bg-red-600/10 p-2 rounded-lg text-red-600"><Shield size={20} /></div>
                  <span className="text-zinc-300 font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Conductores", value: "2.5k+", icon: <Bike className="text-red-600" /> },
            { label: "Viajes Diarios", value: "10k+", icon: <MapPin className="text-red-600" /> },
            { label: "Tiempo Medio", value: "8 min", icon: <Clock className="text-red-600" /> },
            { label: "Satisfacción", value: "4.9/5", icon: <Star className="text-red-600" fill="currentColor" /> },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
              <div className="inline-flex p-3 bg-zinc-900 rounded-2xl border border-zinc-800 mb-4 group-hover:border-red-600/50 transition-colors">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-zinc-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { MapPin, Navigation, ArrowRight, X, Bike, Zap, Loader2, Star, Phone, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const pricingTiers = [
  {
    id: "basic",
    name: "UbiGo Basic",
    description: "Viajes económicos y confiables.",
    pricePerKm: 0.85,
    basePrice: 2.50,
    icon: <Bike size={24} className="text-red-600" />,
    features: ["Capacidad: 1 persona", "Casco incluido", "Motos estándar"]
  },
  {
    id: "comfort",
    name: "UbiGo Comfort",
    description: "Espacio extra y conductores mejor calificados.",
    pricePerKm: 1.20,
    basePrice: 3.50,
    icon: <Zap size={24} className="text-red-600" />,
    features: ["Capacidad: 1 persona", "Espacio para maleta", "Casco premium incluido"]
  }
]

const drivers = [
  {
    name: "Carlos Martínez",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    trips: 1247,
    plate: "1234 GHT",
    bike: "Honda PCX 125"
  },
  {
    name: "Miguel Ángel López",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 4.8,
    trips: 892,
    plate: "5678 BCD",
    bike: "Yamaha NMAX 125"
  },
  {
    name: "David García",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 4.95,
    trips: 2103,
    plate: "9012 KLM",
    bike: "Kymco Agility 125"
  }
]

interface PriceResult {
  distance: number
  duration: number
  prices: {
    id: string
    name: string
    price: number
    icon: React.ReactNode
    features: string[]
    description: string
  }[]
}

interface SelectedTier {
  id: string
  name: string
  price: number
  icon: React.ReactNode
}

interface Driver {
  name: string
  photo: string
  rating: number
  trips: number
  plate: string
  bike: string
}

export function UbiGoHero() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [priceResult, setPriceResult] = useState<PriceResult | null>(null)
  const [error, setError] = useState("")

  const calculatePrices = async () => {
    if (!origin.trim() || !destination.trim()) {
      setError("Por favor, introduce origen y destino")
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await fetch(`/api/calculate-distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al calcular la distancia")
      }

      const distanceKm = data.distance / 1000
      const durationMin = Math.round(data.duration / 60)

      const prices = pricingTiers.map(tier => ({
        id: tier.id,
        name: tier.name,
        price: Math.round((tier.basePrice + (distanceKm * tier.pricePerKm)) * 100) / 100,
        icon: tier.icon,
        features: tier.features,
        description: tier.description
      }))

      setPriceResult({
        distance: Math.round(distanceKm * 10) / 10,
        duration: durationMin,
        prices
      })
      setShowModal(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al calcular precios")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative min-h-screen pt-20 flex items-center bg-black overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/10 skew-x-12 transform translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/20 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-6">
                Viaja con <br />
                <span className="text-red-600">Libertad.</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed">
                  La forma más rápida y segura de moverte por Madrid. UbiGo! te conecta con conductores en minutos.
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md">
                <h3 className="text-black text-2xl font-bold mb-6 flex items-center gap-2">
                  ¿A dónde vamos hoy?
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-red-600" size={20} />
                    <Input 
                      placeholder="Ubicación de origen" 
                      className="pl-10 h-14 bg-zinc-100 border-none rounded-xl text-black focus-visible:ring-red-600"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3.5 text-zinc-400" size={20} />
                    <Input 
                      placeholder="Destino" 
                      className="pl-10 h-14 bg-zinc-100 border-none rounded-xl text-black focus-visible:ring-red-600"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}
                  <Button 
                    onClick={calculatePrices}
                    disabled={loading}
                    className="w-full h-14 bg-black hover:bg-zinc-800 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Calculando...
                      </>
                    ) : (
                      <>
                        Ver Precios <ArrowRight size={20} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
               <div className="relative z-20 rounded-3xl overflow-hidden border-8 border-zinc-900 shadow-2xl">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/20d9c869-8da0-4255-9e75-670095d3e726/MOTOUBIGO-1768390783964.jpg?width=8000&height=8000&resize=contain" 
                      alt="UbiGo Ride"
                      width={800}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
               </div>
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1, duration: 0.5 }}
                   className="absolute -bottom-10 -left-6 bg-zinc-900 text-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 overflow-hidden border border-zinc-800"
                 >
                   <div className="relative z-10">
                     <p className="text-4xl font-black italic tracking-tighter leading-none mb-3 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">SIEMPRE EN MOVIMIENTO</p>
                     <div className="h-0.5 w-full bg-gradient-to-r from-red-600 to-transparent mb-3" />
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">Servicio 24 horas</p>
                   </div>
                   <motion.div 
                     animate={{ 
                       x: [-100, 100],
                       opacity: [0, 0.1, 0] 
                     }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute top-0 left-0 w-20 h-full bg-white skew-x-12 transform"
                   />
                 </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && priceResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} className="text-zinc-500" />
              </button>

              <h2 className="text-2xl font-black text-black mb-2">Tu viaje</h2>
              
              <div className="bg-zinc-100 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">Origen</p>
                    <p className="text-black font-medium">{origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation size={18} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">Destino</p>
                    <p className="text-black font-medium">{destination}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="bg-red-50 rounded-xl p-4 flex-1 text-center">
                  <p className="text-3xl font-black text-red-600">{priceResult.distance} km</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Distancia</p>
                </div>
                <div className="bg-zinc-100 rounded-xl p-4 flex-1 text-center">
                  <p className="text-3xl font-black text-black">{priceResult.duration} min</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">Duración aprox.</p>
                </div>
              </div>

              <h3 className="font-bold text-black mb-4">Elige tu tarifa</h3>
              
              <div className="space-y-3">
                {priceResult.prices.map((tier) => (
                  <div
                    key={tier.id}
                    className="border-2 border-zinc-200 hover:border-red-600 rounded-xl p-4 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-zinc-100 group-hover:bg-red-50 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                          {tier.icon}
                        </div>
                        <div>
                          <p className="font-bold text-black">{tier.name}</p>
                          <p className="text-xs text-zinc-500">{tier.description}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-black">{tier.price.toFixed(2)}€</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-400 text-center mt-6">
                Precios estimados. El precio final puede variar según el tráfico.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

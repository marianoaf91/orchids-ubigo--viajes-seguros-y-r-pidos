"use client"

import * as React from "react"
import { MapPin, Navigation, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function UbiGoHero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center bg-black overflow-hidden">
      {/* Background Decorative Elements */}
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
              La forma más rápida y segura de moverte por la ciudad. UbiGo! te conecta con conductores en minutos.
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
                  />
                </div>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3.5 text-zinc-400" size={20} />
                  <Input 
                    placeholder="Destino" 
                    className="pl-10 h-14 bg-zinc-100 border-none rounded-xl text-black focus-visible:ring-red-600"
                  />
                </div>
                <Button className="w-full h-14 bg-black hover:bg-zinc-800 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95">
                  Ver Precios <ArrowRight size={20} />
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
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
                  alt="UbiGo Ride"
                  className="w-full aspect-[4/5] object-cover"
                />
             </div>
             {/* Floating badge */}
             <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl z-30">
                <p className="text-3xl font-black">24/7</p>
                <p className="text-sm font-medium opacity-80">Servicio Disponible</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

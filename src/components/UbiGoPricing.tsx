"use client"

import * as React from "react"
import { Bike, Zap } from "lucide-react"
import { motion } from "framer-motion"

const pricingTiers = [
  {
    name: "UbiGo Basic",
    description: "Viajes económicos y confiables.",
    price: "5.00€",
    icon: <Bike size={24} className="text-red-600" />,
    features: ["Capacidad: 1 persona", "Casco incluido", "Motos estándar"]
  },
  {
    name: "UbiGo Comfort",
    description: "Espacio extra y conductores mejor calificados.",
    price: "8.50€",
    icon: <Zap size={24} className="text-red-600" />,
    features: ["Capacidad: 1 persona", "Espacio para maleta", "Casco premium incluido"]
  }
]

export function UbiGoPricing() {
  return (
    <section id="precios" className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-black mb-4">Tarifas de Reserva</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Planifica tu transporte personal en Madrid con total transparencia. Reserva con antelación y asegura tu viaje al mejor precio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-zinc-200 hover:border-red-600 transition-colors group cursor-default"
            >
              <div className="bg-zinc-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                {tier.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{tier.name}</h3>
              <p className="text-zinc-500 text-sm mb-4 h-10">{tier.description}</p>
              <p className="text-3xl font-black text-black mb-6">Desde {tier.price}</p>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-sm text-zinc-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import { Bike, Zap, Check } from "lucide-react"
import { motion } from "framer-motion"

const pricingTiers = [
  {
    name: "UbiGo Basic",
    tag: "Más popular",
    description: "Viajes económicos y confiables para el día a día.",
    price: "5.00€",
    icon: <Bike size={22} className="text-red-500" />,
    features: ["Capacidad: 1 persona", "Casco incluido", "Motos estándar", "Reserva anticipada"],
    highlight: false,
  },
  {
    name: "UbiGo Comfort",
    tag: "Premium",
    description: "Espacio extra y conductores mejor calificados.",
    price: "8.50€",
    icon: <Zap size={22} className="text-red-500" />,
    features: ["Capacidad: 1 persona", "Espacio para maleta", "Casco premium incluido", "Conductor top-rated"],
    highlight: true,
  }
]

export function UbiGoPricing() {
  return (
    <section id="precios" className="py-28 bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.06)_0%,_transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">

        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest">Tarifas</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.05] mb-4">
            Tarifas <span className="text-red-500">transparentes</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-zinc-400 text-base">
            Sin sorpresas. Precio fijo calculado antes de confirmar tu reserva.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-7 border transition-all group cursor-default ${
                tier.highlight
                  ? "bg-zinc-800/80 border-red-500/40 shadow-[0_0_60px_rgba(220,38,38,0.15)]"
                  : "bg-zinc-800/40 border-white/8 hover:border-white/15"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_16px_rgba(220,38,38,0.5)]">
                    {tier.tag}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                  {tier.icon}
                </div>
                {!tier.highlight && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 border border-zinc-700 rounded-full px-2.5 py-1">
                    {tier.tag}
                  </span>
                )}
              </div>

              <h3 className="text-white font-black text-xl mb-1">{tier.name}</h3>
              <p className="text-zinc-500 text-sm mb-5 leading-relaxed">{tier.description}</p>

              <div className="mb-6">
                <span className="text-white font-black text-3xl">Desde {tier.price}</span>
                <span className="text-zinc-600 text-sm ml-1">/ viaje</span>
              </div>

              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check size={14} className="text-red-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="text-center text-zinc-600 text-xs mt-8">
          * Precio final calculado según distancia real. Consulta el estimador en el hero.
        </motion.p>
      </div>
    </section>
  )
}

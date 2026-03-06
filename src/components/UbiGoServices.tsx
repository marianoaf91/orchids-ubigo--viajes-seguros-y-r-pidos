"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Bike, Package, Calendar, Briefcase, MapPin, Clock, Shield, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DAYS = ["L", "M", "X", "J", "V", "S", "D"]
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

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
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-zinc-500 uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day && (
              <button
                onClick={() => !isPast(day) && setSelected(day)}
                disabled={isPast(day)}
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

const services = [
  {
    id: "reservas",
    icon: <Calendar className="w-5 h-5" />,
    title: "Reservas",
    description: "Planifica tus traslados con antelación y asegura tu transporte con los mejores conductores.",
    features: ["Agenda hasta con 7 días", "Prioridad de asignación", "Recordatorios vía app", "Cancelación flexible"],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
  },
]

export function UbiGoServices() {
  return (
    <section id="servicios" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 font-bold tracking-widest uppercase text-sm"
          >
            Nuestros Servicios
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mt-4 mb-6 tracking-tighter"
          >
            Reserva tu transporte <br /> <span className="text-red-600">con antelación</span>
          </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              UbiGo! se enfoca exclusivamente en el transporte de personas mediante reservas, garantizando puntualidad y seguridad.
            </motion.p>
        </div>

          <Tabs defaultValue="reservas" className="w-full">
          <div className="hidden">
            <TabsList className="bg-zinc-900/50 border border-zinc-800 p-1 h-auto flex-wrap justify-center sm:flex-nowrap">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-zinc-400 py-3 px-6 rounded-md transition-all font-bold gap-2"
                >
                  {service.icon}
                  <span className="hidden sm:inline">{service.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl border border-zinc-800">
                    <CalendarWidget />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">{service.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/50 hover:border-red-600/50 transition-colors">
                        <div className="bg-red-600/10 p-2 rounded-lg text-red-600">
                          <Shield size={20} />
                        </div>
                        <span className="text-zinc-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-8 rounded-xl text-lg group">
                      Reservar ahora
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-2"
                      >
                        →
                      </motion.span>
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-white hover:bg-zinc-900 font-bold h-14 px-8 rounded-xl text-lg">
                      Saber más
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Floating elements */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Conductores", value: "2.5k+", icon: <Bike className="text-red-600" /> },
            { label: "Viajes Diarios", value: "10k+", icon: <MapPin className="text-red-600" /> },
            { label: "Tiempo Medio", value: "8 min", icon: <Clock className="text-red-600" /> },
            { label: "Satisfacción", value: "4.9/5", icon: <Star className="text-red-600" fill="currentColor" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex p-3 bg-zinc-900 rounded-2xl border border-zinc-800 mb-4 group-hover:border-red-600/50 transition-colors">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-zinc-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

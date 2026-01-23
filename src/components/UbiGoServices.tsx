"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Bike, Package, Calendar, Briefcase, MapPin, Clock, Shield, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: "envios",
    icon: <Package className="w-5 h-5" />,
    title: "Envíos Flash",
    description: "Envía paquetes pequeños de forma rápida y económica por toda la ciudad.",
    features: ["Entrega en menos de 30 min", "Gestión de documentos", "Paquetería ligera", "Prueba de entrega digital"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "reservas",
    icon: <Calendar className="w-5 h-5" />,
    title: "Reservas",
    description: "Planifica tus traslados con antelación y asegura tu transporte.",
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
            Todo lo que necesitas para <br /> <span className="text-red-600">moverte por la ciudad</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Desde viajes rápidos hasta soluciones para empresas. UbiGo! es la plataforma de movilidad líder en dos ruedas.
          </motion.p>
        </div>

        <Tabs defaultValue="envios" className="w-full">
          <div className="flex justify-center mb-12">
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
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        <Star size={14} fill="currentColor" />
                        Servicio Premium
                      </div>
                    </div>
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
                      Comenzar ahora
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

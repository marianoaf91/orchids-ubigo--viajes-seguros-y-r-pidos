"use client"

import * as React from "react"
import { ShieldCheck, CreditCard, Lock, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function UbiGoFooter() {
  return (
    <footer id="contacto" className="bg-black text-white pt-24 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-20">
          {/* Contact Section */}
            <div>
              <h2 className="text-4xl font-black mb-6">Contacta con <span className="text-red-600">Nosotros</span></h2>
                  <div className="mb-10 group">
                      <p className="text-zinc-400 leading-relaxed mb-4">
                        ¿Tienes alguna duda o necesitas ayuda con un viaje? Nuestro equipo garantiza un compromiso 24 horas.
                      </p>
                    <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                      <span className="text-red-600 font-black italic text-sm tracking-widest">SIEMPRE EN MOVIMIENTO</span>
                    </div>
                  </div>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-red-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Llámanos</p>
                  <p className="font-bold">+1 800 UBIGO 00</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-red-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">Email</p>
                    <p className="font-bold">ubigo.madrid@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                <Instagram size={20} />
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                <Twitter size={20} />
              </Button>
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors">
                <Facebook size={20} />
              </Button>
            </div>
          </div>

            {/* Form Section */}
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Nombre" className="bg-black border-zinc-700 h-14 rounded-xl focus:ring-red-600" />
                <Input placeholder="Email" className="bg-black border-zinc-700 h-14 rounded-xl focus:ring-red-600" />
              </div>
              <Input placeholder="Asunto" className="bg-black border-zinc-700 h-14 rounded-xl mb-4 focus:ring-red-600" />
              <Textarea placeholder="Tu mensaje..." className="bg-black border-zinc-700 min-h-[150px] rounded-xl mb-6 focus:ring-red-600" />
              <Button className="w-full h-14 bg-red-600 hover:bg-red-700 font-bold text-lg rounded-xl transition-all">
                Enviar Mensaje
              </Button>
            </div>
          </div>

          {/* Payment Security Section */}
        <div className="py-12 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="text-red-600" />
              <span className="text-sm font-medium">Pago 100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Lock className="text-red-600" />
              <span className="text-sm font-medium">Encriptación SSL</span>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-50">
            <CreditCard size={32} />
            <span className="text-xl font-bold tracking-widest italic">VISA</span>
            <span className="text-xl font-bold tracking-widest italic">MASTER</span>
            <span className="text-xl font-bold tracking-widest italic">AMEX</span>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-zinc-800 text-zinc-600 text-sm">
          <p>© 2026 UbiGo! Inc. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

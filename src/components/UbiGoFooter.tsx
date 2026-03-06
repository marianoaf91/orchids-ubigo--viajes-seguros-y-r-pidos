"use client"

import * as React from "react"
import { ShieldCheck, CreditCard, Lock, Phone, Mail } from "lucide-react"

const chatMessages = [
  { from: "user", name: "Laura M.", time: "10:42", text: "Hola, reservé un viaje para las 9:00 pero necesito cambiarlo a las 9:30. ¿Es posible?" },
  { from: "agent", name: "UbiGo Soporte", time: "10:43", text: "¡Hola Laura! Por supuesto, sin problema. He actualizado tu reserva al martes 7 de marzo a las 9:30. Tu conductor Carlos estará puntual. ¿Necesitas algo más?" },
  { from: "user", name: "Laura M.", time: "10:44", text: "Perfecto, muchas gracias. ¿El precio varía?" },
  { from: "agent", name: "UbiGo Soporte", time: "10:44", text: "No, el precio se mantiene igual: 8,40 €. Recibirás un recordatorio 15 minutos antes de la recogida. ¡Buen viaje! 🏍️" },
]

export function UbiGoFooter() {
  return (
    <footer id="contacto" className="bg-black text-white pt-24 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl font-black mb-6">Contacta con <span className="text-red-600">Nosotros</span></h2>
            <div className="mb-8">
              <p className="text-zinc-400 leading-relaxed mb-4">
                ¿Tienes alguna duda o necesitas ayuda con un viaje? Nuestro equipo garantiza un compromiso 24 horas.
              </p>
              <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-red-600 font-black italic text-sm tracking-widest">SIEMPRE EN MOVIMIENTO</span>
              </div>
            </div>

            <div className="space-y-5">
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
          </div>

          {/* Chat de ejemplo */}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">Ejemplo de atención al cliente</p>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              {/* Header del chat */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800 bg-zinc-900">
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-sm">U</div>
                <div>
                  <p className="text-white font-bold text-sm">UbiGo Soporte</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <p className="text-green-500 text-xs font-medium">En línea ahora</p>
                  </div>
                </div>
              </div>
              {/* Mensajes */}
              <div className="p-5 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black
                      ${msg.from === "user" ? "bg-zinc-700 text-zinc-300" : "bg-red-600 text-white"}`}>
                      {msg.from === "user" ? "L" : "U"}
                    </div>
                    <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                        ${msg.from === "user"
                          ? "bg-zinc-700 text-zinc-100 rounded-tr-sm"
                          : "bg-red-600/15 border border-red-600/20 text-zinc-200 rounded-tl-sm"}`}>
                        {msg.text}
                      </div>
                      <span className="text-zinc-600 text-[10px] px-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Input decorativo */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-700">
                  <p className="text-zinc-500 text-sm flex-1">Escribe tu mensaje...</p>
                  <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

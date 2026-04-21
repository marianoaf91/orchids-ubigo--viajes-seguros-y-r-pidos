"use client"

import * as React from "react"
import { ShieldCheck, Lock, Phone, Mail, MapPin } from "lucide-react"

export function UbiGoFooter() {
  return (
    <footer id="contacto" className="bg-zinc-950 text-white border-t border-white/5">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-2xl font-black tracking-tighter">Ubi<span className="text-red-500">Go!</span></span>
            <p className="text-zinc-500 text-sm leading-relaxed mt-3 mb-6 max-w-xs">
              La forma más segura y puntual de moverte por Madrid. Especialistas en reservas de transporte de personas.
            </p>
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-[11px] font-bold uppercase tracking-widest">Disponible 24h</span>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-8 tracking-tight">
              Contacta con <span className="text-red-500">Nosotros</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: <Phone size={18} />, label: "Llámanos", value: "+34 910 123 456" },
                { icon: <Mail size={18} />, label: "Email", value: "ubigo.madrid@gmail.com" },
                { icon: <MapPin size={18} />, label: "Ciudad", value: "Madrid, España" },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-start gap-3 bg-zinc-900/50 border border-white/5 rounded-2xl p-4 hover:border-red-500/20 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 group-hover:bg-red-600/20 transition-colors mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <ShieldCheck size={14} className="text-red-500" />
              Pago 100% seguro
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Lock size={14} className="text-red-500" />
              Encriptación SSL
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-700 text-xs font-bold tracking-widest">
            <span className="italic">VISA</span>
            <span className="italic">MASTERCARD</span>
            <span className="italic">AMEX</span>
          </div>
          <p className="text-zinc-700 text-xs">© 2026 UbiGo! Inc.</p>
        </div>
      </div>

    </footer>
  )
}

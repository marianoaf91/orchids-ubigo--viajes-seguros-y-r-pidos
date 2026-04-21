"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function UbiGoNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-black/90 backdrop-blur-md border-b border-white/5 shadow-[0_2px_40px_rgba(0,0,0,0.6)]"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[1.75rem] font-black tracking-tighter text-white leading-none">
              Ubi<span className="text-red-500">Go!</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.18em]">
            {[["#pide-tu-viaje","PIDE TU VIAJE"],["#precios","PRECIOS"],["#contacto","CONTACTO"]].map(([href, label]) => (
              <Link key={href} href={href}
                className="relative text-zinc-400 hover:text-white transition-colors duration-200 group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost"
                className="text-zinc-300 hover:text-white hover:bg-white/5 font-bold text-[11px] tracking-widest h-9 px-4 rounded-lg transition-all">
                INICIAR SESIÓN
              </Button>
            </Link>
            <Link href="/registro">
              <Button className="bg-red-600 hover:bg-red-500 text-white rounded-full px-6 h-9 font-bold text-[11px] tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_28px_rgba(220,38,38,0.55)] transition-all">
                Registrarse
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-1">
              {[["#pide-tu-viaje","Pide tu viaje"],["#precios","Precios"],["#contacto","Contacto"]].map(([href, label]) => (
                <Link key={href} href={href}
                  className="flex items-center justify-between px-4 py-3.5 text-base font-semibold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}>
                  {label}
                  <span className="text-zinc-700 text-lg">›</span>
                </Link>
              ))}
              <div className="pt-3 grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline"
                    className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white font-bold h-11 rounded-xl text-sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/registro" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold h-11 rounded-xl text-sm shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

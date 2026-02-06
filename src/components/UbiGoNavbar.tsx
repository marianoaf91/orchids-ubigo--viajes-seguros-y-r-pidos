"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function UbiGoNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-3xl font-black tracking-tighter text-white">
                  Ubi<span className="text-red-600">Go!</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest">
              <Link href="#servicios" className="text-zinc-400 hover:text-white transition-colors">
                SERVICIOS
              </Link>
              <Link href="#precios" className="text-zinc-400 hover:text-white transition-colors">
                PRECIOS
              </Link>
              <Link href="#contacto" className="text-zinc-400 hover:text-white transition-colors">
                CONTACTO
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">

            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-red-500 hover:bg-transparent font-bold">
                INICIO DE SESIÓN
              </Button>
            </Link>
            <Link href="/registro">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 font-bold">
                Registrarse
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
                <Link
                  href="#servicios"
                  className="block px-3 py-4 text-xl font-bold text-zinc-400 hover:text-white border-b border-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  SERVICIOS
                </Link>
                <Link
                  href="#precios"
                  className="block px-3 py-4 text-xl font-bold text-zinc-400 hover:text-white border-b border-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  PRECIOS
                </Link>
                <Link
                  href="#contacto"
                  className="block px-3 py-4 text-xl font-bold text-zinc-400 hover:text-white border-b border-zinc-800"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACTO
                </Link>
                <div className="pt-4 space-y-2">

                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-zinc-700 text-white py-6 text-xl font-bold hover:bg-zinc-800">
                    INICIO DE SESIÓN
                  </Button>
                </Link>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-xl font-bold" onClick={() => setIsOpen(false)}>
                  Registrarse
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

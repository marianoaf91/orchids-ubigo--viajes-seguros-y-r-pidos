"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Bike, Calendar, DollarSign, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-red-500 flex items-center gap-1 transition-colors font-medium outline-none">
                Servicios <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-zinc-800 text-white min-w-[200px]">
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer flex gap-2">
                  <Bike size={18} className="text-red-600" /> Viajes en moto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer flex gap-2">
                  <MapPin size={18} className="text-red-600" /> Solicitar una moto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer flex gap-2">
                  <Calendar size={18} className="text-red-600" /> Reservar una moto
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer flex gap-2">
                  <DollarSign size={18} className="text-red-600" /> Ver tarifas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#precios" className="text-white hover:text-red-500 transition-colors font-medium">Precios</Link>
            <Link href="#contacto" className="text-white hover:text-red-500 transition-colors font-medium">Contacto</Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-red-500 hover:bg-transparent font-bold">
                INICIO DE SESIÓN
              </Button>
            </Link>
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 font-bold">
              Registrarse
            </Button>
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
              <Link href="#" className="block px-3 py-4 text-lg font-medium text-white border-b border-zinc-800">Viajes en moto</Link>
              <Link href="#" className="block px-3 py-4 text-lg font-medium text-white border-b border-zinc-800">Solicitar una moto</Link>
              <Link href="#" className="block px-3 py-4 text-lg font-medium text-white border-b border-zinc-800">Reservar una moto</Link>
              <Link href="#" className="block px-3 py-4 text-lg font-medium text-white border-b border-zinc-800">Tarifas</Link>
              <Link href="#contacto" className="block px-3 py-4 text-lg font-medium text-white">Contacto</Link>
              <div className="pt-4 space-y-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full border-zinc-700 text-white py-6 text-xl font-bold hover:bg-zinc-800">
                    INICIO DE SESIÓN
                  </Button>
                </Link>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-xl font-bold">
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

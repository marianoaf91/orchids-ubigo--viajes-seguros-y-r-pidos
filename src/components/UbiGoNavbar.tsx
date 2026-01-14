"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Bike, Calendar, DollarSign, MapPin, ShieldCheck, Phone, ChevronDown } from "lucide-react"

// ... inside UbiGoNavbar ...
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
// ... mobile menu ...
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800"
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

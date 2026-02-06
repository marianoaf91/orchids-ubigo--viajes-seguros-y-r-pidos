"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistroPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-red-600 selection:text-white">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" className="text-zinc-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver al inicio
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl font-black tracking-tighter text-white">
            Ubi<span className="text-red-600">Go!</span>
          </span>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
            <CardDescription className="text-zinc-400">
              Regístrate para empezar a reservar tus viajes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  type="text"
                  placeholder="Tus apellidos"
                  className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+34 600 000 000"
                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                className="bg-zinc-950 border-zinc-800 text-white focus:border-red-600 focus:ring-red-600"
              />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11">
              Crear cuenta
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">O regístrate con</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800">
                Google
              </Button>
              <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800">
                Apple
              </Button>
            </div>
            <p className="text-center text-sm text-zinc-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-red-500 hover:text-red-400 font-medium">
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

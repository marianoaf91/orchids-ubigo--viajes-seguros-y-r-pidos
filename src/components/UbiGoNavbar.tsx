"use client"

import * as React from "react"
import Link from "next/link"

export function UbiGoNavbar() {
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
        </div>
      </div>
    </nav>
  )
}

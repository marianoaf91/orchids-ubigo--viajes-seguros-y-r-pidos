import { UbiGoNavbar } from "@/components/UbiGoNavbar"
import { UbiGoHero } from "@/components/UbiGoHero"
import { UbiGoServices } from "@/components/UbiGoServices"
import { UbiGoPricing } from "@/components/UbiGoPricing"
import { UbiGoFooter } from "@/components/UbiGoFooter"

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-red-600 selection:text-white">
      <UbiGoNavbar />
      <UbiGoHero />
      <UbiGoServices />
      <UbiGoPricing />
      <UbiGoFooter />
    </main>
  )
}

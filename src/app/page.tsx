"use client"

import CardSection from "@/components/CardSelection/page"
import Heading from "@/components/Heading/page"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div>
        <Heading heading="Stripe Demo"/>
      <CardSection />
      </div>
     
    </main>
  )
}

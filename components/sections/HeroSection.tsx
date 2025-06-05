"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronDown, Shield, TrendingUp } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function HeroSection() {

  const headlines = [
    "Investissez sereinement,",
    "Optimisez votre patrimoine,",
    "Développez votre capital,",
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % headlines.length), 3500)
    return () => clearInterval(t)
  }, [])


  const goPortfolio = () =>
      document.getElementById("biens")?.scrollIntoView({ behavior: "smooth" })

  return (
      <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <Image
              src="/paris.jpg"
              alt="Vue aérienne de Paris"
              fill
              priority
              className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>


        <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl animate-pulse [animation-duration:8s]" />
        <div className="pointer-events-none absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl animate-pulse [animation-duration:12s]" />


        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-20"
        >

          <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
          >
            <Image
                src="/logo.png"
                alt="LAG Holding"
                width={140}
                height={70}
                className="mx-auto drop-shadow-2xl"
                priority
            />
          </motion.div>


          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Badge className="mb-6 bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-sm font-medium text-white shadow-xl border-0 rounded-full">
              <Shield className="w-3 h-3 mr-1.5" />
              Partenaire de confiance des investisseurs exigeants
            </Badge>
          </motion.div>


          <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent inline-block">
              {headlines[index]}
            </span>
            <br />
            <span className="text-white drop-shadow-lg">
              grâce à l'immobilier premium
            </span>
          </motion.h1>


          <motion.p
              className="mx-auto mt-4 max-w-xl text-base md:text-lg text-slate-200 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
          >
            De la sélection du bien à la gestion locative complète, votre conseiller indépendant vous accompagne pour optimiser votre patrimoine immobilier.
          </motion.p>


          <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
          >
            <Button
                size="default"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 font-semibold rounded-full shadow-2xl border-0 transition-all duration-300 hover:scale-105"
                onClick={goPortfolio}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Découvrir nos opportunités
            </Button>
            <Button
                size="default"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-6 py-2.5 font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
            >
              Prendre contact
            </Button>
          </motion.div>


          <motion.div
              className="mt-10 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              ["12 ans d'expertise", Shield],
              ["4,9/5 satisfaction", Check],
            ].map(([title, Icon]) => (
                <div key={title} className="flex items-center gap-2 text-sm text-white/90">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span>{title}</span>
                </div>
            ))}
          </motion.div>

          <motion.button
              onClick={goPortfolio}
              className="mt-16 text-white/70 hover:text-emerald-400 transition-colors duration-300 mx-auto block"
              aria-label="Découvrir nos services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Découvrir</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </div>
          </motion.button>
        </motion.div>

        <motion.button
            onClick={goPortfolio}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-emerald-400 transition-colors duration-300"
            aria-label="Scroll vers le bas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.button>
      </section>
  )
}
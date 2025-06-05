"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Directrice Patrimoine",
    company: "Groupe Financier",
    quote: "LAG Holding a structuré notre stratégie d'investissement avec une expertise remarquable. Rendement net de 7.2% en 18 mois.",
    result: "+7.2% rendement"
  },
  {
    name: "Thomas Martin",
    role: "Directeur Général",
    company: "Martin & Associés",
    quote: "12 acquisitions stratégiques avec un taux de vacance nul. Leur approche méthodique nous a fait gagner un temps précieux.",
    result: "12 acquisitions"
  },
  {
    name: "Sophie Laurent",
    role: "Responsable Investissements",
    company: "Banque Régionale",
    quote: "Optimisation fiscale exceptionnelle : économies d'impôts doublées tout en sécurisant nos investissements long terme.",
    result: "×2 économies fiscales"
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[hsl(var(--brand))]/20 text-[hsl(var(--brand-light))] px-4 py-1 rounded-full border border-[hsl(var(--brand))]/30">
              Témoignages
            </Badge>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-white">
              La confiance de nos clients
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="text-center">
                  <blockquote className="text-lg text-slate-700 mb-6 italic leading-relaxed">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[hsl(var(--brand))] fill-current" />
                    ))}
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">{currentTestimonial.name}</p>
                    <p className="text-sm text-slate-600">{currentTestimonial.role}</p>
                    <p className="text-xs text-slate-500">{currentTestimonial.company}</p>

                    <div className="mt-3">
                      <Badge className="bg-[hsl(var(--brand))]/10 text-[hsl(var(--brand))] px-3 py-1">
                        {currentTestimonial.result}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8">
              <button
                  onClick={goToPrevious}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                  aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentIndex ? 'bg-[hsl(var(--brand))] w-6' : 'bg-white/40'
                        }`}
                    />
                ))}
              </div>

              <button
                  onClick={goToNext}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 text-white transition-all"
                  aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import LazyImage from "@/components/ui/LazyImage"
import {
  CheckCircle2,
  ArrowRight,
  Eye,
  Star,
  TrendingUp,
  Shield,
  Users
} from "lucide-react"
import {
  useFeaturedServices
} from "@/lib/hooks/useServices"
import {
  getMainServiceImage,
  formatServicePrice
} from "@/lib/types/service"


export default function ServicesSection() {
  const { services, loading, error } = useFeaturedServices(4)
  const router = useRouter()

  const handleServiceClick = (service: any) => {
    router.push(`/services/${service.id}`)
  }

  const handleServiceInteraction = (service: any, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/contact?service=${service.id}`)
  }

  if (loading || error || !services.length) return null

  return (
      <section id="services" className="section-padding bg-gradient-to-br from-slate-50 to-white">
        <div className="section-container">

          <header className="mb-20 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[hsl(var(--brand))] text-white px-8 py-3 rounded-full shadow-lg mb-6 text-base font-medium">
                Expertise Professionnelle 360°
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Services d'Excellence pour Votre Réussite Immobilière
              </h2>

              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Notre gamme complète de services professionnels vous accompagne à chaque étape de votre parcours
                d'investissement immobilier, de la stratégie fiscale à la gestion patrimoniale.
              </p>
            </motion.div>
          </header>


          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {services.map((service, index) => (
                <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group relative h-[590px] overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl cursor-pointer border border-slate-100 transition-all duration-500 flex flex-col"
                    onClick={() => handleServiceClick(service)}
                >

                  <motion.div
                      whileHover={{
                        scale: 1.03,
                        rotateX: 5,
                        rotateY: -5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                      className="h-full rounded-2xl overflow-hidden flex flex-col"
                      style={{ perspective: 1000 }}
                  >

                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <LazyImage
                          src={getMainServiceImage(service.images)}
                          alt={service.title}
                          width={400}
                          height={240}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-115"
                      />


                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand))]/20 via-transparent to-transparent" />


                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                      <span className="text-lg font-bold text-[hsl(var(--brand))]">
                        {formatServicePrice(service.price)}
                      </span>
                        </div>
                      </div>
                    </div>


                    <div className="flex-1 flex flex-col p-6">

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[hsl(var(--brand))] transition-colors leading-tight">
                          {service.title}
                        </h3>

                        <p className="text-slate-600 line-clamp-3 leading-relaxed mb-4 text-sm flex-shrink-0">
                          {service.shortDescription || service.description}
                        </p>


                        <div className="flex-1">
                          {service.characteristics && service.characteristics.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                  {service.characteristics.slice(0, 2).map((feature, idx) => (
                                      <Badge
                                          key={idx}
                                          variant="outline"
                                          className="text-xs bg-[hsl(var(--brand-accent))]/10 text-[hsl(var(--brand))] border-[hsl(var(--brand-light))] px-2 py-1"
                                      >
                                        {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
                                      </Badge>
                                  ))}
                                  {service.characteristics.length > 2 && (
                                      <Badge
                                          variant="outline"
                                          className="text-xs bg-slate-50 text-slate-600 border-slate-200 px-2 py-1"
                                      >
                                        +{service.characteristics.length - 2}
                                      </Badge>
                                  )}
                                </div>
                              </div>
                          )}
                        </div>
                      </div>


                      <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
                        <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-slate-200 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-light))]/10 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleServiceClick(service)
                            }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
            ))}
          </div>
        </div>
      </section>
  )
}
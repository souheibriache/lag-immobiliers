"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Plane,
  Eye,
  Heart,
} from "lucide-react"
import {
  useFeaturedProperties,
  usePropertyInteractions,
} from "@/lib/hooks/useProperties"
import {
  formatPrice,
  getMainImage,
  getPropertyArea,
  getPropertyBeds,
  getPropertyBaths,
  getShortAddress,
  getPropertyType,
} from "@/lib/types/property"
import LazyImage from "@/components/ui/LazyImage"
import InterestForm from "@/components/forms/InterestForm"
import GenericInterestForm, { createRequestConfig, RequestConfig } from "@/components/forms/InterestForm"


const getPropertyDetails = (property: any) => {
  const beds = getPropertyBeds(property?.characteristics)
  const baths = getPropertyBaths(property?.characteristics)
  const area = getPropertyArea(property?.characteristics)
  const type = getPropertyType(property?.characteristics)

  return {
    beds: beds && beds > 0 ? beds.toString() : null,
    baths: baths && baths > 0 ? baths.toString() : null,
    area: area && area > 0 ? `${area} m²` : null,
    type: type || "Bien immobilier",
    hasBasicInfo: beds || baths || area
  }
}


function PropertyCard({
                        property,
                        isActive,
                        slideWidth,
                        onViewDetails,
                        onExpressInterest
                      }: {
  property: any
  isActive: boolean
  slideWidth: number
  onViewDetails: () => void
  onExpressInterest: (e: React.MouseEvent) => void
}) {
  const details = getPropertyDetails(property)
  const mainImage = getMainImage(property.images)
  const shortAddress = getShortAddress(property)

  return (
      <motion.li
          className="relative shrink-0"
          style={{ width: slideWidth }}
          initial={{ opacity: 0.4, scale: 0.88 }}
          animate={{
            opacity: isActive ? 1 : 0.6,
            scale: isActive ? 1 : 0.92
          }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
      >
        <article
            className="group relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-[hsl(var(--brand))] focus:outline-none cursor-pointer"
            onClick={onViewDetails}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onViewDetails()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Voir les détails de ${property.title}`}
        >


          <div className="relative h-64 overflow-hidden">
            <LazyImage
                src={mainImage}
                alt={property.title}
                width={slideWidth}
                height={256}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-slate-800 font-medium shadow-sm">
                {details.type}
              </Badge>
            </div>


            {property.isFeatured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[hsl(var(--brand))] text-white font-medium shadow-sm">
                    <Star className="w-3 h-3 mr-1" />
                    En vedette
                  </Badge>
                </div>
            )}
          </div>


          <div className="relative p-6">


            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 leading-tight line-clamp-2 mb-2 group-hover:text-[hsl(var(--brand))] transition-colors">
                {property.title}
              </h3>

              {shortAddress && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm truncate">{shortAddress}</span>
                  </div>
              )}
            </div>


            <div className="mb-4">
            <span className="text-2xl font-bold text-[hsl(var(--brand))]">
              {formatPrice(property)}
            </span>
            </div>


            {details.hasBasicInfo && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm">
                    {details.beds && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Bed size={16} className="text-slate-400" />
                          <span>{details.beds} ch.</span>
                        </div>
                    )}

                    {details.baths && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Bath size={16} className="text-slate-400" />
                          <span>{details.baths} sdb.</span>
                        </div>
                    )}

                    {details.area && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Square size={16} className="text-slate-400" />
                          <span>{details.area}</span>
                        </div>
                    )}
                  </div>
                </div>
            )}


            <div className="flex gap-3 relative z-10">
              <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-slate-200 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onViewDetails()
                  }}
              >
                <Eye className="w-4 h-4 mr-1" />
                Voir
              </Button>

              <Button
                  size="sm"
                  className="flex-1 bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onExpressInterest(e)
                  }}
              >
                <Heart className="w-4 h-4 mr-1" />
                Intéressé
              </Button>
            </div>
          </div>
        </article>
      </motion.li>
  )
}


export default function PropertiesSection() {
  const { properties, loading, error } = useFeaturedProperties(10)
  const { expressInterest } = usePropertyInteractions()
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [formError, setFormError] = useState<any>(null)
  const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(null)

  const router = useRouter()
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const slideW = 380
  const gap = 24
  const visible = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 1

  useEffect(() => {
    if (!properties.length) return
    const id = setInterval(() => setIndex((i) => (i + 1) % properties.length), 5000)
    return () => clearInterval(id)
  }, [properties.length])

  useEffect(() => {
    if (!trackRef.current) return
    trackRef.current.scrollTo({
      left: (slideW + gap) * index,
      behavior: "smooth",
    })
  }, [index])

  const pos = useMotionValue(0)
  const rotate = useTransform(pos, [-200, 200], [-6, 6])

  const handleFormError = (error: any) => {
    setFormError(error)
  }

  const handleFormSuccess = () => {
    setFormError(null)
    setSelectedProperty(null)
  }

  const handlePropertyInterest = (property: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProperty(property)
    setFormError(null)
    const config = createRequestConfig('property', property.id)
    setRequestConfig(config)
  }

  const handleViewProperty = (property: any) => {
    router.push(`/biens/${property.id}`)
  }

  if (loading) {
    return (
        <section id="biens" className="section-padding bg-slate-50">
          <div className="section-container">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-96 mx-auto mb-12"></div>
              <div className="flex gap-6 justify-center">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-80 h-96 bg-slate-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
    )
  }

  if (error || !properties.length) return null

  return (
      <section id="biens" className="section-padding bg-slate-50">
        <div className="section-container">
          <header className="mb-16 text-center">
            <Badge className="bg-[hsl(var(--brand))] text-white px-6 py-2 rounded-full shadow mb-4">
              Opportunités à saisir
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Biens prêts à performer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des actifs triés sur le volet pour rentabilité immédiate et plus‑value long terme.
            </p>
          </header>

          <div className="relative">
            <motion.ul
                ref={trackRef}
                className="flex cursor-grab overflow-hidden"
                style={{ gap, x: pos }}
                drag="x"
                dragElastic={0.15}
                dragConstraints={{
                  left: -((slideW + gap) * (properties.length - visible)),
                  right: 0
                }}
            >
              {properties.map((property, i) => (
                  <PropertyCard
                      key={property.id}
                      property={property}
                      isActive={i === index}
                      slideWidth={slideW}
                      onViewDetails={() => handleViewProperty(property)}
                      onExpressInterest={(e) => handlePropertyInterest(property, e)}
                  />
              ))}
            </motion.ul>


            <button
                aria-label="Bien précédent"
                onClick={() => setIndex((i) => (i - 1 + properties.length) % properties.length)}
                className="absolute -left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 lg:flex transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>

            <button
                aria-label="Bien suivant"
                onClick={() => setIndex((i) => (i + 1) % properties.length)}
                className="absolute -right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 lg:flex transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>


            <div className="mt-12 flex justify-center gap-3">
              {properties.map((_, b) => (
                  <button
                      key={b}
                      onClick={() => setIndex(b)}
                      aria-label={`Aller au bien ${b + 1}`}
                      className={`h-3 w-3 rounded-full transition-all duration-200 ${
                          b === index
                              ? "bg-[hsl(var(--brand))] scale-125 shadow-sm"
                              : "bg-slate-300 hover:bg-slate-400"
                      }`}
                  />
              ))}
            </div>
          </div>


          <div className="mt-16 text-center">
            <Button
                size="lg"
                className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push("/biens")}
            >
              Voir tout le catalogue
              <Plane className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>


        <Dialog
            open={!!selectedProperty && !!requestConfig}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedProperty(null)
                setFormError(null)
                setRequestConfig(null)
              }
            }}
        >
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white border shadow-2xl">
            <DialogHeader>
              <DialogTitle>
                {requestConfig?.titleText || "Manifester mon intérêt"}
              </DialogTitle>
              <DialogDescription>
                Remplissez ce formulaire pour recevoir plus d'informations sur ce bien immobilier.
              </DialogDescription>
            </DialogHeader>

            {selectedProperty && requestConfig && (
                <GenericInterestForm
                    config={requestConfig}
                    onSuccess={handleFormSuccess}
                    onError={handleFormError}
                />
            )}
          </DialogContent>
        </Dialog>
      </section>
  )
}
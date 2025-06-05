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

/**
 * Enhanced property data extraction with fallbacks
 */
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

/**
 * Enhanced Property Card Component with better highlighting
 */
function PropertyCard({
                        property,
                        isActive,
                        isCenter,
                        slideWidth,
                        onViewDetails,
                        onExpressInterest
                      }: {
  property: any
  isActive: boolean
  isCenter: boolean
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
          initial={{ opacity: 0.5, scale: 0.85 }}
          animate={{
            opacity: isCenter ? 1 : 0.7,
            scale: isCenter ? 1 : 0.9,
            y: isCenter ? 0 : 10
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <article className={`group relative rounded-2xl overflow-hidden bg-white transition-all duration-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
            isCenter
                ? "shadow-2xl hover:shadow-3xl transform-gpu"
                : "shadow-lg hover:shadow-xl"
        }`}>

          {/* Click Handler for Card */}
          <div
              className="absolute inset-0 cursor-pointer"
              style={{ zIndex: 1 }}
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
          />

          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <LazyImage
                src={mainImage}
                alt={property.title}
                width={slideWidth}
                height={256}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Enhanced Overlay Gradients */}
            <div className={`absolute inset-0 transition-all duration-500 ${
                isCenter
                    ? "bg-gradient-to-t from-black/70 via-transparent to-black/30"
                    : "bg-gradient-to-t from-black/60 via-transparent to-black/20"
            }`} />

            {/* Active indicator for center item */}
            {isCenter && (
                <div className="absolute top-4 left-4" style={{ zIndex: 4 }}>
                  <Badge className="bg-emerald-600 text-white font-medium shadow-lg animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    À la une
                  </Badge>
                </div>
            )}

            {/* Property Type Badge */}
            <div className={`absolute top-4 ${isCenter ? 'right-4' : 'left-4'}`} style={{ zIndex: 3 }}>
              <Badge className="bg-white/90 text-slate-800 font-medium shadow-sm">
                {details.type}
              </Badge>
            </div>

            {/* Featured Badge */}
            {property.isFeatured && !isCenter && (
                <div className="absolute top-4 right-4" style={{ zIndex: 3 }}>
                  <Badge className="bg-emerald-600 text-white font-medium shadow-sm">
                    <Star className="w-3 h-3 mr-1" />
                    En vedette
                  </Badge>
                </div>
            )}
          </div>

          {/* Content Container */}
          <div className="relative p-6">

            {/* Title and Location */}
            <div className="mb-4">
              <h3 className={`font-semibold text-slate-900 leading-tight line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors ${
                  isCenter ? "text-xl" : "text-lg"
              }`}>
                {property.title}
              </h3>

              {shortAddress && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm truncate">{shortAddress}</span>
                  </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
            <span className={`font-bold text-emerald-600 ${
                isCenter ? "text-3xl" : "text-2xl"
            }`}>
              {formatPrice(property)}
            </span>
            </div>

            {/* Property Details */}
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

            {/* Action Buttons with proper event handling */}
            <div className="flex gap-3 relative z-20">
              <Button
                  size={isCenter ? "default" : "sm"}
                  variant="outline"
                  className="flex-1 border-slate-200 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onViewDetails()
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
              >
                <Eye className="w-4 h-4 mr-1" />
                Voir
              </Button>

              <Button
                  size={isCenter ? "default" : "sm"}
                  className="flex-1 bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onExpressInterest(e)
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
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

/**
 * Enhanced Properties Carousel Component with proper centering
 */
export default function PropertiesSection() {
  const { properties, loading, error } = useFeaturedProperties(10)
  const { expressInterest } = usePropertyInteractions()
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [formError, setFormError] = useState<any>(null)
  const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(null)

  const router = useRouter()
  const trackRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const slideW = 380
  const gap = 24

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!properties.length) return
    const id = setInterval(() => setIndex((i) => (i + 1) % properties.length), 6000)
    return () => clearInterval(id)
  }, [properties.length])

  // Center the active item
  useEffect(() => {
    if (!trackRef.current || !containerWidth) return

    const centerOffset = (containerWidth - slideW) / 2
    const scrollPosition = (slideW + gap) * index - centerOffset

    trackRef.current.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    })
  }, [index, containerWidth, slideW, gap])

  const pos = useMotionValue(0)

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

  const navigateToIndex = (newIndex: number) => {
    setIndex(Math.max(0, Math.min(newIndex, properties.length - 1)))
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
            <Badge className="bg-emerald-600 text-white px-6 py-2 rounded-full shadow mb-4">
              Opportunités sélectionnées
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Biens à fort potentiel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sélection rigoureuse d'investissements immobiliers pour rentabilité optimale et croissance patrimoniale.
            </p>
          </header>

          <div className="relative" ref={containerRef}>
            <motion.ul
                ref={trackRef}
                className="flex cursor-grab overflow-hidden"
                style={{ gap, x: pos }}
                drag="x"
                dragElastic={0.15}
                onDrag={(_, info) => {
                  const offset = info.offset.x
                  if (Math.abs(offset) > 100) {
                    if (offset > 0 && index > 0) {
                      navigateToIndex(index - 1)
                    } else if (offset < 0 && index < properties.length - 1) {
                      navigateToIndex(index + 1)
                    }
                  }
                }}
            >
              {properties.map((property, i) => (
                  <PropertyCard
                      key={property.id}
                      property={property}
                      isActive={i === index}
                      isCenter={i === index}
                      slideWidth={slideW}
                      onViewDetails={() => handleViewProperty(property)}
                      onExpressInterest={(e) => handlePropertyInterest(property, e)}
                  />
              ))}
            </motion.ul>

            {/* Navigation Arrows */}
            <button
                aria-label="Bien précédent"
                onClick={() => navigateToIndex(index - 1)}
                disabled={index === 0}
                className="absolute -left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 lg:flex transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-slate-700" />
            </button>

            <button
                aria-label="Bien suivant"
                onClick={() => navigateToIndex(index + 1)}
                disabled={index === properties.length - 1}
                className="absolute -right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 lg:flex transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-slate-700" />
            </button>

            {/* Enhanced Dot Indicators */}
            <div className="mt-12 flex justify-center gap-3">
              {properties.map((_, b) => (
                  <button
                      key={b}
                      onClick={() => setIndex(b)}
                      aria-label={`Aller au bien ${b + 1}`}
                      className={`h-3 transition-all duration-300 rounded-full ${
                          b === index
                              ? "w-8 bg-emerald-600 shadow-lg"
                              : "w-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                  />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push("/biens")}
            >
              Voir toutes les opportunités
              <Plane className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Interest Form Modal */}
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
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Bed,
    Bath,
    Square,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Share2,
    AlertCircle,
    ArrowLeft,
    Calendar,
    Phone,
    Mail,
    CheckCircle,
    ExternalLink,
    ImageIcon,
    Maximize2,
    Download,
    Heart,
} from "lucide-react"

import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"
import LazyImage from "@/components/ui/LazyImage"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import GenericInterestForm, { createRequestConfig, RequestConfig } from "@/components/forms/InterestForm"
import { useProperty } from "@/lib/hooks/useProperties"
import {
    formatPrice,
    formatCharges,
    formatDeposit,
    formatApplicationFees,
    formatTotalMonthlyCost,
    getShortAddress,
    getFullAddress,
    getMainImage,
    getAllImages,
    getPropertyBeds,
    getPropertyBaths,
    getPropertyArea,
    getPropertyType,
    getCharacteristicsMap,
} from "@/lib/types/property"
import type { Property } from "@/lib/types/property"

interface PropertyDetailPageProps {}

export default function PropertyDetailPage({}: PropertyDetailPageProps) {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter()
    const { toast } = useToast()

    const { property, loading, error, refetch } = useProperty(slug)

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showInterestForm, setShowInterestForm] = useState(false)
    const [showImageLightbox, setShowImageLightbox] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [formError, setFormError] = useState<any>(null)
    const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(null)

    const propertyData = useMemo(() => {
        if (!property) return null

        return {
            allImages: getAllImages(property.images),
            beds: getPropertyBeds(property.characteristics),
            baths: getPropertyBaths(property.characteristics),
            area: getPropertyArea(property.characteristics),
            type: getPropertyType(property.characteristics),
            characteristics: getCharacteristicsMap(property.characteristics),
            shortAddress: getShortAddress(property),
            fullAddress: getFullAddress(property),
            mainImage: getMainImage(property.images),
        }
    }, [property])

    useEffect(() => {
        if (property?.id) {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
            setIsFavorite(favorites.includes(property.id))
        }
    }, [property?.id])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!propertyData?.allImages.length) return

            if (e.key === "ArrowLeft") {
                e.preventDefault()
                navigateCarousel("prev")
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                navigateCarousel("next")
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [propertyData?.allImages.length])

    const navigateCarousel = useCallback((direction: "next" | "prev") => {
        if (!propertyData?.allImages.length) return

        setCurrentImageIndex(current => {
            if (direction === "next") {
                return (current + 1) % propertyData.allImages.length
            } else {
                return (current - 1 + propertyData.allImages.length) % propertyData.allImages.length
            }
        })
    }, [propertyData?.allImages.length])

    const handleShare = useCallback(async () => {
        if (!property) return

        const shareData = {
            title: property.title,
            text: `Découvrez ce bien: ${property.title}`,
            url: window.location.href,
        }

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(window.location.href)
                toast({
                    description: "Lien copié dans le presse-papiers",
                })
            }
        } catch (error) {
            console.error("Error sharing:", error)
        }
    }, [property, toast])

    const toggleFavorite = useCallback(() => {
        if (!property) return

        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        const newFavorites = isFavorite
            ? favorites.filter((id: string) => id !== property.id)
            : [...favorites, property.id]

        localStorage.setItem("favorites", JSON.stringify(newFavorites))
        setIsFavorite(!isFavorite)

    }, [property, isFavorite, toast])

    const handleShowInterest = useCallback(() => {
        if (!property) return

        const config = createRequestConfig('property', property.id)
        setRequestConfig(config)
        setFormError(null)
        setShowInterestForm(true)
    }, [property])

    const handleFormError = (error: any) => {
        setFormError(error)
    }

    const handleFormSuccess = () => {
        setFormError(null)
        setShowInterestForm(false)
        setRequestConfig(null)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navigation />
                <PropertyDetailSkeleton />
                <Footer />
            </div>
        )
    }
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navigation />
                <ErrorState
                    message={error}
                    onRetry={refetch}
                    onGoBack={() => router.push("/biens")}
                />
                <Footer />
            </div>
        )
    }
    if (!property || !propertyData) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navigation />
                <NotFoundState onGoBack={() => router.push("/biens")} />
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navigation />

            
            <div className="bg-white border-b border-slate-200 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-slate-600">
                        <Link href="/" className="hover:text-slate-900 transition-colors">
                            Accueil
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/biens" className="hover:text-slate-900 transition-colors">
                            Tous les biens
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-900 font-medium truncate">
              {property.title}
            </span>
                    </nav>
                </div>
            </div>

            
            <PropertyHeroSection
                property={property}
                propertyData={propertyData}
                onGoBack={() => router.push("/biens")}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
            />

            
            {propertyData.allImages.length > 0 && (
                <ImageCarouselSection
                    images={propertyData.allImages}
                    currentIndex={currentImageIndex}
                    onNavigate={navigateCarousel}
                    onIndexChange={setCurrentImageIndex}
                    onLightboxOpen={() => setShowImageLightbox(true)}
                    propertyTitle={property.title}
                />
            )}

            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    <div className="lg:col-span-2 space-y-8">
                        <PropertyOverviewCard property={property} propertyData={propertyData} />
                        <PropertyDescriptionCard description={property.description} />
                        <PropertyCharacteristicsCard characteristics={propertyData.characteristics} />
                        <PropertyLocationCard
                            property={property}
                            fullAddress={propertyData.fullAddress}
                        />
                    </div>

                    
                    <div className="lg:col-span-1">
                        <FinancingCard
                            property={property}
                            onShowInterest={handleShowInterest}
                            onShare={handleShare}
                        />
                    </div>
                </div>
            </div>

            
            <PropertyInterestModal
                property={property}
                requestConfig={requestConfig}
                open={showInterestForm}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowInterestForm(false)
                        setFormError(null)
                        setRequestConfig(null)
                    }
                }}
                onSuccess={handleFormSuccess}
                onError={handleFormError}
            />

            
            <ImageLightboxModal
                images={propertyData.allImages}
                currentIndex={currentImageIndex}
                open={showImageLightbox}
                onOpenChange={setShowImageLightbox}
                onNavigate={navigateCarousel}
                onIndexChange={setCurrentImageIndex}
                propertyTitle={property.title}
            />

            <Footer />
        </div>
    )
}



function PropertyDetailSkeleton() {
    return (
        <div className="pt-16">
            
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Skeleton className="h-4 w-96 mb-4" />
                </div>
            </div>

            <div className="h-96 bg-slate-200 animate-pulse" />

            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <Skeleton className="h-6 w-48 mb-4" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <Skeleton className="h-32 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ErrorState({
                        message,
                        onRetry,
                        onGoBack
                    }: {
    message: string
    onRetry: () => void
    onGoBack: () => void
}) {
    return (
        <div className="flex flex-1 items-center justify-center px-4 py-24">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Erreur de chargement
                </h2>
                <p className="text-slate-600 mb-8">{message}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={onRetry} className="flex items-center gap-2">
                        Réessayer
                    </Button>
                    <Button variant="outline" onClick={onGoBack} className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Retour aux biens
                    </Button>
                </div>
            </div>
        </div>
    )
}

function NotFoundState({ onGoBack }: { onGoBack: () => void }) {
    return (
        <div className="flex flex-1 items-center justify-center px-4 py-24">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                    Bien introuvable
                </h2>
                <p className="text-slate-600 mb-8">
                    Ce bien n'existe pas ou n'est plus disponible.
                </p>
                <Button onClick={onGoBack} className="flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Retour aux biens
                </Button>
            </div>
        </div>
    )
}

function PropertyHeroSection({
                                 property,
                                 propertyData,
                                 onGoBack,
                                 onToggleFavorite,
                                 isFavorite
                             }: {
    property: Property
    propertyData: any
    onGoBack: () => void
    onToggleFavorite: () => void
    isFavorite: boolean
}) {
    return (
        <section className="relative bg-slate-900 overflow-hidden">
            
            <div className="absolute inset-0">
                <LazyImage
                    src={propertyData.mainImage}
                    alt={property.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
            </div>

            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 lg:py-24">
                    
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={onGoBack}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Retour</span>
                        </button>

                    </div>

                    
                    <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge className="bg-blue-600 text-white font-medium px-3 py-1">
                                {propertyData.type}
                            </Badge>

                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                            {property.title}
                        </h1>

                        <div className="flex items-center gap-2 text-slate-200 mb-6">
                            <MapPin size={18} />
                            <span className="text-lg">{propertyData.shortAddress}</span>
                        </div>

                        <div className="text-3xl font-bold text-white">
                            {formatPrice(property)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ImageCarouselSection({
                                  images,
                                  currentIndex,
                                  onNavigate,
                                  onIndexChange,
                                  onLightboxOpen,
                                  propertyTitle,
                              }: {
    images: string[]
    currentIndex: number
    onNavigate: (direction: "next" | "prev") => void
    onIndexChange: (index: number) => void
    onLightboxOpen: () => void
    propertyTitle: string
}) {
    if (images.length === 0) return null

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
                <div className="relative h-96 sm:h-[500px] lg:h-[600px]">
                    <LazyImage
                        src={images[currentIndex]}
                        alt={`${propertyTitle} - Image ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                    />

                    
                    {images.length > 1 && (
                        <>
                            <CarouselArrow
                                direction="prev"
                                onClick={() => onNavigate("prev")}
                                className="left-4"
                            />
                            <CarouselArrow
                                direction="next"
                                onClick={() => onNavigate("next")}
                                className="right-4"
                            />
                        </>
                    )}

                    
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge className="bg-black/70 text-white font-medium">
                            {currentIndex + 1} / {images.length}
                        </Badge>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={onLightboxOpen}
                            className="bg-white/90 hover:bg-white"
                        >
                            <Maximize2 size={14} />
                        </Button>
                    </div>

                    
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => onIndexChange(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === currentIndex
                                            ? "bg-white scale-110"
                                            : "bg-white/50 hover:bg-white/75"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => onIndexChange(index)}
                            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                index === currentIndex
                                    ? "border-blue-500 ring-2 ring-blue-200"
                                    : "border-slate-200 hover:border-slate-300"
                            }`}
                        >
                            <LazyImage
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </section>
    )
}

function CarouselArrow({
                           direction,
                           onClick,
                           className
                       }: {
    direction: "next" | "prev"
    onClick: () => void
    className: string
}) {
    const Icon = direction === "next" ? ChevronRight : ChevronLeft

    return (
        <button
            onClick={onClick}
            className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all ${className}`}
        >
            <Icon size={24} className="text-slate-700" />
        </button>
    )
}

function PropertyOverviewCard({
                                  property,
                                  propertyData
                              }: {
    property: Property
    propertyData: any
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-[hsl(var(--brand))]" />
                    Aperçu du bien
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {propertyData.beds && (
                        <PropertyStatItem
                            icon={Bed}
                            label="Chambres"
                            value={propertyData.beds.toString()}
                        />
                    )}
                    {propertyData.baths && (
                        <PropertyStatItem
                            icon={Bath}
                            label="Salles de bain"
                            value={propertyData.baths.toString()}
                        />
                    )}
                    {propertyData.area && (
                        <PropertyStatItem
                            icon={Square}
                            label="Surface"
                            value={`${propertyData.area} m²`}
                        />
                    )}
                    <PropertyStatItem
                        icon={MapPin}
                        label="Type"
                        value={propertyData.type}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

function PropertyStatItem({
                              icon: Icon,
                              label,
                              value
                          }: {
    icon: any
    label: string
    value: string
}) {
    return (
        <div className="text-center">
            <div className="w-12 h-12 bg-[hsl(var(--brand-accent))]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon size={20} className="text-[hsl(var(--brand))]" />
            </div>
            <div className="text-sm text-slate-600 mb-1">{label}</div>
            <div className="font-semibold text-slate-900">{value}</div>
        </div>
    )
}

function PropertyDescriptionCard({ description }: { description: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

function PropertyCharacteristicsCard({
                                         characteristics
                                     }: {
    characteristics: Record<string, string>
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Caractéristiques</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(characteristics).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
                            <span className="text-slate-600 font-medium">{key}</span>
                            <span className="text-slate-900">{value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function PropertyLocationCard({
                                  property,
                                  fullAddress
                              }: {
    property: Property
    fullAddress: string
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[hsl(var(--brand))]" />
                    Localisation
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-slate-700">{fullAddress}</p>
                    {property.googleMapUrl && (
                        <Link
                            href={property.googleMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[hsl(var(--brand))] hover:text-[hsl(var(--brand-light))] transition-colors"
                        >
                            <ExternalLink size={16} />
                            Voir sur Google Maps
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

function FinancingCard({
                           property,
                           onShowInterest,
                           onShare,
                       }: {
    property: Property
    onShowInterest: () => void
    onShare: () => void
}) {
    return (
        <div className="sticky top-24">
            <Card className="shadow-xl border-slate-200">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Informations financières</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    
                    <div className="space-y-3">
                        <FinancialLineItem label="Loyer mensuel" value={formatPrice(property)} highlight />
                        <FinancialLineItem label="Charges" value={formatCharges(property)} />
                        <FinancialLineItem label="Dépôt de garantie" value={formatDeposit(property)} />
                        <FinancialLineItem label="Frais de dossier" value={formatApplicationFees(property)} />
                        <div className="border-t border-slate-200 pt-3">
                            <FinancialLineItem
                                label="Coût mensuel total"
                                value={formatTotalMonthlyCost(property)}
                                accent
                            />
                        </div>
                    </div>

                    
                    <div className="space-y-3">
                        <Button
                            onClick={onShowInterest}
                            className="w-full h-12 text-base font-semibold
                         bg-[hsl(var(--brand))] text-white
                         hover:bg-[hsl(var(--brand-dark))]
                         focus:ring-2 focus:ring-[hsl(var(--brand-light))]"
                        >
                            Je suis intéressé
                        </Button>

                        <Button
                            variant="outline"
                            onClick={onShare}
                            className="w-full h-10 flex items-center justify-center gap-2"
                        >
                            <Share2 size={16} /> Partager ce bien
                        </Button>
                    </div>

                    
                    <div className="text-center pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                            <CheckCircle size={16} /> <span className="text-sm font-medium">Réponse sous 24 h</span>
                        </div>
                        <p className="text-xs text-slate-500">
                            Notre équipe vous contactera rapidement pour organiser une visite.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function FinancialLineItem({
                               label,
                               value,
                               highlight,
                               accent
                           }: {
    label: string
    value: string
    highlight?: boolean
    accent?: boolean
}) {
    const valueClass = highlight
        ? "font-bold text-slate-900 text-lg"
        : accent
            ? "font-bold text-[hsl(var(--brand))] text-lg"
            : "font-medium text-slate-700"

    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-600">{label}</span>
            <span className={valueClass}>{value}</span>
        </div>
    )
}

function PropertyInterestModal({
                                   property,
                                   requestConfig,
                                   open,
                                   onOpenChange,
                                   onSuccess,
                                   onError,
                               }: {
    property: Property
    requestConfig: RequestConfig | null
    open: boolean
    onOpenChange: (o: boolean) => void
    onSuccess: () => void
    onError: (error: any) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white border shadow-2xl"
            >
                <DialogHeader>
                    <DialogTitle>
                        {requestConfig?.titleText || "Manifester mon intérêt"}
                    </DialogTitle>
                    <DialogDescription>
                        Remplissez ce formulaire pour recevoir plus d'informations sur ce bien immobilier.
                    </DialogDescription>
                </DialogHeader>

                {requestConfig && (
                    <GenericInterestForm
                        config={requestConfig}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

function ImageLightboxModal({
                                images,
                                currentIndex,
                                open,
                                onOpenChange,
                                onNavigate,
                                onIndexChange,
                                propertyTitle,
                            }: {
    images: string[]
    currentIndex: number
    open: boolean
    onOpenChange: (open: boolean) => void
    onNavigate: (direction: "next" | "prev") => void
    onIndexChange: (index: number) => void
    propertyTitle: string
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black">
                <div className="relative h-[80vh]">
                    <LazyImage
                        src={images[currentIndex]}
                        alt={`${propertyTitle} - Image ${currentIndex + 1}`}
                        fill
                        className="object-contain"
                    />

                    
                    {images.length > 1 && (
                        <>
                            <CarouselArrow
                                direction="prev"
                                onClick={() => onNavigate("prev")}
                                className="left-4"
                            />
                            <CarouselArrow
                                direction="next"
                                onClick={() => onNavigate("next")}
                                className="right-4"
                            />
                        </>
                    )}

                    
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                        <div>
                            <Badge className="bg-black/70 text-white">
                                {currentIndex + 1} / {images.length}
                            </Badge>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                            className="text-white hover:bg-white/20"
                        >
                            ✕
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
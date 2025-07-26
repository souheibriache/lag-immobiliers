"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowLeft,
    CheckCircle2,
    MessageCircle,
    Mail,
    Clock,
    Heart,
    Eye,
    Shield,
    TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import LazyImage from "@/components/ui/LazyImage"
import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"
import GenericInterestForm, { createRequestConfig, RequestConfig } from "@/components/forms/InterestForm"
import { useService } from "@/lib/hooks/useServices"
import {
    getMainServiceImage,
    formatServicePrice
} from "@/lib/types/service"


export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const { service, loading, error } = useService(params.slug)
    const [selectedService, setSelectedService] = useState<any>(null)
    const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(null)
    const [formError, setFormError] = useState<any>(null)

    useEffect(() => {
        if (service) {
            document.title = `${service.title} | Services Professionnels`
        }
    }, [service])

    const handleContactRequest = () => {
        router.push(`/contact?service=${params.slug}`)
    }

    const handleFormError = (error: any) => {
        setFormError(error)
    }

    const handleFormSuccess = () => {
        setFormError(null)
        setSelectedService(null)
        setRequestConfig(null)
    }

    const handleServiceInterest = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedService(service)
        setFormError(null)
        const config = createRequestConfig('service', service.id)
        setRequestConfig(config)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navigation />
                <main className="flex-1 pt-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="space-y-8">
                            <Skeleton className="h-8 w-64" />
                            <Skeleton className="h-64 w-full rounded-2xl" />
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-32 w-full rounded-xl" />
                                    <Skeleton className="h-12 w-full rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navigation />
                <main className="flex-1 pt-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                            Service non trouvé
                        </h1>
                        <p className="text-slate-600 mb-8">
                            Le service que vous recherchez n'existe pas ou n'est plus disponible.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                                className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Retour
                            </Button>
                            <Button
                                onClick={() => router.push("/services")}
                                className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                            >
                                Voir tous les services
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
    const characteristics = service.characteristics?.flat() || []
    const hasCharacteristics = characteristics.length > 0
    const mainImage = getMainServiceImage(service.images)

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navigation />

            <main className="flex-1 pt-16">

                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center gap-2 text-sm text-slate-600">
                            <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">
                                Accueil
                            </Link>
                            <span>/</span>
                            <Link href="/services" className="hover:text-[hsl(var(--brand))] transition-colors">
                                Services
                            </Link>
                            <span>/</span>
                            <span className="text-slate-900">{service.title}</span>
                        </nav>
                    </div>
                </div>


                <section className="bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex items-center gap-4 mb-8">
                            <Button
                                variant="outline"
                                onClick={() => router.back()}
                                className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Retour
                            </Button>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                    {service.title}
                                </h1>

                                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                    {service.description}
                                </p>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[hsl(var(--brand))]">
                                            {formatServicePrice(service.price)}
                                        </div>
                                        <div className="text-sm text-slate-500">Prix du service</div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        size="lg"
                                        onClick={handleServiceInterest}
                                        className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white px-8"
                                    >
                                        <Heart size={18} className="mr-2" />
                                        Je suis intéressé
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                {mainImage ? (
                                    <LazyImage
                                        src={mainImage}
                                        alt={service.title}
                                        width={600}
                                        height={400}
                                        className="rounded-2xl shadow-xl w-full h-auto"
                                    />
                                ) : (
                                    <div className="w-full h-80 bg-slate-200 rounded-2xl flex items-center justify-center">
                                        <Eye className="w-16 h-16 text-slate-400" />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>


                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">

                            <div className="lg:col-span-2">

                                <div className="mb-12">
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                                        Description détaillée du service
                                    </h2>
                                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {service.shortDescription || service.description}
                                        </p>
                                    </div>
                                </div>


                                {hasCharacteristics && (
                                    <div className="mb-12">
                                        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                                            Caractéristiques du service
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {characteristics.map((characteristic, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--brand))] flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 leading-relaxed">{characteristic}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="space-y-8">

                                <Card className="border-[hsl(var(--brand-light))] shadow-lg sticky top-8">
                                    <CardContent className="p-6">
                                        <div className="text-center mb-6">
                                            <div className="text-3xl font-bold text-[hsl(var(--brand))] mb-2">
                                                {formatServicePrice(service.price)}
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                Service professionnel complet
                                            </p>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-[hsl(var(--brand))]" />
                                                <span className="text-sm text-slate-700">Service personnalisé</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <TrendingUp className="w-5 h-5 text-[hsl(var(--brand))]" />
                                                <span className="text-sm text-slate-700">Expertise professionnelle</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MessageCircle className="w-5 h-5 text-[hsl(var(--brand))]" />
                                                <span className="text-sm text-slate-700">Support dédié</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Button
                                                className="w-full bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                                                onClick={handleServiceInterest}
                                            >
                                                <Heart size={16} className="mr-2" />
                                                Je suis intéressé
                                            </Button>
                                        </div>

                                        <p className="text-xs text-slate-500 text-center mt-4">
                                            Consultation initiale gratuite • Devis personnalisé sous 24h
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <Dialog
                open={!!selectedService && !!requestConfig}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedService(null)
                        setFormError(null)
                        setRequestConfig(null)
                    }
                }}
            >
                <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white border shadow-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {requestConfig?.titleText || "Demander un accompagnement"}
                        </DialogTitle>
                        <DialogDescription>
                            Remplissez ce formulaire pour recevoir plus d'informations sur ce service d'accompagnement.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedService && requestConfig && (
                        <GenericInterestForm
                            config={requestConfig}
                            onSuccess={handleFormSuccess}
                            onError={handleFormError}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
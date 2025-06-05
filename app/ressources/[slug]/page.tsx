"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  Star,
  Euro,
  BookOpen,
  Package,
  CheckCircle2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import LazyImage from "@/components/ui/LazyImage"
import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"
import { useProduct } from "@/lib/hooks/useProducts"

/**
 * Resource Detail Page Component
 * Displays comprehensive product/book information based on actual API data structure
 * Handles both PRODUCT and BOOK types with unified presentation
 */
export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { product, loading, error } = useProduct(params.slug)

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Ressources`
    }
  }, [product])
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "BOOK":
        return <BookOpen className="w-5 h-5" />
      case "PRODUCT":
        return <Package className="w-5 h-5" />
      case "TOOL":
        return <Package className="w-5 h-5" />
      case "FORMATION":
        return <BookOpen className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case "BOOK":
        return "Livre"
      case "PRODUCT":
        return "Produit"
      case "TOOL":
        return "Outil"
      case "FORMATION":
        return "Formation"
      default:
        return "Ressource"
    }
  }
  const getProductImage = (type: string) => {
    const typeMap = {
      BOOK: "/placeholder.svg?height=400&width=600&text=Livre",
      PRODUCT: "/placeholder.svg?height=400&width=600&text=Produit",
      TOOL: "/placeholder.svg?height=400&width=600&text=Outil",
      FORMATION: "/placeholder.svg?height=400&width=600&text=Formation"
    };
    return typeMap[type as keyof typeof typeMap] || "/placeholder.svg";
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  const getFinalPrice = (price: number, discount: number) => {
    return price - (discount || 0)
  }
  const hasDiscount = (discount: number) => {
    return discount && discount > 0
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navigation />
          <main className="flex-1 pt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="space-y-8">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-80 w-full rounded-2xl" />
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
    )
  }

  if (error || !product) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navigation />
          <main className="flex-1 pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <h1 className="text-2xl font-semibold text-slate-900 mb-4">
                Ressource non trouvée
              </h1>
              <p className="text-slate-600 mb-8">
                La ressource que vous recherchez n'existe pas ou n'est plus disponible.
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
                    onClick={() => router.push("/ressources")}
                    className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                >
                  Voir toutes les ressources
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
    )
  }

  const finalPrice = getFinalPrice(product.price, product.discount)

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />

        <main className="flex-1 pt-16">
          {/* Breadcrumb Navigation */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center gap-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">
                  Accueil
                </Link>
                <span>/</span>
                <Link href="/ressources" className="hover:text-[hsl(var(--brand))] transition-colors">
                  Ressources
                </Link>
                <span>/</span>
                <span className="text-slate-900">{product.title}</span>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
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

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-[hsl(var(--brand))] text-white px-3 py-1">
                      {getTypeIcon(product.type)}
                      <span className="ml-2">{getTypeDisplayName(product.type)}</span>
                    </Badge>
                    {product.isFeatured && (
                        <Badge className="bg-amber-500 text-white px-3 py-1">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Recommandé
                        </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {product.title}
                  </h1>

                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Pricing Section */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      {hasDiscount(product.discount) && (
                          <div className="text-sm text-slate-400 line-through mb-1">
                            {product.price.toFixed(2)} €
                          </div>
                      )}
                      <div className="text-2xl font-bold text-[hsl(var(--brand))]">
                        {finalPrice > 0 ? `${finalPrice.toFixed(2)} €` : "Gratuit"}
                      </div>
                      {hasDiscount(product.discount) && (
                          <div className="text-sm text-green-600 font-medium">
                            Économie: {product.discount.toFixed(2)} €
                          </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action */}
                  {product.link && (
                      <div className="flex gap-4">
                        <Button
                            size="lg"
                            onClick={() => window.open(product.link, '_blank')}
                            className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white px-8"
                        >
                          <ExternalLink size={18} className="mr-2" />
                          Accéder à la ressource
                        </Button>
                      </div>
                  )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                  <LazyImage
                      src={getProductImage(product.type)}
                      alt={product.title}
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-xl w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Product Description */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                      Description détaillée
                    </h2>
                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Product Characteristics */}
                  {product.characteristics && product.characteristics.length > 0 && (
                      <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                          Caractéristiques
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {product.characteristics.map((characteristic, index) => (
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

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Resource Summary Card */}
                  <Card className="border-[hsl(var(--brand-light))] shadow-lg sticky top-8">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[hsl(var(--brand))] mb-2">
                          {finalPrice > 0 ? `${finalPrice.toFixed(2)} €` : "Gratuit"}
                        </div>
                        {hasDiscount(product.discount) && (
                            <div className="text-sm text-slate-500 line-through mb-1">
                              Prix original: {product.price.toFixed(2)} €
                            </div>
                        )}
                        <p className="text-sm text-slate-600">
                          {getTypeDisplayName(product.type)} de qualité professionnelle
                        </p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(product.type)}
                          <span className="text-sm text-slate-700">{getTypeDisplayName(product.type)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[hsl(var(--brand))]" />
                          <span className="text-sm text-slate-700">Ajouté le {formatDate(product.createdAt)}</span>
                        </div>
                        {product.isFeatured && (
                            <div className="flex items-center gap-3">
                              <Star className="w-5 h-5 text-amber-500 fill-current" />
                              <span className="text-sm text-slate-700">Ressource recommandée</span>
                            </div>
                        )}
                      </div>

                      {product.link && (
                          <Button
                              className="w-full bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                              onClick={() => window.open(product.link, '_blank')}
                          >
                            <ExternalLink size={16} className="mr-2" />
                            Accéder maintenant
                          </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Resource Information */}
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">
                        Informations sur la ressource
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Type:</span>
                          <span className="text-slate-900">{getTypeDisplayName(product.type)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Créé le:</span>
                          <span className="text-slate-900">{formatDate(product.createdAt)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Dernière mise à jour:</span>
                          <span className="text-slate-900">{formatDate(product.updatedAt)}</span>
                        </div>
                        {hasDiscount(product.discount) && (
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">Réduction:</span>
                              <span className="text-green-600 font-medium">{product.discount.toFixed(2)} €</span>
                            </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  )
}
"use client"

/**
 * -------------------------------------------------------------
 *  Enhanced AllPropertiesPage – enterprise-grade property catalogue
 * -------------------------------------------------------------
 *  ‣ Professional design with enhanced information hierarchy
 *  ‣ Improved data handling with proper fallbacks
 *  ‣ Enhanced filter UX with visual feedback
 *  ‣ Enterprise-scale typography and spacing
 *  ‣ Optimized for professional real estate operations
 *  ‣ Consistent brand color integration
 * -------------------------------------------------------------
 */

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Search,
  Filter,
  Grid,
  List,
  ArrowLeft,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
  Eye,
  TrendingUp,
  Clock,
  Star,
  Building,
  Home,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"
import LazyImage from "@/components/ui/LazyImage"
import { useFilteredProperties } from "@/lib/hooks/useProperties"
import {
  getPropertyBeds,
  getPropertyBaths,
  getPropertyArea,
  getPropertyFeatures,
  getPropertyType,
  formatPrice,
  getMainImage,
  getShortAddress,
} from "@/lib/types/property"
import type { Property } from "@/lib/types/property"
import { PropertyFilters } from "@/lib/api/properties"

/* ------------------------------------------------------------
 *  Enhanced Data Extraction with Proper Fallbacks
 * -----------------------------------------------------------*/
const getEnhancedPropertyDetails = (property: Property) => {
  const beds = getPropertyBeds(property?.characteristics)
  const baths = getPropertyBaths(property?.characteristics)
  const area = getPropertyArea(property?.characteristics)
  const type = getPropertyType(property?.characteristics)
  const features = getPropertyFeatures(property?.characteristics)

  return {
    beds: beds && beds > 0 ? beds : null,
    baths: baths && baths > 0 ? baths : null,
    area: area && area > 0 ? area : null,
    type: type || "Bien immobilier",
    features: features || [],
    hasBasicInfo: beds || baths || area,
    shortAddress: getShortAddress(property),
    mainImage: getMainImage(property.images),
  }
}

/* ------------------------------------------------------------
 *  Enhanced Constants
 * -----------------------------------------------------------*/
const PROPERTY_TYPES = [
  { label: "Tous les types", value: "" },
  { label: "Studio", value: "Studio" },
  { label: "T2", value: "T2" },
  { label: "T3", value: "T3" },
  { label: "T4", value: "T4" },
  { label: "Appartement", value: "Appartement" },
  { label: "Maison", value: "Maison" },
]

const PRICE_RANGES = [
  { label: "Tous les prix", value: "" },
  { label: "Moins de 700€", value: "0-700" },
  { label: "700€ - 900€", value: "700-900" },
  { label: "900€ - 1200€", value: "900-1200" },
  { label: "1200€ - 1500€", value: "1200-1500" },
  { label: "Plus de 1500€", value: "1500+" },
]

const SORT_OPTIONS = [
  { label: "Plus récents", value: "newest" },
  { label: "Prix croissant", value: "price-asc" },
  { label: "Prix décroissant", value: "price-desc" },
  { label: "Superficie", value: "area" },
]

/* ------------------------------------------------------------
 *  Enhanced Page Component
 * -----------------------------------------------------------*/
export default function AllPropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilters>({ page: 1, limit: 12 })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { data, loading, error } = useFilteredProperties(filters)



  const updateFilters = (patch: Partial<PropertyFilters>) =>
      setFilters((prev) => ({ ...prev, ...patch, page: 1 }))

  const handlePropertyClick = (id: string) => router.push(`/biens/${id}`)

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'page' || key === 'limit') return false
      return value !== undefined && value !== "" && value !== null
    }).length
  }

  const resetFilters = () => setFilters({ page: 1, limit: 12 })

  return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />

        <main className="flex-1 pt-16">
          {/* Professional Header Section */}
          <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8">
                <div className="flex items-center justify-between mb-6">
                  <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-slate-600 hover:text-[hsl(var(--brand))] transition-colors group"
                  >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Retour à l'accueil</span>
                  </Link>

                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                      Catalogue des biens
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Découvrez notre sélection exclusive de propriétés avec des outils
                      de recherche avancés pour trouver le bien qui correspond parfaitement à vos besoins.
                    </p>
                  </div>

                  <div className="hidden lg:block">
                    <div className="bg-gradient-to-br from-[hsl(var(--brand-light))]/10 to-[hsl(var(--brand))]/5 rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[hsl(var(--brand))] rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Total des biens</div>
                          <div className="text-2xl font-bold text-slate-900">
                            {loading ? "..." : data?.total || 0}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Mise à jour en temps réel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Enhanced Filter System */}
          <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                {/* Primary Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input
                        placeholder="Rechercher par localisation, type de bien..."
                        value={filters.search || ""}
                        onChange={(e) => updateFilters({ search: e.target.value })}
                        className="pl-12 h-12 border-slate-200 focus:border-[hsl(var(--brand))] focus:ring-[hsl(var(--brand))]/20 bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  <select
                      value={filters.propertyType || ""}
                      onChange={(e) => updateFilters({ propertyType: e.target.value || undefined })}
                      className="h-12 px-4 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[hsl(var(--brand))] focus:ring-2 focus:ring-[hsl(var(--brand))]/20 transition-colors"
                  >
                    {PROPERTY_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                    ))}
                  </select>

                  <select
                      value={
                        filters.minPrice && filters.maxPrice
                            ? `${filters.minPrice}-${filters.maxPrice}`
                            : filters.minPrice
                                ? `${filters.minPrice}+`
                                : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value
                        if (!value) return updateFilters({ minPrice: undefined, maxPrice: undefined })
                        const [min, max] = value.split("-").map(Number)
                        updateFilters({ minPrice: min || undefined, maxPrice: max || undefined })
                      }}
                      className="h-12 px-4 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-[hsl(var(--brand))] focus:ring-2 focus:ring-[hsl(var(--brand))]/20 transition-colors"
                  >
                    {PRICE_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                    ))}
                  </select>
                </div>

                {/* Results Info & Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">
                      {loading ? (
                          <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Recherche en cours...
                        </span>
                      ) : (
                          `${data?.total || 0} bien${(data?.total || 0) > 1 ? 's' : ''} trouvé${(data?.total || 0) > 1 ? 's' : ''}`
                      )}
                    </span>
                    </div>

                    {getActiveFiltersCount() > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="h-8 px-3 text-slate-500 hover:text-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-light))]/10 transition-colors"
                        >
                          Réinitialiser les filtres
                          <Badge variant="secondary" className="ml-2 px-2 py-0.5 text-xs">
                            {getActiveFiltersCount()}
                          </Badge>
                        </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                        className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:border-[hsl(var(--brand))] focus:ring-2 focus:ring-[hsl(var(--brand))]/20 transition-colors"
                        defaultValue="newest"
                    >
                      {SORT_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                      ))}
                    </select>

                    <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className={`h-10 w-10 p-0 rounded-none border-0 ${
                              viewMode === "grid"
                                  ? "bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand-dark))]"
                                  : "hover:bg-slate-50"
                          }`}
                      >
                        <Grid size={16} />
                      </Button>
                      <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className={`h-10 w-10 p-0 rounded-none border-0 ${
                              viewMode === "list"
                                  ? "bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand-dark))]"
                                  : "hover:bg-slate-50"
                          }`}
                      >
                        <List size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Error State */}
              {error && (
                  <div className="text-center py-20 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Erreur de chargement</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">{error}</p>
                    <Button
                        onClick={() => location.reload()}
                        className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                    >
                      Réessayer
                    </Button>
                  </div>
              )}

              {/* Loading State */}
              {loading && (
                  <div className={
                    viewMode === "grid"
                        ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-6"
                  }>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                          <Skeleton className={viewMode === "grid" ? "h-48 w-full" : "h-48 w-80"} />
                          <CardContent className="p-6">
                            <Skeleton className="h-6 w-3/4 mb-3" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <div className="flex gap-4 mb-4">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                          </CardContent>
                        </Card>
                    ))}
                  </div>
              )}

              {/* Properties Display */}
              {!loading && data && data.items.length > 0 && (
                  <>
                    {viewMode === "grid" ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {data.items.map((property) => (
                              <EnhancedPropertyCard
                                  key={property.id}
                                  property={property}
                                  onClick={() => handlePropertyClick(property.id)}
                              />
                          ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                          {data.items.map((property) => (
                              <EnhancedPropertyRow
                                  key={property.id}
                                  property={property}
                                  onClick={() => handlePropertyClick(property.id)}
                              />
                          ))}
                        </div>
                    )}

                    {/* Enhanced Pagination */}
                    {data.total > data.take && (
                        <EnhancedPagination
                            page={data.page}
                            total={data.total}
                            take={data.take}
                            onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                        />
                    )}
                  </>
              )}

              {/* Enhanced Empty State */}
              {!loading && data && data.items.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Aucun bien trouvé</h3>
                    <p className="text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
                      Aucun bien ne correspond à vos critères de recherche actuels.
                      Essayez d'ajuster vos filtres ou d'élargir votre recherche pour découvrir plus d'opportunités.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                          onClick={resetFilters}
                          className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                      >
                        Réinitialiser les filtres
                      </Button>
                      <Button
                          variant="outline"
                          onClick={() => router.push("/")}
                          className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      >
                        Retour à l'accueil
                      </Button>
                    </div>
                  </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
  )
}

/* ------------------------------------------------------------
 *  Enhanced Property Card Component
 * -----------------------------------------------------------*/
interface CardProps {
  property: Property
  onClick: () => void
}

function EnhancedPropertyCard({ property, onClick }: CardProps) {
  const details = getEnhancedPropertyDetails(property)

  return (
      <Card
          className="group cursor-pointer overflow-hidden border-slate-200 hover:border-[hsl(var(--brand-light))] hover:shadow-xl transition-all duration-300 bg-white"
          onClick={onClick}
      >
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <LazyImage
              src={details.mainImage}
              alt={property.title}
              className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
              width={400}
              height={224}
          />

          {/* Image Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white text-slate-900 font-bold px-3 py-2 shadow-lg">
              {formatPrice(property)}
            </Badge>
          </div>

          {/*/!* Premium Badge *!/*/}
          {/*{property.isFeatured && (*/}
          {/*    <div className="absolute top-4 right-4">*/}
          {/*      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-3 py-2 shadow-lg">*/}
          {/*        <Star className="w-3 h-3 mr-1 fill-current" />*/}
          {/*        Premium*/}
          {/*      </Badge>*/}
          {/*    </div>*/}
          {/*)}*/}
        </div>

        {/* Content Section */}
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Title and Location */}
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-[hsl(var(--brand))] transition-colors leading-tight">
                {property.title}
              </h3>
              {details.shortAddress && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={14} className="text-[hsl(var(--brand))] flex-shrink-0" />
                    <span className="text-sm truncate">{details.shortAddress}</span>
                  </div>
              )}
            </div>

            {/* Property Stats */}
            {details.hasBasicInfo && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {details.beds && (
                        <PropertyStat
                            icon={Bed}
                            value={details.beds.toString()}
                            label="Ch."
                        />
                    )}
                    {details.baths && (
                        <PropertyStat
                            icon={Bath}
                            value={details.baths.toString()}
                            label="SdB"
                        />
                    )}
                    {details.area && (
                        <PropertyStat
                            icon={Square}
                            value={details.area.toString()}
                            label="m²"
                        />
                    )}
                  </div>
                </div>
            )}

            {/* Property Type and Action Button */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-[hsl(var(--brand-accent))]/10 text-[hsl(var(--brand))] border-[hsl(var(--brand-light))]">
                {details.type}
              </Badge>
              <Button
                  size="sm"
                  className="bg-[hsl(var(--brand))] text-white px-6 hover:bg-[hsl(var(--brand-dark))] focus:bg-[hsl(var(--brand-dark))] focus:ring-2 focus:ring-[hsl(var(--brand))]/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                  }}
              >
                <Eye size={14} className="mr-2" />
                Voir détails
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

/* ------------------------------------------------------------
 *  Enhanced Property Row Component
 * -----------------------------------------------------------*/
function EnhancedPropertyRow({ property, onClick }: CardProps) {
  const details = getEnhancedPropertyDetails(property)

  const truncateText = (text: string, maxLength = 100) =>
      text.length <= maxLength ? text : `${text.substring(0, maxLength).trim()}…`

  return (
      <Card
          className="flex overflow-hidden cursor-pointer group border-slate-200 hover:border-[hsl(var(--brand-light))] hover:shadow-xl transition-all duration-300 bg-white"
          onClick={onClick}
      >
        {/* Image Section */}
        <div className="relative w-80 flex-shrink-0 overflow-hidden">
          <LazyImage
              src={details.mainImage}
              alt={property.title}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              width={320}
              height={240}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

          <div className="absolute top-4 left-4">
            <Badge className="bg-white text-slate-900 font-bold px-3 py-2 shadow-lg">
              {formatPrice(property)}
            </Badge>
          </div>

          {/*{property.isFeatured && (*/}
          {/*    <div className="absolute top-4 right-4">*/}
          {/*      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium px-3 py-2 shadow-lg">*/}
          {/*        <Star className="w-3 h-3 mr-1 fill-current" />*/}
          {/*        Premium*/}
          {/*      </Badge>*/}
          {/*    </div>*/}
          {/*)}*/}
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="bg-[hsl(var(--brand-accent))]/10 text-[hsl(var(--brand))] border-[hsl(var(--brand-light))]">
                    {details.type}
                  </Badge>
                  {/*{property.isFeatured && (*/}
                  {/*    <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium">*/}
                  {/*      Premium*/}
                  {/*    </Badge>*/}
                  {/*)}*/}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[hsl(var(--brand))] transition-colors leading-tight">
                  {property.title}
                </h3>

                {details.shortAddress && (
                    <div className="flex items-center gap-2 text-slate-600 mb-4">
                      <MapPin size={16} className="text-[hsl(var(--brand))] flex-shrink-0" />
                      <span>{details.shortAddress}</span>
                    </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed line-clamp-2">
              {truncateText(property.description, 200)}
            </p>

            {/* Features */}
            {details.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {details.features.slice(0, 4).map((feature, index) => (
                      <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-slate-50 border-slate-200 text-slate-600"
                      >
                        {truncateText(feature, 20)}
                      </Badge>
                  ))}
                  {details.features.length > 4 && (
                      <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600">
                        +{details.features.length - 4} autres
                      </Badge>
                  )}
                </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {/* Property Stats */}
            {details.hasBasicInfo && (
                <div className="flex gap-8">
                  {details.beds && (
                      <PropertyStat
                          icon={Bed}
                          value={details.beds.toString()}
                          label="chambres"
                      />
                  )}
                  {details.baths && (
                      <PropertyStat
                          icon={Bath}
                          value={details.baths.toString()}
                          label="salles de bain"
                      />
                  )}
                  {details.area && (
                      <PropertyStat
                          icon={Square}
                          value={details.area.toString()}
                          label="m²"
                      />
                  )}
                </div>
            )}

            {/* Action Button */}
            <Button
                size="sm"
                className="bg-[hsl(var(--brand))] text-white px-6 hover:bg-[hsl(var(--brand-dark))] focus:bg-[hsl(var(--brand-dark))] focus:ring-2 focus:ring-[hsl(var(--brand))]/20"
                onClick={(e) => {
                  e.stopPropagation()
                  onClick()
                }}
            >
              <Eye size={14} className="mr-2" />
              Voir détails
            </Button>
          </div>
        </CardContent>
      </Card>
  )
}

/* ------------------------------------------------------------
 *  Property Stat Component
 * -----------------------------------------------------------*/
function PropertyStat({
                        icon: Icon,
                        value,
                        label
                      }: {
  icon: any
  value: string
  label: string
}) {
  return (
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Icon size={14} className="text-[hsl(var(--brand))]" />
          <span className="font-semibold text-slate-900">{value}</span>
        </div>
        <span className="text-xs text-slate-500 font-medium">{label}</span>
      </div>
  )
}

/* ------------------------------------------------------------
 *  Enhanced Pagination Component
 * -----------------------------------------------------------*/
function EnhancedPagination({
                              page,
                              total,
                              take,
                              onChange
                            }: {
  page: number
  total: number
  take: number
  onChange: (page: number) => void
}) {
  const totalPages = Math.ceil(total / take)
  const startItem = ((page - 1) * take) + 1
  const endItem = Math.min(page * take, total)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-slate-200">
        <div className="text-sm text-slate-600 order-2 sm:order-1">
          Affichage de <span className="font-medium text-slate-900">{startItem}</span> à{" "}
          <span className="font-medium text-slate-900">{endItem}</span> sur{" "}
          <span className="font-medium text-slate-900">{total}</span> biens
        </div>

        <div className="flex items-center gap-2 order-1 sm:order-2">
          <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onChange(page - 1)}
              className="px-4 border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] disabled:opacity-50"
          >
            Précédent
          </Button>

          {getVisiblePages().map((pageNum, index) => (
              pageNum === '...' ? (
                  <span key={index} className="px-2 text-slate-400">...</span>
              ) : (
                  <Button
                      key={pageNum}
                      size="sm"
                      variant={page === pageNum ? "default" : "outline"}
                      onClick={() => onChange(pageNum as number)}
                      className={`w-10 h-10 ${
                          page === pageNum
                              ? "bg-[hsl(var(--brand))] text-white hover:bg-[hsl(var(--brand-dark))]"
                              : "border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      }`}
                  >
                    {pageNum}
                  </Button>
              )
          ))}

          <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onChange(page + 1)}
              className="px-4 border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] disabled:opacity-50"
          >
            Suivant
          </Button>
        </div>
      </div>
  )
}

"use client"

import type { Property, PropertyCharacteristic } from "@/lib/api/properties"

/**
 * Format the monthly rent (or display a fallback).
 */
export function formatPrice(property: Property | null | undefined): string {
  if (!property || !property.price || property.price.monthlyPrice === undefined) {
    return "Prix non disponible"
  }
  return `${property.price.monthlyPrice}€/mois`
}

/** Format supplementary monthly charges. */
export function formatCharges(property: Property | null | undefined): string {
  if (!property || !property.price || property.price.chargesPrice === undefined) {
    return "Charges non disponibles"
  }
  return `${property.price.chargesPrice}€/mois`
}

/** Format refundable security deposit. */
export function formatDeposit(property: Property | null | undefined): string {
  if (!property || !property.price || property.price.firstDepositPrice === undefined) {
    return "Dépôt non disponible"
  }
  return `${property.price.firstDepositPrice}€`
}

/** Format application / dossier fees. */
export function formatApplicationFees(property: Property | null | undefined): string {
  if (!property || !property.price || property.price.dossierPrice === undefined) {
    return "Frais non disponibles"
  }
  return `${property.price.dossierPrice}€`
}

export function getFullAddress(property: Property | null | undefined): string {
  if (!property || !property.address) return "Adresse non disponible"
  const { address } = property
  const parts: string[] = []
  if (address.addressLine1) parts.push(address.addressLine1)
  if (address.city) parts.push(address.city)
  if (address.postalCode) parts.push(address.postalCode)
  if (address.country) parts.push(address.country)
  return parts.length ? parts.join(", ") : "Adresse incomplète"
}

export function getShortAddress(property: Property | null | undefined): string {
  if (!property || !property.address) return "Localisation non disponible"
  const { address } = property
  const parts: string[] = []
  if (address.city) parts.push(address.city)
  if (address.postalCode) parts.push(address.postalCode)
  return parts.length ? parts.join(", ") : "Localisation incomplète"
}

export function getMainImage(images: Property["images"] | undefined | null): string {
  if (!images || !images.length) {
    return "/placeholder.svg?height=300&width=400&text=No+Image"
  }
  try {
    const sorted = images
        .filter((img) => img && img.fullUrl)
        .sort((a, b) => parseInt(a.order || "0") - parseInt(b.order || "0"))
    return sorted.length ? sorted[0].fullUrl : "/placeholder.svg?height=300&width=400&text=No+Image"
  } catch (e) {
    console.warn("Error processing images", e)
    return "/placeholder.svg?height=300&width=400&text=Image+Error"
  }
}

export function getAllImages(images: Property["images"] | undefined | null): string[] {
  if (!images || !images.length) return []
  try {
    return images
        .filter((img) => img && img.fullUrl)
        .sort((a, b) => parseInt(a.order || "0") - parseInt(b.order || "0"))
        .map((img) => img.fullUrl)
  } catch (e) {
    console.warn("Error processing images", e)
    return []
  }
}

function findCharacteristic(
    characteristics: PropertyCharacteristic[] | undefined | null,
    name: string,
): string | null {
  if (!characteristics?.length) return null
  try {
    const char = characteristics.find(
        (c) => c?.name && c.name.toLowerCase() === name.toLowerCase(),
    )
    return char?.value || null
  } catch (e) {
    console.warn(`Error finding characteristic ${name}`, e)
    return null
  }
}

export function getPropertyBeds(characteristics: PropertyCharacteristic[] | undefined | null): string {
  const v =
      findCharacteristic(characteristics, "Chambres") ||
      findCharacteristic(characteristics, "Bedroom") ||
      findCharacteristic(characteristics, "Chambre")
  return v || "N/A"
}

export function getPropertyBaths(characteristics: PropertyCharacteristic[] | undefined | null): string {
  const v =
      findCharacteristic(characteristics, "Salle de bain") ||
      findCharacteristic(characteristics, "Salles de bain") ||
      findCharacteristic(characteristics, "Bathroom") ||
      findCharacteristic(characteristics, "Bathrooms")
  if (!v) return "N/A"
  const lower = v.toLowerCase()
  if (lower === "oui" || lower === "yes") return "1"
  return v
}

export function getPropertyArea(characteristics: PropertyCharacteristic[] | undefined | null): string {
  const v =
      findCharacteristic(characteristics, "Surface") ||
      findCharacteristic(characteristics, "Area") ||
      findCharacteristic(characteristics, "Superficie")
  if (!v) return "N/A"
  const match = v.match(/\d+/)
  return match ? match[0] : v
}

export function getPropertyRooms(characteristics: PropertyCharacteristic[] | undefined | null): string {
  const v =
      findCharacteristic(characteristics, "Pièces") ||
      findCharacteristic(characteristics, "Pieces") ||
      findCharacteristic(characteristics, "Rooms")
  return v || "N/A"
}

/**
 * Extract a list of “features” suitable for badges.
 * Definition: a characteristic whose value is truthy (not “non”, “no”, "false", 0)…
 * and whose name is not purely numeric‑driven (e.g., we exclude Chambre, Surface, etc.).
 */
export function getPropertyFeatures(
    characteristics: PropertyCharacteristic[] | undefined | null,
): string[] {
  if (!characteristics?.length) return []

  const EXCLUDE_NAMES = [
    "chambres",
    "chambre",
    "bedroom",
    "bedrooms",
    "surface",
    "superficie",
    "area",
    "pièces",
    "pieces",
    "rooms",
  ]

  const truthy = (val: string) => {
    const lower = val.toLowerCase()
    return !["non", "no", "false", "0", "0m²", "0 m²"].includes(lower)
  }

  return characteristics
      .filter((c) => c?.name && c?.value && truthy(c.value))
      .filter((c) => !EXCLUDE_NAMES.includes(c.name.toLowerCase()))
      .map((c) => c.name)
}

export function hasAmenity(
    characteristics: PropertyCharacteristic[] | undefined | null,
    amenityName: string,
): boolean {
  const v = findCharacteristic(characteristics, amenityName)
  if (!v) return false
  const lower = v.toLowerCase()
  return !["non", "no", "false"].includes(lower)
}

export function getCharacteristicsMap(
    characteristics: PropertyCharacteristic[] | undefined | null,
): Record<string, string> {
  const map: Record<string, string> = {}
  characteristics?.forEach((c) => {
    if (c?.name && c?.value) map[c.name] = c.value
  })
  return map
}

export function getTotalMonthlyCost(property: Property | null | undefined): number {
  if (!property?.price) return 0
  return (property.price.monthlyPrice || 0) + (property.price.chargesPrice || 0)
}

export function formatTotalMonthlyCost(property: Property | null | undefined): string {
  const total = getTotalMonthlyCost(property)
  return total ? `${total}€/mois (tout compris)` : "Coût total non disponible"
}

export function getPropertyType(
    characteristics: PropertyCharacteristic[] | undefined | null,
): string {
  const rooms = getPropertyRooms(characteristics)
  const beds = getPropertyBeds(characteristics)
  if (rooms !== "N/A") {
    const n = parseInt(rooms)
    if (!isNaN(n)) return n === 1 ? "Studio" : `T${n}`
  }
  if (beds !== "N/A") {
    const n = parseInt(beds)
    if (!isNaN(n)) return n === 0 ? "Studio" : `T${n + 1}`
  }
  return "Appartement"
}

export function isPropertyAvailable(property: Property | null | undefined): boolean {
  return !!property && property.deletedAt === null
}

export function generatePropertySlug(property: Property | null | undefined): string {
  if (!property?.title) return "property-details"
  return property.title
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
}

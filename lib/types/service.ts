export interface Media {
  id: string
  fullUrl: string
  name: string
  originalName: string
  placeHolder: string
  resourceType: string
  order: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  order: string
  price: number
  characteristics: string[]
  images: Media[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ServiceFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
}
export function formatServicePrice(price: number): string {
  return `${price}€/mois`
}

export function getMainServiceImage(images: Media[]): string {
  if (images.length === 0) {
    return "/placeholder.svg?height=240&width=360&text=No+Image"
  }
  const sortedImages = [...images].sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
  return sortedImages[0].fullUrl
}

export function getAllServiceImageUrls(images: Media[]): string[] {
  const sortedImages = [...images].sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
  return sortedImages.map((img) => img.fullUrl)
}

export function getServiceFeatures(characteristics: string[]): string[] {
  return characteristics || []
}

export function sortServicesByOrder(services: Service[]): Service[] {
  return [...services].sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
}

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

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export enum ProductTypeEnum {
  BOOK = "BOOK",
  PRODUCT = "PRODUCT",
}

export interface Product {
  id: string
  title: string
  description: string
  link: string
  category?: Category
  type: ProductTypeEnum
  price: number
  discount: number
  images: Media[]
  characteristics: string[]
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ProductFilters {
  search?: string
  category?: string
  type?: ProductTypeEnum
  isFeatured?: boolean
  minPrice?: number
  maxPrice?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  take: number
}
export function formatProductPrice(price: number, discount = 0): string {
  if (discount > 0) {
    const discountedPrice = price - (price * discount) / 100
    return `${discountedPrice.toFixed(0)}€`
  }
  return `${price.toFixed(0)}€`
}

export function getOriginalPrice(price: number, discount = 0): string | null {
  if (discount > 0) {
    return `${price.toFixed(0)}€`
  }
  return null
}

export function getMainProductImage(images: Media[]): string {
  if (images.length === 0) {
    return "/placeholder.svg?height=240&width=360&text=No+Image"
  }
  const sortedImages = [...images].sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
  return sortedImages[0].fullUrl
}

export function getAllProductImageUrls(images: Media[]): string[] {
  const sortedImages = [...images].sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
  return sortedImages.map((img) => img.fullUrl)
}

export function getProductFeatures(characteristics: string[]): string[] {
  return characteristics || []
}

export function isProductOnSale(discount: number): boolean {
  return discount > 0
}

export function getDiscountPercentage(discount: number): string {
  return `${discount.toFixed(0)}%`
}

export function getProductTypeLabel(type: ProductTypeEnum): string {
  switch (type) {
    case ProductTypeEnum.BOOK:
      return "Livre"
    case ProductTypeEnum.PRODUCT:
      return "Produit"
    default:
      return "Produit"
  }
}

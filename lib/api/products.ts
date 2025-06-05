"use client"
interface ProductImage {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  fullUrl: string
  name: string
  originalName: string
  placeHolder: string
  resourceType: string
  order: string
}

interface Product {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  title: string
  description: string
  link: string
  type: "BOOK" | "PRODUCT" | "FORMATION" | "TOOL"
  price: number
  discount: number
  characteristics: string[]
  isFeatured: boolean
  images: ProductImage[]
  category: string | null
}
interface ProductFilters {
  type?: "BOOK" | "PRODUCT" | "FORMATION" | "TOOL"
  category?: string
  isFeatured?: boolean
  minPrice?: number
  maxPrice?: number
  limit?: number
  offset?: number
  search?: string
}
interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}
const MOCK_PRODUCTS: Product[] = [
  {
    id: "8fcbccfa-b50d-4298-9653-b2f299c8ca41",
    createdAt: "2025-06-03T18:52:59.749Z",
    updatedAt: "2025-06-04T09:53:28.555Z",
    deletedAt: null,
    title: "Guide de l'investissement immobilier 2024",
    description: "Un guide complet pour maîtriser l'investissement immobilier en 2024",
    link: "https://www.youtube.com/watch?v=fpPY_L8JzWI",
    type: "BOOK",
    price: 2499,
    discount: 500,
    characteristics: [
      "200+ pages d'expertise",
      "Stratégies éprouvées",
      "Cas d'études réels"
    ],
    isFeatured: true,
    images: [
      {
        id: "2577d7a8-2f49-410c-8d03-63c3b93953d5",
        createdAt: "2025-06-03T18:52:59.920Z",
        updatedAt: "2025-06-04T09:53:23.193Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/products/9458e0b12fd492fcf6e214cb9e1bd396.png",
        name: "9458e0b12fd492fcf6e214cb9e1bd396.png",
        originalName: "e657042208b31ee220615e2392866658 (2).png",
        placeHolder: "9458e0b12fd492fcf6e214cb9e1bd396.png",
        resourceType: "image",
        order: "0"
      },
      {
        id: "9317a4a6-6dbb-4fc2-9680-0597a84680f7",
        createdAt: "2025-06-04T09:53:18.314Z",
        updatedAt: "2025-06-04T09:53:23.193Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/products/071b380a2c363ec5545655325afd3705.png",
        name: "071b380a2c363ec5545655325afd3705.png",
        originalName: "logo_LAG_Holding-removebg-preview.png",
        placeHolder: "071b380a2c363ec5545655325afd3705.png",
        resourceType: "auto",
        order: "1"
      }
    ],
    category: "Investissement"
  },
  {
    id: "b2f299c8-ca41-4298-9653-8fcbccfa-b51d",
    createdAt: "2025-06-03T18:52:59.749Z",
    updatedAt: "2025-06-04T09:53:28.555Z",
    deletedAt: null,
    title: "Stratégies de location rentable",
    description: "Découvrez les meilleures stratégies pour optimiser vos revenus locatifs",
    link: "https://www.youtube.com/watch?v=rental-strategies",
    type: "BOOK",
    price: 1999,
    discount: 0,
    characteristics: [
      "Techniques avancées",
      "Optimisation fiscale",
      "Gestion locative"
    ],
    isFeatured: false,
    images: [
      {
        id: "rental-img-1",
        createdAt: "2025-06-03T18:52:59.920Z",
        updatedAt: "2025-06-04T09:53:23.193Z",
        deletedAt: null,
        fullUrl: "/placeholder.svg?height=200&width=150&text=Rental+Strategies",
        name: "rental-strategies.png",
        originalName: "strategies-location.png",
        placeHolder: "rental-strategies.png",
        resourceType: "image",
        order: "0"
      }
    ],
    category: null
  },
  {
    id: "analysis-tool-4298-9653-b2f299c8ca41",
    createdAt: "2025-06-03T18:52:59.749Z",
    updatedAt: "2025-06-04T09:53:28.555Z",
    deletedAt: null,
    title: "Suite d'analyse immobilière Pro",
    description: "Outils professionnels pour analyser vos investissements immobiliers",
    link: "https://www.youtube.com/watch?v=analysis-suite",
    type: "TOOL",
    price: 4999,
    discount: 3000,
    characteristics: [
      "15 tableurs Excel",
      "Guide d'utilisation",
      "Mises à jour gratuites"
    ],
    isFeatured: true,
    images: [
      {
        id: "analysis-img-main",
        createdAt: "2025-06-03T18:52:59.920Z",
        updatedAt: "2025-06-04T09:53:23.193Z",
        deletedAt: null,
        fullUrl: "/placeholder.svg?height=160&width=200&text=Analysis+Kit",
        name: "analysis-kit.png",
        originalName: "suite-analyse.png",
        placeHolder: "analysis-kit.png",
        resourceType: "image",
        order: "0"
      }
    ],
    category: "Outils Pro"
  },
  {
    id: "formation-video-masterclass-unique",
    createdAt: "2025-06-03T18:52:59.749Z",
    updatedAt: "2025-06-04T09:53:28.555Z",
    deletedAt: null,
    title: "Formation vidéo masterclass",
    description: "Formation complète en vidéo pour devenir expert en investissement immobilier",
    link: "https://www.youtube.com/watch?v=video-formation",
    type: "FORMATION",
    price: 19999,
    discount: 10000,
    characteristics: [
      "12h de vidéos HD",
      "Certificat professionnel",
      "Accès à vie"
    ],
    isFeatured: true,
    images: [
      {
        id: "formation-img-main",
        createdAt: "2025-06-03T18:52:59.920Z",
        updatedAt: "2025-06-04T09:53:23.193Z",
        deletedAt: null,
        fullUrl: "/placeholder.svg?height=160&width=200&text=Video+Course",
        name: "video-course.png",
        originalName: "formation-video.png",
        placeHolder: "video-course.png",
        resourceType: "image",
        order: "0"
      }
    ],
    category: null
  }
]
const API_CONFIG = {
  USE_MOCK_DATA: false, // Set to false when real endpoints are ready
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://lag-immobiliers-api.souheib-riache.fr/api/v1",
  ENDPOINTS: {
    PRODUCTS: "/products",
    PRODUCT_BY_ID: (id: string) => `/products/${id}`,
    FEATURED_PRODUCTS: "/products/featured"
  }
}


class ProductAPIService {


  private async simulateNetworkDelay(min = 300, max = 800): Promise<void> {
    if (API_CONFIG.USE_MOCK_DATA) {
      const delay = Math.random() * (max - min) + min
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }


  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }


  private applyFilters(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products]
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }
    if (filters.isFeatured !== undefined) {
      filtered = filtered.filter(p => p.isFeatured === filters.isFeatured)
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => (p.price - p.discount) >= filters.minPrice!)
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => (p.price - p.discount) <= filters.maxPrice!)
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      )
    }

    return filtered
  }


  async getAllProducts(): Promise<Product[]> {
    await this.simulateNetworkDelay()

    if (API_CONFIG.USE_MOCK_DATA) {
      return JSON.parse(JSON.stringify(MOCK_PRODUCTS))
    }
    return this.makeRequest<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS)
  }


  async getFilteredProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    await this.simulateNetworkDelay()

    if (API_CONFIG.USE_MOCK_DATA) {
      const filtered = this.applyFilters(MOCK_PRODUCTS, filters)
      const limit = filters.limit || 10
      const offset = filters.offset || 0
      const page = Math.floor(offset / limit) + 1
      const paginatedItems = filtered.slice(offset, offset + limit)

      return {
        items: JSON.parse(JSON.stringify(paginatedItems)),
        total: filtered.length,
        page,
        limit,
        hasNext: offset + limit < filtered.length,
        hasPrev: offset > 0
      }
    }
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, String(value))
    })

    const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS}?${queryParams.toString()}`
    return this.makeRequest<PaginatedResponse<Product>>(endpoint)
  }


  async getProductById(id: string): Promise<Product> {
    await this.simulateNetworkDelay()

    if (API_CONFIG.USE_MOCK_DATA) {
      const product = MOCK_PRODUCTS.find(p => p.id === id)
      if (!product) {
        throw new Error(`Product with ID ${id} not found`)
      }
      return JSON.parse(JSON.stringify(product))
    }

    return this.makeRequest<Product>(API_CONFIG.ENDPOINTS.PRODUCT_BY_ID(id))
  }


  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    const result = await this.getFilteredProducts({
      isFeatured: true,
      limit
    })
    return result.items
  }


  async getProductsByType(type: Product['type'], limit?: number): Promise<Product[]> {
    const result = await this.getFilteredProducts({
      type,
      limit
    })
    return result.items
  }


  async searchProducts(query: string, limit = 20): Promise<Product[]> {
    const result = await this.getFilteredProducts({
      search: query,
      limit
    })
    return result.items
  }
}
export const productAPI = new ProductAPIService()
export type { Product, ProductImage, ProductFilters, PaginatedResponse }
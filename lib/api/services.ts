import type { Service, ServiceFilters } from "@/lib/types/service"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://lag-immobiliers-api.souheib-riache.fr/api/v1"
const FALLBACK_SERVICES: Service[] = [
  {
    id: "44ba69ba-8b39-46cf-8b14-7547b503461a",
    createdAt: "2025-05-28T17:33:50.625Z",
    updatedAt: "2025-06-03T09:59:55.751Z",
    deletedAt: null,
    title: "Accompagnement Premium",
    description:
      "Service complet d'accompagnement pour vos investissements immobiliers. Recherche, négociation, gestion administrative complète avec un suivi personnalisé de A à Z.",
    shortDescription: "Service complet d'accompagnement immobilier",
    order: "0",
    price: 299,
    characteristics: [
      "Recherche personnalisée de biens",
      "Négociation professionnelle",
      "Gestion administrative complète",
      "Suivi locataire personnalisé",
      "Conseils fiscaux inclus",
    ],
    images: [
      {
        id: "9bcc42ce-504d-472c-96c1-b7e5798feda9",
        createdAt: "2025-06-03T08:31:29.924Z",
        updatedAt: "2025-06-03T08:31:29.924Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/accompaniement/bef843c60d0b23522f67030553bcbfbb.png",
        name: "bef843c60d0b23522f67030553bcbfbb.png",
        originalName: "e657042208b31ee220615e2392866658.png",
        placeHolder: "bef843c60d0b23522f67030553bcbfbb.png",
        resourceType: "auto",
        order: "0",
      },
      {
        id: "b6725ab7-4dce-4186-ac59-931cb79aa8be",
        createdAt: "2025-06-03T09:59:41.675Z",
        updatedAt: "2025-06-03T09:59:41.798Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/accompaniement/6e121153c0ce8d980e4b5c89c1a2d275.jpg",
        name: "6e121153c0ce8d980e4b5c89c1a2d275.jpg",
        originalName: "pexels-pixabay-164522 (1).jpg",
        placeHolder: "6e121153c0ce8d980e4b5c89c1a2d275.jpg",
        resourceType: "auto",
        order: "0",
      },
    ],
  },
  {
    id: "4f6130a1-a066-45d4-b9df-bc3cfcaa64fa",
    createdAt: "2025-05-28T17:30:52.448Z",
    updatedAt: "2025-06-03T08:58:24.469Z",
    deletedAt: null,
    title: "Gestion Locative Complète",
    description:
      "Service de gestion locative complète pour optimiser vos revenus et minimiser vos contraintes administratives. Nous nous occupons de tout pour vous.",
    shortDescription: "Gestion locative complète et personnalisée",
    order: "2",
    price: 149,
    characteristics: [
      "Sélection des locataires",
      "Gestion des impayés",
      "Suivi personnalisé",
      "Entretien et réparations",
      "Rapports mensuels détaillés",
    ],
    images: [
      {
        id: "6df294b7-5fde-4cfb-bbca-7af30f1ec567",
        createdAt: "2025-06-03T08:56:31.643Z",
        updatedAt: "2025-06-03T08:56:31.689Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/accompaniement/cb7acefdf5021842ecd03217466b859a.jpeg",
        name: "cb7acefdf5021842ecd03217466b859a.jpeg",
        originalName: "WhatsApp Image 2025-04-25 at 10.24.39.jpeg",
        placeHolder: "cb7acefdf5021842ecd03217466b859a.jpeg",
        resourceType: "auto",
        order: "0",
      },
    ],
  },
  {
    id: "07bcc420-b177-4d88-aec6-253ff5311f97",
    createdAt: "2025-05-28T17:34:23.309Z",
    updatedAt: "2025-05-28T17:34:23.309Z",
    deletedAt: null,
    title: "Conseil Patrimonial",
    description:
      "Conseil personnalisé pour optimiser votre stratégie patrimoniale et fiscale. Analyse complète de votre situation et recommandations sur mesure.",
    shortDescription: "Conseil patrimonial personnalisé",
    order: "111",
    price: 199,
    characteristics: [
      "Analyse patrimoniale complète",
      "Optimisation fiscale",
      "Stratégie d'investissement",
      "Suivi régulier",
      "Recommandations personnalisées",
    ],
    images: [
      {
        id: "9d327b39-806f-4118-b155-38ed7595991e",
        createdAt: "2025-05-30T08:40:44.985Z",
        updatedAt: "2025-05-30T08:40:44.985Z",
        deletedAt: null,
        fullUrl: "https://cdn.joy-it.fr/accompaniement/2497a6230e68761fa31adf5a30ab372d.png",
        name: "2497a6230e68761fa31adf5a30ab372d.png",
        originalName: "988f2f5dd5881f8374e83e98d5a92fcd.png",
        placeHolder: "2497a6230e68761fa31adf5a30ab372d.png",
        resourceType: "auto",
        order: "0",
      },
    ],
  },
]

class ServiceAPI {
  private async fetchAPI(endpoint: string, options?: RequestInit) {
    const url = `${API_BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Request failed:", error)
      throw error
    }
  }
  async getAllServices(): Promise<Service[]> {
    try {
      const response = await this.fetchAPI("/accompaniements")
      return response
    } catch (error) {
      console.warn("API not available, using fallback data:", error)
      return FALLBACK_SERVICES
    }
  }

  async getFilteredServices(filters: ServiceFilters): Promise<Service[]> {
    try {
      const searchParams = new URLSearchParams()

      if (filters.search) searchParams.append("search", filters.search)
      if (filters.minPrice) searchParams.append("minPrice", filters.minPrice.toString())
      if (filters.maxPrice) searchParams.append("maxPrice", filters.maxPrice.toString())

      const queryString = searchParams.toString()
      const response = await this.fetchAPI(`/accompaniements${queryString ? `?${queryString}` : ""}`)

      return response
    } catch (error) {
      console.warn("API not available, using fallback data:", error)
      let filteredItems = [...FALLBACK_SERVICES]

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredItems = filteredItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.shortDescription.toLowerCase().includes(searchTerm),
        )
      }

      if (filters.minPrice || filters.maxPrice) {
        filteredItems = filteredItems.filter((item) => {
          const price = item.price
          if (filters.minPrice && price < filters.minPrice) return false
          if (filters.maxPrice && price > filters.maxPrice) return false
          return true
        })
      }

      return filteredItems
    }
  }

  async getServiceById(id: string): Promise<Service> {
    try {
      const response = await this.fetchAPI(`/accompaniements/${id}`)
      return response
    } catch (error) {
      console.warn("API not available, using fallback data:", error)
      const service = FALLBACK_SERVICES.find((item) => item.id === id)
      if (!service) {
        throw new Error("Service not found")
      }
      return service
    }
  }

  async getFeaturedServices(limit = 3): Promise<Service[]> {
    try {
      const services = await this.getAllServices()
      return services.sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order)).slice(0, limit)
    } catch (error) {
      console.warn("API not available, using fallback data:", error)
      return FALLBACK_SERVICES.sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order)).slice(0, limit)
    }
  }
}

export const serviceAPI = new ServiceAPI()

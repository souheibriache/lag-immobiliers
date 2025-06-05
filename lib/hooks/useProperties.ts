"use client"

import { useState, useEffect } from "react"
import { propertyAPI } from "@/lib/api/properties"
import type { Property, PropertyFilters, PaginatedResponse } from "@/lib/api/properties"


export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await propertyAPI.getAllProperties()
        setProperties(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens")
        console.error("Error fetching properties:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyAPI.getAllProperties()
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens")
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch }
}


export function useFilteredProperties(filters: PropertyFilters) {
  const [data, setData] = useState<PaginatedResponse<Property> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await propertyAPI.getFilteredProperties(filters)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens")
        console.error("Error fetching filtered properties:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFilteredProperties()
  }, [JSON.stringify(filters)]) // Re-run when filters change

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await propertyAPI.getFilteredProperties(filters)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}


export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchProperty = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await propertyAPI.getPropertyById(id)
        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement du bien")
        console.error("Error fetching property:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  const refetch = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      const data = await propertyAPI.getPropertyById(id)
      setProperty(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement du bien")
    } finally {
      setLoading(false)
    }
  }

  return { property, loading, error, refetch }
}


export function useFeaturedProperties(limit = 6) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await propertyAPI.getFeaturedProperties(limit)
        setProperties(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens mis en avant")
        console.error("Error fetching featured properties:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProperties()
  }, [limit])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyAPI.getFeaturedProperties(limit)
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des biens mis en avant")
    } finally {
      setLoading(false)
    }
  }

  return { properties, loading, error, refetch }
}


export function usePropertySearch() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<string>("")

  const search = async (searchQuery: string, limit = 20) => {
    if (!searchQuery.trim()) {
      setProperties([])
      setQuery("")
      return
    }

    try {
      setLoading(true)
      setError(null)
      setQuery(searchQuery)
      const data = await propertyAPI.searchProperties(searchQuery, limit)
      setProperties(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la recherche")
      console.error("Error searching properties:", err)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setProperties([])
    setQuery("")
    setError(null)
  }

  return { properties, loading, error, search, query, clearSearch }
}


export function usePropertyInterest() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitInterest = async (data: {
    propertyId: string
    name: string
    email: string
    phone: string
    message: string
  }) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await propertyAPI.submitPropertyInterest(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi de votre demande")
    } finally {
      setLoading(false)
    }
  }

  return { submitInterest, loading, error, success }
}
export function usePropertyInteractions() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("property-favorites")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (err) {
      console.error("Error loading favorites:", err)
    }
  }, [])

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
          ? prev.filter(id => id !== propertyId)
          : [...prev, propertyId]
      try {
        localStorage.setItem("property-favorites", JSON.stringify(newFavorites))
      } catch (err) {
        console.error("Error saving favorites:", err)
      }

      return newFavorites
    })
  }

  const isFavorite = (propertyId: string): boolean => {
    return favorites.includes(propertyId)
  }
  const expressInterest = async (propertyId: string, propertyTitle: string): Promise<boolean> => {
    try {
      setLoading(true)
      if (!favorites.includes(propertyId)) {
        toggleFavorite(propertyId)
      }
      await new Promise(resolve => setTimeout(resolve, 500))

      return true
    } catch (err) {
      console.error("Error expressing interest:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    expressInterest,
    loading
  }
}
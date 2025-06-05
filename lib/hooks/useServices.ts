"use client"

import { useState, useEffect } from "react"
import { serviceAPI } from "@/lib/api/services"
import type { Service, ServiceFilters } from "@/lib/types/service"

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await serviceAPI.getAllServices()
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des services")
        console.error("Error fetching services:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await serviceAPI.getAllServices()
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des services")
    } finally {
      setLoading(false)
    }
  }

  return { services, loading, error, refetch }
}

export function useFilteredServices(filters: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await serviceAPI.getFilteredServices(filters)
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des services")
        console.error("Error fetching filtered services:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [JSON.stringify(filters)])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await serviceAPI.getFilteredServices(filters)
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des services")
    } finally {
      setLoading(false)
    }
  }

  return { services, loading, error, refetch }
}

export function useService(id: string) {
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchService = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await serviceAPI.getServiceById(id)
        setService(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement du service")
        console.error("Error fetching service:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id])

  const refetch = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      const data = await serviceAPI.getServiceById(id)
      setService(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement du service")
    } finally {
      setLoading(false)
    }
  }

  return { service, loading, error, refetch }
}

export function useFeaturedServices(limit = 3) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await serviceAPI.getFeaturedServices(limit)
        setServices(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des services mis en avant")
        console.error("Error fetching featured services:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedServices()
  }, [limit])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await serviceAPI.getFeaturedServices(limit)
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des services mis en avant")
    } finally {
      setLoading(false)
    }
  }

  return { services, loading, error, refetch }
}

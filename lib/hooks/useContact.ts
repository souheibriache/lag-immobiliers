"use client"

import { useState, useEffect } from "react"
import { contactAPI } from "@/lib/api/contact"
import type { ContactInfo } from "@/lib/api/contact"

export function useContact() {
    const [contact, setContact] = useState<ContactInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await contactAPI.getContactInfo()
                setContact(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur lors du chargement des informations de contact")
                console.error("Error fetching contact info:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchContact()
    }, [])

    const refetch = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await contactAPI.getContactInfo()
            setContact(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des informations de contact")
        } finally {
            setLoading(false)
        }
    }

    return { contact, loading, error, refetch }
}
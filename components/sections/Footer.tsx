"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useContact } from "@/lib/hooks/useContact"

export default function Footer() {
    const { contact, loading, error } = useContact()

    // Helper function to format phone number for display
    const formatPhoneForDisplay = (phone: string) => {
        if (!phone) return null
        // Remove any non-digit characters and format for French display
        const cleaned = phone.replace(/\D/g, '')
        if (cleaned.length === 10) {
            return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`
        }
        return phone
    }

    // Helper function to format phone number for tel: link
    const formatPhoneForLink = (phone: string) => {
        if (!phone) return null
        return phone.startsWith('+') ? phone : `+33${phone.replace(/^0/, '')}`
    }

    // Fallback values while loading or if API fails
    const fallbackEmail = "contact@lag-holding.fr"
    const fallbackPhone = "01 23 45 67 89"
    const fallbackPhoneLink = "+33123456789"

    const displayEmail = contact?.email || fallbackEmail
    const displayPhone = contact?.phoneNumber ? formatPhoneForDisplay(contact.phoneNumber) : fallbackPhone
    const phoneLink = contact?.phoneNumber ? formatPhoneForLink(contact.phoneNumber) : fallbackPhoneLink

    return (
        <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 animate-[pulse_8s_infinite]"
            />

            <div aria-hidden className="absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-[hsl(var(--brand-light))]/20 to-transparent" />

            <div className="section-container relative z-10 grid gap-12 py-20 md:grid-cols-3">
                <div>
                    <Image src="/logo-white.svg" alt="LAG" width={160} height={70} className="mb-6" />
                    <p className="max-w-xs text-sm leading-relaxed">
                        LAG Holding accompagne les investisseurs ambitieux vers un patrimoine performant et durable.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm">
                    <div>
                        <h3 className="mb-3 font-semibold text-white">Navigation</h3>
                        {["#biens|Portfolio", "#services|Services", "#ressources|Expertise", "#contact|Contact"].map((s) => {
                            const [href, label] = s.split("|")
                            return (
                                <Link key={href} href={href} className="block py-1 hover:text-white">
                                    {label}
                                </Link>
                            )
                        })}
                    </div>
                    <div>
                        <h3 className="mb-3 font-semibold text-white">Contact</h3>
                        <a
                            href={`mailto:${displayEmail}`}
                            className="flex items-center gap-2 py-1 hover:text-white"
                        >
                            <Mail size={14} /> {displayEmail}
                        </a>
                        {phoneLink && (
                            <a
                                href={`tel:${phoneLink}`}
                                className="flex items-center gap-2 py-1 hover:text-white"
                            >
                                <Phone size={14} /> {displayPhone}
                            </a>
                        )}

                        {/* Address information if available */}
                        {contact?.address && (
                            <div className="mt-2 text-xs text-slate-400">
                                {contact.address.addressLine1 && (
                                    <div>{contact.address.addressLine1}</div>
                                )}
                                {contact.address.addressLine2 && (
                                    <div>{contact.address.addressLine2}</div>
                                )}
                                {(contact.address.postalCode || contact.address.city) && (
                                    <div>
                                        {contact.address.postalCode && `${contact.address.postalCode} `}
                                        {contact.address.city}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <Newsletter />
            </div>

            {/* Social Media Links */}
            <div className="relative z-10 border-t border-white/10 py-6">
                <div className="section-container flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                        © {new Date().getFullYear()} LAG Holding — Tous droits réservés
                    </div>

                    <div className="flex gap-4">
                        {contact?.linkedin && (
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="text-slate-400 transition hover:text-white"
                            >
                                <Linkedin size={20} />
                            </a>
                        )}
                        {contact?.twitter && (
                            <a
                                href={contact.twitter}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="text-slate-400 transition hover:text-white"
                            >
                                <Twitter size={20} />
                            </a>
                        )}
                        {contact?.facebook && (
                            <a
                                href={contact.facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="text-slate-400 transition hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        )}
                        {contact?.instagram && (
                            <a
                                href={contact.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="text-slate-400 transition hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}

function Newsletter() {
    const [sent, setSent] = useState(false)
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 4000)
    }

    return (
        <div>
            <h3 className="mb-3 font-semibold text-white">Newsletter</h3>
            {sent ? (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-[hsl(var(--brand-light))]"
                >
                    Merci, inscription confirmée!
                </motion.p>
            ) : (
                <motion.form
                    onSubmit={submit}
                    initial={false}
                    className="flex max-w-xs overflow-hidden rounded-full bg-white p-1 shadow-inner"
                >
                    <input
                        type="email"
                        required
                        placeholder="Votre email"
                        className="flex-1 rounded-full px-4 text-sm text-slate-800 placeholder-slate-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-[hsl(var(--brand))] p-2 text-white transition hover:bg-[hsl(var(--brand-light))]"
                        aria-label="S'abonner"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </motion.form>
            )}

            <p className="mt-4 text-xs text-slate-500">
                Recevez nos dernières opportunités d'investissement
            </p>
        </div>
    )
}
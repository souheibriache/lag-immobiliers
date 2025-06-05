"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Linkedin, Twitter, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import {useState} from "react";

/**
 * Constellation Footer – immersive dark anchor
 * • Animated twinkling‑stars canvas (GPU‑friendly)
 * • Accent glow on CTAs, focus rings
 * • Newsletter field with success morph
 * • Responsive 3‑column grid → single column on mobile
 */

export default function Footer() {
  return (
      <footer className="relative overflow-hidden bg-slate-900 text-slate-300">
        {/* twinkling stars backdrop */}
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 animate-[pulse_8s_infinite]"
        />

        {/* top accent gradient */}
        <div aria-hidden className="absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-[hsl(var(--brand-light))]/20 to-transparent" />

        <div className="section-container relative z-10 grid gap-12 py-20 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image src="/logo-white.svg" alt="LAG" width={160} height={70} className="mb-6" />
            <p className="max-w-xs text-sm leading-relaxed">
              LAG Holding accompagne les investisseurs ambitieux vers un patrimoine performant et durable.
            </p>
          </div>

          {/* Navigation */}
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
                  href="mailto:contact@lag-holding.fr"
                  className="flex items-center gap-2 py-1 hover:text-white"
              >
                <Mail size={14} /> contact@lag-holding.fr
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-2 py-1 hover:text-white">
                <Phone size={14} /> 01&nbsp;23&nbsp;45&nbsp;67&nbsp;89
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <Newsletter />
        </div>

        <div className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} LAG Holding — Tous droits réservés
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

        {/* socials */}
        <div className="mt-6 flex gap-4">
          <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 transition hover:text-white"
          >
            <Linkedin />
          </a>
          <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="text-slate-400 transition hover:text-white"
          >
            <Twitter />
          </a>
        </div>
      </div>
  )
}

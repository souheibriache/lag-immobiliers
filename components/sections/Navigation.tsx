"use client"

import { useEffect, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navigationLinks = [
    { href: "#biens", label: "Portfolio" },
    { href: "#services", label: "Services" },
    { href: "#ressources", label: "Expertise" },
    { href: "#contact", label: "Contact" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = navigationLinks.map(link => link.href.replace("#", ""))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(href.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isMenuOpen])

  return (
      <>
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? "bg-white/95 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 lg:h-20">

              {/* Logo - Fixed consistent path */}
              <Link href="/" className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="LAG Holding"
                    width={120}
                    height={60}
                    className="h-8 lg:h-10 w-auto"
                    priority
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigationLinks.map(({ href, label }) => (
                    <button
                        key={href}
                        onClick={() => scrollToSection(href)}
                        className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                            activeSection === href.replace("#", "")
                                ? "text-emerald-600 bg-emerald-50"
                                : isScrolled
                                    ? "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                                    : "text-white hover:text-emerald-200"
                        }`}
                    >
                      {label}
                    </button>
                ))}

                {/* Contact Phone */}
                <a
                    href="tel:+33123456789"
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                        isScrolled
                            ? "text-gray-700 hover:text-emerald-600"
                            : "text-white hover:text-emerald-200"
                    }`}
                >
                  <Phone size={16} />
                  01 23 45 67 89
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`lg:hidden p-2 rounded-lg transition-colors ${
                      isScrolled
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white hover:bg-white/10"
                  }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
              <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />

                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      {/* Fixed consistent logo path */}
                      <Image
                          src="/logo.png"
                          alt="LAG Holding"
                          width={100}
                          height={50}
                          className="h-8 w-auto"
                      />
                      <button
                          onClick={() => setIsMenuOpen(false)}
                          className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {navigationLinks.map(({ href, label }) => (
                          <button
                              key={href}
                              onClick={() => scrollToSection(href)}
                              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                  activeSection === href.replace("#", "")
                                      ? "text-emerald-600 bg-emerald-50 font-medium"
                                      : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                              }`}
                          >
                            {label}
                          </button>
                      ))}

                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <a
                            href="tel:+33123456789"
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Phone size={18} />
                          <div>
                            <div className="font-medium">01 23 45 67 89</div>
                            <div className="text-sm text-gray-500">Appelez maintenant</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
          )}
        </AnimatePresence>
      </>
  )
}
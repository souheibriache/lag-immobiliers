"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showScrollTop) return null

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed bottom-4 right-4 bg-[#577C65] hover:bg-[#9ABEA3] text-white p-2 rounded-full shadow-lg transition-colors duration-150 z-50"
    >
      <ArrowUp size={16} />
    </Button>
  )
}

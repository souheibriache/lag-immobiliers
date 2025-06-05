"use client"

import Navigation from "@/components/sections/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import PropertiesSection from "@/components/sections/PropertiesSection"
import ServicesSection from "@/components/sections/ServicesSection"
import ResourcesSection from "@/components/sections/ResourcesSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"

export default function LAGImmobilier() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                <HeroSection />
                <PropertiesSection />
                <ServicesSection />
                <ResourcesSection />
                <ContactSection />
                <TestimonialsSection />
            </main>
            <Footer />
        </div>
    )
}

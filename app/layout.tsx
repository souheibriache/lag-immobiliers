import "./globals.css"
import { Poppins, DM_Serif_Display } from "next/font/google"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-sans",
    display: "swap",
    preload: true,
})

const dm = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-display",
    display: "swap",
    preload: true,
})

export const metadata = {
    title: "LAG Holding • Investissement immobilier Premium",
    description:
        "Plateforme clé-en-main pour investisseurs exigeants : biens, services et expertise sous un même toit.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={`${poppins.variable} ${dm.variable}`}>
        <body className="bg-white text-foreground antialiased">{children}</body>
        </html>
    )
}

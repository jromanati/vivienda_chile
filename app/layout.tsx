import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Vivienda Chile - Encuentra la casa de tus sueños",
    template: "%s | Vivienda Chile",
  },
  description:
    "Asesoría inmobiliaria, propiedades exclusivas y servicios integrales en Chile. Encuentra la casa de tus sueños con nosotros.",
  keywords: ["inmobiliaria", "propiedades", "casas", "departamentos", "chile", "bienes raíces"],
  authors: [{ name: "Vivienda Chile" }],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://viviendachile.cl",
    siteName: "Vivienda Chile",
    title: "Vivienda Chile - Encuentra la casa de tus sueños",
    description: "Asesoría inmobiliaria, propiedades exclusivas y servicios integrales en Chile.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

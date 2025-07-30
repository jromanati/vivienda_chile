"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  backgroundImages?: string[]
}

const Hero = ({
  title = "Encuentra la casa de tus sueños con Vivienda Chile",
  subtitle = "Asesoría inmobiliaria, propiedades exclusivas y servicios integrales",
  ctaText = "Ver Propiedades",
  ctaLink = "/propiedades",
  backgroundImages = [
    "/images/quinta_region.png?height=600&width=1200&text=Casa+Playa+Viña+del+Mar",
    "/images/santiago.png?height=600&width=1200&text=Casa+Moderna+Santiago",
  ],
}: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Auto-change images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Images with Transitions */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Hero background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Dark overlay
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
 */}
        {/* Gradient overlay for better text readability*/}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-black/30"></div> 
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={
            { 
              transitionDelay: "0.2s",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)"
            }
          }
        >
          {title}
        </h1>
        <p
          className={`text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={
            { 
              transitionDelay: "0.4s",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)"
            }
          }
        >
          {subtitle}
        </p>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero

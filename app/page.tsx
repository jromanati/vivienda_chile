"use client";

import Hero from "@/components/Hero"
import { PropertyCard, ServiceCard } from "@/components/Card"
import AnimatedSection from "@/components/AnimatedSection"
import { services, testimonials } from "@/data/mockData"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import useAutoLogin from "@/hooks/useAutoLogin";
// ...tus demás importaciones
// import { useProperties } from "@/hooks/useProperties";
import { useState, useEffect, useCallback } from "react"
import useSWR from "swr"
import { useProperties, usePropertiesUpdates } from "@/hooks/useProperties"
import Navbar from "@/components/Navbar";
import type { Property } from "@/types"

export default function Home() {
  usePropertiesUpdates();
  useAutoLogin();
  const featuredServices = services
  const { getProperties } = useProperties()
  const asBool = (v: any) =>
      v === true || v === 1 || v === "1" || v === "true";
  
    // Filtro genérico de propiedades
    function filterProperties(
      list: Property[],
      opts: {
        published?: boolean;
        featured?: boolean;
        minImages?: number;
      } = {}
    ) {
      const { published, featured, minImages } = opts;
  
      return list.filter((p) => {
        if (published !== undefined && asBool(p.published) !== published) return false;
        if (featured !== undefined && asBool(p.featured) !== featured) return false;
        if (minImages && !(Array.isArray(p.images) && p.images.length >= minImages)) return false;
        return true;
      });
    }
    const fetchedProperties = useCallback(async (): Promise<Property[]> => {
      const propertiesResponse = await getProperties();
      const list: Property[] = Array.isArray(propertiesResponse) ? propertiesResponse : [];
      return filterProperties(list, { featured: true, minImages: 1 });
    }, [getProperties]);
    const { data: properties = [], isLoading } = useSWR('properties', fetchedProperties)
    const featuredProperties = properties.slice(0, 3)
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Navbar />
      <Hero />

      {/* Servicios Destacados */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos servicios integrales para todas tus necesidades inmobiliarias
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 100} animation="scale">
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={400}>
            <Link href="/servicios" className="btn-primary">
              Ver Todos los Servicios
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Propiedades Recientes */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Propiedades Destacadas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las mejores oportunidades del mercado inmobiliario
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <AnimatedSection key={property.id} delay={index * 100} animation="scale">
                <PropertyCard property={property} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12" delay={300}>
            <Link href="/propiedades" className="btn-primary">
              Ver Todas las Propiedades
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16 bg-blue-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Por qué elegir Viviendachile?</h2>
              <p className="text-xl mb-6 text-blue-100">
                Nuestra trayectoria de más de 10 años nos consolida como tu socio estratégico en el
mercado inmobiliario chileno. Brindamos un servicio integral que incluye asesoría profesional,
gestión de financiamiento y asesoría legal, garantizando la seguridad y confianza que necesitas
para la compra, venta o arriendo de tu propiedad de manera rápida y eficiente.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <span className="mr-3 text-2xl text-blue-200">✓</span>
                  <span>Asesoría personalizada y profesional</span>
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-3 text-2xl text-blue-200">✓</span>
                  <span>Gestión transparente y sin sorpresas</span>
                </li>
                <li className="flex items-center text-white">
                  <span className="mr-3 text-2xl text-blue-200">✓</span>
                  <span>Te acompañamos en todo el proceso</span>
                </li>
                {/* <li className="flex items-center text-white">
                  <span className="mr-3 text-2xl text-blue-200">✓</span>
                  <span>Acompañamiento integral en todo el proceso</span>
                </li> */}
              </ul>
              <Link
                href="/quienes-somos"
                className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transform hover:scale-105 inline-block"
              >
                Conoce Más Sobre Nosotros
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/home_sub_seccion.png?height=500&width=600"
                  alt="Equipo Vivienda Chile"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonios 
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} delay={index * 100} animation="scale">
                <div className="card-uniform text-center group">
                  <div className="p-8 flex flex-col h-full">
                    <div className="relative mb-4 inline-block flex-shrink-0">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex justify-center mb-4 flex-shrink-0">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current transform hover:scale-125 transition-transform duration-200"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic leading-relaxed flex-grow flex items-center justify-center text-center min-h-[4rem]">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      */}
      {/* CTA de Contacto */}
      <section className="py-16 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">¿Listo para encontrar tu próximo hogar?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Nuestro equipo profesional te ayudara en cada etapa del proceso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Contactar Ahora
              </Link>
              <Link
                href="/propiedades"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Explorar Propiedades
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

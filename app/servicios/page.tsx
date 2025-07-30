import Breadcrumbs from "@/components/Breadcrumbs"
import AnimatedSection from "@/components/AnimatedSection"
import { services } from "@/data/mockData"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Servicios",
  description: "Conoce todos nuestros servicios inmobiliarios: asesoría en compra, venta, arriendos e inversiones.",
}

export default function ServiciosPage() {
  const breadcrumbItems = [{ label: "Servicios" }]

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Nuestros Servicios</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Ofrecemos servicios integrales para todas tus necesidades inmobiliarias, con la experiencia y
              profesionalismo que nos caracteriza. Desde la compra hasta la inversión, te acompañamos en cada paso.
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 100}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Imagen */}
                  <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.title}</h2>

                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.shortDescription}</p>

                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Características principales:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.features.slice(0, 4).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href={`/servicios/${service.id}`} className="btn-primary flex-1 text-center">
                          Ver Detalles Completos
                        </Link>
                        <Link href="/contacto" className="btn-secondary flex-1 text-center">
                          Solicitar Información
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Propiedades Gestionadas</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
                <div className="text-blue-200">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
                <div className="text-blue-200">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                <div className="text-blue-200">Tasa de Éxito</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Necesitas asesoría personalizada?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Nuestro equipo de expertos está listo para ayudarte con cualquier consulta inmobiliaria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="btn-primary">
                Contactar Ahora
              </Link>
              <a
                href="tel:+56223456789"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Llamar Directamente
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

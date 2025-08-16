import { notFound } from "next/navigation"
import Image from "next/image"
import { services } from "@/data/mockData"
import Breadcrumbs from "@/components/Breadcrumbs"
import ContactForm from "@/components/ContactForm"
import AnimatedSection from "@/components/AnimatedSection"
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Navbar from "@/components/Navbar";

interface Props {
  params: { id: string }
}

// Generar metadata dinámico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    return {
      title: "Servicio no encontrado",
    }
  }

  return {
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
    },
  }
}

// Generar rutas estáticas
export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }))
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    notFound()
  }

  const breadcrumbItems = [{ label: "Servicios", href: "/servicios" }, { label: service.title }]

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{service.title}</h1>
              <p className="text-xl text-blue-100 leading-relaxed">{service.shortDescription}</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Descripción del Servicio</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{service.description}</p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Qué incluye este servicio?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Process Section */}
              <AnimatedSection delay={200}>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestro Proceso</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Consulta Inicial</h4>
                        <p className="text-gray-600">Analizamos tus necesidades y objetivos específicos.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Estrategia Personalizada</h4>
                        <p className="text-gray-600">Desarrollamos un plan de acción adaptado a tu situación.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ejecución y Seguimiento</h4>
                        <p className="text-gray-600">Implementamos la estrategia con seguimiento constante.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Resultados y Cierre</h4>
                        <p className="text-gray-600">Completamos el proceso con resultados exitosos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <AnimatedSection delay={300}>
                  <ContactForm serviceId={service.id} title="Solicitar Información" />
                </AnimatedSection>

                <AnimatedSection delay={400}>
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-700">10+ años de experiencia</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-700">Equipo especializado</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-700">Atención personalizada</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-gray-700">Resultados garantizados</span>
                      </li>
                    </ul>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-gray-300 mb-8">Contáctanos hoy mismo y descubre cómo podemos ayudarte</p>
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

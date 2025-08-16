import Breadcrumbs from "@/components/Breadcrumbs"
import AnimatedSection from "@/components/AnimatedSection"
import type { Metadata } from "next"
import Image from "next/image"
import { Award, Users, Home, TrendingUp } from "lucide-react"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Conoce la historia, misión y valores de Vivienda Chile. Más de 10 años de experiencia en el mercado inmobiliario.",
}

export default function QuienesSomosPage() {
  const breadcrumbItems = [{ label: "Quiénes Somos" }]

  const stats = [
    { icon: Home, number: "500+", label: "Propiedades Vendidas" },
    { icon: Users, number: "1000+", label: "Clientes Satisfechos" },
    { icon: Award, number: "10+", label: "Años de Experiencia" },
    { icon: TrendingUp, number: "95%", label: "Tasa de Éxito" },
  ]

  const team = [
    {
      name: "María González",
      role: "Directora General",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Con más de 15 años de experiencia en el sector inmobiliario, María lidera nuestro equipo con pasión y dedicación.",
    },
    {
      name: "Carlos Rodríguez",
      role: "Gerente de Ventas",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Especialista en ventas de propiedades premium, Carlos ha cerrado más de 200 transacciones exitosas.",
    },
    {
      name: "Ana Martínez",
      role: "Asesora Senior",
      image: "/placeholder.svg?height=300&width=300",
      description:
        "Experta en inversiones inmobiliarias, Ana ayuda a nuestros clientes a tomar las mejores decisiones financieras.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Breadcrumbs items={breadcrumbItems} /> */}

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Quiénes Somos</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Contamos con un equipo de profesionales comprometidos y con años de experiencia
inmobiliaria. Somos expertos en el manejo de trámites ante instituciones públicas y privadas,
simplificando la venta, compra o arriendo de tu propiedad.
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </section>

      {/* Estadísticas */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Nuestra Historia */}
      <section id="historia" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <div className="relative">
                <Image
                  src="/images/quienes_somos.jpg?height=500&width=600&text=Historia+Vivienda+Chile"
                  alt="Historia de Vivienda Chile"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-xl"
                />
                
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Viviendachile nace en 2018 con la visión de transformar la experiencia inmobiliaria en Chile, aprovechando la sólida experiencia de su fundador en el rubro bancario y financiero. Lo que comenzó como un ambicioso proyecto en una pequeña oficina en la comuna de Santiago, hoy se ha consolidado como una de las corredoras más confiables, respaldada por un equipo de profesionales especializados.
                  </p>
                  <p>
                    En nuestros años de trayectoria, hemos acompañado a cientos de clientes a alcanzar sus metas, desde la compra de su primer hogar hasta el éxito de sus proyectos de inversión. Nuestro crecimiento se ha cimentado en los valores que nos definen: transparencia, profesionalismo y compromiso.
                  </p>
                </div>
                {/* <div className="mt-8">
                  <a href="/contacto" className="btn-primary">
                    Conoce Más Sobre Nosotros
                  </a>
                </div> */}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Misión y Visión</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nuestros principios fundamentales que guían cada decisión y acción
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection animation="fade-right">
              <div className="card text-center h-full">
                <div className="p-8 flex flex-col h-full">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestra Misión</h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">
                    Facilitar el acceso a la vivienda propia a través de un servicio integral, transparente y
                    personalizado, acompañando a nuestros clientes en cada etapa del proceso inmobiliario con
                    profesionalismo y calidez humana.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <div className="card text-center h-full">
                <div className="p-8 flex flex-col h-full">
                  <div className="text-6xl mb-6">🌟</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Nuestra Visión</h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">
                    Ser la inmobiliaria líder en Chile, reconocida por nuestra excelencia en el servicio, innovación
                    tecnológica y compromiso con el desarrollo sostenible del mercado inmobiliario nacional.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section> */}

      {/* Nuestro Equipo */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce a los profesionales que hacen posible nuestro éxito
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="scale">
                <div className="card text-center group">
                  <div className="p-8">
                    <div className="relative mb-6 inline-block">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Los pilares que sostienen nuestra cultura empresarial
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection animation="scale">
              <div className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-200">🤝</div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Confianza</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Construimos relaciones duraderas basadas en la transparencia y honestidad.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={100}>
              <div className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-200">⭐</div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Excelencia</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nos esforzamos por superar las expectativas en cada proyecto.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={200}>
              <div className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-200">💡</div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Innovación</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Adoptamos las mejores tecnologías para optimizar nuestros servicios.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={300}>
              <div className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-200">❤️</div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Compromiso</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Nos dedicamos completamente al éxito de nuestros clientes.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres ser parte de nuestra historia?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Somos el respaldo que necesitas. Únete a cientos de clientes que hemos acompañado para encontrar la propiedad perfecta y asegurar sus inversiones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacto" className="btn-primary">
                Contactar Ahora
              </a>
              <a
                href="/propiedades"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Ver Propiedades
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

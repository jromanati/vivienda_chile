import Breadcrumbs from "@/components/Breadcrumbs"
import AnimatedSection from "@/components/AnimatedSection"
import ContactForm from "@/components/ContactForm"
import type { Metadata } from "next"
import Image from "next/image"
import { Users, TrendingUp, Award, Heart, Clock, DollarSign, GraduationCap, Coffee } from "lucide-react"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Trabaja con Nosotros",
  description:
    "Únete al equipo de Vivienda Chile. Descubre oportunidades de carrera en el sector inmobiliario más dinámico de Chile.",
}

export default function TrabajaConNosotrosPage() {
  const breadcrumbItems = [{ label: "Trabaja con Nosotros" }]

  const benefits = [
    {
      icon: DollarSign,
      title: "Salario Competitivo",
      description: "Remuneración acorde al mercado con bonos por desempeño y comisiones atractivas.",
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Profesional",
      description: "Plan de carrera estructurado con oportunidades de ascenso y desarrollo profesional.",
    },
    {
      icon: GraduationCap,
      title: "Capacitación Continua",
      description: "Programas de formación, cursos especializados y certificaciones en el sector inmobiliario.",
    },
    {
      icon: Clock,
      title: "Flexibilidad Horaria",
      description: "Horarios flexibles y modalidad híbrida para un mejor balance vida-trabajo.",
    },
    {
      icon: Heart,
      title: "Ambiente Familiar",
      description: "Cultura empresarial cálida, trabajo en equipo y ambiente colaborativo.",
    },
    {
      icon: Coffee,
      title: "Beneficios Adicionales",
      description: "Seguro de salud, días libres adicionales, actividades recreativas y más.",
    },
  ]

  const positions = [
    {
      title: "Asesor Inmobiliario Senior",
      department: "Ventas",
      type: "Tiempo Completo",
      location: "Santiago, Providencia",
      description:
        "Buscamos un asesor experimentado para liderar ventas de propiedades premium y desarrollar cartera de clientes VIP.",
      requirements: [
        "Mínimo 3 años de experiencia en ventas inmobiliarias",
        "Título profesional en áreas comerciales o afines",
        "Excelentes habilidades de comunicación",
        "Conocimiento del mercado inmobiliario de Santiago",
        "Licencia de conducir vigente",
      ],
    },
    {
      title: "Especialista en Marketing Digital",
      department: "Marketing",
      type: "Tiempo Completo",
      location: "Santiago, Providencia",
      description:
        "Únete a nuestro equipo de marketing para desarrollar estrategias digitales innovadoras y gestionar nuestra presencia online.",
      requirements: [
        "Título en Marketing, Publicidad o carreras afines",
        "Experiencia en marketing digital y redes sociales",
        "Conocimiento en Google Ads, Facebook Ads",
        "Manejo de herramientas de diseño (Photoshop, Canva)",
        "Experiencia en sector inmobiliario (deseable)",
      ],
    },
    {
      title: "Coordinador de Arriendos",
      department: "Administración",
      type: "Tiempo Completo",
      location: "Santiago, Providencia",
      description:
        "Gestiona nuestra cartera de arriendos, coordina mantenciones y brinda atención personalizada a propietarios y arrendatarios.",
      requirements: [
        "Experiencia en administración de propiedades",
        "Habilidades de organización y atención al detalle",
        "Capacidad de resolución de problemas",
        "Conocimientos básicos de mantención",
        "Disponibilidad para atención de emergencias",
      ],
    },
    {
      title: "Asesor Inmobiliario Junior",
      department: "Ventas",
      type: "Tiempo Completo",
      location: "Santiago, Providencia",
      description:
        "Oportunidad perfecta para iniciar tu carrera en el sector inmobiliario con mentoring personalizado y capacitación integral.",
      requirements: [
        "Título profesional o técnico",
        "Orientación al servicio al cliente",
        "Proactividad y ganas de aprender",
        "Habilidades de comunicación",
        "Disponibilidad para trabajar fines de semana",
      ],
    },
  ]

  const process = [
    {
      step: "1",
      title: "Postulación",
      description: "Envía tu CV y carta de presentación a través de nuestro formulario online.",
    },
    {
      step: "2",
      title: "Revisión",
      description: "Nuestro equipo de RRHH revisará tu perfil y experiencia en un plazo de 5 días hábiles.",
    },
    {
      step: "3",
      title: "Entrevista Inicial",
      description: "Entrevista telefónica o videollamada para conocerte mejor y evaluar fit cultural.",
    },
    {
      step: "4",
      title: "Entrevista Técnica",
      description: "Reunión presencial con el equipo para evaluar competencias técnicas y experiencia.",
    },
    {
      step: "5",
      title: "Oferta",
      description: "Si eres seleccionado, te haremos una oferta competitiva y acordaremos fecha de inicio.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Breadcrumbs items={breadcrumbItems} /> */}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white bg-opacity-5 rounded-full"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-left">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Trabaja con Nosotros</h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-6 leading-relaxed">
                  ¿Buscas un desafío profesional en el sector inmobiliario? Estamos en constante búsqueda de talento motivado y comprometido con la excelencia en el servicio al cliente. ¡Únete a nuestro equipo y sé clave en el éxito de nuestros clientes!
                </p>
                <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                  Envíanos tus datos y forma parte de este gran equipo.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#posiciones" className="btn-primary">
                    Ver Posiciones Abiertas
                  </a>
                  <a
                    href="#beneficios"
                    className="bg-white bg-opacity-20 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105"
                  >
                    Conoce los Beneficios
                  </a>
                </div> */}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={200}>
              <div className="relative">
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/trabaja_con_nosotros.png?height=500&width=600&text=Equipo+Vivienda+Chile"
                    alt="Equipo Vivienda Chile"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
                {/* Floating badge */}
                {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">20+</div>
                      <div className="text-sm text-gray-600">Profesionales</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Por qué trabajar con nosotros */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Vivienda Chile?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Somos más que una empresa, somos una familia comprometida con el crecimiento profesional y personal de
                nuestro equipo
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="scale">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Crecimiento Acelerado</h3>
                <p className="text-gray-600 leading-relaxed">
                  Empresa en constante expansión con múltiples oportunidades de desarrollo profesional y ascenso.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={100}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Líderes del Mercado</h3>
                <p className="text-gray-600 leading-relaxed">
                  Forma parte del equipo inmobiliario más reconocido y respetado de Santiago.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={200}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Cultura Familiar</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ambiente de trabajo colaborativo donde cada persona es valorada y escuchada.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section> */}

      {/* Beneficios */}
      {/* <section id="beneficios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beneficios y Compensaciones</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos un paquete integral de beneficios diseñado para tu bienestar y crecimiento profesional
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="scale">
                <div className="card text-center group">
                  <div className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors duration-200">
                      <benefit.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Posiciones Abiertas */}
      {/* <section id="posiciones" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Posiciones Abiertas</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre las oportunidades disponibles y encuentra la posición perfecta para tu perfil profesional
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {positions.map((position, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="card">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {position.department}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {position.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2 flex items-center">
                          <span className="mr-2">📍</span>
                          {position.location}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">{position.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Requisitos:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <span className="mr-3 text-blue-600 mt-1">•</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="#aplicar" className="btn-primary flex-1 text-center">
                        Postular a esta Posición
                      </a>
                      <a href="/contacto" className="btn-secondary flex-1 text-center">
                        Más Información
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Proceso de Selección */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proceso de Selección</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un proceso transparente y eficiente diseñado para conocerte mejor y encontrar el match perfecto
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>

            <div className="space-y-12">
              {process.map((step, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className={`flex items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="flex-1 lg:w-1/2">
                      <div className={`${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                        <div className="bg-white rounded-xl p-8 shadow-lg">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl shadow-lg">
                      {step.step}
                    </div>

                    <div className="flex-1 lg:w-1/2"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Formulario de Aplicación */}
      <section id="aplicar" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Postula Ahora</h2>
              <p className="text-xl text-gray-600">
                Envíanos tu información y nos pondremos en contacto contigo a la brevedad
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="fade-right">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Qué necesitas enviar?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-3 text-blue-600 mt-1">📄</span>
                    <div>
                      <strong className="text-gray-900">Currículum Vitae actualizado</strong>
                      <p className="text-gray-600 text-sm">En formato PDF, máximo 2 páginas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-blue-600 mt-1">✍️</span>
                    <div>
                      <strong className="text-gray-900">Carta de presentación</strong>
                      <p className="text-gray-600 text-sm">Cuéntanos por qué quieres trabajar con nosotros</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-blue-600 mt-1">🎯</span>
                    <div>
                      <strong className="text-gray-900">Posición de interés</strong>
                      <p className="text-gray-600 text-sm">Especifica a qué cargo estás postulando</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">💡 Consejo</h4>
                  <p className="text-gray-600 text-sm">
                    Personaliza tu postulación para la posición específica. Destaca tu experiencia relevante y
                    motivación para unirte a nuestro equipo.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <ContactForm title="Formulario de Postulación" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      {/* <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tienes preguntas sobre las posiciones?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Nuestro equipo de Recursos Humanos está disponible para resolver todas tus dudas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacto" className="btn-primary">
                Contactar RRHH
              </a>
              <a
                href="tel:+56223456789"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Llamar Directamente
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section> */}
    </div>
  )
}

import Breadcrumbs from "@/components/Breadcrumbs"
import ContactForm from "@/components/ContactForm"
import AnimatedSection from "@/components/AnimatedSection"
import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Users, Headphones } from "lucide-react"
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para recibir asesoría inmobiliaria personalizada. Múltiples canales de atención disponibles.",
}

export default function ContactoPage() {
  const breadcrumbItems = [{ label: "Contacto" }]

  const contactMethods = [
    {
      icon: Phone,
      title: "Teléfono Principal",
      primary: "+56 9 4209 1392",
      secondary: "Lun - Vie: 9:00 - 18:00",
      description: "Atención inmediata para consultas generales",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business",
      primary: "+56 9 6727 0575",
      secondary: "24/7 Disponible",
      description: "Respuesta rápida y atención personalizada",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Corporativo",
      primary: "contacto@viviendachile.cl",
      secondary: "Respuesta en 24hrs",
      description: "Para consultas detalladas y documentación",
      color: "bg-purple-100 text-purple-600",
    },
    // {
    //   icon: Calendar,
    //   title: "Cita Presencial",
    //   primary: "Agenda tu visita",
    //   secondary: "Lun - Sáb disponible",
    //   description: "Asesoría personalizada en nuestras oficinas",
    //   color: "bg-orange-100 text-orange-600",
    // },
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: "Dirección Principal",
      content: "Av. Providencia 1234, Oficina 567\nProvidencia, Santiago, Chile",
      extra: "Edificio Torre Providencia, Piso 5",
    },
    {
      icon: Clock,
      title: "Horarios de Atención",
      content: "Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 14:00\nDomingos: Solo emergencias",
      extra: "Horario extendido con cita previa",
    },
    {
      icon: Users,
      title: "Departamentos",
      content:
        "Ventas: ventas@viviendachile.cl\nArriendos: arriendos@viviendachile.cl\nAdministración: admin@viviendachile.cl",
      extra: "Cada departamento con especialistas dedicados",
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      content: "Emergencias: +56 9 1111 2222\nWhatsApp: +56 9 8765 4321",
      extra: "Para propietarios y arrendatarios",
    },
  ]

  const faqs = [
    {
      question: "¿Cobran por la asesoría inicial?",
      answer:
        "No, la primera consulta y asesoría es completamente gratuita. Nuestros especialistas evaluarán tu caso sin costo alguno.",
    },
    {
      question: "¿Atienden propiedades fuera de Santiago?",
      answer:
        "Sí, trabajamos en toda la Región Metropolitana, V y VI Región. Consulta disponibilidad para tu zona específica.",
    },
    {
      question: "¿Qué documentos necesito para vender mi propiedad?",
      answer:
        "Es muy importante contar con documentos que acrediten dominio de la propiedad, escritura, certificado dominio o inscripción vigente, hipotecas o gravámenes (GP)",
    },
    // {
    //   question: "¿Cuál es el horario de atención?",
    //   answer:
    //     "Nuestro horario regular es de lunes a viernes de 9:00 a 18:00 y sábados de 10:00 a 14:00. Para emergencias de propiedades en arriendo, tenemos disponibilidad 24/7.",
    // },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Contáctanos</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Estamos aquí para ayudarte con todas tus necesidades inmobiliarias. Múltiples canales de atención para
                  brindarte el mejor servicio personalizado.
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </section>

      {/* Métodos de Contacto */}
      <section id="contacto-directo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Múltiples Formas de Contactarnos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elige el canal que más te convenga. Estamos disponibles para atenderte de la manera que prefieras
              </p>
            </div>
          </AnimatedSection>

          <div className="grid w-max mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="scale">
                <div className="card text-center group h-full">
                  <div className="p-8 flex flex-col h-full">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 ${method.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <method.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{method.title}</h3>
                    <div className="text-lg font-bold text-gray-900 mb-2">{method.primary}</div>
                    <div className="text-sm text-gray-600 mb-4">{method.secondary}</div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">{method.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Información de Oficina */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Información de Oficina</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Toda la información que necesitas para visitarnos o contactarnos
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeInfo.map((info, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="card">
                  <div className="p-8">
                    <div className="flex items-start">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{info.title}</h3>
                        <p className="text-gray-700 whitespace-pre-line mb-2 leading-relaxed">{info.content}</p>
                        <p className="text-sm text-gray-500 italic">{info.extra}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Formulario y Mapa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario de contacto */}
            <AnimatedSection animation="fade-right">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Envíanos un Mensaje</h3>
                <ContactForm title="" />
              </div>
            </AnimatedSection>

            {/* Mapa y ubicación */}
            <AnimatedSection animation="fade-left" delay={200}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Nuestra Ubicación</h3>
                <div className="card mb-6">
                  <div className="p-6">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                      <div className="relative h-96 bg-gray-200">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9099110640277!2d-70.62253450973247!3d-33.425593004811745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf63c7234f59%3A0x554ca7069c7a7ccc!2sAntonio%20Bellet%20193%2C%207500000%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1754956872310!5m2!1ses!2scl" 
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Ubicación"
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📍 Dirección Completa</h4>
                        <p className="text-gray-700">Av. Providencia 1234, Oficina 567</p>
                        <p className="text-gray-700">Providencia, Santiago, Chile</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🚇 Cómo Llegar</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Metro: Estación Pedro de Valdivia (Línea 1) - 3 min caminando</li>
                          <li>• Bus: Recorridos 210, 213, 214, 505</li>
                          <li>• Auto: Estacionamiento disponible en el edificio</li>
                          <li>• Bicicleta: Ciclovía de Providencia</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🏢 Referencias</h4>
                        <p className="text-sm text-gray-600">
                          Frente al Mall Costanera Center, a 2 cuadras del Metro Pedro de Valdivia. Edificio Torre
                          Providencia, entrada principal por Av. Providencia.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
              <p className="text-xl text-gray-600">Respuestas a las consultas más comunes de nuestros clientes</p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="card">
                  <div className="p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">¿No encuentras la respuesta que buscas?</p>
              <a href="tel:+56967270575" className="btn-primary">
                Contactar Asesor
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

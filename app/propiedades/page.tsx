// app/propiedades/page.tsx
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedSection from "@/components/AnimatedSection";
import PropertiesClient from "@/components/PropertiesClient";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Propiedades",
  description: "Explora nuestra amplia selección de propiedades en venta y arriendo en Chile.",
};

// ISR: Revalidar cada 3600 segundos (1 hora)
export const revalidate = 3600;

export default function PropiedadesPage() {
  const breadcrumbItems = [{ label: "Propiedades" }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Nuestras Propiedades</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Encuentra la propiedad ideal para tus necesitades o contáctanos sin compromiso y
nosotros te ayudamos en la búsqueda!!
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando propiedades...</p>
              </div>
            }
          >
            {/* Renderiza el Client Component sin pasar props */}
            <PropertiesClient />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿No encuentras lo que buscas?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Nuestro equipo puede ayudarte a encontrar la propiedad perfecta según tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="btn-primary">
                Contactar Asesor
              </Link>
              {/* <a
                href="tel:+56223456789"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 inline-block"
              >
                Llamar Directamente
              </a> */}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

// components/PropertyDetailClient.tsx
"use client"

import { useEffect } from "react"
// import { useProperties } from "@/hooks/useProperties"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import ContactForm from "@/components/ContactForm"
import PropertyGallery from "@/components/PropertyGallery"
import type { Property } from "@/types"
import Navbar from "@/components/Navbar";
import { properties, services, testimonials } from "@/data/mockData"

interface Props {
  id: string
}

export default function PropertyDetailClient({ id }: Props) {
  const router = useRouter()
  // const { data: properties, isLoading, error } = useProperties(null)

  // Si hay error al cargar las propiedades
  // if (error) {
  //   return (
  //     <div className="text-center py-12 text-red-600">
  //       Error cargando propiedad
  //     </div>
  //   )
  // }

  // Mientras carga, muestro spinner
  // if (isLoading || !properties) {
  //   return (
  //     <div className="text-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
  //       <p className="mt-4 text-gray-600">Cargando propiedad...</p>
  //     </div>
  //   )
  // }

  // Una vez que tenemos datos, buscamos la propiedad
  // console.log(id)
  const property = properties.find((p: Property) => p.id.toString() === id)

  // Si no existe, redirijo al 404
  if (!property) {
    useEffect(() => {
      router.replace("/404")
    }, [router])
    return null
  }

  // Formateador de precio
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)

  const breadcrumbItems = [
    { label: "Propiedades", href: "/propiedades" },
    { label: property.title },
  ]
  const locationLabel = `${property.region}, ${property.commune}`;

  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Galería */}
            <div className="mb-8">
              <PropertyGallery
                images={property.images}
                videos={property.videos || []}
                title={property.title}
              />
            </div>

            {/* Datos */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {property.title}
                </h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    property.status === "venta"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.status === "venta" ? "En Venta" : "En Arriendo"}
                </span>
              </div>
              <p className="text-gray-600 mb-4 flex items-center">
                <span className="mr-2">📍</span>
                {locationLabel}
              </p>
              <div className="text-3xl font-bold text-primary-500 mb-6">
                {formatPrice(property.price)}
              </div>

              {/* Características */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🛏️</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Dormitorios</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚿</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Baños</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📐</div>
                  <div className="font-semibold">{property.area}m²</div>
                  <div className="text-sm text-gray-600">Superficie</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold capitalize">{property.type}</div>
                  <div className="text-sm text-gray-600">Tipo</div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Ubicación */}
              {property.show_map && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-6">Ubicación</h2>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="relative h-96 bg-gray-200">
                      <iframe
                        src={property.map_src}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Ubicación de ${property.title}`}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm
                propertyId={property.id.toString()}
                title="Solicitar Información"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

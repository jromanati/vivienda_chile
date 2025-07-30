import { notFound } from "next/navigation"
import { properties } from "@/data/mockData"
import Breadcrumbs from "@/components/Breadcrumbs"
import ContactForm from "@/components/ContactForm"
import PropertyGallery from "@/components/PropertyGallery"
import type { Metadata } from "next"

// ISR: Revalidar cada 3600 segundos (1 hora)
export const revalidate = 3600

interface Props {
  params: { id: string }
}

// Generar metadata dinámico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    return {
      title: "Propiedad no encontrada",
    }
  }

  return {
    title: property.title,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [property.images[0]],
    },
  }
}

// Generar rutas estáticas
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }))
}

export default function PropertyDetailPage({ params }: Props) {
  const property = properties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const breadcrumbItems = [{ label: "Propiedades", href: "/propiedades" }, { label: property.title }]

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            {/* Galería de imágenes y video */}
            <div className="mb-8">
              <PropertyGallery images={property.images} videos={property.videos || []} title={property.title} />
            </div>

            {/* Información de la propiedad */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{property.title}</h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    property.status === "venta" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.status === "venta" ? "En Venta" : "En Arriendo"}
                </span>
              </div>

              <p className="text-gray-600 mb-4 flex items-center">
                <span className="mr-2">📍</span>
                {property.location}
              </p>

              <div className="text-3xl font-bold text-primary-500 mb-6">{formatPrice(property.price)}</div>

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

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Características</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2 text-primary-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar con formulario de contacto */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm propertyId={property.id} title="Solicitar Información" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types"

interface PropertyListViewProps {
  properties: Property[]
}

const PropertyListView = ({ properties }: PropertyListViewProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative h-64 md:h-48 md:w-80 flex-shrink-0">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === "venta" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.status === "venta" ? "En Venta" : "En Arriendo"}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium text-gray-800">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors duration-200">
                    <Link href={`/propiedades/${property.id}`}>{property.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{property.description}</p>
                  <p className="text-gray-500 mb-4 flex items-center">
                    <span className="mr-2">📍</span>
                    {property.location}
                  </p>

                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      {property.bedrooms} dormitorios
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🚿</span>
                      {property.bathrooms} baños
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">📐</span>
                      {property.area}m²
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{property.features.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{formatPrice(property.price)}</span>
                  <Link href={`/propiedades/${property.id}`} className="btn-elegant">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PropertyListView

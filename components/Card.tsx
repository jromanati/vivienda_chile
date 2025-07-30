import Image from "next/image"
import Link from "next/link"
import type { Property, Service } from "@/types"

interface PropertyCardProps {
  property: Property
}

interface ServiceCardProps {
  service: Service
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="card-uniform group">
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
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

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem] flex items-start">
          {property.title}
        </h3>
        <p className="text-gray-600 mb-3 text-sm leading-relaxed min-h-[2.5rem] line-clamp-2 flex-grow">
          {property.description}
        </p>
        <p className="text-gray-500 mb-3 flex items-center text-sm">
          <span className="mr-2">📍</span>
          {property.location}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <span className="mr-1">🛏️</span>
            {property.bedrooms} dorm
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

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
          <Link href={`/propiedades/${property.id}`} className="btn-elegant">
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  )
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="card-uniform group text-center">
      <div className="p-6 flex flex-col h-full">
        <div className="text-4xl mb-4 flex-shrink-0">{service.icon}</div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem] flex items-center justify-center">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[3rem] flex items-center justify-center">
          {service.shortDescription}
        </p>
        <ul className="text-sm text-gray-500 mb-6 space-y-2 flex-grow">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <span className="mr-2 text-primary">✓</span>
              <span className="text-center">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Link href={`/servicios#${service.id}`} className="btn-elegant w-full inline-block text-center">
            Más Información
          </Link>
        </div>
      </div>
    </div>
  )
}

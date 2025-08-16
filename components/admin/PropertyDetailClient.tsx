"use client"

import { useMemo } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Edit, ArrowLeft, Eye, EyeOff, Star, StarOff, MapPin, Home, Calendar } from "lucide-react"
import { useProperty } from "@/hooks/useProperties"

export default function PropertyDetailClient({ id }: { id: number }) {
  const { data: property, isLoading, error } = useProperty(id)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64 text-red-600">
        Error cargando la propiedad.
      </div>
    )
  }

  if (!property) {
    notFound()
  }

  const imageUrls = useMemo(() => {
    const imgs = (property as any)?.images ?? []
    if (!Array.isArray(imgs)) return []
    return imgs.map((img: any) => (typeof img === "string" ? img : img?.url)).filter(Boolean)
  }, [property])

  const createdAt: string =
    (property as any)?.createdAt ??
    (property as any)?.created_at ??
    new Date().toISOString()

  const updatedAt: string =
    (property as any)?.updatedAt ??
    (property as any)?.updated_at ??
    createdAt

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
  }).format(price)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/propiedades"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-600 mt-1">
              {(property as any).code ? `Código: ${(property as any).code}` : "Sin código"} • ID: {property.id}
            </p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className={`font-semibold ${(property as any).published ? "text-green-600" : "text-gray-600"}`}>
                {(property as any).published ? "Publicada" : "Borrador"}
              </p>
            </div>
            {(property as any).published ? (
              <Eye className="h-5 w-5 text-green-600" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Destacada</p>
              <p className={`font-semibold ${(property as any).featured ? "text-yellow-600" : "text-gray-600"}`}>
                {(property as any).featured ? "Sí" : "No"}
              </p>
            </div>
            {(property as any).featured ? (
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Precio</p>
              <p className="font-semibold text-gray-900">
                {formatPrice((property as any).price, (property as any).currency)}
              </p>
            </div>
            <div className="text-blue-600">$</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tipo</p>
              <p className="font-semibold text-gray-900">{(property as any).property_type}</p>
            </div>
            <Home className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Operación</label>
                <p className="text-gray-900">{(property as any).operation}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Estado de la Propiedad</label>
                <p className="text-gray-900">{(property as any).state}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipo de Precio</label>
                <p className="text-gray-900">{(property as any).price_type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Moneda</label>
                <p className="text-gray-900">{(property as any).currency || "CLP"}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {(property as any).description && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{(property as any).description}</p>
            </div>
          )}

          {/* Features */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Dormitorios</label>
                <p className="text-gray-900">{(property as any).bedrooms ?? "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Baños</label>
                <p className="text-gray-900">{(property as any).bathrooms ?? "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Estacionamientos</label>
                <p className="text-gray-900">{(property as any).parking ?? "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Área Construida</label>
                <p className="text-gray-900">
                  {(property as any).built_area ? `${(property as any).built_area} m²` : "No especificado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Área de Terreno</label>
                <p className="text-gray-900">
                  {(property as any).land_area ? `${(property as any).land_area} m²` : "No especificado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Bodega</label>
                <p className="text-gray-900">{(property as any).storage ? "Sí" : "No"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Electricidad</label>
                <p className="text-gray-900">{(property as any).electricity ? "Sí" : "No"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Agua</label>
                <p className="text-gray-900">{(property as any).water ?? "No especificado"}</p>
              </div>
            </div>
          </div>

          {/* Images */}
          {imageUrls.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Imágenes ({imageUrls.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageUrls.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Location */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Ubicación
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Región</label>
                <p className="text-gray-900">{(property as any).region}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Comuna</label>
                <p className="text-gray-900">{(property as any).commune}</p>
              </div>
              {(property as any).address && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Dirección</label>
                  <p className="text-gray-900">{(property as any).address}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Mostrar Mapa</label>
                <p className="text-gray-900">{(property as any).show_map ? "Sí" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Fechas
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Fecha de Creación</label>
                <p className="text-gray-900">{formatDate(createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Última Actualización</label>
                <p className="text-gray-900">{formatDate(updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h2>
            <div className="space-y-3">
              <Link
                href={`/admin/propiedades/${property.id}/edit`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Propiedad
              </Link>
              <Link
                href={`/propiedades/${property.id}`}
                target="_blank"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver en Sitio Web
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Edit, ArrowLeft, Save, X, Eye, EyeOff, Star, StarOff, MapPin, Home, Calendar } from "lucide-react"
import PropertyForm from "@/components/admin/PropertyForm"
import { adminProperties } from "@/data/adminData"
import { useMemo } from "react"
import { useProperty } from "@/hooks/useProperties"
import { useProperties } from "@/hooks/useProperties"
import type { PropertyForm as PropertyFormType } from "@/types/admin"

export default function PropertyEditClient({ id }: { id: number }) {
  const router = useRouter()
  const params = useParams()
  // const [property, setProperty] = useState<AdminProperty | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { data: property, isLoading, error } = useProperty(id)
  const { updateProperty, isCreating } = useProperties()
  
  function extractSrc(maybeIframe?: string) {
    if (!maybeIframe) return maybeIframe ?? ""
    const m = maybeIframe.match(/src="([^"]+)"/i)
    return m ? m[1] : maybeIframe
  }

  const toNumber = (v: unknown) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }

  const handleSubmit = async (data: PropertyFormType, files: File[]) => {
    try {
      const extractSrc = (maybeIframe?: string) => {
        if (!maybeIframe) return "";
        const m = maybeIframe.match(/src="([^"]+)"/i);
        return m ? m[1] : maybeIframe;
      };
      const toNumber = (v: unknown) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
      };
      const clean = (s?: string) => (s ?? "").trim();

      const payload = {
        title: clean(data.title),
        code: clean(data.code),
        published: !!data.published,
        featured: !!data.featured,
        show_map: !!data.show_map,
        map_src: extractSrc(data.map_src),
        built_area: toNumber(data.built_area),
        land_area: toNumber(data.land_area),
        electricity: !!data.electricity,
        water: clean(data.water),
        description: clean(data.description),
        amenities: clean(data.amenities),
        characteristics: clean(data.characteristics),
        price: toNumber(data.price),
        currency: clean(data.currency),
        price_type: data.price_type,
        operation: data.operation,
        state: data.state,
        property_type: data.property_type,
        bedrooms: toNumber(data.bedrooms),
        bathrooms: toNumber(data.bathrooms),
        region: clean(data.region),
        commune: clean(data.commune),
        address: clean(data.address),
        parking: toNumber(data.parking),
        storage: !!data.storage,
        // OJO: estas "images" son URLs existentes para preview; no se suben aquí.
        images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
      };

      await updateProperty({ id, payload, images: files }); // <— aquí van los File[]
      router.push("/admin/propiedades");
    } catch (err) {
      console.error("Error al actualizar propiedad:", err);
      alert("No se pudo actualizar la propiedad. Revisa la consola para más detalles.");
    }
  };

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
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Propiedad</h1>
            <p className="text-gray-600 mt-1">
              ID: {property.id} • Código: {property.code || "Sin código"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/propiedades"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Link>
          <button
            onClick={() => {
              const form = document.querySelector("form") as HTMLFormElement
              if (form) {
                form.requestSubmit()
              }
            }}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/admin" className="hover:text-gray-700">
              Admin
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/admin/propiedades" className="hover:text-gray-700">
              Propiedades
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Editar</li>
        </ol>
      </nav>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <PropertyForm
          initialData={property}
          onSubmit={handleSubmit}
          isLoading={saving}
        />
      </div>
    </div>
  )
}

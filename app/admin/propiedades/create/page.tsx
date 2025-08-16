"use client"

import { useRouter } from "next/navigation"
import PropertyForm from "@/components/admin/PropertyForm"
import type { PropertyForm as PropertyFormType } from "@/types/admin"
import { useProperties } from "@/hooks/useProperties"

function extractSrc(maybeIframe?: string) {
  if (!maybeIframe) return maybeIframe ?? ""
  const m = maybeIframe.match(/src="([^"]+)"/i)
  return m ? m[1] : maybeIframe
}

const toNumber = (v: unknown) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

const clean = (s?: string) => (s ?? "").trim()

export default function CreatePropertyPage() {
  const router = useRouter()
  // Asegúrate que tu hook exponga createPropertyMultipart(payload, files)
  const { createProperty, isCreating } = useProperties()

  // ⬇️ Ahora recibimos también los archivos del formulario
  const handleSubmit = async (data: PropertyFormType, files: File[] = []) => {
    try {
      // Mapea 1:1 a lo que espera tu back (data JSON)
      const payload = {
        title: clean(data.title),
        code: clean(data.code),
        published: Boolean(data.published),
        featured: Boolean(data.featured),
        show_map: Boolean(data.show_map),
        map_src: extractSrc(data.map_src),

        built_area: toNumber(data.built_area),
        land_area: toNumber(data.land_area),

        electricity: Boolean(data.electricity),
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
        storage: Boolean(data.storage),

        // El backend ya crea PropertyImage; no mandes URLs aquí
        images: [],
      }

      // Llamada multipart: data + images[]
      await createProperty(payload as any, files)
      router.push("/admin/propiedades")
    } catch (err) {
      console.error("Error al crear propiedad:", err)
      alert("No se pudo crear la propiedad. Revisa la consola para más detalles.")
    }
  }

  const handleCancel = () => router.push("/admin/propiedades")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nueva Propiedad</h1>
        <p className="text-gray-600 mt-2">Crea una nueva propiedad en el sistema</p>
      </div>

      {/* ⬇️ Importante: onSubmit ahora recibe (data, files) */}
      <PropertyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isCreating}
      />
    </div>
  )
}

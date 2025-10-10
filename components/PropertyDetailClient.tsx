// components/PropertyDetailClient.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import ContactForm from "@/components/ContactForm"
import PropertyGallery from "@/components/PropertyGallery"
import type { Property } from "@/types"
import Navbar from "@/components/Navbar";
import { properties, services, testimonials } from "@/data/mockData"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePropertiesUpdates } from "@/hooks/useProperties"
import { Boxes, Archive, Package, XCircle, Check, CheckCircle } from "lucide-react"
interface Props {
  id: string
}

export default function PropertyDetailClient({ id }: Props) {
  usePropertiesUpdates()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const raw = localStorage.getItem("properties");
    if (!raw) {
      setProperties([]);
      setIsLoading(false);
      return;
    }
    try {
      const parsed: Property[] = JSON.parse(raw);
      setProperties(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error("JSON inválido en localStorage(properties):", e);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  if (isLoading || !properties) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Cargando propiedad...</p>
      </div>
    )
  }
  const property = properties.find((p: Property) => p.id.toString() === id)
  if (!property) {
    useEffect(() => {
      router.replace("/404")
    }, [router])
    return null
  }

  // Formateador de precio
  type Currency = "CLP" | "USD" | "UF"

  /** Convierte a número detectando correctamente el separador decimal:
   * - "2000000.00"  -> 2000000   (punto decimal)
   * - "1.234,56"    -> 1234.56   (formato chileno)
   * - "15,5" / "15.5" -> 15.5
   */
  const toNumberSmart = (v: number | string, currency: Currency) => {
    if (typeof v === "number") return v
    const s = String(v || "").trim()
    if (!s) return 0

    // Caso: solo punto y actúa como decimal (p. ej. "2000000.00", "15.5")
    const isDotDecimal = !s.includes(",") && /^\d+\.\d{1,6}$/.test(s)
    if (isDotDecimal) return Number(s)

    // Regla chilena: "." miles, "," decimal
    const normalized = s.replace(/\./g, "").replace(",", ".")
    const n = Number(normalized)
    return Number.isFinite(n) ? n : 0
  }

  /** Cuenta los decimales del valor de entrada para respetarlos en la salida (máx 2) */
  const countInputDecimals = (v: number | string) => {
    if (typeof v === "number") {
      const s = String(v)
      const i = s.indexOf(".")
      return i === -1 ? 0 : Math.min(2, s.length - i - 1)
    }
    const s = String(v)
    // "2000000.00" → 2 ; "15.5" → 1
    if (!s.includes(",") && /^\d+\.\d{1,6}$/.test(s)) return Math.min(s.split(".")[1].length, 2)
    // "1.234,56" → 2 ; "15,5" → 1
    return Math.min((s.split(",")[1]?.length ?? 0), 2)
  }
  const formatPrice = (
    value: number | string,
    currency: Currency = "CLP",
    opts: {
      decimals?: number | "auto"
      showCode?: boolean
      codePosition?: "prefix" | "suffix"
      inputMinorUnitFactor?: number
    } = {}
  ) => {
    const {
      decimals = "auto",
      showCode = true,
      codePosition = "prefix",
      inputMinorUnitFactor,
    } = opts

    let nRaw = toNumberSmart(value, currency)

    // 🔎 Corrección automática común: CLP en centavos (x100)
    // Si no especificaste inputMinorUnitFactor, intentamos detectar el caso típico:
    // entero grande, divisible por 100, sin separadores en el string de origen,
    // y en un rango razonable (>= 100.000.000).
    if (currency === "CLP") {
      const s = typeof value === "string" ? value.trim() : ""
      const looksPlainIntegerString = s && /^[0-9]+$/.test(s)
      const autoLooksLikeCents =
        inputMinorUnitFactor == null &&
        Number.isInteger(nRaw) &&
        nRaw % 100 === 0 &&
        nRaw >= 100_000_000 && // 100 millones
        (looksPlainIntegerString || typeof value === "number")

      const factor = inputMinorUnitFactor ?? (autoLooksLikeCents ? 100 : 1)
      if (factor !== 1) nRaw = nRaw / factor
    }

    const decs = decimals === "auto" ? countInputDecimals(value) : decimals

    if (currency === "UF") {
      const nf = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLF",
        currencyDisplay: "code",
        minimumFractionDigits: decs,
        maximumFractionDigits: decs,
      })
      const parts = nf.formatToParts(nRaw)
      const numberOnly = parts
        .filter((p) => p.type !== "currency")
        .map((p) => p.value)
        .join("")
        .trim()

      if (!showCode) return numberOnly
      return codePosition === "suffix" ? `${numberOnly} UF` : `UF ${numberOnly}`
    }

    // CLP / USD
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency,
      minimumFractionDigits: decs,
      maximumFractionDigits: decs,
    }).format(nRaw)
  }

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
                video={property.video_url || []}
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
                {formatPrice(
                  property.price ?? 0,
                  (property.currency as Currency) || "CLP",
                )}
              </div>

              {/* Características */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🛏️</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Habitaciones</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚿</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Baños</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚗</div>
                  <div className="font-semibold">
                    {property.parking}
                  </div>
                  <div className="text-sm text-gray-600">Estacionamiento</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">📐</div>
                  <div className="font-semibold">{property.land_area}m²</div>
                  <div className="text-sm text-gray-600">Superficie terreno</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold">{property.built_area} m²</div>
                  <div className="text-sm text-gray-600">Superficie construida</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="h-6 w-6 mx-auto text-gray-700 mb-3" aria-hidden="true" />
                  {property.storage ? (
                    <CheckCircle className="h-5 w-5 mx-auto text-gray-700 mb-1" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5 mx-auto text-gray-700 mb-1" aria-hidden="true" />
                  )}
                  <div className="text-sm text-gray-600">Bodega</div>
                </div>
              </div>
              <Tabs defaultValue="description" className="mb-16">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 border">
                  <TabsTrigger value="description" className="data-[state=active]:bg-blue-100">
                    Descripción
                  </TabsTrigger>
                  {property.characteristics && (
                    <TabsTrigger value="characteristics" className="data-[state=active]:bg-blue-100">
                      Características
                    </TabsTrigger>
                  )}
                  {property.amenities && (
                    <TabsTrigger value="amenities" className="data-[state=active]:bg-blue-100">
                      Amenidades
                    </TabsTrigger>
                  )}
                  {property.water && (
                    <TabsTrigger value="water" className="data-[state=active]:bg-blue-100">
                      Agua
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <Card className="bg-gray-100">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-blue-900 mb-6">Descripción</h3>
                      <p
                        className="text-gray-900 text-lg leading-relaxed mb-6"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {property.description}
                      </p>

                    </CardContent>
                  </Card>
                </TabsContent>
                {property.characteristics && (
                  <TabsContent value="characteristics" className="mt-6">
                    <Card className="bg-gray-100">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-6">Características</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-6">
                          {property.characteristics}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                {property.amenities && (
                  <TabsContent value="amenities" className="mt-6">
                    <Card className="bg-gray-100">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-6">Amenidades</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-6">
                          {property.amenities}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                {property.water && (
                  <TabsContent value="water" className="mt-6">
                    <Card className="bg-gray-100">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-6">Agua</h3>
                        <p className="text-gray-900 text-lg leading-relaxed mb-6">
                          {property.water}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
              
              {property.amenities && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Amenidades</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <span>{property.amenities}</span>
                      </div>
                    </div>
                </div>
              )}
              {/* {property.water && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Características</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <span className="mr-2 text-primary-500">✓</span>
                        <span>{property.characteristics}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-primary-500">✓</span>
                        <span>{property.water}</span>
                      </div>
                    </div>
                </div>
              )} */}

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

import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types"
import {
  Bed,
  Bath,
  Car,
  Ruler,
  Home,
  Boxes,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface PropertyListViewProps {
  properties: Property[]
}

const PropertyListView = ({ properties }: PropertyListViewProps) => {
  type Currency = "CLP" | "USD" | "UF"

  /** Convierte a número detectando correctamente el separador decimal:
   * - "2000000.00"  -> 2000000   (punto decimal)
   * - "1.234,56"    -> 1234.56   (formato chileno)
   * - "15,5" / "15.5" -> 15.5
   */
  const toNumberSmart = (v: number | string, _currency: Currency) => {
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

  // Helpers UI
  const plural = (n: number, uno: string, muchos: string) => (n === 1 ? uno : muchos)

  return (
    <div className="space-y-6">
      {properties.map((property) => {
        // valores con fallback para que SIEMPRE se muestren (aunque sean 0)
        const bedrooms = Number(property.bedrooms ?? 0)
        const bathrooms = Number(property.bathrooms ?? 0)
        const parking   = Number(property.parking ?? 0)
        const landArea  = property.land_area ?? 0
        const builtArea = property.built_area ?? 0
        const hasStorage = Boolean(property.storage)

        return (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative h-64 md:h-48 md:w-80 flex-shrink-0">
                <Image
                  src={property.images?.[0]?.url ?? "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.operation === "Venta"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {property.operation === "Venta" ? "En Venta" : "En Arriendo"}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 px-2 py-1 rounded text-sm font-medium text-gray-800">
                    {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
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
                      {`${property.region}, ${property.commune}`}
                    </p>

                    {/* FEATURES: siempre visibles (incluyendo 0) */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-sm text-gray-700">
                      {/* Habitaciones */}
                      <span className="inline-flex items-center gap-1.5" title="Habitaciones">
                        <Bed className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{bedrooms}</span>
                        <span className="text-gray-500">
                          {plural(bedrooms, "Habitación", "Habitaciones")}
                        </span>
                      </span>

                      {/* Baños */}
                      <span className="inline-flex items-center gap-1.5" title="Baños">
                        <Bath className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{bathrooms}</span>
                        <span className="text-gray-500">
                          {plural(bathrooms, "Baño", "Baños")}
                        </span>
                      </span>

                      {/* Estacionamientos */}
                      <span className="inline-flex items-center gap-1.5" title="Estacionamientos">
                        <Car className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{parking}</span>
                        <span className="text-gray-500">
                          {plural(parking, "Estacionamiento", "Estacionamientos")}
                        </span>
                      </span>

                      {/* Superficie terreno */}
                      <span className="inline-flex items-center gap-1.5" title="Superficie terreno">
                        <Ruler className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{landArea}</span>
                        <span className="text-gray-500">m²</span>
                      </span>

                      {/* Superficie construida */}
                      <span className="inline-flex items-center gap-1.5" title="Superficie construida">
                        <Home className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">{builtArea}</span>
                        <span className="text-gray-500">m²</span>
                      </span>

                      {/* Bodega */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1
                          ${hasStorage ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}
                        title="Bodega"
                      >
                        <Boxes className="h-4 w-4" aria-hidden="true" />
                        <span>Bodega</span>
                        {hasStorage ? (
                          <CheckCircle className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(
                        property.price ?? 0,
                        (property.currency as Currency) || "CLP",
                        // 👉 Si SABES que tus CLP vienen en centavos, fuerza esto:
                        // { inputMinorUnitFactor: 100 }
                      )}
                    </span>
                    <Link href={`/propiedades/${property.id}`} className="btn-elegant">
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PropertyListView

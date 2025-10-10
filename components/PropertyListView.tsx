import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types"
import { Package, CheckCircle, XCircle } from "lucide-react"

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
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="mr-1">🛏️</span>
                      {property.bedrooms} Habitaciones
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🚿</span>
                      {property.bathrooms} baños
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">📐</span>
                      {property.land_area}m²
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">🏠</span>
                      {property.built_area}m²
                    </span>
                    <span className="flex items-center">
                      <Package className="h-4 w-4 mx-auto text-gray-700" aria-hidden="true" />
                      <span className="mx-2">Bodega</span>
                      {property.storage ? (
                        <CheckCircle className="h-4 w-4 mx-auto text-gray-700" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-4 w-4 mx-auto text-gray-700" aria-hidden="true" />
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
      ))}
    </div>
  )
}

export default PropertyListView

import Image from "next/image"
import Link from "next/link"
import type { Property, Service } from "@/types"
import { Boxes, XCircle, Package, CheckCircle } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

interface ServiceCardProps {
  service: Service
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
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
  const firstImageUrl = property.images?.[0]?.url ?? "/placeholder.svg";
  const locationLabel = `${property.region}, ${property.commune}`;
  const areaLabel =
    property.built_area != null
      ? `${property.built_area} m² (construida)`
      : property.land_area != null
      ? `${property.land_area} m² (terreno)`
      : "-";

  // 4) Estado de la propiedad: operación
  const statusLabel =
    property.operation === "Venta" ? "En Venta" : "En Arriendo";

  const truncateChars = (text: string | undefined, max = 120) => {
    if (!text) return ""
    const s = text.trim()
    if (s.length <= max) return s
    const cut = s.slice(0, max)
    // evita cortar palabras si es posible
    const safe = cut.lastIndexOf(" ") > max * 0.6 ? cut.slice(0, cut.lastIndexOf(" ")) : cut
    return safe + "…"
  }

  return (
    <div className="card-uniform group">
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={firstImageUrl}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              property.operation === "Venta"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium text-gray-800">
            {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem] flex items-start">
          {property.title}
        </h3>
        <p
          className="text-gray-600 mb-3 text-sm leading-relaxed min-h-[2.5rem] line-clamp-2 flex-grow"
          title={property.description}
        >
          {truncateChars(property.description, 190)}
        </p>
        <p className="text-gray-500 mb-3 flex items-center text-sm">
          <span className="mr-2">📍</span>
          {locationLabel}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <span className="mr-1">🛏️</span>
            {property.bedrooms} Habitaciones
          </span>
          <span className="flex items-center">
            <span className="mr-1">🚿</span>
            {property.bathrooms} Baños
          </span>
          <span className="flex items-center">
            <span className="mr-1">🚗</span>
            {property.parking} Estacionamiento
          </span>
          <span className="flex items-center" title="Superficie terreno">
            <span className="mr-1">📐</span>
            {property.land_area}m²
          </span>
          <span className="flex items-center" title="Superficie construida">
            <span className="mr-1">🏠</span>
            {property.built_area}m²
          </span>
        </div>
        
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
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

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-primary">
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
  )
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="card-uniform group text-center">
      <div className="p-6 flex flex-col h-full">
        <div className="w-64 h-64 mx-auto mb-4 relative rounded-full overflow-hidden shadow-md">
          <Image
            src={service.icon}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem] flex items-center justify-center">
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[3rem] flex items-center justify-center">
          {service.shortDescriptionHome}
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

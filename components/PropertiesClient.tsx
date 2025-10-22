// components/PropertiesClient.tsx
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/Card"
import PropertyListView from "@/components/PropertyListView"
import PropertyFilters from "@/components/PropertyFilters"
import PropertyControls from "@/components/PropertyControls"
import AnimatedSection from "@/components/AnimatedSection"
import { usePropertyFilters } from "@/hooks/usePropertyFilters"
import { useProperties, usePropertiesUpdates } from "@/hooks/useProperties"
import type { Property } from "@/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CatalogPayload = {
  products: any[]
  categories: any[]
  brands: any[]
}
type Media = { id: number; url: string; public_id: string };

const PropertiesClient = () => {
  usePropertiesUpdates()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hasAppliedUrlParams, setHasAppliedUrlParams] = useState(false)
  const searchParams = useSearchParams()
  const { getProperties } = useProperties()

  // --- PAGINACIÓN ---
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  // Normaliza booleanos que a veces vienen como "1"/"true"/1
  const asBool = (v: any) =>
    v === true || v === 1 || v === "1" || v === "true";

  // Filtro genérico de propiedades
  function filterProperties(
    list: Property[],
    opts: {
      published?: boolean;
      featured?: boolean;
      minImages?: number;
    } = {}
  ) {
    const { published, featured, minImages } = opts;

    return list.filter((p) => {
      if (published !== undefined && asBool(p.published) !== published) return false;
      if (featured !== undefined && asBool(p.featured) !== featured) return false;
      // if (minImages && !(Array.isArray(p.images) && p.images.length >= minImages)) return false;
      return true;
    });
  }

  const fetchedProperties = useCallback(async (): Promise<Property[]> => {
    const propertiesResponse = await getProperties();
    const list: Property[] = Array.isArray(propertiesResponse) ? propertiesResponse : [];
    return filterProperties(list, { published: true, minImages: 1 });
  }, [getProperties]);

  const { data: properties = [], isLoading } = useSWR('properties', fetchedProperties)

  // Filtros y orden sobre datos
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProperties,
    clearFilters,
  } = usePropertyFilters(properties)

  // Aplicar parámetros de URL al cargar filtros
  useEffect(() => {
    if (!hasAppliedUrlParams) {
      const urlType = searchParams.get("type")
      const urlStatus = searchParams.get("status")
      if (urlType || urlStatus) {
        setFilters({
          ...filters,
          type: urlType || "",
          status: urlStatus || "",
        })
      }
      setHasAppliedUrlParams(true)
    }
  }, [searchParams, hasAppliedUrlParams, filters, setFilters])

  // Resetear a página 1 cuando cambien los resultados filtrados o el modo de vista
  useEffect(() => {
    setPage(1)
  }, [filteredProperties, viewMode])

  // --- Cálculos de paginación ---
  const totalItems = filteredProperties.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  const safePage = Math.min(Math.max(1, page), totalPages)

  const pageSlice = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return filteredProperties.slice(start, end)
  }, [filteredProperties, safePage])

  // Números 1 … n con ventana
  const renderPageNumbers = () => {
    const items: (number | string)[] = []
    const windowSize = 2

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i)
    } else {
      const left = Math.max(2, safePage - windowSize)
      const right = Math.min(totalPages - 1, safePage + windowSize)

      items.push(1)
      if (left > 2) items.push("…")
      for (let i = left; i <= right; i++) items.push(i)
      if (right < totalPages - 1) items.push("…")
      items.push(totalPages)
    }

    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setPage(safePage - 1)}
          className="px-3 h-10 inline-flex items-center justify-center rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
          disabled={safePage <= 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {items.map((it, idx) =>
          typeof it === "number" ? (
            <button
              key={`p-${it}-${idx}`}
              type="button"
              onClick={() => setPage(it)}
              className={`px-3 min-w-10 h-10 inline-flex items-center justify-center rounded-md border ${
                it === safePage
                  ? "bg-primary text-white border-primary"
                  : "bg-white hover:bg-gray-50"
              }`}
              aria-current={it === safePage ? "page" : undefined}
              aria-label={`Ir a la página ${it}`}
            >
              {it}
            </button>
          ) : (
            <span key={`dots-${idx}`} className="px-2 select-none">…</span>
          )
        )}

        <button
          type="button"
          onClick={() => setPage(safePage + 1)}
          className="px-3 h-10 inline-flex items-center justify-center rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
          disabled={safePage >= totalPages}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const showingFrom = totalItems === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const showingTo = Math.min(safePage * PAGE_SIZE, totalItems)

  // Mostrar loader
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Cargando propiedades...</p>
      </div>
    )
  }

  return (
    <>
      {/* Filters */}
      <AnimatedSection>
        <PropertyFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      </AnimatedSection>

      {/* Controls */}
      <AnimatedSection delay={100}>
        <PropertyControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProperties.length}
        />
      </AnimatedSection>

      {/* Header Paginación */}
      <AnimatedSection delay={150}>
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="text-sm text-gray-600">
            Mostrando <span className="font-medium">{showingFrom}–{showingTo}</span> de{" "}
            <span className="font-medium">{totalItems}</span> propiedades
          </div>
          {totalItems > PAGE_SIZE && renderPageNumbers()}
        </div>
      </AnimatedSection>

      {/* Results */}
      <AnimatedSection delay={200}>
        {totalItems === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros para encontrar más opciones
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Limpiar Filtros
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageSlice.map((property, index) => (
              <div
                key={property.id}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index % 3) * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          // Para vista "lista", también paginado: le pasamos SOLO el slice.
          <PropertyListView properties={pageSlice} />
        )}
      </AnimatedSection>

      {/* Footer Paginación */}
      {totalItems > PAGE_SIZE && (
        <AnimatedSection delay={250}>
          <div className="flex items-center justify-between flex-wrap gap-3 mt-8">
            <div className="text-sm text-gray-600">
              Página <span className="font-medium">{safePage}</span> de{" "}
              <span className="font-medium">{totalPages}</span>
            </div>
            {renderPageNumbers()}
          </div>
        </AnimatedSection>
      )}
    </>
  )
}

export default PropertiesClient

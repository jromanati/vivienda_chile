// components/PropertiesClient.tsx
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/Card"
import PropertyListView from "@/components/PropertyListView"
import PropertyFilters from "@/components/PropertyFilters"
import PropertyControls from "@/components/PropertyControls"
import AnimatedSection from "@/components/AnimatedSection"
import { usePropertyFilters } from "@/hooks/usePropertyFilters"
// import { useProperties } from "@/hooks/useProperties"
import { properties, services, testimonials } from "@/data/mockData"
import type { Property } from "@/types"

const PropertiesClient = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [hasAppliedUrlParams, setHasAppliedUrlParams] = useState(false)
  const searchParams = useSearchParams()

  // React Query + WebSocket hook
  // const { data: properties = [], isLoading, error } = useProperties(null)

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

  // Mostrar loader o error
  // if (isLoading) {
  //   return (
  //     <div className="text-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
  //       <p className="mt-4 text-gray-600">Cargando propiedades...</p>
  //     </div>
  //   )
  // }
  // if (error) {
  //   return (
  //     <div className="text-center py-12 text-red-600">
  //       Error cargando propiedades
  //     </div>
  //   )
  // }

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

      {/* Results */}
      <AnimatedSection delay={200}>
        {filteredProperties.length === 0 ? (
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
            {filteredProperties.map((property, index) => (
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
          <PropertyListView properties={filteredProperties} />
        )}
      </AnimatedSection>

      {/* Load More info */}
      {filteredProperties.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Mostrando {filteredProperties.length} de {properties.length} propiedades
            </p>
          </div>
        </AnimatedSection>
      )}
    </>
  )
}

export default PropertiesClient

// components/PropertiesClient.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/Card"
import PropertyListView from "@/components/PropertyListView"
import PropertyFilters from "@/components/PropertyFilters"
import PropertyControls from "@/components/PropertyControls"
import AnimatedSection from "@/components/AnimatedSection"
import { usePropertyFilters } from "@/hooks/usePropertyFilters"
import { useProperties, usePropertiesUpdates } from "@/hooks/useProperties"
// import {  properties } from "@/data/mockData"
import type { Property } from "@/types"
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
    console.log('propertiesResponse', propertiesResponse)
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

  // Mostrar loader o error
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Cargando propiedades...</p>
      </div>
    )
  }
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

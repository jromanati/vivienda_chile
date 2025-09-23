"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

interface FilterState {
  search: string
  type: string
  status: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
  location: string
}

interface PropertyFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const PropertyFilters = ({ filters, onFiltersChange, onClearFilters }: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const locations = [
    "Las Condes, Santiago",
    "Providencia, Santiago",
    "Ñuñoa, Santiago",
    "Santiago Centro",
    "Vitacura, Santiago",
    "Viña del Mar, Valparaíso",
  ]

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg"
        >
          <span className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </span>
          {hasActiveFilters && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
        </button>
      </div>

      {/* Filters */}
      <div className={`space-y-4 ${isOpen ? "block" : "hidden md:block"}`}>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título o ubicación..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="Venta">En Venta</option>
              <option value="Arriendo">En Arriendo</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dormitorios</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
            <select
              value={filters.bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo</label>
            <select
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sin mínimo</option>
              <option value="50000000">$50.000.000</option>
              <option value="100000000">$100.000.000</option>
              <option value="200000000">$200.000.000</option>
              <option value="300000000">$300.000.000</option>
              <option value="500000000">$500.000.000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo</label>
            <select
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sin máximo</option>
              <option value="100000000">$100.000.000</option>
              <option value="200000000">$200.000.000</option>
              <option value="300000000">$300.000.000</option>
              <option value="500000000">$500.000.000</option>
              <option value="1000000000">$1.000.000.000</option>
            </select>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas las ubicaciones</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              onClick={onClearFilters}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyFilters

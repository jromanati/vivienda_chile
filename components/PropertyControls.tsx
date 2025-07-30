"use client"

import { Grid, List, ArrowUpDown } from "lucide-react"

interface PropertyControlsProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalResults: number
}

const PropertyControls = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalResults,
}: PropertyControlsProps) => {
  const sortOptions = [
    { value: "newest", label: "Más recientes" },
    { value: "oldest", label: "Más antiguos" },
    { value: "price-low", label: "Precio: menor a mayor" },
    { value: "price-high", label: "Precio: mayor a menor" },
    { value: "area-large", label: "Área: mayor a menor" },
    { value: "area-small", label: "Área: menor a mayor" },
  ]

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      {/* Results Count */}
      <div className="text-gray-600">
        <span className="font-medium">{totalResults}</span> propiedades encontradas
      </div>

      <div className="flex items-center gap-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-md transition-colors duration-200 ${
              viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyControls

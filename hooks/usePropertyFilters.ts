"use client"

import { useState, useMemo } from "react"
import type { Property } from "@/types"

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

const initialFilters: FilterState = {
  search: "",
  type: "",
  status: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
  location: "",
}

export const usePropertyFilters = (properties: Property[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sortBy, setSortBy] = useState("newest")

  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = property.title.toLowerCase().includes(searchLower)
        const matchesLocation = property.region.toLowerCase().includes(searchLower)
        if (!matchesTitle && !matchesLocation) return false
      }
      if (filters.type ==='all') {
        filters.type = '';
      }

      if (filters.type && property.property_type !== filters.type && filters.type !=='all') {
        return false
      }

      // Type filter
      if (filters.type && property.property_type !== filters.type) return false

      // Status filter
      if (filters.status && property.operation !== filters.status) return false

      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms < Number.parseInt(filters.bedrooms)) return false

      // Bathrooms filter
      if (filters.bathrooms && property.bathrooms < Number.parseInt(filters.bathrooms)) return false

      // Location filter
      if (filters.location && property.location !== filters.location) return false

      // Price filters
      if (filters.minPrice && property.price < Number.parseInt(filters.minPrice)) return false
      if (filters.maxPrice && property.price > Number.parseInt(filters.maxPrice)) return false
      return true
    })

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [properties, filters, sortBy])

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProperties: filteredAndSortedProperties,
    clearFilters,
  }
}

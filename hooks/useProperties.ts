import { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { PropertyService } from "@/services/properties.service"
import type { ProductResponse} from "@/types/products"
import { syncPropertiesToLocalStorage } from "@/services/properties-sync"

type WSOptions = {
  url?: string
  swrKeys?: string[]          // qué keys de SWR revalidar
  minIntervalMs?: number      // antirruido (2s por defecto)
}

export const usePropertiesUpdates = () => {
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    // Construye URL según http/https para evitar mixed content
    const proto = location.protocol === "https:" ? "wss" : "ws"
    console.log('proto', proto)
    // local
    // const ws = new WebSocket(`${proto}://viviendachile.localhost:8000/ws/properties/`)
    const ws = new WebSocket(`${proto}://viviendachile.sitios.softwarelabs.cl/ws/properties/`)
    // const ws = new WebSocket(`https://viviendachile.sitios.softwarelabs.cl/wss/properties/`)
    // viviendachile.sitios.softwarelabs.cl
    ws.onopen = () => console.log("WebSocket conectado ✅")

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data || "{}")

      const isUpdate =
        data?.event === "properties_updated" ||
        data?.type === "properties.updated"

      if (!isUpdate) return

      const now = Date.now()
      if (now - lastUpdateRef.current > 2000) {
        lastUpdateRef.current = now
        console.log("🛒 Catálogo actualizado desde backend. Sincronizando…")
        await syncPropertiesToLocalStorage()
      } else {
        console.log("⏳ Ignorando actualización repetida.")
      }
    }

    // ws.onerror = (e) => console.error("WS error:", e)
    ws.onclose = (e) => console.warn("WS cerrado:", e.code, e.reason, e.wasClean)

    return () => ws.close()
  }, [])
}

export function useProperties() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProperties = async (): Promise<any[] | null> => {
    const isAuthenticated = await PropertyService.ensureAuthenticated()
    console.log('isAuthenticated', isAuthenticated)
    setIsAuthenticating(false)

    if (!isAuthenticated) {
      setError("Error de autenticación del sistema")
      return null
    }
    setIsLoading(true)
    setError(null)

    // const cached = localStorage.getItem("properties")
    // if (cached) {
    //   try {
    //     const parsed = JSON.parse(cached)
    //     return parsed // <- data pura
    //   } catch (e) {
    //     console.error("Error parseando properties de localStorage", e)
    //   }
    // }

    try {
      const response = await PropertyService.getProperties()
      if (response.success && response.data) {
        localStorage.setItem("properties", JSON.stringify(response.data))
        return response.data // <- data pura
      } else {
        setError(response.error || "Error al obtener las propiedades")
        return null
      }
    } catch (err) {
      setError("Error inesperado al obtener las propiedades")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getProperty = async (PropertyId: number): Promise<ProductResponse | null> => {
    const isAuthenticated = await PropertyService.ensureAuthenticated()
    setIsAuthenticating(false)

    if (!isAuthenticated) {
      setError("Error de autenticación del sistema")
      return null
    }
    setIsLoading(true)
    setError(null)

    try {
      const response = await PropertyService.getProperty(PropertyId)

      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || "Error al obtener el producto")
        return null
      }
    } catch (err) {
      setError("Error inesperado al obtener la orden")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isAuthenticating,
    error,
    getProperties,
    getProperty,
    clearError: () => setError(null),
  }
}

// services/properties-sync.ts
import { mutate } from "swr"
import { PropertyService } from "@/services/properties.service"

export async function syncPropertiesToLocalStorage(): Promise<any[] | null> {
  const isAuthenticated = await PropertyService.ensureAuthenticated()
  if (!isAuthenticated) return null

  const res = await PropertyService.getProperties()
  if (res?.success && res.data) {
    localStorage.setItem("properties", JSON.stringify(res.data))
    // Actualiza la cache de SWR inmediatamente sin revalidar:
    await mutate("properties", res.data, false)
    return res.data
  }
  return null
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.autopartes.cl/v1"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  status?: number
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setToken(token: string | null) {
    localStorage.setItem("token", token || "")
    this.token = token
  }

  setRefresh(token_refresh: string | null) {
    localStorage.setItem("token_refresh", token_refresh || "")
  }

  setTokenExpiry(token_expiry: string | null) {
    const now = Math.floor(Date.now() / 1000)
    const accessExpiryTimestamp = now + token_expiry 
    localStorage.setItem("token_expiry", String(accessExpiryTimestamp))
  }

  setRefreshExpiry(refresh_expires: string | null) {
    const now = Math.floor(Date.now() / 1000)
    const refreshExpiryTimestamp = now + refresh_expires
    localStorage.setItem("refresh_expiry", String(refreshExpiryTimestamp))
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token')
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      }

      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP Error: ${response.status}`,
          status: response.status
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      }
    }
  }

  get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "GET", headers })
  }

  post<T>(endpoint: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    })
  }

  put<T>(endpoint: string, body?: any, headers?: Record<string, string>) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      headers,
    })
  }

  delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "DELETE", headers })
  }
}

// export const apiClient = new ApiClient(API_BASE_URL)
export const apiClient = new ApiClient("https://viviendachile.sitios.softwarelabs.cl/api/")

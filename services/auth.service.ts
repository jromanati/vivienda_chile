import { apiClient, type ApiResponse } from "@/lib/api"
import type { AuthCredentials, AuthResponse } from "@/types/auth"

export class AuthService {
  private static token: string | null = null
  private static tokenExpiry: number | null = null

  static setTokens(responsedata: object | null): void {
    apiClient.setToken(responsedata.access)
    apiClient.setRefresh(responsedata.refresh)
    apiClient.setTokenExpiry(responsedata.expires_in)
    apiClient.setRefreshExpiry(responsedata.refresh_expires_in)
  }

  static async authenticate(): Promise<ApiResponse<AuthResponse>> {
    localStorage.setItem("properties", "")
    // local
    // const credentials: AuthCredentials = {
    //   username: process.env.NEXT_PUBLIC_API_USERNAME || "",
    //   password: process.env.NEXT_PUBLIC_API_PASSWORD || "",
    // }
    const credentials: AuthCredentials = {
      username: "cristian",
      password: "viviendachile2024",
    }
    if (!credentials.username || !credentials.password) {
      console.error("AuthService: Missing authentication credentials")
      return {
        success: false,
        error: "Credenciales de autenticación no configuradas",
      }
    }
    

    const response = await apiClient.post<AuthResponse>("token/", credentials)
    if (response.success && response.data) {
      AuthService.setTokens(response.data)
      return response
    }
    else if (response.error) {
      apiClient.setToken(null)
      return {
        success: false,
        error: response.error,
      }
    }
    return response
  }

  static async refresh(): Promise<ApiResponse<AuthResponse>> {
    const tokenRefresh = localStorage.getItem("token_refresh")
    const data = {
      refresh: tokenRefresh || "",
    }
    localStorage.setItem("properties", "")
    const response = await apiClient.post<AuthResponse>("token/refresh/", data)
    if (response.success && response.data?.tenant?.schema_name) {
      AuthService.setTokens(response.data)
      return response
    }
    else if (response.error) {
      apiClient.setToken(null)
      return {
        success: false,
        error: response.error,
      }
    }
    return response
  }

  

  static isTokenValid(): boolean {
    const token = localStorage.getItem("token")
    const expiry = localStorage.getItem("token_expiry")
    if (!token || !expiry) return false
    const now = Math.floor(Date.now() / 1000)
    const expiresAt = parseInt(expiry, 10)
    return now < expiresAt
  }

  static async isRefreshTokenValid(): Promise<boolean> {
    const expiry = localStorage.getItem("token_expiry")
    if (!expiry) return false
    const now = Math.floor(Date.now() / 1000)
    const expiresAt = parseInt(expiry, 10)
    if (now > expiresAt) {
      const refreshResponse = await this.refresh()
      if (refreshResponse.success && refreshResponse.data) {
        return true
      }
    }    
    return false
  }

  static getToken(): string | null {
    return this.isTokenValid() ? this.token : null
  }

  static clearToken(): void {
    this.token = null
    this.tokenExpiry = null
    apiClient.setToken(null)
    apiClient.setTokenExpiry(null)
    apiClient.setRefreshExpiry(null)
  }

  static async getValidToken(): Promise<string | null> {
    console.log("Token inválido o expirado, intentando refrescar...", this.isTokenValid())
    if (!this.isTokenValid()) {
      return null
    }
    
    const authResponse = await this.authenticate()
    if (authResponse.success && authResponse.data) {
      return authResponse.data.access
    }

    return null
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  active: boolean
  createdAt: string
  lastLogin?: string
}

export interface AdminProperty {
  id: string
  title: string
  code?: string
  published: boolean
  featured: boolean
  show_map: boolean
  map_src: string
  built_area?: number
  land_area?: number
  electricity: boolean
  water?: string
  description?: string
  amenities?: string
  characteristics?: string
  price?: number
  currency?: string
  price_type: PriceTypeEnum
  operation: OperationEnum
  state: StateEnum
  property_type: PropertyTypeEnum
  bedrooms?: number
  bathrooms?: number
  region: string
  commune: string
  address?: string
  parking?: number
  storage: boolean
  images: string[]
  createdAt: string
  updatedAt: string
}

export enum OperationEnum {
  VENTA = "En venta",
  ARRIENDO = "En arriendo",
}

export enum StateEnum {
  NUEVAS = "Propiedades Nuevas",
  USADAS = "Propiedades Usadas",
}

export enum PropertyTypeEnum {
  CASA = "Casa",
  DEPARTAMENTO = "Departamento",
  TERRENO = "Terreno",
  OFICINA = "Oficina",
}

export enum PriceTypeEnum {
  FIJO = "Precio Fijo",
  UF = "UF",
}

export interface LoginForm {
  email: string
  password: string
}

export interface PropertyForm {
  title: string
  code?: string
  published: boolean
  featured: boolean
  show_map: boolean
  map_src: string
  built_area?: number
  land_area?: number
  electricity: boolean
  water?: string
  description?: string
  amenities?: string
  characteristics?: string
  price?: number
  currency?: string
  price_type: PriceTypeEnum
  operation: OperationEnum
  state: StateEnum
  property_type: PropertyTypeEnum
  bedrooms?: number
  bathrooms?: number
  region: string
  commune: string
  address?: string
  parking?: number
  storage: boolean
  images: string[]
}

export interface UserForm {
  name: string
  email: string
  password?: string
  role: "admin" | "editor" | "viewer"
  active: boolean
}

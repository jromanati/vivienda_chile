export interface ProductImage {
  id?: number
  url: string
  public_id?: string
  created_at?: string
}

export interface FeatureDetail {
  id: number
  name: string
  feature: number
  feature_name: string
  created_at?: string
  updated_at?: string
}

export interface ProductFeatureGroup {
  feature: {
    id: number
    name: string
    detail: FeatureDetail[]
  }
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  original_price: number
  rating: number
  stock: number
  sku: string
  category: number
  category_path: string
  is_new: boolean
  main_image?: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
  reviews: number
  images?: ProductImage[]
  features: ProductFeatureGroup[]
  deleted_images?: []
}

export interface ProductResponse extends Product {
  category_name: string
  category_path: string
  in_stock: boolean
  images?: ProductImage[]
  features: ProductFeatureGroup[]
}

export enum PropertyTypeEnum {
  CASA = "Casa",
  DEPARTAMENTO = "Departamento",
  DEPARTAMENTO_AMOBLADO = "Departamento amoblado",
  COMERCIAL = "Comercial",              // 👈 value del back
  NEGOCIO = "Negocio",
  OFICINA = "Oficina",
  PARCELA = "Parcela",
  RESIDENCIAL = "Residencial",          // 👈 igual que el back (si fue typo, así lo reflejamos)
  PROPIEDAD = "Propiedad",
  BODEGA = "Bodega",
  ESTACIONAMIENTO = "Estacionamiento",
  TERRENO = "Terreno",
}
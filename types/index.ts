export interface PropertyImage {
  id: number;
  propiedad_id: number;
  url: string;
  public_id: string;
  order: number;
  is_cover: boolean;
}

export interface Property {
    id: string
    title: string
    code?: string
    published: boolean
    featured: boolean
    show_map: boolean
    map_src: string
    status: string
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
    area: number
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

export interface Service {
  id: string
  title: string
  description: string
  features_label: string
  shortDescriptionHome: string
  shortDescription: string
  lastDescription: string
  icon: string
  features: string[]
  image: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  serviceId?: string
}

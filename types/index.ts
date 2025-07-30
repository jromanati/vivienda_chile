export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: "casa" | "departamento" | "oficina"
  status: "venta" | "arriendo"
  images: string[]
  features: string[]
  createdAt: string
  videos: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
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

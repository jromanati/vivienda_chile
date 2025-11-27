import type { Property, Service, Testimonial } from "@/types"
import { OperationEnum, StateEnum, PropertyTypeEnum, PriceTypeEnum } from "@/types/admin"

export const properties: Property[] = [
  {
    id: "1",
    title: "Casa Moderna en Las Condes",
    description:
      "Hermosa casa moderna de 3 pisos con acabados de lujo, jardín privado y vista panorámica a la cordillera.",
    price: 450000000,
    location: "Las Condes, Santiago",
    region: "Metropolitana",
    commune: "Las Condes",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    property_type: PropertyTypeEnum.CASA,
    status: "venta",
    show_map:true,
    map_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.742564230862!2d-70.52295104337543!3d-33.39210664772879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cea3f7c82313%3A0x7664e481d8ef91ad!2sApoquindo%2C%207591253%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1755343177144!5m2!1ses!2scl",
    images: [
      {
        url: "/images/propiedades/las_condes.jpg?height=400&width=600"
      },
      {
        url: "/images/propiedades/las_condes2.png?height=400&width=600"
      },
    ],
    videos: "/videos/propiedades/video_condes.mp4?height=600&width=800&text=Video+Tour+Casa",
    features: ["Jardín privado", "Vista a la cordillera", "Cocina equipada", "Estacionamiento 2 autos"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Departamento Premium Reñaca",
    description:
      "Exclusivo departamento en el corazón de Reñaca con todas las comodidades y excelente conectividad.",
    price: 3200000,
    location: "Providencia, Santiago",
    region: "Valparaíso",
    commune: "Reñaca",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    property_type: PropertyTypeEnum.DEPARTAMENTO,
    status: "arriendo",
    show_map:true,
    map_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.2756355138886!2d-71.54329663165626!3d-32.96496421307197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dd131cdbc0ef%3A0xf6a8873ee87f4a82!2zUmXDsWFjYQ!5e0!3m2!1ses!2scl!4v1755343300712!5m2!1ses!2scl",
    images: [
      {
        url: "/images/propiedades/re_aca.jpg?height=400&width=600"
      },
    ],
    videos: [
      "/placeholder.svg?height=600&width=800&text=Video+Recorrido+Depto"
    ],
    features: ["Gimnasio", "Piscina", "Seguridad 24/7", "Terraza"],
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Casa Familiar en Ñuñoa",
    description: "Acogedora casa familiar con amplio patio, perfecta para familias que buscan tranquilidad y espacio.",
    price: 280000000,
    location: "Ñuñoa, Santiago",
    region: "Metropolitana",
    commune: "Las Condes",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    property_type: PropertyTypeEnum.CASA,
    status: "venta",
    show_map:true,
    map_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.742564230862!2d-70.52295104337543!3d-33.39210664772879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cea3f7c82313%3A0x7664e481d8ef91ad!2sApoquindo%2C%207591253%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1755343177144!5m2!1ses!2scl",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Patio amplio", "Quincho", "Bodega", "Cerca de colegios"],
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Oficina Corporativa Centro",
    description: "Moderna oficina en el centro financiero de Santiago, ideal para empresas en crecimiento.",
    price: 2800000,
    location: "Santiago Centro",
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    type: "oficina",
    property_type: PropertyTypeEnum.OFICINA,
    status: "arriendo",
    show_map:true,
    map_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.742564230862!2d-70.52295104337543!3d-33.39210664772879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cea3f7c82313%3A0x7664e481d8ef91ad!2sApoquindo%2C%207591253%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1755343177144!5m2!1ses!2scl",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Aire acondicionado", "Sala de reuniones", "Recepción", "Estacionamiento"],
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Penthouse Vitacura",
    description: "Exclusivo penthouse con terraza panorámica y acabados de primera calidad en el sector más exclusivo.",
    price: 850000000,
    location: "Vitacura, Santiago",
    bedrooms: 3,
    bathrooms: 3,
    area: 200,
    type: "departamento",
    property_type: PropertyTypeEnum.DEPARTAMENTO,
    status: "venta",
    show_map:true,
    map_src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.742564230862!2d-70.52295104337543!3d-33.39210664772879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cea3f7c82313%3A0x7664e481d8ef91ad!2sApoquindo%2C%207591253%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1755343177144!5m2!1ses!2scl",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Terraza panorámica", "Jacuzzi", "Bodega de vinos", "Conserje"],
    createdAt: "2024-01-03",
  },
  {
    id: "6",
    title: "Casa de Playa Viña del Mar",
    description: "Hermosa casa frente al mar con acceso directo a la playa y vista espectacular al océano.",
    price: 520000000,
    location: "Viña del Mar, Valparaíso",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "casa",
    property_type: PropertyTypeEnum.CASA,
    status: "venta",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    features: ["Frente al mar", "Acceso directo playa", "Terraza con vista", "Quincho"],
    createdAt: "2024-01-01",
  },
]

export const services: Service[] = [
  {
    id: "corretaje-propiedades",
    title: "Corretaje de Propiedades",
    shortDescriptionHome: "Asesoria y gestión personalizada según tus necesidades",
    description:
      "¿Quieres vender, comprar o arrendar una propiedad? Te ayudamos en todo el proceso de forma rápida, segura y sin complicaciones.",
    shortDescription: "Contamos con expertos en bienes raíces que te asesoran desde la tasación, promoción, visitas, negociación hasta el cierre final. Trabajamos con propiedades residenciales, comerciales y terrenos.",
    lastDescription: "",
    icon: "/images/servicios/corretaje_home.png?",
    features_label: "Ofrecemos servicios de corretaje para:",
    features: [
      "Venta de casas y departamentos",
      "Compra de propiedades",
      "Arriendo de inmuebles",
    ],
    image: "/images/servicios/asesoria_en_compra.png?height=400&width=600",
  },
  {
    id: "asesoria-venta",
    title: "Asesoría Legal",
    shortDescriptionHome: "Abogados expertos en derecho inmobiliario",
    description:
      "¿Tienes dudas legales al comprar o vender una propiedad? Te acompañamos con asesoría legal especializada para que tomes decisiones seguras.",
    shortDescription: "Trabajamos con abogados con experiencia en derecho inmobiliario para garantizar que cada operación esté 100% en regla. Asesoria legal para propiedades residenciales, comerciales y terrenos.",
    lastDescription: "",
    icon: "/images/servicios/legal_home.png?",
    features_label: "Ofrecemos apoyo en:",
    features: [
      "Revisión de títulos y escrituras",
      "Promesas de compraventa",
      "Redacción y revisión de contratos",
      "Solución de conflictos por arriendos, herencias o propiedades",
    ],
    image: "/images/servicios/asesoria_legal.png??height=400&width=600",
  },
  {
    id: "gestion-arriendos",
    title: "Financiamiento Habitacional",
    shortDescriptionHome: "Tu mejor alternativa según monto ($), tasa (%) y plazos",
    description:
      "¿Necesitas ayuda para conseguir tu crédito hipotecario? Te guiamos para encontrar el mejor financiamiento para comprar tu propiedad.",
    shortDescription: "Buscamos las mejor tasa y condiciones para ti. Te acompañamos desde el inicio hasta la firma en notaría.",
    lastDescription: "REQUISITOS: Chilenos o extranjeros con permanencia definitiva, antigüedad laboral desde 1 año, ingresos líquidos desde $700.000.- SIN DICOM!! (castigos y dicom histórico sujeto a evaluación)",
    icon: "/images/servicios/financiamiento_home.png?",
    features_label: "Te apoyamos en:",
    features: [
      "Comparar créditos hipotecarios entre bancos y mutuarias",
      "Preaprobaciones rápidas",
      "Gestión Leasing + Subsidio Automático y Leaseback Inmobiliario",
      "Gestión completa del financiamiento",
    ],
    image: "/images/servicios/asesoria_en_arriendo.jpg?height=400&width=600",
  },
  // {
  //   id: "inversion-inmobiliaria",
  //   title: "Inversión Inmobiliaria",
  //   description:
  //     "Asesoramos en inversiones inmobiliarias rentables con análisis de mercado especializado. Te ayudamos a identificar las mejores oportunidades de inversión, evaluar riesgos y proyectar rentabilidades para que tomes decisiones informadas y exitosas.",
  //   shortDescription: "Invierte inteligentemente en el mercado inmobiliario",
  //   icon: "📈",
  //   features: [
  //     "Análisis detallado de rentabilidad",
  //     "Estudios de mercado y tendencias",
  //     "Proyecciones financieras a largo plazo",
  //     "Identificación de oportunidades de inversión",
  //     "Asesoría en diversificación de portafolio",
  //     "Seguimiento post-inversión",
  //     "Estrategias de salida y liquidez",
  //     "Análisis de riesgo y mitigación",
  //   ],
  //   image: "/placeholder.svg?height=400&width=600",
  // },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "María González",
    role: "Compradora",
    content:
      "Excelente servicio. Me ayudaron a encontrar la casa perfecta para mi familia en tiempo record. Muy profesionales y atentos.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    role: "Inversionista",
    content:
      "Gracias a Vivienda Chile pude hacer una inversión muy rentable. Su análisis de mercado fue clave para tomar la decisión correcta.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "3",
    name: "Ana Martínez",
    role: "Vendedora",
    content:
      "Vendí mi departamento en tiempo record y al precio que esperaba. El equipo de marketing hizo un trabajo excepcional.",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

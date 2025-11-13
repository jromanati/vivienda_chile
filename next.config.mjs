/** @type {import('next').NextConfig} */
const nextConfig = {

  // 🔁 Redirecciones 301 desde URLs antiguas (WordPress) al nuevo sitio
  async redirects() {
    return [
      // Página de venta de propiedades
      {
        source: '/categoria/casa',
        destination: '/propiedades',
        permanent: true,
      },

      // Categoría de casas
      {
        source: '/servicio/venta-de-propiedades',
        destination: '/propiedades',
        permanent: true,
      },

      // Contacto antiguo de WordPress
      {
        source: '/contactenos',
        destination: '/contacto',
        permanent: true,
      },

      // Quiénes somos (antigua ruta)
      {
        source: '/quienes-somos',
        destination: '/nosotros',
        permanent: true,
      },

      // Arriendo de propiedades
      {
        source: '/arriendo-de-propiedades',
        destination: '/propiedades',
        permanent: true,
      },

      // Energías renovables / servicios antiguos
      {
        source: '/energeticas',
        destination: '/servicios',
        permanent: true,
      },
    ]
  },

  // 🔄 Rewrites para tu backend FastAPI local
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ]
  },

  // ⚠️ Ignorar errores de lint y TS durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🖼️ Configuración de imágenes
  images: {
    domains: ['placeholder.svg', 'blob.v0.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },

  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig

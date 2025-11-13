/** @type {import('next').NextConfig} */
const nextConfig = {

  // 🔁 Redirecciones 301 usando patrones
  async redirects() {
    return [
      // Cualquier URL antigua tipo /servicio/lo-que-sea
      {
        source: '/servicio/:path*',
        destination: '/servicios',
        permanent: true,
      },

      // Cualquier URL antigua tipo /categoria/lo-que-sea
      {
        source: '/categoria/:path*',
        destination: '/propiedades',
        permanent: true,
      },

      {
        source: '/search',
        destination: '/propiedades',
        permanent: true,
      },

      // Contacto viejo -> contacto nuevo
      {
        source: '/contactenos',
        destination: '/contacto',
        permanent: true,
      },

      // Quiénes somos viejo -> nosotros nuevo
      {
        source: '/nosotros',
        destination: '/quienes-somos',
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

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

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

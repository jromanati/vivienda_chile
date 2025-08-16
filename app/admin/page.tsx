"use client"

import { useState, useEffect } from "react"
import { Building, Users, Eye, TrendingUp, DollarSign } from "lucide-react"
import { adminProperties, adminUsers } from "@/data/adminData"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    publishedProperties: 0,
    totalUsers: 0,
    activeUsers: 0,
    totalViews: 1250,
    monthlyRevenue: 15000000,
  })

  useEffect(() => {
    // Calcular estadísticas
    setStats({
      totalProperties: adminProperties.length,
      publishedProperties: adminProperties.filter((p) => p.published).length,
      totalUsers: adminUsers.length,
      activeUsers: adminUsers.filter((u) => u.active).length,
      totalViews: 1250,
      monthlyRevenue: 15000000,
    })
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const statCards = [
    {
      title: "Total Propiedades",
      value: stats.totalProperties,
      icon: Building,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Propiedades Publicadas",
      value: stats.publishedProperties,
      icon: Eye,
      color: "bg-green-500",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Usuarios Activos",
      value: stats.activeUsers,
      icon: Users,
      color: "bg-purple-500",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Ingresos Mensuales",
      value: formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      color: "bg-yellow-500",
      change: "+15%",
      changeType: "positive",
    },
  ]

  const recentProperties = adminProperties.slice(0, 5)
  const recentUsers = adminUsers.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {typeof stat.value === "string" ? stat.value : stat.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Propiedades Recientes</h2>
              <a href="/admin/propiedades" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todas
              </a>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                    <p className="text-sm text-gray-500">
                      {property.commune} • {property.property_type}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.published ? "Publicada" : "Borrador"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Usuarios Recientes</h2>
              <a href="/admin/usuarios" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Ver todos
              </a>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">{user.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Gráfico de actividad</p>
            <p className="text-sm text-gray-400">Próximamente disponible</p>
          </div>
        </div>
      </div>
    </div>
  )
}

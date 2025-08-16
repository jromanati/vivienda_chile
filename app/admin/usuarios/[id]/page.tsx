"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import { adminUsers } from "@/data/adminData"
import { Edit, ArrowLeft, User, Mail, Calendar, Shield, CheckCircle, XCircle } from "lucide-react"
import type { AdminUser } from "@/types/admin"

interface Props {
  params: { id: string }
}

export default function UserDetailPage({ params }: Props) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Buscar el usuario por ID
    const foundUser = adminUsers.find((u) => u.id === params.id)
    if (foundUser) {
      setUser(foundUser)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "editor":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Acceso completo al sistema, puede gestionar usuarios y todas las propiedades"
      case "editor":
        return "Puede crear, editar y eliminar propiedades, pero no gestionar usuarios"
      case "viewer":
        return "Solo puede ver propiedades, sin permisos de edición"
      default:
        return "Rol no definido"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/usuarios" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">
              {user.email} • ID: {user.id}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/usuarios/${user.id}/edit`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar Usuario
        </Link>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className={`font-semibold ${user.active ? "text-green-600" : "text-red-600"}`}>
                {user.active ? "Activo" : "Inactivo"}
              </p>
            </div>
            {user.active ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rol</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
              >
                {user.role}
              </span>
            </div>
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900 truncate">{user.email}</p>
            </div>
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Último Acceso</p>
              <p className="font-semibold text-gray-900">{user.lastLogin ? formatDate(user.lastLogin) : "Nunca"}</p>
            </div>
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Teléfono</label>
                <p className="text-gray-900">{user.phone || "No especificado"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Estado</label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.active ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>

          {/* Role & Permissions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Rol y Permisos
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Rol Actual</label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Descripción del Rol</label>
                <p className="text-gray-700 mt-1">{getRoleDescription(user.role)}</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Último inicio de sesión</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.lastLogin ? formatDate(user.lastLogin) : "Nunca"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Cuenta creada</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Última actualización</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h2>
            <div className="space-y-3">
              <Link
                href={`/admin/usuarios/${user.id}/edit`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Usuario
              </Link>
              <button
                onClick={() => {
                  if (confirm(`¿Estás seguro de que quieres ${user.active ? "desactivar" : "activar"} este usuario?`)) {
                    // Aquí iría la lógica para cambiar el estado
                    console.log(`${user.active ? "Desactivando" : "Activando"} usuario:`, user.id)
                  }
                }}
                className={`w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-colors duration-200 ${
                  user.active ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {user.active ? <XCircle className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                {user.active ? "Desactivar Usuario" : "Activar Usuario"}
              </button>
            </div>
          </div>

          {/* User Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Propiedades creadas</span>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Propiedades editadas</span>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Días desde último acceso</span>
                <span className="text-sm font-medium text-gray-900">
                  {user.lastLogin
                    ? Math.floor((Date.now() - new Date(user.lastLogin).getTime()) / (1000 * 60 * 60 * 24))
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

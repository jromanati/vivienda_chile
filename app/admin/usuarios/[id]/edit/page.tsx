"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, X } from "lucide-react"
import UserForm from "@/components/admin/UserForm"
import { adminUsers } from "@/data/adminData"
import type { User } from "@/types/admin"

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const userId = params.id as string
    const foundUser = adminUsers.find((u) => u.id === userId)

    if (foundUser) {
      setUser(foundUser)
    }
    setLoading(false)
  }, [params.id])

  const handleSave = async (formData: Partial<User>) => {
    setSaving(true)
    try {
      // Aquí iría la lógica para guardar en la base de datos
      console.log("Guardando usuario:", formData)

      // Simular delay de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirigir a la lista de usuarios
      router.push("/admin/usuarios")
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Usuario no encontrado</h2>
        <p className="text-gray-600 mb-6">El usuario que buscas no existe o ha sido eliminado.</p>
        <Link
          href="/admin/usuarios"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Usuarios
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Usuario</h1>
            <p className="text-gray-600 mt-1">
              {user.name} • {user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/usuarios"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Link>
          <button
            onClick={() => {
              const form = document.querySelector("form") as HTMLFormElement
              if (form) {
                form.requestSubmit()
              }
            }}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/admin" className="hover:text-gray-700">
              Admin
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/admin/usuarios" className="hover:text-gray-700">
              Usuarios
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Editar</li>
        </ol>
      </nav>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <UserForm initialData={user} onSubmit={handleSave} isLoading={saving} />
      </div>
    </div>
  )
}

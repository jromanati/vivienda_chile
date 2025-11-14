"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import UserForm from "@/components/admin/UserForm"
import type { UserForm as UserFormType } from "@/types/admin"

export default function CreateUserPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: UserFormType) => {
    setIsLoading(true)

    try {
      // Simular creación de usuario
      await new Promise((resolve) => setTimeout(resolve, 2000))


      // Redirigir a la lista de usuarios
      router.push("/admin/usuarios")
    } catch (error) {
      console.error("Error al crear usuario:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/admin/usuarios")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Usuario</h1>
        <p className="text-gray-600 mt-2">Crea un nuevo usuario en el sistema</p>
      </div>

      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
    </div>
  )
}

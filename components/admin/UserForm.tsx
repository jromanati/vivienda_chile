"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Save, X, Eye, EyeOff } from "lucide-react"
import type { UserForm } from "@/types/admin"

interface UserFormProps {
  initialData?: Partial<UserForm>
  onSubmit: (data: UserForm) => void
  onCancel: () => void
  isLoading?: boolean
  isEdit?: boolean
}

const UserFormComponent = ({ initialData, onSubmit, onCancel, isLoading = false, isEdit = false }: UserFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "viewer",
      active: true,
      ...initialData,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onFormSubmit = (data: UserForm) => {
    // Si es edición y no se cambió la contraseña, no enviarla
    if (isEdit && !data.password) {
      const { password, ...dataWithoutPassword } = data
      onSubmit(dataWithoutPassword as UserForm)
    } else {
      onSubmit(data)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{isEdit ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
        {/* Información Básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
            <input
              type="text"
              {...register("name", {
                required: "El nombre es requerido",
                minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Juan Pérez"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        {/* Contraseña */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEdit ? "Nueva Contraseña (opcional)" : "Contraseña *"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register(
                  "password",
                  isEdit
                    ? {}
                    : {
                        required: "La contraseña es requerida",
                        minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                      },
                )}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isEdit ? "Dejar vacío para mantener actual" : "••••••••"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            {isEdit && (
              <p className="mt-1 text-xs text-gray-500">Deja este campo vacío si no quieres cambiar la contraseña</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rol *</label>
            <select
              {...register("role", { required: "El rol es requerido" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="viewer">Visualizador</option>
              <option value="editor">Editor</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
          </div>
        </div>

        {/* Descripción de roles */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Descripción de Roles:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="font-medium text-red-600 mr-2">Administrador:</span>
              <span>Acceso completo al sistema, puede gestionar usuarios y todas las funcionalidades.</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-blue-600 mr-2">Editor:</span>
              <span>Puede crear, editar y eliminar propiedades, pero no gestionar usuarios.</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-600 mr-2">Visualizador:</span>
              <span>Solo puede ver la información, sin permisos de edición.</span>
            </div>
          </div>
        </div>

        {/* Estado */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("active")}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Usuario Activo</label>
        </div>
        <p className="text-xs text-gray-500 ml-6">Los usuarios inactivos no podrán acceder al sistema</p>

        {/* Botones */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-2 inline" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2 inline" />
                {isEdit ? "Actualizar" : "Crear"} Usuario
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserFormComponent

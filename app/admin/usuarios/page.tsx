"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, Trash2, UserCheck, UserX, Shield, Eye, Users } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { adminUsers } from "@/data/adminData"
import type { User } from "@/types/admin"

export default function AdminUsersPage() {
  const [users, setUsers] = useState(adminUsers)
  const router = useRouter()

  const toggleActive = (id: string) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, active: !user.active } : user)))
  }

  const deleteUser = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id))
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-600" />
      case "editor":
        return <Edit className="h-4 w-4 text-blue-600" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const columns = [
    {
      key: "name",
      label: "Usuario",
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">{value.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Rol",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          {getRoleIcon(value)}
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(value)}`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        </div>
      ),
    },
    {
      key: "active",
      label: "Estado",
      sortable: true,
      render: (value: boolean) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha Creación",
      sortable: true,
      render: (value: string) => formatDate(value),
    },
    {
      key: "lastLogin",
      label: "Último Acceso",
      sortable: true,
      render: (value?: string) => (value ? formatDate(value) : "Nunca"),
    },
  ]

  const renderActions = (row: User) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleActive(row.id)
        }}
        className={`p-1 rounded-md transition-colors duration-200 ${
          row.active ? "text-green-600 hover:bg-green-100" : "text-red-600 hover:bg-red-100"
        }`}
        title={row.active ? "Desactivar" : "Activar"}
      >
        {row.active ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
      </button>

      <Link
        href={`/admin/usuarios/${row.id}/edit`}
        className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200"
        title="Editar"
        onClick={(e) => e.stopPropagation()}
      >
        <Edit className="h-4 w-4" />
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation()
          deleteUser(row.id)
        }}
        className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200"
        title="Eliminar"
        disabled={row.role === "admin"} // No permitir eliminar admins
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-600 mt-2">Gestiona todos los usuarios del sistema</p>
        </div>
        <Link
          href="/admin/usuarios/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{users.length}</div>
          <div className="text-sm text-gray-600">Total Usuarios</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{users.filter((u) => u.active).length}</div>
          <div className="text-sm text-gray-600">Activos</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{users.filter((u) => u.role === "admin").length}</div>
          <div className="text-sm text-gray-600">Administradores</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "editor").length}</div>
          <div className="text-sm text-gray-600">Editores</div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={users}
        columns={columns}
        actions={renderActions}
        searchable={true}
        filterable={true}
      />
    </div>
  )
}

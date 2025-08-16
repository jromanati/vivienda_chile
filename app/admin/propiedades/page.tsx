"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { adminProperties } from "@/data/adminData"
import type { AdminProperty } from "@/types/admin"
import { useProperties } from "@/hooks/useProperties"
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminPropertiesPage() {
  const token = localStorage.getItem("admin_user");
  const { data: properties2 = [], isLoading, error } = useProperties(null)
  const [properties, setProperties] = useState(adminProperties)
  const router = useRouter()
  const [pendingDelete, setPendingDelete] = useState<AdminProperty | null>(null)
  const { toast } = useToast()

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
  }).format(price)

  const togglePublished = (id: string) => {
    setProperties((prev) => prev.map((prop) => (prop.id === id ? { ...prop, published: !prop.published } : prop)))
  }

  const toggleFeatured = (id: string) => {
    setProperties((prev) => prev.map((prop) => (prop.id === id ? { ...prop, featured: !prop.featured } : prop)))
  }

  const deleteProperty = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
      setProperties((prev) => prev.filter((prop) => prop.id !== id))
    }
  }
  const confirmDelete = () => {
    if (!pendingDelete) return
    const toDelete = pendingDelete
    setProperties((prev) => prev.filter((prop) => prop.id !== toDelete.id))
    setPendingDelete(null)
    toast({
      title: "Propiedad eliminada",
      description: `Se eliminó "${toDelete.title}".`,
      variant: "destructive",
    })
  }

  const columns = [
    {
      key: "title",
      label: "Título",
      sortable: true,
      render: (value: string, row: AdminProperty) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.code || "Sin código"}</div>
        </div>
      ),
    },
    {
      key: "property_type",
      label: "Tipo",
      sortable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ),
    },
    {
      key: "operation",
      label: "Operación",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "En venta" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "price",
      label: "Precio",
      sortable: true,
      render: (value: number, row: AdminProperty) => (
        <div className="font-medium text-gray-900">{formatPrice(row.price)}</div>
      ),
    },
    {
      key: "commune",
      label: "Comuna",
      sortable: true,
    },
    {
      key: "published",
      label: "Estado",
      render: (value: boolean, row: AdminProperty) => (
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {value ? "Publicada" : "Borrador"}
          </span>
          {row.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
        </div>
      ),
    },
  ]
  // if (isLoading) {
  //   return (
  //     <div className="text-center py-12">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
  //       <p className="mt-4 text-gray-600">Cargando propiedades...</p>
  //     </div>
  //   )
  // }

  const renderActions = (row: AdminProperty) => (
    <div className="flex items-center space-x-2">
      {/* <button
        onClick={(e) => {
          e.stopPropagation()
          togglePublished(row.id)
        }}
        className={`p-1 rounded-md transition-colors duration-200 ${
          row.published ? "text-green-600 hover:bg-green-100" : "text-gray-400 hover:bg-gray-100"
        }`}
        title={row.published ? "Despublicar" : "Publicar"}
      >
        {row.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button> */}

      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFeatured(row.id)
        }}
        className={`p-1 rounded-md transition-colors duration-200 ${
          row.featured ? "text-yellow-500 hover:bg-yellow-100" : "text-gray-400 hover:bg-gray-100"
        }`}
        title={row.featured ? "Quitar destacado" : "Destacar"}
      >
        {row.featured ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
      </button>

      <Link
        href={`/admin/propiedades/${row.id}/edit`}
        className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors duration-200"
        title="Editar"
        onClick={(e) => e.stopPropagation()}
      >
        <Edit className="h-4 w-4" />
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setPendingDelete(row)
        }}
        className="p-1 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200"
        title="Eliminar"
        aria-label="Eliminar"
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
          <h1 className="text-3xl font-bold text-gray-900">Propiedades</h1>
          <p className="text-gray-600 mt-2">Gestiona todas las propiedades del sistema</p>
        </div>
        <Link
          href="/admin/propiedades/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Propiedad
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
          <div className="text-sm text-gray-600">Total Propiedades</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{properties.filter((p) => p.published).length}</div>
          <div className="text-sm text-gray-600">Publicadas</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{properties.filter((p) => p.featured).length}</div>
          <div className="text-sm text-gray-600">Destacadas</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{properties.filter((p) => !p.published).length}</div>
          <div className="text-sm text-gray-600">Borradores</div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={properties}
        columns={columns}
        actions={renderActions}
        onRowClick={(row) => router.push(`/admin/propiedades/${row.id}`)}
        searchable={true}
        filterable={true}
      />
      {/* Confirm Delete Modal */}
      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
        title="Eliminar propiedad"
        description={
          pendingDelete
            ? `¿Estás seguro de eliminar "${pendingDelete.title}" (${pendingDelete.code || "sin código"})? Esta acción no se puede deshacer.`
            : "¿Estás seguro de eliminar esta propiedad? Esta acción no se puede deshacer."
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        danger
      />
    </div>
  )
}

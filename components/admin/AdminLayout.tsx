"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Home, Building, Users, Menu, X, LogOut } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const navigation = [
    {
      name: "Inicio",
      href: "/admin",
      icon: Home,
      current: pathname === "/admin",
    },
    {
      name: "Propiedades",
      href: "/admin/propiedades",
      icon: Building,
      current: pathname.startsWith("/admin/propiedades"),
    },
    {
      name: "Usuarios",
      href: "/admin/usuarios",
      icon: Users,
      current: pathname.startsWith("/admin/usuarios"),
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  item.current ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User info móvil */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  {/* <span className="text-sm font-medium text-white">{user?.name.charAt(0)}</span> */}
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                {/* <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p> */}
                {/* <p className="text-xs text-gray-500 truncate">{user?.role}</p> */}
              </div>
              <button onClick={handleLogout} className="ml-2 text-gray-400 hover:text-gray-600" title="Cerrar sesión">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    {/* <span className="text-sm font-medium text-white">{user?.name.charAt(0)}</span> */}
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  {/* <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p> */}
                  {/* <p className="text-xs text-gray-500 truncate">{user?.role}</p> */}
                </div>
                <button onClick={handleLogout} className="ml-2 text-gray-400 hover:text-gray-600" title="Cerrar sesión">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  item.current ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64 flex-1 flex flex-col w-full">
        {/* Header móvil */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>
        </div>

        {/* Contenido */}
        <main className="flex-1 py-6">
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

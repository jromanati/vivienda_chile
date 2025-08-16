"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Home, Briefcase, Building, Users, UserPlus, Phone, ArrowRight } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    {
      name: "Inicio",
      href: "/",
      icon: Home,
    },
    {
      name: "Servicios",
      href: "/servicios",
      icon: Briefcase,
      hasSubmenu: false,
      // submenu: [
      //   {
      //     name: "Todas los Servicios",
      //     href: "/servicios",
      //     description: "Explora nuestros servicios completo",
      //     icon: "🏘️",
      //   },
      //   {
      //     name: "Asesoría en Compra",
      //     href: "/servicios/asesoria-compra",
      //     description: "Te acompañamos en todo el proceso de compra",
      //     icon: "🏠",
      //   },
      //   {
      //     name: "Asesoría en Venta",
      //     href: "/servicios/asesoria-venta",
      //     description: "Maximiza el valor de tu propiedad",
      //     icon: "💰",
      //   },
      //   {
      //     name: "Gestión de Arriendos",
      //     href: "/servicios/gestion-arriendos",
      //     description: "Administración integral de arriendos",
      //     icon: "🔑",
      //   },
      //   {
      //     name: "Inversión Inmobiliaria",
      //     href: "/servicios/inversion-inmobiliaria",
      //     description: "Invierte inteligentemente en propiedades",
      //     icon: "📈",
      //   },
      // ],
    },
    {
      name: "Propiedades",
      href: "/propiedades",
      icon: Building,
      hasSubmenu: false,
      // submenu: [
      //   {
      //     name: "Todas las Propiedades",
      //     href: "/propiedades",
      //     description: "Explora nuestro catálogo completo",
      //     icon: "🏘️",
      //   },
      //   {
      //     name: "Casas en Venta",
      //     href: "/propiedades?type=casa&status=venta",
      //     description: "Casas familiares y modernas",
      //     icon: "🏡",
      //   },
      //   {
      //     name: "Departamentos",
      //     href: "/propiedades?type=departamento",
      //     description: "Departamentos premium y cómodos",
      //     icon: "🏢",
      //   },
      //   {
      //     name: "Arriendos",
      //     href: "/propiedades?status=arriendo",
      //     description: "Propiedades disponibles para arriendo",
      //     icon: "🔑",
      //   },
      //   {
      //     name: "Oficinas",
      //     href: "/propiedades?type=oficina",
      //     description: "Espacios comerciales y corporativos",
      //     icon: "🏬",
      //   },
      // ],
    },
    {
      name: "Quiénes Somos",
      href: "/quienes-somos",
      icon: Users,
    },
    {
      name: "Trabaja con Nosotros",
      href: "/trabaja-con-nosotros",
      icon: UserPlus,
    },
    {
      name: "Contacto",
      href: "/contacto",
      icon: Phone,
    },
  ]

  // Mobile Menu Item Component with Accordion
  const MobileMenuItem = ({
    item,
    index,
    isActive,
    onItemClick,
  }: {
    item: any
    index: number
    isActive: boolean
    onItemClick: () => void
  }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    const toggleSubmenu = () => {
      if (item.hasSubmenu) {
        setIsSubmenuOpen(!isSubmenuOpen)
      } else {
        onItemClick()
      }
    }

    return (
      <div className="space-y-1">
        <button
          onClick={toggleSubmenu}
          className={`flex items-center justify-between w-full px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Link
              href={item.href}
          >
          <div className="flex items-center space-x-3">
            <item.icon className="h-5 w-5" /> 
            <span>{item.name}</span>
          </div>
          </Link>
          {item.hasSubmenu && (
            <ChevronDown
              className={`h-4 w-4 transform transition-transform duration-200 ${isSubmenuOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>

        {/* Submenu with smooth accordion animation */}
        {item.hasSubmenu && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-6 space-y-1 pt-2">
              {item.submenu?.map((subItem: any, subIndex: number) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className="flex items-start space-x-3 px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  onClick={onItemClick}
                  style={{ animationDelay: `${index * 50 + subIndex * 25}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium group-hover:text-blue-600 transition-colors duration-200">
                      {subItem.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{subItem.description}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-36">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden rounded-xl">
              <Image src="/logo.png" alt="Vivienda Chile" width={128} height={128} className="h-32 w-auto" />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-600 shadow-lg transform scale-105"
                      : "text-gray-700 hover:text-blue-600 "
                  }`}
                >
                  {/* <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transform scale-105"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md hover:scale-105"
                  }`}
                > */}
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {item.hasSubmenu && (
                    <ChevronDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {/* Enhanced Submenu */}
                {item.hasSubmenu && (
                  <div className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                      </div>

                      <div className="space-y-2">
                        {item.submenu?.map((subItem, index) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group/item flex items-start p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 transition-all duration-200 transform hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900 group-hover/item:text-blue-600 transition-colors duration-200">
                                  {subItem.name}
                                </h4>
                                <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover/item:opacity-100 group-hover/item:text-blue-600 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-200" />
                              </div>
                              <p className="text-sm text-gray-600 mt-1 group-hover/item:text-gray-700 transition-colors duration-200">
                                {subItem.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Accordion */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-xl max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => (
                <MobileMenuItem
                  key={item.name}
                  item={item}
                  index={index}
                  isActive={isActive(item.href)}
                  onItemClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

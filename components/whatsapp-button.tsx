"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  // Número de WhatsApp (formato internacional sin + y sin espacios)
  const phoneNumber = "56967270575"
  const message =
    "Hola! Viviendachile, me interesa su servicio!"

  const handleClick = () => {
    // Crear la URL de WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    // Abrir en nueva ventana
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Mensaje flotante 
        {isHovered && (
          <div className="absolute bottom-16 right-0 mb-2 mr-2 bg-white rounded-lg p-3 w-64 animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">¡Hola! 👋</p>
                <p className="text-xs text-gray-600">
                  ¿Tienes preguntas? Escríbenos por WhatsApp y te ayudamos de inmediato.
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsHovered(false)
                }}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b"></div>
          </div>
        )}
        */}
        {/* Botón principal */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-16 w-16 rounded-full transition-all duration-300 transform hover:scale-110 group cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          {/* Ícono de WhatsApp */}
          <div className="flex items-center justify-center h-full w-full">
            <Image
              src="/images/whatsapp_icon.png"
              alt="WhatsApp"
              width={48}
              height={48}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Indicador de pulso */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30 -z-10"></div>

          {/* Badge de notificación 
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>*/}
        </button>
      </div>
    </div>
  )
}

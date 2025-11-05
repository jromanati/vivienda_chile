"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import type { ContactForm as ContactFormType } from "@/types"

interface ContactFormProps {
  propertyId?: string
  serviceId?: string
  title?: string
}

const ContactForm = ({ propertyId, serviceId, title = "Contáctanos" }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>()

  const onSubmit = async (data: ContactFormType) => {
    try {
      setIsSubmitting(true)
      setErrorMsg(null)

      const payload = {
        ...data,
        propertyId: propertyId || null,
        serviceId: serviceId || null,
        pageUrl: typeof window !== "undefined" ? window.location.href : null,
        title,
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (!json.success) {
        console.error("Error en /api/contact:", json)
        throw new Error(json?.error || "No se pudo enviar el mensaje.??")
      }

      setIsSubmitted(true)
      reset()

      // Oculta el mensaje de éxito después de 5s
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err: any) {
      setErrorMsg(err?.message || "Ocurrió un error inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">¡Mensaje enviado exitosamente!</h3>
        <p className="text-green-700">Nos pondremos en contacto contigo a la brevedad.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "El nombre es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tu nombre completo"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "El email es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="+56 9 1234 5678"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje *
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message", {
              required: "El mensaje es requerido",
              minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" },
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={
              serviceId
                ? "Cuéntanos más sobre tu interés en este servicio..."
                : propertyId
                  ? "Cuéntanos tu interés en esta propiedad..."
                  : "Cuéntanos en qué podemos ayudarte..."
            }
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "btn-primary"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Enviar Mensaje"
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm

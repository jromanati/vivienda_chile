"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Save, X, Upload, Trash2 } from "lucide-react"
import { regions, communes } from "@/data/adminData"
import { OperationEnum, StateEnum, PropertyTypeEnum, PriceTypeEnum } from "@/types/admin"
import type { PropertyForm } from "@/types/admin"

interface PropertyFormProps {
  initialData?: Partial<PropertyForm>
  onSubmit: (data: PropertyForm, files: File[]) => void // <— ahora pasa files
  onCancel: () => void
  isLoading?: boolean
}

const PropertyFormComponent = ({ initialData, onSubmit, onCancel, isLoading = false }: PropertyFormProps) => {
  const [selectedRegion, setSelectedRegion] = useState(initialData?.region || "")
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([])
  const [images, setImages] = useState<string[]>(initialData?.images || [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<PropertyForm>({
    defaultValues: {
      title: "",
      code: "",
      published: false,
      featured: false,
      show_map: false,
      map_src: "",
      built_area: undefined,
      land_area: undefined,
      electricity: false,
      water: "",
      description: "",
      amenities: "",
      characteristics: "",
      price: undefined,
      currency: "CLP",
      price_type: PriceTypeEnum.FIJO,
      operation: OperationEnum.VENTA,
      state: StateEnum.NUEVAS,
      property_type: PropertyTypeEnum.CASA,
      bedrooms: undefined,
      bathrooms: undefined,
      region: "",
      commune: "",
      address: "",
      parking: undefined,
      storage: false,
      images: [],
      ...initialData,
    },
  })

  // Actualizar comunas cuando cambia la región
  useEffect(() => {
    if (selectedRegion && communes[selectedRegion as keyof typeof communes]) {
      setAvailableCommunes(communes[selectedRegion as keyof typeof communes])
    } else {
      setAvailableCommunes([])
    }
  }, [selectedRegion])

  // Inicializar datos si existen
  useEffect(() => {
    if (initialData) {
      reset(initialData)
      setSelectedRegion(initialData.region || "")
      setImages(initialData.images || [])
    }
  }, [initialData, reset])

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    setValue("region", region)
    setValue("commune", "") // Reset commune when region changes
  }

  const [previews, setPreviews] = useState<string[]>(initialData?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setPreviews(initialData.images || []);
      setNewFiles([]); // los existentes no se vuelven a subir
    }
  }, [initialData, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const add = Array.from(files);
    const urls = add.map((f) => URL.createObjectURL(f));

    setNewFiles((prev) => [...prev, ...add]);
    setPreviews((prev) => [...prev, ...urls]);
  };

  const removeImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    // Opcional: si quieres remover también del buffer de nuevos archivos cuando el preview recién agregado se quita:
    // suponiendo que los previews añadidos al final corresponden en orden a newFiles,
    // puedes llevar un contador o estructura paralela. Para mantenerlo simple, dejamos solo el preview.
  };

  const onFormSubmit = (data: PropertyForm) => {
    // IMPORTANT: las imágenes EXISTENTES (previews originales) no se vuelven a subir aquí.
    // Los archivos NUEVOS están en newFiles y se mandan por multipart en el PUT.
    onSubmit({ ...data, images: previews }, newFiles);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{initialData ? "Editar Propiedad" : "Nueva Propiedad"}</h2>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
        {/* Información Básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
            <input
              type="text"
              {...register("title", { required: "El título es requerido" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Casa moderna en Las Condes"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
            <input
              type="text"
              {...register("code")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: LC001"
            />
          </div>
        </div>

        {/* Tipo y Operación */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Propiedad *</label>
            <select
              {...register("property_type", { required: "El tipo es requerido" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(PropertyTypeEnum).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.property_type && <p className="mt-1 text-sm text-red-600">{errors.property_type.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Operación *</label>
            <select
              {...register("operation", { required: "La operación es requerida" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(OperationEnum).map((operation) => (
                <option key={operation} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
            {errors.operation && <p className="mt-1 text-sm text-red-600">{errors.operation.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
            <select
              {...register("state", { required: "El estado es requerido" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(StateEnum).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
          </div>
        </div>

        {/* Precio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
            <input
              type="number"
              {...register("price", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
            <select
              {...register("currency")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="CLP">CLP</option>
              <option value="USD">USD</option>
              <option value="UF">UF</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Precio</label>
            <select
              {...register("price_type")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(PriceTypeEnum).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Región *</label>
            <select
              {...register("region", { required: "La región es requerida" })}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar región</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Comuna *</label>
            <select
              {...register("commune", { required: "La comuna es requerida" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!selectedRegion}
            >
              <option value="">Seleccionar comuna</option>
              {availableCommunes.map((commune) => (
                <option key={commune} value={commune}>
                  {commune}
                </option>
              ))}
            </select>
            {errors.commune && <p className="mt-1 text-sm text-red-600">{errors.commune.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            {...register("address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Av. Las Condes 1234"
          />
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Habitaciones</label>
            <input
              type="number"
              {...register("bedrooms", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baños</label>
            <input
              type="number"
              {...register("bathrooms", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estacionamientos</label>
            <input
              type="number"
              {...register("parking", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Área Construida (m²)</label>
            <input
              type="number"
              {...register("built_area", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Área de Terreno (m²)</label>
            <input
              type="number"
              {...register("land_area", { min: 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Agua</label>
            <input
              type="text"
              {...register("water")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Potable, Pozo"
            />
          </div>
        </div>

        {/* Descripción y Características */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Descripción detallada de la propiedad..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenidades</label>
            <textarea
              {...register("amenities")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Ej: Piscina, Gimnasio, Quincho..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Características</label>
            <textarea
              {...register("characteristics")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Ej: Vista panorámica, Cocina equipada..."
            />
          </div>
        </div>

        {/* Mapa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL del Mapa (Google Maps Embed)</label>
          <input
            type="text"
            {...register("map_src")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.719934473184!2d-70.53583872363002!3d-33.391535055922915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cea3f7c82313%3A0x7664e481d8ef91ad!2sApoquindo%2C%207591253%20Las%20Condes%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1754748238301!5m2!1ses!2scl'></iframe>"
          />
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
          <div className="space-y-4">
            {/* Upload button */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Image preview */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previews.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url || image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("published")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Publicada</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Destacada</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("show_map")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Mostrar Mapa</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("electricity")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Electricidad</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("storage")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Bodega</label>
          </div>
        </div>

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
                Guardar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyFormComponent

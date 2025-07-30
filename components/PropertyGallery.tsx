"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import ReactDOM from "react-dom"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Grid3X3,
  Maximize,
  Minimize,
} from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  videos?: string[]
  title: string
}

const PropertyGallery = ({ images, videos = [], title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Combinar imágenes y videos
  const allMedia = [
    ...images.map((img, index) => ({ type: "image" as const, src: img, index })),
    ...videos.map((video, index) => ({ type: "video" as const, src: video, index: images.length + index })),
  ]

  const currentMedia = allMedia[currentIndex]
  const modalMedia = allMedia[modalIndex]

  /** Funciones de navegación */
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % allMedia.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)

  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsPlaying(false)
    setIsFullscreen(false)
    document.body.style.overflow = "unset"

    if (videoRef.current) videoRef.current.pause()
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const nextModalSlide = () => {
    setModalIndex((prev) => (prev + 1) % allMedia.length)
    setIsPlaying(false)
  }

  const prevModalSlide = () => {
    setModalIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  /** Pantalla completa compatible con Safari/iOS */
  const toggleFullscreen = async () => {
    const element =
      videoRef.current ||
      document.getElementById("modal-image") ||
      modalRef.current

    if (!element) return

    try {
      if (!document.fullscreenElement) {
        if ((element as any).requestFullscreen) {
          await element.requestFullscreen()
        } else if ((element as any).webkitRequestFullscreen) {
          (element as any).webkitRequestFullscreen()
        }
        setIsFullscreen(true)
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen()
        }
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error("Error al cambiar modo pantalla completa:", error)
    }
  }

  /** Detectar cambios en fullscreen */
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  /** Teclado */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isModalOpen) return
      switch (event.key) {
        case "Escape":
          closeModal()
          break
        case "ArrowLeft":
          prevModalSlide()
          break
        case "ArrowRight":
          nextModalSlide()
          break
        case "f":
        case "F":
          toggleFullscreen()
          break
        case " ":
          if (modalMedia?.type === "video") {
            event.preventDefault()
            togglePlay()
          }
          break
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyPress)
    }
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [isModalOpen, modalMedia])

  if (allMedia.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <>
      {/* Galería principal */}
      <div className="relative">
        <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
          {currentMedia.type === "image" ? (
            <Image
              src={currentMedia.src}
              alt={`${title} - Imagen ${currentIndex + 1}`}
              fill
              id="main-image"
              className="object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => openModal(currentIndex)}
            />
          ) : (
            <video
              className="w-full h-full object-cover cursor-pointer"
              muted
              loop
              autoPlay
              onClick={() => openModal(currentIndex)}
            >
              <source src={currentMedia.src} type="video/mp4" />
            </video>
          )}

          {/* Botones */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-3"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal usando Portal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {modalMedia.type === "image" ? (
                <Image
                  id="modal-image"
                  src={modalMedia.src}
                  alt={`${title} - Imagen ${modalIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain rounded-lg max-h-[90vh]"
                />
              ) : (
                <video
                  ref={videoRef}
                  className="object-contain rounded-lg max-h-[90vh]"
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={modalMedia.src} type="video/mp4" />
                </video>
              )}

              {/* Botones del modal */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={toggleFullscreen} className="bg-black/50 text-white rounded-full p-2">
                  {isFullscreen ? <Minimize /> : <Maximize />}
                </button>
                <button onClick={closeModal} className="bg-black/50 text-white rounded-full p-2">
                  <X />
                </button>
              </div>

              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevModalSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextModalSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default PropertyGallery

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
  Maximize,
  Minimize,
} from "lucide-react"

export interface PropertyImage {
  id: number
  propiedad_id: number
  url: string
  public_id: string
  order: number
  is_cover: boolean
}

interface PropertyGalleryProps {
  images: PropertyImage[]
  video?: string
  title: string
}

const PropertyGallery = ({ images= [], video , title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Unimos imágenes y videos en un solo array de medios

  type MediaItem =
    | { type: "image"; src: string }
    | { type: "video"; src: string }

  // `images` puede ser: {url:string}[] o string[]
  // `video` puede ser: string | string[] | null | undefined
  function buildAllMedia(
    images?: Array<{ url: string } | string> | null,
    video?: string | string[] | null
  ): MediaItem[] {
    // Normaliza imágenes
    const imageItems: MediaItem[] = (images ?? [])
      .map((img) => (typeof img === "string" ? img : img.url))
      .filter(Boolean)
      .map((src) => ({ type: "image", src }))

    // Normaliza videos (acepta 1 o varios)
    const videoArray = video == null ? [] : Array.isArray(video) ? video : [video]
    const videoItems: MediaItem[] = videoArray
      .filter(Boolean)
      .map((src) => ({ type: "video", src }))

    // Si hay ambos, devuelve ambos; si solo uno, devuelve ese; si ninguno, []
    const hasImages = imageItems.length > 0
    const hasVideos = videoItems.length > 0

    if (hasImages && hasVideos) return [...imageItems, ...videoItems]
    if (hasImages) return imageItems
    if (hasVideos) return videoItems
    return []
  }

  const allMedia = buildAllMedia(images, video)

  const currentMedia = allMedia[currentIndex]
  const modalMedia = allMedia[modalIndex]

  /** Navegación galería principal */
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % allMedia.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)

  /** Modal */
  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsPlaying(false)
    document.body.style.overflow = "auto"

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    if (document.fullscreenElement) document.exitFullscreen()
  }

  /** Navegación dentro del modal */
  const nextModalSlide = () => setModalIndex((prev) => (prev + 1) % allMedia.length)
  const prevModalSlide = () => setModalIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)

  /** Reproducir vídeo */
  const togglePlay = () => {
    const vid = videoRef.current
    if (vid) {
      if (isPlaying) vid.pause()
      else vid.play()
      setIsPlaying(!isPlaying)
    }
  }

  /** Mute/unmute */
  const toggleMute = () => {
    const vid = videoRef.current
    if (vid) {
      vid.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  /** Pantalla completa */
  const toggleFullscreen = async () => {
    const el = modalRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  /** Reset de vídeo al cambiar slide */
  useEffect(() => {
    const vid = videoRef.current
    if (modalMedia?.type === "video") {
      if (vid) {
        vid.currentTime = 0
        vid.muted = isMuted
        vid.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    } else if (vid) {
      vid.pause()
      setIsPlaying(false)
    }
  }, [modalIndex, isModalOpen])

  /** Teclado para navegación */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowRight") nextModalSlide()
      if (e.key === "ArrowLeft") prevModalSlide()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isModalOpen])

  return (
    <>
      {/* Galería principal */}
      <div className="relative rounded-xl overflow-hidden h-96 group">
        {currentMedia.type === "image" ? (
          <Image
            src={currentMedia.src}
            alt={title}
            fill
            className="object-cover cursor-pointer"
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

        {allMedia.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
              <ChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && ReactDOM.createPortal(
        <div ref={modalRef} className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {modalMedia.type === "image" ? (
              <Image
                src={modalMedia.src}
                alt={title}
                width={1400}
                height={900}
                className="object-contain rounded-lg max-h-[90vh]"
              />
            ) : (
              <video
                ref={videoRef}
                muted={isMuted}
                className="object-contain rounded-lg max-h-[90vh]"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={modalMedia.src} type="video/mp4" />
              </video>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              {modalMedia.type === "video" && (
                <>
                  <button onClick={togglePlay} className="bg-black/60 text-white p-2 rounded-full">
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                  <button onClick={toggleMute} className="bg-black/60 text-white p-2 rounded-full">
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </button>
                </>
              )}
              <button onClick={toggleFullscreen} className="bg-black/60 text-white p-2 rounded-full">
                {isFullscreen ? <Minimize /> : <Maximize />}
              </button>
              <button onClick={closeModal} className="bg-black/60 text-white p-2 rounded-full">
                <X />
              </button>
            </div>

            {allMedia.length > 1 && (
              <>
                <button onClick={prevModalSlide} className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">
                  <ChevronLeft />
                </button>
                <button onClick={nextModalSlide} className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full">
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

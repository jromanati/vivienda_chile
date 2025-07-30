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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const allMedia = [
    ...images.map((img, index) => ({ type: "image" as const, src: img })),
    ...videos.map((video, index) => ({ type: "video" as const, src: video })),
  ]

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
    document.body.style.overflow = "unset"

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    if (document.fullscreenElement) document.exitFullscreen()
  }

  /** Navegación dentro del modal */
  const nextModalSlide = () => {
    setModalIndex((prev) => (prev + 1) % allMedia.length)
  }

  const prevModalSlide = () => {
    setModalIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
  }

  /** Reproducir vídeo */
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  /** Mute/unmute */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  /** Pantalla completa */
  const toggleFullscreen = async () => {
    const element = modalRef.current
    if (!element) return

    if (!document.fullscreenElement) {
      await element.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  /** Cuando cambias de slide, reinicia el vídeo */
  useEffect(() => {
    if (modalMedia?.type === "video") {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.muted = isMuted
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [modalIndex, isModalOpen])

  /** Teclado */
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
            alt={`${title}`}
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

        {/* Botones navegación */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div ref={modalRef} className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-6">
              {modalMedia.type === "image" ? (
                <Image
                  id="modal-image"
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

              {/* Controles */}
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

              {/* Navegación */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevModalSlide}
                    className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={nextModalSlide}
                    className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
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

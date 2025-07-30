"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale"
  delay?: number
}

const AnimatedSection = ({ children, className = "", animation = "fade-up", delay = 0 }: AnimatedSectionProps) => {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-left":
        return "scroll-animate-left"
      case "fade-right":
        return "scroll-animate-right"
      case "scale":
        return "scroll-animate-scale"
      default:
        return "scroll-animate"
    }
  }

  const getDelayClass = () => {
    if (delay === 100) return "delay-100"
    if (delay === 200) return "delay-200"
    if (delay === 300) return "delay-300"
    if (delay === 400) return "delay-400"
    return ""
  }

  return (
    <div ref={ref} className={`${getAnimationClass()} ${getDelayClass()} ${isVisible ? "animate" : ""} ${className}`}>
      {children}
    </div>
  )
}

export default AnimatedSection

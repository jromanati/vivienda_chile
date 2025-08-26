"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("group relative overflow-hidden", className)}
    {...props}
  >
    {/* Viewport estable y suave */}
    <ScrollAreaPrimitive.Viewport
      className="h-full w-full rounded-[inherit] scroll-smooth"
      style={{ scrollbarGutter: "stable" }}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>

    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      // Track transparente, delgado. Se muestra al hover/scroll.
      "z-10 flex touch-none select-none bg-transparent transition-all",
      "opacity-0 group-hover:opacity-100 data-[state=visible]:opacity-100",
      orientation === "vertical" &&
        "h-full w-2.5 p-[2px]", // ancho total del track
      orientation === "horizontal" &&
        "h-2.5 w-full p-[2px] flex-col",
      className
    )}
    {...props}
  >
    {/* Thumb sutil con mínimo área táctil */}
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full",
        "bg-gray-400/60 hover:bg-gray-500/70",
        "dark:bg-gray-500/40 dark:hover:bg-gray-400/60",
        "transition-colors",
        // Aumenta el área clickeable a 44px sin cambiar el grosor visual
        "before:content-[''] before:absolute before:inset-0 before:min-h-[44px] before:min-w-[44px]"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

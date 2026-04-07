"use client"

import { useEffect, useRef, useCallback } from "react"
import type { Canvas as FabricCanvas, IText, FabricImage } from "fabric"

interface CanvasEditorProps {
  onCanvasReady: (canvas: FabricCanvas) => void
  onSelectionChange: (target: IText | null) => void
}

export default function CanvasEditor({
  onCanvasReady,
  onSelectionChange,
}: CanvasEditorProps) {
  const canvasElRef = useRef<HTMLCanvasElement>(null)
  const canvasRef = useRef<FabricCanvas | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const initCanvas = useCallback(async () => {
    if (!canvasElRef.current || canvasRef.current) return

    const fabric = await import("fabric")
    const canvas = new fabric.Canvas(canvasElRef.current, {
      backgroundColor: "#1a1a1a",
    })

    canvasRef.current = canvas

    // Load default background image
    await loadBackgroundImage(canvas, fabric, "/builders-anonimos.png")

    // Add default example text in the speech bubble area
    const exampleText = new fabric.IText("Me llamo dev y llevo\n3 side projects sin terminar.", {
      left: canvas.width! * 0.37,
      top: canvas.height! * 0.08,
      fontSize: Math.round(canvas.width! * 0.032),
      fontFamily: "Permanent Marker",
      fill: "#111111",
      textAlign: "center",
      lineHeight: 1.3,
    })
    canvas.add(exampleText)
    canvas.renderAll()

    // Selection events
    canvas.on("selection:created", (e) => {
      const target = e.selected?.[0]
      if (target && target.type === "i-text") {
        onSelectionChange(target as IText)
      }
    })

    canvas.on("selection:updated", (e) => {
      const target = e.selected?.[0]
      if (target && target.type === "i-text") {
        onSelectionChange(target as IText)
      }
    })

    canvas.on("selection:cleared", () => {
      onSelectionChange(null)
    })

    canvas.on("object:modified", (e) => {
      const target = e.target
      if (target && target.type === "i-text") {
        onSelectionChange(target as IText)
      }
    })

    onCanvasReady(canvas)
  }, [onCanvasReady, onSelectionChange])

  useEffect(() => {
    initCanvas()

    return () => {
      canvasRef.current?.dispose()
      canvasRef.current = null
    }
  }, [initCanvas])

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center">
      <canvas ref={canvasElRef} />
    </div>
  )
}

async function loadBackgroundImage(
  canvas: FabricCanvas,
  fabric: typeof import("fabric"),
  url: string
) {
  try {
    const img = await fabric.FabricImage.fromURL(url)
    fitCanvasToImage(canvas, img)
    canvas.backgroundImage = img
    canvas.renderAll()
  } catch {
    canvas.setDimensions({ width: 800, height: 600 })
  }
}

function fitCanvasToImage(canvas: FabricCanvas, img: FabricImage) {
  const maxWidth = Math.min(800, window.innerWidth - 32)
  const ratio = img.width! / img.height!
  const width = maxWidth
  const height = maxWidth / ratio

  canvas.setDimensions({ width, height })

  img.scaleToWidth(width)
  img.scaleToHeight(height)
}

export { loadBackgroundImage, fitCanvasToImage }

"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import type { Canvas as FabricCanvas, IText } from "fabric"
import ToolbarPanel from "@/components/toolbar-panel"
import {
  ConsultingBanner,
  NewsletterBanner,
  RepoBanner,
  StackSection,
} from "@/components/banners"
import { UI_FONT_DISPLAY } from "@/lib/fonts"

const CanvasEditor = dynamic(() => import("@/components/canvas-editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-surface rounded-xl animate-pulse" />
  ),
})

export default function Home() {
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null)
  const [selectedText, setSelectedText] = useState<IText | null>(null)

  const handleCanvasReady = useCallback((c: FabricCanvas) => {
    setCanvas(c)
  }, [])

  const handleSelectionChange = useCallback((target: IText | null) => {
    setSelectedText(target)
  }, [])

  const handleUploadImage = useCallback(async () => {
    if (!canvas) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      const fabric = await import("fabric")
      const img = await fabric.FabricImage.fromURL(url)

      const maxWidth = Math.min(800, window.innerWidth - 32)
      const ratio = img.width! / img.height!
      const width = maxWidth
      const height = maxWidth / ratio

      canvas.setDimensions({ width, height })
      img.scaleToWidth(width)
      img.scaleToHeight(height)
      canvas.backgroundImage = img
      canvas.renderAll()
      URL.revokeObjectURL(url)
    }
    input.click()
  }, [canvas])

  const handleDownload = useCallback(() => {
    if (!canvas) return
    const dataURL = canvas.toDataURL({ format: "png" } as never)
    const link = document.createElement("a")
    link.href = dataURL
    link.download = "builders-meme.png"
    link.click()
  }, [canvas])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: `'${UI_FONT_DISPLAY}', serif` }}
          >
            Fabric.js Meme Editor
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Carga una imagen, añade texto y descarga tu meme como PNG.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleUploadImage}
            disabled={!canvas}
            className="px-4 py-2 rounded-lg bg-surface border border-border text-text-primary text-sm font-medium hover:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Subir imagen
          </button>
          <button
            onClick={handleDownload}
            disabled={!canvas}
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Descargar PNG
          </button>
        </div>
      </header>

      {/* Editor: canvas + toolbar */}
      <div className="flex-1 flex flex-col md:flex-row gap-5 p-5">
        {/* Canvas — 70% on desktop */}
        <section className="md:w-[70%] flex items-start justify-center">
          <CanvasEditor
            onCanvasReady={handleCanvasReady}
            onSelectionChange={handleSelectionChange}
          />
        </section>

        {/* Toolbar — 30% on desktop */}
        <aside className="md:w-[30%]">
          <ToolbarPanel canvas={canvas} selectedText={selectedText} />
        </aside>
      </div>

      {/* Banners & Stack */}
      <footer className="flex flex-col gap-4 p-5 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ConsultingBanner />
          <NewsletterBanner />
          <RepoBanner />
        </div>
        <StackSection />
      </footer>
    </main>
  )
}

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

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-border">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: `'${UI_FONT_DISPLAY}', serif` }}
        >
          Fabric.js Meme Editor
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Carga una imagen, añade texto y descarga tu meme como PNG.
        </p>
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

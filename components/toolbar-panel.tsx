"use client"

import { useState, useEffect, useCallback } from "react"
import type { Canvas as FabricCanvas, IText } from "fabric"
import { editorFonts, UI_FONT_MONO } from "@/lib/fonts"

interface ToolbarPanelProps {
  canvas: FabricCanvas | null
  selectedText: IText | null
}

export default function ToolbarPanel({ canvas, selectedText }: ToolbarPanelProps) {
  const [fontFamily, setFontFamily] = useState(editorFonts[0].family)
  const [fontSize, setFontSize] = useState(32)
  const [fontColor, setFontColor] = useState("#000000")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  // Sync toolbar state when a text object is selected
  useEffect(() => {
    if (!selectedText) return
    setFontFamily(selectedText.fontFamily || editorFonts[0].family)
    setFontSize(selectedText.fontSize || 32)
    setFontColor((selectedText.fill as string) || "#000000")
    setIsBold(selectedText.fontWeight === "bold")
    setIsItalic(selectedText.fontStyle === "italic")
  }, [selectedText])

  const updateText = useCallback(
    (props: Record<string, unknown>) => {
      if (!selectedText || !canvas) return
      selectedText.set(props)
      canvas.renderAll()
    },
    [selectedText, canvas]
  )

  const handleAddText = useCallback(async () => {
    if (!canvas) return
    const fabric = await import("fabric")
    const text = new fabric.IText("Escribe aquí", {
      left: canvas.width! / 2 - 80,
      top: canvas.height! / 2 - 16,
      fontSize: 32,
      fontFamily: editorFonts[0].family,
      fill: "#000000",
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    canvas.renderAll()
  }, [canvas])

  return (
    <div className="flex flex-col gap-5 p-5 bg-surface rounded-xl border border-border">
      {/* Add text button */}
      <button
        onClick={handleAddText}
        className="w-full px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        + Añadir texto
      </button>

      {/* Text editing panel — only visible when a text object is selected */}
      {selectedText ? (
        <div className="flex flex-col gap-4">
          <h3
            className="text-sm font-semibold text-text-muted uppercase tracking-wider"
            style={{ fontFamily: `'${UI_FONT_MONO}', monospace` }}
          >
            Texto seleccionado
          </h3>

          {/* Font selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-muted">Fuente</label>
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value)
                updateText({ fontFamily: e.target.value })
              }}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary text-sm appearance-none cursor-pointer"
            >
              {editorFonts.map((font) => (
                <option
                  key={font.name}
                  value={font.family}
                  style={{ fontFamily: `'${font.family}'` }}
                >
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-muted">
              Tamaño: {fontSize}px
            </label>
            <input
              type="range"
              min={12}
              max={120}
              value={fontSize}
              onChange={(e) => {
                const size = Number(e.target.value)
                setFontSize(size)
                updateText({ fontSize: size })
              }}
              className="w-full accent-primary"
            />
          </div>

          {/* Font color */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-text-muted">Color</label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => {
                setFontColor(e.target.value)
                updateText({ fill: e.target.value })
              }}
              className="w-12 h-8 rounded border border-border cursor-pointer bg-transparent"
            />
          </div>

          {/* Bold & Italic */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newBold = !isBold
                setIsBold(newBold)
                updateText({ fontWeight: newBold ? "bold" : "normal" })
              }}
              className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                isBold
                  ? "bg-primary border-primary text-white"
                  : "bg-surface border-border text-text-primary hover:border-primary"
              }`}
            >
              B
            </button>
            <button
              onClick={() => {
                const newItalic = !isItalic
                setIsItalic(newItalic)
                updateText({ fontStyle: newItalic ? "italic" : "normal" })
              }}
              className={`px-4 py-2 rounded-lg border text-sm italic transition-colors ${
                isItalic
                  ? "bg-primary border-primary text-white"
                  : "bg-surface border-border text-text-primary hover:border-primary"
              }`}
            >
              I
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          Haz clic en un texto del canvas para editarlo, o añade uno nuevo.
        </p>
      )}
    </div>
  )
}

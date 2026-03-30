"use client"

import { UI_FONT_DISPLAY, UI_FONT_MONO } from "@/lib/fonts"

export function ConsultingBanner() {
  return (
    <a
      href="https://cal.com/polmarza/toma-de-contacto"
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors"
    >
      <p className="text-sm text-text-muted">Consultoría personalizada</p>
      <p className="text-text-primary font-medium">
        Reserva una sesión 1:1 — 30€/sesión
      </p>
    </a>
  )
}

export function NewsletterBanner() {
  return (
    <a
      href="https://concriterio.blog"
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors"
    >
      <p className="text-sm text-text-muted">Newsletter</p>
      <p className="text-text-primary font-medium">
        Lee concriterio.blog — desarrollo web con criterio
      </p>
    </a>
  )
}

export function RepoBanner() {
  return (
    <a
      href="https://github.com/polmarza/fabricjs-concriterio-tools"
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-surface border border-border hover:border-primary transition-colors"
    >
      <p className="text-sm text-text-muted">Código fuente</p>
      <p className="text-text-primary font-medium">
        Ver repositorio en GitHub
      </p>
    </a>
  )
}

export function StackSection() {
  const stack = [
    { name: "Next.js 14", desc: "App Router" },
    { name: "Tailwind CSS", desc: "Utility-first CSS" },
    { name: "Fabric.js v6", desc: "Canvas interactivo" },
    { name: "Google Fonts", desc: "10 tipografías" },
    { name: "TypeScript", desc: "Tipado estricto" },
  ]

  return (
    <section className="flex flex-col gap-3">
      <h2
        className="text-lg font-semibold"
        style={{ fontFamily: `'${UI_FONT_DISPLAY}', serif` }}
      >
        Stack tecnológico
      </h2>
      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item.name}
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-sm"
            style={{ fontFamily: `'${UI_FONT_MONO}', monospace` }}
          >
            {item.name}
            <span className="text-text-muted ml-1.5">— {item.desc}</span>
          </span>
        ))}
      </div>
    </section>
  )
}

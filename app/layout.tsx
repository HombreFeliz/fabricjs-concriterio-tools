import type { Metadata } from "next"
import { getGoogleFontsUrl, UI_FONT_BODY } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fabric.js Meme Editor — concriterio.tools",
  description:
    "Editor interactivo de memes con Fabric.js. Carga una imagen, añade texto y descarga tu creación como PNG.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={getGoogleFontsUrl()} />
      </head>
      <body
        className="antialiased min-h-screen"
        style={{ fontFamily: `'${UI_FONT_BODY}', sans-serif` }}
      >
        {children}
      </body>
    </html>
  )
}

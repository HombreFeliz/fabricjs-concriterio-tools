// Font definitions for the editor.
// Google Fonts are loaded via a <link> tag in the layout (not next/font/google)
// because the build environment may not have access to the Google Fonts API.

export interface EditorFont {
  name: string
  family: string
  weight?: string
}

export const editorFonts: EditorFont[] = [
  { name: "Inter", family: "Inter" },
  { name: "Outfit", family: "Outfit" },
  { name: "Space Mono", family: "Space Mono", weight: "400;700" },
  { name: "Fraunces", family: "Fraunces" },
  { name: "Permanent Marker", family: "Permanent Marker", weight: "400" },
  { name: "Bangers", family: "Bangers", weight: "400" },
  { name: "Bebas Neue", family: "Bebas Neue", weight: "400" },
  { name: "Caveat", family: "Caveat" },
  { name: "Oswald", family: "Oswald" },
  { name: "Archivo Black", family: "Archivo Black", weight: "400" },
]

// UI fonts
export const UI_FONT_DISPLAY = "Fraunces"
export const UI_FONT_BODY = "Outfit"
export const UI_FONT_MONO = "Space Mono"

// Build the Google Fonts URL for all fonts
export function getGoogleFontsUrl(): string {
  const families = editorFonts
    .map((f) => {
      const name = f.family.replace(/ /g, "+")
      if (f.weight) return `family=${name}:wght@${f.weight}`
      return `family=${name}:wght@400;700`
    })
    .join("&")
  return `https://fonts.googleapis.com/css2?${families}&display=swap`
}

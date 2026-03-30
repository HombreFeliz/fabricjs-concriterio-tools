import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7665FF",
        background: "#0a0a0a",
        surface: "#111111",
        border: "#1e1e1e",
        "text-primary": "#e2e2e2",
        "text-muted": "#666666",
        success: "#4ade80",
        error: "#f87171",
      },
    },
  },
  plugins: [],
}
export default config

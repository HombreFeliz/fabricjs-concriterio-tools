# Fabric.js — Instrucciones para Claude Code

## Qué es esto

Demo interactiva de Fabric.js para concriterio.tools. Es un editor de memes/imágenes donde el usuario carga una imagen, añade texto editable con tipografías de Google Fonts, lo posiciona visualmente en el canvas y descarga el resultado como PNG.

Lee docs/prd.md antes de empezar.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Fabric.js v6 (npm: `fabric`)
- Google Fonts vía `next/font/google`

## Lo que debes construir

### Canvas principal
- Inicializar un canvas de Fabric.js al montar el componente
- Cargar por defecto la imagen `public/builders-anonimos.png` como imagen de fondo del canvas
- El canvas debe ser responsive: adaptarse al contenedor, mantener ratio de la imagen
- Permitir arrastrar, escalar y rotar objetos de texto con los controles nativos de Fabric.js

### Subir imagen
- Botón que abre un file picker (accept: image/*)
- Al seleccionar imagen, reemplaza la imagen de fondo del canvas
- El canvas se redimensiona al ratio de la nueva imagen

### Añadir texto
- Botón que crea un nuevo `fabric.IText` (texto editable) en el centro del canvas
- Texto por defecto: "Escribe aquí"
- Doble clic sobre el texto para editar inline en el canvas
- Se pueden añadir múltiples bloques de texto

### Panel de herramientas de texto
Cuando hay un texto seleccionado en el canvas, el panel muestra:
- **Selector de fuente:** dropdown con 10 fuentes de Google Fonts. Cada opción muestra el nombre de la fuente renderizado en esa fuente (preview). Las fuentes: Inter, Outfit, Space Mono, Fraunces, Permanent Marker, Bangers, Bebas Neue, Caveat, Oswald, Archivo Black.
- **Tamaño:** slider (rango 12-120, default 32)
- **Color:** input type="color" (default negro #000000)
- **Negrita:** toggle button
- **Cursiva:** toggle button
- Cada cambio se aplica inmediatamente al texto seleccionado en el canvas vía las propiedades de Fabric.js (`set()` + `canvas.renderAll()`)

### Descargar PNG
- Botón que ejecuta `canvas.toDataURL({ format: 'png' })` y dispara la descarga
- Nombre del archivo: `builders-meme.png`

### Layout
- Desktop: canvas ocupa ~70% izquierda, panel de herramientas ~30% derecha
- Mobile/tablet: canvas arriba, panel abajo, scroll vertical
- Breakpoint: md (768px)

## Componentes fijos (obligatorios en todas las páginas)

- Banner consultoría: https://cal.com/polmarza/toma-de-contacto (90€/sesión)
- Banner newsletter: https://concriterio.blog
- Banner repositorio: https://github.com/polmarza/fabricjs-concriterio-tools
- Sección de stack al final de la página

## Sistema de diseño

Lee docs/design-system.md. Colores y tipografías definidos ahí.
Primary: #7665FF. Background: #0a0a0a. Fuentes de interfaz: Fraunces, Outfit, Space Mono.

## Variables de entorno

Todas definidas en .env.example. Nunca hardcodear valores.
En esta demo no hay API keys sensibles. Fabric.js es client-side.

## Carga de Google Fonts

Usar `next/font/google` para precargar las 10 fuentes en el layout. Crear un archivo `lib/fonts.ts` que exporte todas las configuraciones de fuentes. Para que Fabric.js use estas fuentes en el canvas, asegurarse de que los font-face están cargados en el documento antes de renderizar texto (las fuentes cargadas con `next/font/google` ya están disponibles en el CSS, pero Fabric.js necesita que el nombre de la familia coincida exactamente).

Patrón recomendado:
```typescript
// lib/fonts.ts
import { Inter, Outfit, Space_Mono, Fraunces, Permanent_Marker, Bangers, Bebas_Neue, Caveat, Oswald, Archivo_Black } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
// ... etc

export const editorFonts = [
  { name: 'Inter', className: inter.className, family: 'Inter' },
  // ...
]
```

En el canvas de Fabric.js, al crear o modificar texto:
```typescript
textObject.set({ fontFamily: selectedFont.family })
canvas.renderAll()
```

## Convenciones

- TypeScript siempre
- Componentes pequeños y con responsabilidad única
- Sin librerías innecesarias, instalar solo lo que se usa
- El código debe ser legible: esta demo es también material educativo
- Fabric.js se importa dinámicamente (`next/dynamic` con `ssr: false`) porque depende de `window`

## NO hacer

- No añadir autenticación de usuarios
- No añadir persistencia ni base de datos
- No añadir filtros de imagen ni formas geométricas
- No añadir features no descritas en docs/prd.md
- No usar estilos inline salvo casos puntuales justificados
- No intentar renderizar Fabric.js en servidor (SSR): siempre client-side

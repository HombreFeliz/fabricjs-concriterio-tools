# Fabric.js — Con Criterio Tools

Demo interactiva de Fabric.js como parte de concriterio.tools.

## Qué hace esta demo

Un editor de memes e imágenes para builders. El usuario puede:

1. **Cargar una imagen base** (o usar la imagen de "Builders Anónimos" preinstalada)
2. **Añadir texto editable** sobre la imagen con tipografías de Google Fonts, pudiendo mover, escalar, rotar y cambiar el estilo del texto directamente en el canvas
3. **Descargar la imagen final** como PNG con el texto integrado

## Stack

- **Next.js 14 (App Router)** — necesario para servir Google Fonts desde servidor y manejar la descarga
- **Tailwind CSS** — estilos utilitarios
- **shadcn/ui** — componentes de UI (select, slider, botones)
- **Fabric.js v6** — motor de canvas interactivo con soporte nativo para texto editable, imágenes y exportación
- **Google Fonts API** — carga dinámica de tipografías seleccionadas

## Variables de entorno

Ver `.env.example`

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy

Configurado para Vercel. Importar repo, añadir variables de entorno del
.env.example, deploy automático.

## Parte de

[concriterio.tools](https://concriterio.tools) — herramientas para builders
por [Pol Marza](https://concriterio.blog)

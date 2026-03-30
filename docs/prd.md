# PRD — Fabric.js (Editor de memes para builders)

## Qué es Fabric.js

Fabric.js es una librería JavaScript open source que proporciona un modelo de objetos interactivo sobre el elemento HTML5 Canvas. Permite crear, manipular y exportar gráficos compuestos por imágenes, texto, formas y dibujos. Escrita en TypeScript, ofrece edición de texto directamente en el canvas, filtros de imagen, serialización JSON y exportación a SVG/PNG.

Es la base sobre la que se construyen editores de imágenes, herramientas de diseño, configuradores de producto y cualquier aplicación que necesite manipulación visual interactiva en el navegador sin depender de un backend.

## Para qué tipo de proyecto sirve

Cualquier aplicación que necesite un canvas interactivo: editores de imágenes y memes, configuradores de producto (camisetas, tazas, posters), herramientas de diseño simplificadas tipo Canva, anotadores de capturas de pantalla, generadores de thumbnails o banners. Especialmente útil cuando el usuario necesita posicionar elementos visualmente con drag & drop y luego exportar el resultado.

## Scope de esta demo

**Qué hace:**
- Permite cargar una imagen base (propia o la imagen de "Builders Anónimos" preinstalada)
- Permite añadir bloques de texto editable sobre la imagen
- El texto se puede mover, escalar, rotar y estilizar (fuente, tamaño, color, negrita, cursiva)
- Ofrece una selección de 8-10 tipografías de Google Fonts
- Permite descargar la composición final como PNG

**Qué NO hace:**
- No tiene sistema de cuentas ni persistencia
- No guarda las composiciones en servidor
- No permite dibujo libre ni formas geométricas
- No aplica filtros de imagen
- No es un editor de imágenes completo, es un editor de texto sobre imagen

## Flujos de usuario

### Flujo 1 — Usar la imagen preinstalada
El usuario abre la demo y ve la imagen de "Builders Anónimos" cargada en el canvas. El bocadillo de texto está vacío (la imagen tiene el bocadillo dibujado pero sin texto). El usuario hace clic en "Añadir texto", aparece un bloque de texto en el canvas. Lo arrastra a la posición del bocadillo, escribe su frase, elige una tipografía, ajusta el tamaño. Descarga el resultado como PNG.

### Flujo 2 — Subir imagen propia
El usuario hace clic en "Subir imagen" y selecciona una imagen de su dispositivo. La imagen se carga como fondo del canvas. A partir de ahí, el flujo es el mismo: añade texto, lo posiciona, lo estiliza y descarga el PNG final.

### Flujo 3 — Personalización de texto
El usuario tiene un panel lateral (o inferior en móvil) con controles de texto: selector de fuente (dropdown con preview de cada tipografía), tamaño (slider), color (input de color), negrita y cursiva (toggles). Cada cambio se refleja en tiempo real sobre el texto seleccionado en el canvas.

## Componentes fijos

- Banner consultoría: "¿Necesitas ayuda integrando esto en tu proyecto?" → https://cal.com/polmarza/toma-de-contacto (90€/sesión)
- Banner newsletter: "Cada semana, herramientas como esta en tu bandeja de entrada." → https://concriterio.blog
- Banner repositorio: "Esta demo está construida con Next.js + Fabric.js. El código es público." → URL del repo de GitHub

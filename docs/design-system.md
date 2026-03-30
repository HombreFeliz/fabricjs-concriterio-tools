# Design System — Fabric.js (Editor de memes para builders)

## Paleta de colores

```
Primary: #7665FF (violeta Con Criterio)
Background: #0a0a0a (negro profundo)
Surface: #111111
Border: #1e1e1e
Text primary: #e2e2e2
Text muted: #666666
Success: #4ade80
Error: #f87171
```

## Tipografía de la interfaz

```
Display: Fraunces (headings expresivos)
Body: Outfit (texto general, labels, botones)
Mono: Space Mono (código, etiquetas técnicas)
```

Nota: estas son las tipografías de la interfaz de la demo, no las tipografías disponibles para el editor. Las fuentes del editor son un subconjunto distinto de Google Fonts orientado a crear memes y textos expresivos.

## Tipografías disponibles en el editor (Google Fonts)

Selección de 10 fuentes que cubren distintos estilos de meme/texto:

1. **Inter** — sans-serif limpia, versátil
2. **Outfit** — sans-serif moderna, geométrica
3. **Space Mono** — monoespaciada, estética tech
4. **Fraunces** — serif expresiva, con personalidad
5. **Permanent Marker** — estilo rotulador, informal
6. **Bangers** — estilo cómic, impacto
7. **Bebas Neue** — condensada, titulares
8. **Caveat** — manuscrita casual
9. **Oswald** — condensada, seria
10. **Archivo Black** — bold pesada, declaraciones

## Estilo general

- Dark mode por defecto
- Bordes sutiles, sin sombras pesadas
- Densidad media
- Componentes con border-radius: 8-12px
- El canvas tiene fondo blanco o transparente (según la imagen cargada), independiente del dark mode de la interfaz
- Panel de herramientas con fondo Surface (#111111) y bordes Border (#1e1e1e)
- Botones primarios en #7665FF con texto blanco
- Botón de descarga destacado visualmente (más grande, color primario)

## Layout

- Desktop: canvas a la izquierda (70%), panel de herramientas a la derecha (30%)
- Tablet: canvas arriba, panel abajo
- Mobile: canvas arriba, panel abajo (scroll vertical)
- Canvas responsive, se adapta al contenedor manteniendo ratio de la imagen

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// Todas las fotos (.jpg, .jpeg, .webp) que se importan desde el código se convierten
// al compilar a WebP comprimido y con 1440 px de ancho como máximo (nunca se agrandan).
// Si un import ya trae parámetros (ej: "?w=640;1280&as=srcset"), se respetan esos.
const PHOTO = /\.(jpe?g|webp)$/i

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.search || !PHOTO.test(url.pathname)) return new URLSearchParams()
        return new URLSearchParams({ format: 'webp', quality: '65', w: '1440' })
      },
    }),
  ],
})

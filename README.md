# Lo Nuestro

Sitio web de las cabañas y dormis Lo Nuestro, en Mina Clavero, Córdoba.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Comandos

- `pnpm dev`: inicia el servidor local.
- `pnpm build`: genera la versión de producción en `dist/` (con cada página pre-renderizada).
- `pnpm preview`: sirve localmente la última compilación.
- `pnpm lint`: ejecuta ESLint.

## Estructura

```text
scripts/               Pre-renderizado de las páginas al compilar
public/                Archivos que se sirven tal cual (foto principal, robots.txt)
src/
  app/                 Rutas y composición de la aplicación
  assets/
    icons/             Iconografía e identidad del sitio
    images/            Fotografías
  components/
    accommodations/    Componentes de las páginas de alojamiento
    contact/           Componentes de la página de contacto
    home/              Componentes propios del inicio
    layout/            Encabezado, pie y scroll al cambiar de página
    seo/               Título y metadatos de cada página
    shared/            Reutilizados entre páginas (formulario de consulta, WhatsApp flotante, carrusel…)
  config/              Datos editables: contacto, dirección del sitio, Google Analytics
  data/                Contenido: alojamientos, servicios del inicio, metadatos por página
  hooks/               Hooks reutilizables
  lib/                 Lógica sin interfaz (estadísticas de visitas)
  pages/               Una página por ruta
  styles/              Estilos globales, tipografía y animaciones
  entry-server.jsx     Entrada del pre-renderizado
  main.jsx             Punto de entrada de React
```

## Estadísticas de visitas

El sitio usa Google Analytics 4. Para activarlo, poné el ID de medición (`G-XXXXXXXXXX`) en
`src/config/analytics.js`. Sólo se carga en la versión publicada; en desarrollo los eventos se ven en la consola.

Se registran las visitas a cada página y estos eventos:

- `click_whatsapp`, `click_facebook`, `click_mapa`, `click_telefono`: clics en esos links, en cualquier parte del sitio.
- `consulta_whatsapp`: consultas armadas con el formulario (con alojamiento, noches y personas).

En GA4 conviene marcar `click_whatsapp` y `consulta_whatsapp` como eventos clave.

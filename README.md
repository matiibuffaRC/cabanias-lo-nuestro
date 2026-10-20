# Lo Nuestro

Sitio web de las cabañas y dormis Lo Nuestro, en Mina Clavero, Córdoba.

## Desarrollo

```bash
npm install
npm run dev
```

## Comandos

- `npm run dev`: inicia el servidor local.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run preview`: sirve localmente la última compilación.
- `npm run lint`: ejecuta ESLint.

## Estructura

```text
src/
  app/                 Configuración de rutas y composición de la aplicación
  assets/
    icons/             Iconografía e identidad del sitio
    images/            Fotografías
  components/
    accommodations/    Componentes de las páginas de alojamiento
    home/              Componentes propios de la portada
    layout/            Encabezado, pie, navegación y contacto flotante
    shared/            Componentes reutilizados entre páginas
  config/              Configuración general
  data/                Datos de los alojamientos
  Pages/               Páginas asociadas a las rutas
  styles/              Estilos globales, tipografía y animaciones
  main.jsx             Punto de entrada de React
```

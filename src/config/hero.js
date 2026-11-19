// Foto principal (pileta con los dormis), en varios anchos.
// Vive en /public/hero con nombres fijos para poder precargarla desde index.html:
// así el navegador la empieza a bajar antes de que termine de cargar el JavaScript.
// Si cambiás la foto, regenerá los archivos y actualizá también el <link rel="preload"> de index.html.
export const HERO_IMAGE = {
    src: "/hero/pileta-960.webp",
    srcSet: "/hero/pileta-640.webp 640w, /hero/pileta-960.webp 960w, /hero/pileta-1280.webp 1280w, /hero/pileta-1600.webp 1600w",
    sizes: "100vw",
};

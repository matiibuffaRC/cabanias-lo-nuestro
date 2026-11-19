// Pre-renderiza cada página del sitio después de `vite build`.
// Toma dist/index.html como plantilla, le inserta el HTML de cada ruta y
// ajusta título y descripción. Resultado: dist/<ruta>/index.html
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, PAGE_METADATA } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await readFile(path.join(dist, "index.html"), "utf-8");

const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const [route, meta] of Object.entries(PAGE_METADATA)) {
    const appHtml = await render(route);

    let html = template
        .replace(
            '<div id="root" class="min-h-screen"></div>',
            `<div id="root" class="min-h-screen" data-prerendered="${route}">${appHtml}</div>`
        )
        .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);

    for (const selector of ['name="description"', 'property="og:title"', 'property="og:description"', 'name="twitter:title"', 'name="twitter:description"']) {
        const value = selector.includes("title") ? meta.title : meta.description;
        html = html.replace(new RegExp(`(<meta ${selector} content=")[^"]*(")`), `$1${escapeAttr(value)}$2`);
    }

    if (!html.includes("data-prerendered")) throw new Error(`No se encontró <div id="root"> en dist/index.html`);

    // Se guarda como /ruta/index.html y también como /ruta.html:
    // así funciona en los hostings que buscan cualquiera de las dos formas.
    const outDir = route === "/" ? dist : path.join(dist, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
    if (route !== "/") await writeFile(`${outDir}.html`, html);
    console.log(`  pre-renderizada ${route}`);
}

await rm(ssrDir, { recursive: true, force: true });

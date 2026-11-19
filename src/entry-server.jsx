/* eslint-disable react-refresh/only-export-components -- entrada del servidor, no usa recarga en caliente */
// Entrada para pre-renderizar las páginas al compilar (ver scripts/prerender.mjs).
// Genera el HTML de cada ruta para que la foto y los textos se vean
// antes de que cargue el JavaScript (mejor velocidad y mejor SEO).
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./app/App.jsx";
import "./styles/animations.css";
import "./styles/global.css";
import "./styles/typography.css";

export { PAGE_METADATA } from "./data/pageMetadata.js";

export async function render(url) {
    // prerenderToNodeStream espera a que carguen las páginas diferidas (lazy)
    const { prelude } = await prerenderToNodeStream(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>
    );
    let html = "";
    for await (const chunk of prelude) html += chunk;
    return html;
}

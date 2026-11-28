// Estadísticas de visitas con Google Analytics 4.
// - Visitas: se registra una por cada página que se abre (ver hooks/usePageTracking.js).
// - Clics: cualquier link a WhatsApp, Facebook, Google Maps o teléfono se registra solo,
//   sin tener que tocar cada botón. Eventos: click_whatsapp, click_facebook, click_mapa, click_telefono.
// - Consultas armadas con el formulario: evento consulta_whatsapp (ver BookingForm.jsx).
// En GA4 conviene marcar click_whatsapp y consulta_whatsapp como "eventos clave".
import { GA_MEASUREMENT_ID } from "../config/analytics";

const isBrowser = typeof window !== "undefined";
const enabled = isBrowser && Boolean(GA_MEASUREMENT_ID) && import.meta.env.PROD;

const LINK_EVENTS = [
    [/wa\.me|whatsapp\.com/i, "click_whatsapp"],
    [/facebook\.com/i, "click_facebook"],
    [/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i, "click_mapa"],
    [/^tel:/i, "click_telefono"],
];

let started = false;

function onLinkClick(event) {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const match = LINK_EVENTS.find(([pattern]) => pattern.test(link.href));
    if (!match) return;
    const text = (link.getAttribute("aria-label") || link.textContent || "").replace(/\s+/g, " ").trim();
    trackEvent(match[1], { pagina: location.pathname, texto: text.slice(0, 80) });
}

// Carga gtag.js una sola vez. El script es async: no frena el dibujado de la página.
function start() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // Las visitas se mandan a mano en cada cambio de página (el sitio no recarga al navegar)
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    document.addEventListener("click", onLinkClick, { capture: true });
}

export function trackEvent(name, params = {}) {
    if (!enabled) {
        if (isBrowser && import.meta.env.DEV) console.debug("[analytics]", name, params);
        return;
    }
    start();
    window.gtag("event", name, params);
}

export function trackPageView() {
    trackEvent("page_view", { page_location: location.href, page_title: document.title });
}

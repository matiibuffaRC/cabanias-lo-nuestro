import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../../config/site";
import { PAGE_METADATA } from "../../data/pageMetadata";

const NOT_FOUND_METADATA = {
  title: "Página no encontrada | Lo Nuestro",
  description: "La página que buscás no está disponible.",
  robots: "noindex, follow",
};

// Busca una etiqueta en <head> por sus atributos; si no existe, la crea.
function upsertHeadTag(tagName, attributes, valueAttribute, value) {
  const selector = `${tagName}${Object.entries(attributes)
    .map(([key, val]) => `[${key}="${val}"]`)
    .join("")}`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, val]) => element.setAttribute(key, val));
    document.head.appendChild(element);
  }
  element.setAttribute(valueAttribute, value);
}

function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = PAGE_METADATA[pathname] ?? NOT_FOUND_METADATA;

    document.title = metadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", metadata.robots ?? "index, follow");
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", metadata.description);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", metadata.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", metadata.description);

    // URL canónica y og:url (solo si está configurada la dirección del sitio)
    if (SITE_URL) {
      const url = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
      upsertHeadTag("link", { rel: "canonical" }, "href", url);
      upsertHeadTag("meta", { property: "og:url" }, "content", url);
    }
  }, [pathname]);

  return null;
}

export default PageMetadata;

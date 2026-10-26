import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_METADATA = {
  "/": {
    title: "Cabañas y dormis Lo Nuestro en Mina Clavero | Traslasierra",
    description:
      "Alquiler de cabañas y dormis en Mina Clavero, Córdoba. Pileta, Wi-Fi, parrillas y estacionamiento. Consultá disponibilidad por WhatsApp.",
  },
  "/alojamiento/complejo": {
    title: "Complejo de cabañas y dormis en Mina Clavero | Lo Nuestro",
    description:
      "Conocé el complejo Lo Nuestro en Mina Clavero: cabañas, dormis, pileta, Wi-Fi, estacionamiento y parrillas, a minutos del centro y los ríos.",
  },
  "/alojamiento/cabins": {
    title: "Cabañas en Mina Clavero para hasta 4 personas | Lo Nuestro",
    description:
      "Cabañas equipadas en Mina Clavero con cocina, cochera individual, asador, aire acondicionado y acceso a la pileta. Consultá disponibilidad.",
  },
  "/alojamiento/dormis": {
    title: "Dormis en Mina Clavero para hasta 4 personas | Lo Nuestro",
    description:
      "Dormis en Mina Clavero con aire acondicionado, vajilla, quincho, asadores compartidos y acceso a la pileta. Consultá disponibilidad.",
  },
  "/comoLlegar": {
    title: "Cómo llegar a Lo Nuestro en Mina Clavero | Córdoba",
    description:
      "Encontrá cómo llegar a las cabañas y dormis Lo Nuestro en Mina Clavero, Córdoba, con direcciones, indicaciones y mapas.",
  },
  "/contact": {
    title: "Contacto y reservas de cabañas en Mina Clavero | Lo Nuestro",
    description:
      "Consultá por WhatsApp o Facebook la disponibilidad y los precios de las cabañas y dormis Lo Nuestro en Mina Clavero, Córdoba.",
  },
};

const NOT_FOUND_METADATA = {
  title: "Página no encontrada | Lo Nuestro",
  description: "La página que buscás no está disponible.",
  robots: "noindex, follow",
};

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
  }, [pathname]);

  return null;
}

export default PageMetadata;

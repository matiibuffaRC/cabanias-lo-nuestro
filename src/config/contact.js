// Datos de contacto centralizados. Cambiar acá actualiza todo el sitio.
export const WHATSAPP_NUMBER = "5493564507240";
export const FACEBOOK_URL = "https://www.facebook.com/p/Lo-Nuestro-100054220102040/";

export function getWhatsAppUrl(message = "") {
    const base = `https://wa.me/${WHATSAPP_NUMBER}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

// Registra una visita cada vez que cambia la página.
// Va en App, así corre después de PageMetadata y el título ya está actualizado.
export default function usePageTracking() {
    const { pathname } = useLocation();

    useEffect(() => {
        trackPageView();
    }, [pathname]);
}

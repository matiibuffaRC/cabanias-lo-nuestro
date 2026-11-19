import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (callback) => {
    const media = window.matchMedia(QUERY);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(QUERY).matches;
// En el HTML pre-renderizado no se sabe: se asume "no", y React lo corrige al cargar.
const getServerSnapshot = () => false;

/** true si la persona pidió "reducir movimiento" en su sistema. */
function usePrefersReducedMotion() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default usePrefersReducedMotion;

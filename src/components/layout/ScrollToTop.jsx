import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Al cambiar de página: vuelve arriba y mueve el foco al título (h1) de la página nueva.
 * Así quien navega con teclado o lector de pantalla no queda "perdido" en el menú,
 * y el lector anuncia en qué página está. En la primera carga no se toca el foco.
 */
function ScrollToTop() {
    const { pathname } = useLocation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Esperamos un cuadro para que la página nueva ya esté en el DOM
        const frame = requestAnimationFrame(() => {
            const target = document.querySelector("#contenido h1") ?? document.getElementById("contenido");
            if (!target) return;
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.classList.add("outline-none");
            target.focus({ preventScroll: true });
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return null;
}

export default ScrollToTop;

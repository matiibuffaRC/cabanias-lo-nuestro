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
    const previousHeading = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Primera carga: recordamos el h1 actual para distinguirlo del de la próxima página
        if (isFirstRender.current) previousHeading.current = document.querySelector("#contenido h1");

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Las páginas se descargan al entrar y, mientras tanto, puede seguir visible la anterior:
        // esperamos (hasta ~1 s) a que aparezca un h1 distinto al de la página de la que venimos.
        const previous = previousHeading.current;
        let frame = 0;
        let tries = 0;
        const focusTitle = () => {
            const found = document.querySelector("#contenido h1");
            const heading = found && found !== previous ? found : null;
            if (!heading && tries++ < 60) {
                frame = requestAnimationFrame(focusTitle);
                return;
            }
            // Si se agotó la espera (ej: entre alojamientos se reutiliza el mismo h1), usamos el que haya
            previousHeading.current = heading ?? found;
            const target = heading ?? found ?? document.getElementById("contenido");
            if (!target) return;
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.classList.add("outline-none");
            target.focus({ preventScroll: true });
        };
        frame = requestAnimationFrame(focusTitle);
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return null;
}

export default ScrollToTop;

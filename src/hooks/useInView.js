import { useEffect, useRef, useState } from "react";

/**
 * Devuelve [ref, visible]: `visible` pasa a true la primera vez que el
 * elemento entra en pantalla y ya no vuelve a false.
 */
function useInView({ threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(
        () => typeof IntersectionObserver === "undefined"
    );

    useEffect(() => {
        const element = ref.current;
        if (!element || visible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, visible]);

    return [ref, visible];
}

export default useInView;

import { useEffect, useRef } from "react";

function useScrollImageEffect() {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const height = element.offsetHeight || 1;
            const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
            element.style.setProperty("--p", progress.toFixed(3));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return ref;
}

export default useScrollImageEffect;

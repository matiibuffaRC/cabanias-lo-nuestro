import { useState, useRef, useEffect } from "react";

function ServiceItemComponent({ service, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Si el navegador no soporta IntersectionObserver, mostramos directo
        if (typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const delay =
        typeof window !== "undefined" && window.innerWidth >= 350
            ? `${index * 0.15}s`
            : "0s";

    return (
        <div
            ref={ref}
            style={{ animationDelay: delay }}
            className={`flex flex-col items-center my-5 md:my-0 ${
                isVisible ? "fade-down" : "opacity-0"
            }`}
        >
            {/* Decorativo: el texto de abajo ya describe el servicio */}
            <img
                src={service.img}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12"
            />

            <p className="font-bold text-[1.1rem] md:text-[.9rem] lg:text-[1.1rem] text-center">
                {service.title}
            </p>

            <p className="text-[.9rem] md:text-[.7rem] lg:text-[.9rem] text-center text-muted">
                {service.description}
            </p>
        </div>
    );
}

export default ServiceItemComponent;
import { useState, useRef, useEffect } from "react";

function ServiceItem({ service, index }) {
    const [isVisible, setIsVisible] = useState(
        () => typeof IntersectionObserver === "undefined"
    );
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (typeof IntersectionObserver === "undefined") return;

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
            ? `${index * 0.12}s`
            : "0s";

    return (
        <div
            ref={ref}
            style={{ animationDelay: delay }}
            className={`group relative flex flex-col items-center justify-center gap-3.5 overflow-hidden rounded-2xl border border-[#3E6143]/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3E6143]/25 hover:shadow-lg hover:shadow-[#3E6143]/10 md:p-6 ${
                isVisible ? "fade-down" : "opacity-0"
            }`}
        >
            {/* Franja de acento que se expande al pasar el mouse */}
            <span className="absolute left-0 top-0 h-1 w-10 rounded-br-full bg-linear-to-r from-[#3E6143] to-[#6E9B72] transition-all duration-500 group-hover:w-full" />
            {/* Brillo suave de fondo al pasar el mouse */}
            <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-[#3E6143]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#3E6143]/10 to-[#6E9B72]/25 ring-0 ring-[#3E6143]/10 transition-all duration-300 group-hover:scale-105 group-hover:ring-8 md:h-16 md:w-16">
                <img
                    src={service.img}
                    alt="
                    ."
                    aria-hidden="true"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 md:h-8 md:w-8"
                />
            </div>

            <div className="relative flex flex-col items-center gap-1">
                <p className="titles text-[.95rem] font-bold leading-tight text-[#3E6143] md:text-base">
                    {service.title}
                </p>
                <p className="text-[.8rem] leading-snug text-[#757575] md:text-[.85rem]">
                    {service.description}
                </p>
            </div>
        </div>
    );
}

export default ServiceItem;
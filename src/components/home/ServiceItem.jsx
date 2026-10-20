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
            ? `${index * 0.15}s`
            : "0s";

    return (
        <div
            ref={ref}
            style={{ animationDelay: delay }}
            className={`flex flex-col items-center rounded-2xl border border-[#3E6143]/10 bg-white px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isVisible ? "fade-down" : "opacity-0"
            }`}
        >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#3E6143]/10">
                <img
                    src={service.img}
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="h-9 w-9"
                />
            </div>

            <p className="text-center text-[.95rem] font-bold text-[#3E6143] md:text-base">
                {service.title}
            </p>

            <p className="mt-1 text-center text-[.8rem] leading-snug text-[#757575] md:text-[.85rem]">
                {service.description}
            </p>
        </div>
    );
}

export default ServiceItem;
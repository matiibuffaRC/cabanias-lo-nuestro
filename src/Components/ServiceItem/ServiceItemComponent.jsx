import { useState, useRef, useEffect } from "react";

function ServiceItemComponent({ service, index }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);

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
            className={`group flex flex-col items-center my-5 md:my-0 p-4 rounded-2xl 
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:bg-white/5 hover:shadow-lg hover:shadow-black/5
            ${isVisible ? "fade-down" : "opacity-0"}`}
        >
            <div className="relative">
                <img
                    src={service.img}
                    alt={`${service.title} icon`}
                    className="h-12 w-12 cursor-pointer transition-transform duration-300 ease-out
                    group-hover:scale-110 group-hover:-rotate-6"
                />
                {/* glow suave detrás del ícono */}
                <div className="absolute inset-0 -z-10 rounded-full blur-xl opacity-0 
                group-hover:opacity-40 transition-opacity duration-300 bg-current" />
            </div>

            <h3 className="font-bold text-[1.1rem] md:text-[.9rem] lg:text-[1.1rem] relative
            transition-colors duration-300 group-hover:text-primary">
                {service.title}
                <span className="absolute left-1/2 -bottom-1 h-[2px] w-0 bg-current
                -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
            </h3>

            <h3 className="text-[.9rem] md:text-[.7rem] lg:text-[.9rem] text-center
            transition-colors duration-300 group-hover:text-foreground/80">
                {service.description}
            </h3>
        </div>
    );
}

export default ServiceItemComponent;
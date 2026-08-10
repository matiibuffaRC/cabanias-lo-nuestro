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

    const delay = window.innerWidth >= 350 ? `${index * 0.15}s` : "0s";

    return (
        <div ref={ref} style={{ animationDelay: delay }} className={`flex flex-col items-center my-5 md:my-0 ${isVisible ? "fade-down" : "opacity-0" }`}>
            <img src={service.img} alt={`${service.title} icon`} className="h-12 w-12 cursor-pointer"/>

            <h3 className="font-bold text-[1.1rem] md:text-[.9rem] lg:text-[1.1rem]">
                {service.title}
            </h3>

            <h3 className="text-[.9rem] md:text-[.7rem] lg:text-[.9rem] text-center">
                {service.description}
            </h3>
        </div>
    );
}

export default ServiceItemComponent;
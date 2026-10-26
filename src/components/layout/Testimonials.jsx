import { useState, useEffect, useRef } from "react";

// ⚠️ Texto de ejemplo: reemplazalo por testimonios reales de tus clientes
const TESTIMONIALS = [
    {
        name: "María G.",
        place: "Córdoba",
        text: "Excelente atención desde el primer mensaje. Nos respondieron rápido y el lugar estaba tal cual las fotos. Volveremos seguro.",
        rating: 5,
    },
    {
        name: "Javier R.",
        place: "Rosario",
        text: "Fuimos en familia y los chicos disfrutaron la pileta todo el día. Muy tranquilo y súper bien cuidado.",
        rating: 4,
    },
    {
        name: "Lucía P.",
        place: "Buenos Aires",
        text: "Coordinar fue facilidad total. Muy amables y atentos a cada detalle. ¡Súper recomendable!",
        rating: 4,
    },
];

/* Hook: marca un elemento como visible cuando entra en pantalla */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

/* Estrellas que aparecen una por una */
function Stars({ rating, visible, baseDelay }) {
    return (
        <div className="flex gap-0.5" role="img" aria-label={`${rating} de 5 estrellas`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4.5 h-4.5 transition-all duration-500 ease-out ${
                        i < rating ? "text-[#E0A526]" : "text-[#3E6143]/15"
                    } ${visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                    style={{ transitionDelay: `${baseDelay + i * 80}ms` }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

function TestimonialCard({ name, place, text, rating, visible, delay }) {
    return (
        <figure className="group relative h-full flex flex-col gap-4 bg-white rounded-2xl p-6 shadow-sm border border-[#3E6143]/10 text-left overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#3E6143]/10">
            {/* Franja de acento superior que se expande al pasar el mouse */}
            <span className="absolute top-0 left-0 h-1 w-12 bg-linear-to-r from-[#3E6143] to-[#6E9B72] rounded-br-full transition-all duration-500 group-hover:w-full" />

            {/* Comillas decorativas */}
            <svg
                className="absolute top-4 right-4 w-10 h-10 text-[#3E6143]/8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M9.5 5C6.5 6 4 8.8 4 12.5V19h6.5v-6.5H7.2c.2-2 1.3-3.4 3.3-4.1L9.5 5zm9 0c-3 1-5.5 3.8-5.5 7.5V19h6.5v-6.5h-3.3c.2-2 1.3-3.4 3.3-4.1L18.5 5z" />
            </svg>

            <Stars rating={rating} visible={visible} baseDelay={delay + 250} />

            <blockquote className="relative text-[.95rem] leading-relaxed text-[#3E6143]/80 flex-1">
                {text}
            </blockquote>

            <figcaption className="flex items-center gap-3 pt-4 border-t border-[#3E6143]/10">
                <div className="h-11 w-11 rounded-full bg-linear-to-br from-[#3E6143] to-[#6E9B72] flex items-center justify-center shrink-0 titles font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {name.charAt(0)}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="titles font-bold text-[.95rem] text-[#3E6143] truncate">{name}</span>
                    <span className="titles text-[.85rem] text-[#3E6143]/60 truncate">{place}</span>
                </div>
            </figcaption>
        </figure>
    );
}

function Testimonials() {
    const [ref, visible] = useInView();

    return (
        <section ref={ref} className="max-w-md md:max-w-5xl mx-auto mt-16">
            {/* Encabezado */}
            <div
                className={`mb-8 transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                <span className="inline-block text-[.75rem] titles font-bold tracking-widest uppercase text-[#6E9B72] mb-2">
                    Opiniones
                </span>
                <h2 className="text-[1.5rem] md:text-[1.75rem] titles font-bold text-[#3E6143]">
                    Lo que dicen nuestros clientes
                </h2>
                <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#3E6143]/20 overflow-hidden">
                    <div
                        className={`h-full bg-[#3E6143] rounded-full transition-all duration-1000 ease-out ${
                            visible ? "w-full" : "w-0"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    />
                </div>
                <p className="text-[#3E6143]/70 mt-3">Experiencias de quienes ya nos visitaron.</p>
            </div>

            {/* Mobile: carrusel con scroll-snap. Desktop: grilla de 3 columnas */}
            <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0 pt-2 pb-6 md:pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {TESTIMONIALS.map((item, i) => (
                    <div
                        key={item.name}
                        className={`snap-center shrink-0 w-[85%] md:w-auto transition-all duration-700 ease-out ${
                            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${150 + i * 150}ms` }}
                    >
                        <TestimonialCard {...item} visible={visible} delay={150 + i * 150} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
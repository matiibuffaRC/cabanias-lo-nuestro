import { useState, useEffect, useRef, useCallback } from "react";

const AUTOPLAY_MS = 5000;
const GAP = 16; // gap-4 en px

// ⚠️ Texto de ejemplo: reemplazalo por testimonios reales de tus clientes.
// Podés agregar todos los que quieras: el carrusel se adapta solo.
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
        rating: 5,
    },
    {
        name: "Lucía P.",
        place: "Buenos Aires",
        text: "Coordinar fue facilidad total. Muy amables y atentos a cada detalle. ¡Súper recomendable!",
        rating: 5,
    },
    {
        name: "Martín S.",
        place: "Villa María",
        text: "Pasamos un fin de semana espectacular con amigos. El lugar es hermoso y la atención de diez.",
        rating: 5,
    },
    {
        name: "Carolina D.",
        place: "San Francisco",
        text: "Muy buena relación precio-calidad. Todo limpio, cómodo y con muy buena onda de parte de los dueños.",
        rating: 4,
    },
    {
        name: "Esteban L.",
        place: "Santa Fe",
        text: "Nos encantó la ubicación y lo bien que nos orientaron para llegar. Ya estamos pensando en volver.",
        rating: 5,
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
        <figure className="group relative h-full w-full flex flex-col gap-4 bg-white rounded-2xl p-6 shadow-sm border border-[#3E6143]/10 text-left overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#3E6143]/10">
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

function ArrowButton({ direction, onClick }) {
    const isPrev = direction === "prev";
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={isPrev ? "Testimonio anterior" : "Testimonio siguiente"}
            className="h-10 w-10 rounded-full bg-white border border-[#3E6143]/10 shadow-sm flex items-center justify-center text-[#3E6143] cursor-pointer transition-all duration-200 hover:bg-[#3E6143] hover:text-white hover:shadow-md active:scale-90"
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={isPrev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
            </svg>
        </button>
    );
}

function Testimonials() {
    const [ref, visible] = useInView();
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [pages, setPages] = useState(TESTIMONIALS.length);
    const [paused, setPaused] = useState(false);

    // Ancho de un "paso" (tarjeta + gap) y cuántas tarjetas se ven a la vez
    const measure = useCallback(() => {
        const track = trackRef.current;
        const first = track?.firstElementChild;
        if (!track || !first) return null;
        const step = first.offsetWidth + GAP;
        const perView = Math.max(1, Math.round(track.clientWidth / step));
        return { step, perView };
    }, []);

    const updatePages = useCallback(() => {
        const m = measure();
        if (!m) return;
        setPages(Math.max(1, TESTIMONIALS.length - m.perView + 1));
    }, [measure]);

    // Recalcular cantidad de "páginas" al cambiar el tamaño de pantalla
    useEffect(() => {
        updatePages();
        window.addEventListener("resize", updatePages);
        return () => window.removeEventListener("resize", updatePages);
    }, [updatePages]);

    // Detectar qué tarjeta está activa mientras se hace scroll (swipe, flechas o autoplay)
    const onScroll = () => {
        const track = trackRef.current;
        const m = measure();
        if (!track || !m) return;
        const index = Math.round(track.scrollLeft / m.step);
        setActive(Math.min(Math.max(index, 0), pages - 1));
    };

    const goTo = useCallback(
        (index) => {
            const track = trackRef.current;
            const m = measure();
            if (!track || !m) return;
            const target = (index + pages) % pages; // da la vuelta al llegar al final
            track.scrollTo({ left: target * m.step, behavior: "smooth" });
        },
        [measure, pages]
    );

    // Autoplay: se pausa con el mouse encima, al tocar, con foco por teclado o si el usuario prefiere menos movimiento
    useEffect(() => {
        if (!visible || paused || pages <= 1) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => goTo(active + 1), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [visible, paused, pages, active, goTo]);

    return (
        <section
            ref={ref}
            className="max-w-md md:max-w-5xl mx-auto mt-16"
            aria-roledescription="carrusel"
            aria-label="Testimonios de clientes"
        >
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

            {/* Carrusel: swipe en celular, flechas y puntos en todas las pantallas */}
            <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
            >
                <div
                    ref={trackRef}
                    onScroll={onScroll}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-5 md:scroll-pl-0 -mx-5 px-5 md:mx-0 md:px-0 pt-2 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {TESTIMONIALS.map((item, i) => (
                        <div
                            key={item.name}
                            className={`snap-start shrink-0 w-[85%] md:w-[calc((100%-2rem)/3)] flex transition-all duration-700 ease-out ${
                                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                            style={{ transitionDelay: `${150 + Math.min(i, 3) * 150}ms` }}
                        >
                            <TestimonialCard {...item} visible={visible} delay={150 + Math.min(i, 3) * 150} />
                        </div>
                    ))}
                </div>

                {/* Controles */}
                {pages > 1 && (
                    <div
                        className={`flex items-center justify-center gap-4 transition-opacity duration-700 delay-500 ${
                            visible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <ArrowButton direction="prev" onClick={() => goTo(active - 1)} />

                        <div className="flex items-center gap-2">
                            {Array.from({ length: pages }).map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`Ir al testimonio ${i + 1}`}
                                    aria-current={i === active}
                                    className="p-1 cursor-pointer"
                                >
                                    <span
                                        className={`block h-2 rounded-full transition-all duration-300 ${
                                            i === active ? "w-6 bg-[#3E6143]" : "w-2 bg-[#3E6143]/25 hover:bg-[#3E6143]/50"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <ArrowButton direction="next" onClick={() => goTo(active + 1)} />
                    </div>
                )}
            </div>
        </section>
    );
}

export default Testimonials;
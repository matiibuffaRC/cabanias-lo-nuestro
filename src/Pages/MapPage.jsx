import { useEffect, useRef, useState } from "react";
import ImageCarousel from "../components/shared/ImageCarousel";
import MapEmbed from "../components/shared/MapEmbed";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton";
import useScrollImageEffect from "../hooks/useScrollImageEffect";

import MinaClavero1 from "../assets/images/MinaClavero.jpg";
import MinaClavero2 from "../assets/images/MinaClavero2.jpg";

const MinaClaveroPhotos = [MinaClavero1, MinaClavero2];

/**
 * Aparece cuando entra en pantalla (no al montar la página), así los
 * bloques de más abajo animan recién cuando el usuario llega a ellos.
 */
function Reveal({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            } ${className}`}
        >
            {children}
        </div>
    );
}

/* ───────────── Íconos (estilo outline, 24x24, stroke) ───────────── */
function Icon({ children, className = "w-5 h-5" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const PinIcon = (props) => (
    <Icon {...props}>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
        <circle cx="12" cy="10" r="3" />
    </Icon>
);

const RouteIcon = (props) => (
    <Icon {...props}>
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="5" r="2.5" />
        <path d="M8.5 19H15a3.5 3.5 0 000-7H9a3.5 3.5 0 010-7h6.5" />
    </Icon>
);

const MapIcon = (props) => (
    <Icon {...props}>
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </Icon>
);

const ExternalIcon = (props) => (
    <Icon {...props}>
        <path d="M7 17L17 7M8 7h9v9" />
    </Icon>
);

const MAIN_MAP_LINK =
    "https://www.google.com/maps/search/?api=1&query=Cruz+del+Eje+2080+Mina+Clavero+Cordoba";

const DISTANCES = [
    { label: "Desde Córdoba Capital", value: "120-150 km", Icon: PinIcon },
    { label: "Desde Villa Carlos Paz", value: "110-120 km", Icon: PinIcon },
    { label: "Camino recomendado", value: "Altas Cumbres · RP 34", Icon: RouteIcon },
];

const ROUTES = [
    {
        badge: "Entrada frontal",
        title: "Cómo llegar a las cabañas",
        address: "Cruz del Eje 2080",
        steps: [
            "Desde la entrada, tomá la primera calle a la derecha.",
            'Avanzá 200 m y doblá en la calle "Cruz del Eje".',
            "Recorré 200 m más: la entrada frontal del complejo queda a tu izquierda.",
        ],
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.7774544157692!2d-65.0038206407185!3d-31.740215244786018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a3142f657%3A0x5fb0905c56f4d3a1!2sCruz%20Del%20Eje%202080%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773323933919!5m2!1sen!2sar",
        link: "https://www.google.com/maps/search/?api=1&query=Cruz+del+Eje+2080+Mina+Clavero+Cordoba",
    },
    {
        badge: "Entrada trasera",
        title: "Cómo llegar a los dormis",
        address: "Tanti 2085",
        steps: [
            "Desde la entrada, tomá la primera calle a la derecha.",
            'Avanzá 200 m y doblá en la calle "Cruz del Eje".',
            'Recorré 200 m más y tomá "Los Ceibos" a la izquierda.',
            'Doblá en la próxima calle, "Tanti", a la derecha.',
            "A 50 m encontrarás la entrada trasera del complejo.",
        ],
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.2773267131151!2d-65.00391871550505!3d-31.740217264151354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a2e3be031%3A0x4412eb98c3c0c23c!2sTanti%202085%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773324731315!5m2!1sen!2sar",
        link: "https://www.google.com/maps/search/?api=1&query=Tanti+2085+Mina+Clavero+Cordoba",
    },
];

function SectionHeading({ eyebrow, title }) {
    return (
        <Reveal className="text-center">
            <span className="inline-block text-[.75rem] tracking-[0.2em] uppercase font-semibold text-[#3E6143]/70 mb-2">
                {eyebrow}
            </span>
            <h3 className="titles font-bold text-[#3E6143] text-[1.6rem] md:text-[1.9rem] leading-tight">
                {title}
            </h3>
            <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full mx-auto mt-3" />
        </Reveal>
    );
}

function MapPage() {
    const carouselRef = useScrollImageEffect();

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            {/* Carrusel fijo: se oscurece y hace zoom mientras el contenido lo tapa */}
            <div ref={carouselRef} className="sticky top-16.25 z-0 w-full overflow-hidden">
                <div
                    className="scroll-image-effect"
                >
                    <ImageCarousel images={MinaClaveroPhotos} />
                </div>
            </div>

            {/* Panel que sube por encima del carrusel */}
            <div className="relative z-10 -mt-8 flex w-full flex-col items-center rounded-t-4xl bg-[#F1F3EE] shadow-[0_-14px_30px_-14px_rgba(0,0,0,0.3)]">
                {/* Intro (arriba del todo: anima al cargar) */}
                <section className="px-6 pt-12 pb-8 text-center max-w-3xl fade-down">
                    <span className="inline-flex items-center gap-1.5 text-[.75rem] tracking-[0.2em] uppercase font-semibold text-[#3E6143]/70 mb-2">
                        <PinIcon className="w-3.5 h-3.5" />
                        Valle de Traslasierra · Córdoba
                    </span>
                    <h1 className="titles font-bold text-[#3E6143] text-[2rem] md:text-[2.5rem] leading-tight my-2">
                        Cómo llegar a Mina Clavero
                    </h1>
                    <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full mx-auto my-4" />
                    <p className="text-defect text-[#757575] leading-relaxed md:text-[1.05rem]">
                        Mina Clavero está en el corazón del Valle de Traslasierra, al pie de las
                        Sierras Grandes. Se llega por el pintoresco camino de las Altas Cumbres
                        (Ruta Provincial 34).
                    </p>
                </section>

                {/* Chips de distancia */}
                <section className="w-full max-w-4xl px-4 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {DISTANCES.map((distance, index) => (
                            <Reveal key={distance.label} delay={index * 0.1} className="h-full">
                                <div className="group flex h-full items-center gap-3 bg-white rounded-2xl border border-[#3E6143]/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-4 py-3">
                                    <div className="h-11 w-11 rounded-full bg-[#3E6143]/10 text-[#3E6143] group-hover:bg-[#3E6143] group-hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                                        <distance.Icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left leading-tight">
                                        <p className="text-[.75rem] text-[#757575]">{distance.label}</p>
                                        <p className="text-[#3E6143] font-bold text-[1rem]">{distance.value}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* Mapa general */}
                <section className="w-full max-w-4xl px-4 mb-16">
                    <Reveal>
                        <div className="rounded-3xl overflow-hidden bg-white border border-[#3E6143]/15 shadow-md p-2">
                            <div className="rounded-2xl overflow-hidden">
                                <MapEmbed />
                            </div>
                            {/* Barra propia: no depende del cartel interno del iframe de Google */}
                            <div className="flex items-center justify-between gap-3 flex-wrap px-4 pt-3 pb-2">
                                <span className="inline-flex items-center gap-1.5 text-[.85rem] text-[#757575]">
                                    <PinIcon className="w-4 h-4 text-[#3E6143]" />
                                    <span className="font-semibold text-[#3E6143]">Mina Clavero, Córdoba</span>
                                </span>
                                <a
                                    href={MAIN_MAP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[.85rem] font-semibold text-white bg-[#3E6143] rounded-full px-4 py-1.5 hover:bg-[#2f4c34] transition-colors"
                                >
                                    Ver en Google Maps
                                    <ExternalIcon className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* Indicaciones detalladas */}
                <section className="w-full max-w-5xl px-4 mb-8">
                    <SectionHeading eyebrow="Último tramo" title="Indicaciones detalladas" />
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4 max-w-5xl w-full">
                    {ROUTES.map((route, index) => (
                        <Reveal key={route.title} delay={index * 0.15} className="h-full">
                            <article className="route-card group bg-white rounded-3xl border border-[#3E6143]/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex h-full flex-col">
                                {/* Encabezado */}
                                <div className="bg-linear-to-br from-[#3E6143] to-[#2f4c34] text-white px-6 py-5 flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-white/15 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                                        <MapIcon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left min-w-0">
                                        <span className="inline-block text-[.65rem] tracking-[0.18em] uppercase font-semibold bg-white/15 rounded-full px-2.5 py-0.5 mb-1">
                                            {route.badge}
                                        </span>
                                        <h4 className="titles font-bold text-[1.15rem] leading-tight">
                                            {route.title}
                                        </h4>
                                    </div>
                                </div>

                                {/* Pasos con línea conectora */}
                                <ol className="px-6 pt-6 pb-4 flex-1">
                                    {route.steps.map((step, i) => {
                                        const isLast = i === route.steps.length - 1;
                                        return (
                                            <li key={i} className="relative flex items-start gap-3 text-left pb-4 last:pb-0">
                                                {!isLast && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute left-3.5 top-7 bottom-0 w-px -translate-x-1/2 bg-[#3E6143]/20"
                                                    />
                                                )}
                                                <span
                                                    className={`relative z-10 h-7 w-7 rounded-full text-[.8rem] font-bold flex items-center justify-center shrink-0 ${
                                                        isLast
                                                            ? "bg-[#3E6143] text-white"
                                                            : "bg-[#3E6143]/10 text-[#3E6143]"
                                                    }`}
                                                >
                                                    {isLast ? <PinIcon className="w-3.5 h-3.5" /> : i + 1}
                                                </span>
                                                <p className="text-defect text-[.92rem] text-[#757575] leading-relaxed pt-0.5">
                                                    {step}
                                                </p>
                                            </li>
                                        );
                                    })}
                                </ol>

                                {/* Mapa */}
                                <div className="px-4 pb-3">
                                    <iframe
                                        src={route.mapSrc}
                                        width="350"
                                        height="250"
                                        className="rounded-2xl w-full h-56 md:h-60 lg:h-64 border border-[#3E6143]/10"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={route.title}
                                    />
                                </div>

                                {/* Pie con dirección y link */}
                                <div className="px-6 pb-5 pt-1 flex items-center justify-between gap-3 flex-wrap">
                                    <span className="inline-flex items-center gap-1.5 text-[.85rem] text-[#757575]">
                                        <PinIcon className="w-4 h-4 text-[#3E6143]" />
                                        <span className="font-semibold text-[#3E6143]">{route.address}</span>
                                    </span>
                                    <a
                                        href={route.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[.85rem] font-semibold text-[#3E6143] border border-[#3E6143]/30 rounded-full px-4 py-1.5 hover:bg-[#3E6143] hover:text-white hover:border-[#3E6143] transition-colors"
                                    >
                                        Abrir en Maps
                                        <ExternalIcon className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>

                <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
            </div>
        </div>
    );
}

export default MapPage;
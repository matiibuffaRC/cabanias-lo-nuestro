import ImageCarousel from "../components/shared/ImageCarousel";
import MapEmbed from "../components/shared/MapEmbed";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton";

import MinaClavero1 from "../assets/images/MinaClavero.jpg";
import MinaClavero2 from "../assets/images/MinaClavero2.jpg";

const MinaClaveroPhotos = [MinaClavero1, MinaClavero2];

const DISTANCES = [
    { label: "Desde Córdoba Capital", value: "120-150 km", icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" },
    { label: "Desde Villa Carlos Paz", value: "110-120 km", icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" },
    { label: "Camino recomendado", value: "Altas Cumbres · RP 34", icon: "M3 17l6-6 4 4 8-8M14 7h7v7" },
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
        <div className="text-center fade-down">
            <span className="inline-block text-[.75rem] tracking-[0.2em] uppercase font-semibold text-[#3E6143]/70 mb-2">
                {eyebrow}
            </span>
            <h3 className="titles font-bold text-[#3E6143] text-[1.6rem] md:text-[1.9rem] leading-tight">
                {title}
            </h3>
            <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full mx-auto mt-3" />
        </div>
    );
}

function MapPage() {
    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <ImageCarousel images={MinaClaveroPhotos} />

            {/* Intro */}
            <section className="px-6 pt-12 pb-8 text-center max-w-3xl fade-down">
                <span className="inline-block text-[.75rem] tracking-[0.2em] uppercase font-semibold text-[#3E6143]/70 mb-2">
                    Valle de Traslasierra · Córdoba
                </span>
                <h2 className="titles font-bold text-[#3E6143] text-[2rem] md:text-[2.5rem] leading-tight my-2">
                    Cómo llegar a Mina Clavero
                </h2>
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
                    {DISTANCES.map((item, index) => (
                        <div
                            key={item.label}
                            className="fade-down flex items-center gap-3 bg-white rounded-2xl border border-[#3E6143]/10 shadow-sm px-4 py-3"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="h-10 w-10 rounded-full bg-[#3E6143]/10 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-[#3E6143]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={item.icon} />
                                </svg>
                            </div>
                            <div className="text-left leading-tight">
                                <p className="text-[.75rem] text-[#757575]">{item.label}</p>
                                <p className="text-[#3E6143] font-bold text-[1rem]">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mapa general */}
            <section className="w-full max-w-4xl px-4 mb-16 fade-down">
                <div className="rounded-3xl overflow-hidden bg-white border border-[#3E6143]/15 shadow-md p-2">
                    <div className="rounded-2xl overflow-hidden">
                        <MapEmbed />
                    </div>
                </div>
            </section>

            {/* Indicaciones detalladas */}
            <section className="w-full max-w-5xl px-4 mb-8">
                <SectionHeading eyebrow="Último tramo" title="Indicaciones detalladas" />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4 max-w-5xl w-full">
                {ROUTES.map((route, index) => (
                    <article
                        key={route.title}
                        className="route-card fade-down group bg-white rounded-3xl border border-[#3E6143]/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        {/* Encabezado */}
                        <div className="bg-linear-to-br from-[#3E6143] to-[#2f4c34] text-white px-6 py-5 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
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

                        {/* Pasos */}
                        <ol className="px-6 pt-6 pb-4 flex flex-col gap-4 flex-1">
                            {route.steps.map((step, i) => (
                                <li key={i} className="flex items-start gap-3 text-left">
                                    <span className="h-7 w-7 rounded-full bg-[#3E6143]/10 text-[#3E6143] text-[.8rem] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-defect text-[.92rem] text-[#757575] leading-relaxed pt-0.5">
                                        {step}
                                    </p>
                                </li>
                            ))}
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
                        <div className="px-6 pb-5 pt-1 flex items-center justify-between gap-3">
                            <span className="text-[.85rem] text-[#757575]">
                                📍 <span className="font-semibold text-[#3E6143]">{route.address}</span>
                            </span>
                            <a
                                href={route.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[.85rem] font-semibold text-[#3E6143] border border-[#3E6143]/30 rounded-full px-4 py-1.5 hover:bg-[#3E6143] hover:text-white transition-colors"
                            >
                                Abrir en Maps
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default MapPage;
import { useRef, useState } from "react";

import nidoAguila from "../../assets/images/nido_aguila.webp";
import altasCumbres from "../../assets/images/altas_cumbres.webp";
import rocsen from "../../assets/images/rocsen.webp";
import supermercado from "../../assets/images/supermercado.webp";

import useInView from "../../hooks/useInView";
import SectionHeading from "../shared/SectionHeading";
import { getWhatsAppUrl } from "../../config/contact";

const WHATSAPP_URL = getWhatsAppUrl("Hola, ¿me recomiendan qué hacer en Mina Clavero?");

const CATEGORIES = [
    {
        id: "balnearios",
        label: "Balnearios",
        icon: "🏊",
        title: "Balnearios y ríos de Mina Clavero",
        intro: "El río Mina Clavero, declarado una de las Siete Maravillas Naturales de Argentina, regala pozas cristalinas, toboganes de piedra y playas para todos los gustos.",
        items: [
            {
                emoji: "🦅",
                title: "Nido del Águila",
                text: "Pozas profundas, saltos de agua y paredones de roca, un clásico para animarse a un clavado.",
                image: nidoAguila,
                imageAlt: "Pozas y paredones de roca en el Nido del Águila",
            },
            { emoji: "🛝", title: "La Toma", text: "Pequeñas cascadas y toboganes naturales formados por el agua. Ideal para ir con chicos." },
            { emoji: "🐘", title: "Los Elefantes", text: "Enormes rocas con formas únicas a la orilla del río, muy buenas para sacar fotos." },
            { emoji: "🌊", title: "Los Cajones", text: "El río corre encajonado entre piedras y forma rápidos y ollas profundas." },
            { emoji: "⛲", title: "Baño de los Dioses", text: "Ollas naturales con caídas de agua, tranquilas para pasar la tarde." },
            { emoji: "🏖️", title: "Playa Central", text: "En pleno centro, con aguas calmas. Cómoda para ir en familia y combinar con un paseo." },
        ],
    },
    {
        id: "excursiones",
        label: "Excursiones",
        icon: "🥾",
        title: "Excursiones y paseos por las sierras",
        intro: "Desde Mina Clavero se llega fácil a miradores, cascadas y caminos serranos. Hay opciones tranquilas y otras con más aventura.",
        items: [
            {
                emoji: "🛣️",
                title: "Camino de las Altas Cumbres",
                text: "Una de las rutas más escénicas de Córdoba, que pasa por el Parque Nacional Quebrada del Condorito.",
                image: altasCumbres,
                imageAlt: "Ruta serrana del Camino de las Altas Cumbres",
            },
            { emoji: "💧", title: "Nacimiento del Río Mina Clavero", text: "Un parador sobre la RP 34 desde donde se accede al lugar donde nace el río." },
            { emoji: "🐎", title: "Cabalgatas y 4x4", text: "Recorridos por arroyos y caminos de montaña, con guías de la zona." },
            { emoji: "🚣", title: "Dique La Viña", text: "Un lugar enorme para pasear, pescar o hacer kayak, a unos kilómetros de Nono." },
            { emoji: "🥾", title: "Senderos y miradores", text: "Caminatas cortas con vistas del valle, buenas para hacer a la mañana o al atardecer." },
            { emoji: "🏺", title: "Camino de los Artesanos", text: "Talleres y puestos con cerámica negra y otras artesanías hechas en la zona." },
        ],
    },
    {
        id: "cultura",
        label: "Cultura",
        icon: "🏛️",
        title: "Museos y pueblos cercanos",
        intro: "Para los días de lluvia o para variar el plan, la zona tiene museos curiosos y pueblos con mucha historia.",
        items: [
            {
                emoji: "🏛️",
                title: "Museo Rocsen (Nono)",
                text: "Un museo polifacético con más de 18.000 piezas de distintas épocas y disciplinas.",
                image: rocsen,
                imageAlt: "Salas del Museo Rocsen en Nono",
            },
            { emoji: "🌵", title: "Museo de Cactus", text: "Un jardín con cactus y suculentas para recorrer sin apuro." },
            { emoji: "🔔", title: "Museo de las Campanas", text: "Una colección con cientos de campanas de todas las formas y sonidos." },
            { emoji: "💎", title: "Piedra Cruz del Sur", text: "Un recorrido guiado para conocer minerales y piedras de la región." },
            { emoji: "⛪", title: "Villa Cura Brochero", text: "El pueblo del Cura Gaucho, con su iglesia y su historia, a pocos kilómetros." },
            { emoji: "🏺", title: "Museo Arqueológico Comechingón", text: "Para conocer a los pueblos originarios que habitaron estas sierras." },
        ],
    },
    {
        id: "comercios",
        label: "Comercios",
        icon: "🛒",
        title: "Comercios y servicios cerca",
        intro: "Para que no te falte nada durante la estadía, a poca distancia hay todo lo necesario para abastecerte.",
        items: [
            {
                emoji: "🛒",
                title: "Supermercados y almacenes",
                text: "Para hacer las compras del fin de semana y llegar con la heladera llena.",
                image: supermercado,
                imageAlt: "Compras de supermercado para la estadía",
            },
            { emoji: "🥖", title: "Panaderías y rotiserías", text: "Facturas, pan fresco y comida lista para cuando no querés cocinar." },
            { emoji: "🥩", title: "Carnicerías y verdulerías", text: "Todo lo que necesitás para el asado en la parrilla del complejo." },
            { emoji: "💊", title: "Farmacias y servicios", text: "Farmacias, cajeros y estaciones de servicio en el centro de Mina Clavero." },
            { emoji: "🍽️", title: "Restaurantes y casas de té", text: "Cocina serrana, pizzerías y cafés para salir a comer algún día." },
            { emoji: "🧺", title: "Ferias de artesanos", text: "Regalos, dulces regionales y productos caseros para llevar de recuerdo." },
        ],
    },
];

/* Tarjeta destacada (primer lugar de cada categoría) */
function FeaturedCard({ emoji, title, text, image, imageAlt, animate }) {
    // Si la imagen falta o no carga, vuelve al diseño con emoji
    const [imgOk, setImgOk] = useState(Boolean(image));

    return (
        <li className={`sm:col-span-2 md:row-span-2 ${animate ? "zone-card-in" : "opacity-0"}`}>
            <article className="relative flex h-full min-h-72 flex-col justify-end gap-3 overflow-hidden rounded-3xl bg-linear-to-br from-primary via-[#34553A] to-primary-dark p-6 text-left shadow-lg shadow-primary/20 md:min-h-96 md:p-8">
                {imgOk ? (
                    <>
                        <img
                            src={image}
                            alt={imageAlt || title}
                            loading="lazy"
                            decoding="async"
                            onError={() => setImgOk(false)}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Degradé para que el texto blanco se lea sobre cualquier foto */}
                        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/35 via-55% to-transparent" />
                    </>
                ) : (
                    <>
                        <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
                        <span aria-hidden="true" className="pointer-events-none absolute right-6 top-5 text-[3.5rem] leading-none opacity-90 md:right-8 md:top-6 md:text-[5rem]">
                            {emoji}
                        </span>
                    </>
                )}

                <span className="relative inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <span aria-hidden="true" className="text-sand">★</span> Imperdible
                </span>
                <h4 className="titles relative max-w-[90%] text-xl font-bold leading-tight text-white md:text-2xl">
                    {title}
                </h4>
                <p className="relative max-w-md text-base leading-relaxed text-white/90 md:text-base">{text}</p>
            </article>
        </li>
    );
}

/* Tarjeta común: es informativa, no un botón, así que no reacciona al hover */
function PlaceCard({ emoji, title, text, index, animate, wideOnSm }) {
    return (
        <li
            className={`${wideOnSm ? "sm:col-span-2 md:col-span-1" : ""} ${animate ? "zone-card-in" : "opacity-0"}`}
            style={{ animationDelay: `${index * 70}ms` }}
        >
            <article className="flex h-full flex-row items-start gap-3.5 rounded-2xl border border-primary/10 bg-white p-4 text-left shadow-sm sm:flex-col sm:gap-3 sm:p-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-wash text-xl">
                    <span aria-hidden="true">{emoji}</span>
                </div>
                <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
                    <h4 className="titles text-base font-bold leading-snug text-primary">{title}</h4>
                    <p className="text-sm leading-relaxed text-muted">{text}</p>
                </div>
            </article>
        </li>
    );
}

function QueHacer() {
    const [ref, visible] = useInView({ threshold: 0.1 });
    const [activeId, setActiveId] = useState(CATEGORIES[0].id);
    const tabRefs = useRef([]);

    // Teclado en las pestañas: flechas, Inicio y Fin (patrón ARIA de tabs)
    const onTabKeyDown = (event, index) => {
        const last = CATEGORIES.length - 1;
        let next = null;
        if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
        if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = last;
        if (next === null) return;
        event.preventDefault();
        setActiveId(CATEGORIES[next].id);
        tabRefs.current[next]?.focus();
    };

    return (
        <section
            ref={ref}
            className="cv-auto relative isolate mx-auto mt-20 w-full max-w-5xl px-1 md:mt-24"
            aria-labelledby="que-hacer-title"
        >
            <style>{`
                @keyframes zoneCardIn {
                    from { opacity: 0; transform: translateY(16px) scale(.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .zone-card-in { animation: zoneCardIn .6s cubic-bezier(.22,1,.36,1) both; }
                @media (prefers-reduced-motion: reduce) { .zone-card-in { animation: none; } }
            `}</style>

            {/* Manchas de color de fondo, muy suaves */}
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 -z-10 size-80 bg-[radial-gradient(closest-side,rgb(110_155_114/0.18),transparent)]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-24 right-0 -z-10 size-96 bg-[radial-gradient(closest-side,rgb(224_165_38/0.12),transparent)]" />

            <SectionHeading
                id="que-hacer-title"
                title="Qué hacer en Mina Clavero"
                lead="Estamos a la entrada de Mina Clavero, en pleno Valle de Traslasierra: ríos, sierras y mucho para hacer a pocos minutos del complejo."
                className="mb-8 px-4"
            />

            {/* Pestañas (control segmentado) */}
            <div className="flex justify-center px-4">
                <div
                    role="tablist"
                    aria-label="Categorías de actividades"
                    className="grid w-full grid-cols-2 gap-1.5 rounded-3xl border border-primary/10 bg-white/80 p-1.5 shadow-sm backdrop-blur sm:flex sm:w-auto sm:rounded-full"
                >
                    {CATEGORIES.map((cat, index) => {
                        const selected = cat.id === activeId;
                        return (
                            <button
                                key={cat.id}
                                ref={(el) => (tabRefs.current[index] = el)}
                                type="button"
                                role="tab"
                                id={`tab-${cat.id}`}
                                aria-selected={selected}
                                aria-controls={`panel-${cat.id}`}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => setActiveId(cat.id)}
                                onKeyDown={(event) => onTabKeyDown(event, index)}
                                className={`flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-bold transition-colors duration-300 min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-sm sm:px-5 ${
                                    selected
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "text-primary hover:bg-primary/8"
                                }`}
                            >
                                <span aria-hidden="true">{cat.icon}</span>
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 p-4 text-center">
                {CATEGORIES.map((cat) => {
                    const [featured, ...rest] = cat.items;
                    const orphanIndex = rest.length % 2 === 1 ? rest.length - 1 : -1;

                    return (
                        <div
                            key={cat.id}
                            role="tabpanel"
                            id={`panel-${cat.id}`}
                            aria-labelledby={`tab-${cat.id}`}
                            hidden={cat.id !== activeId}
                        >
                            <h3 className="titles text-lg font-bold text-primary">{cat.title}</h3>
                            <p className="mx-auto mb-6 mt-1 max-w-2xl text-base text-muted">{cat.intro}</p>

                            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
                                <FeaturedCard {...featured} animate={visible} />
                                {rest.map((item, i) => (
                                    <PlaceCard
                                        key={item.title}
                                        {...item}
                                        index={i + 1}
                                        animate={visible}
                                        wideOnSm={i === orphanIndex}
                                    />
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Llamado a la acción */}
            <div className="focus-light relative m-4 mt-8 overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark px-6 py-9 text-center shadow-lg shadow-primary/20">
                <span aria-hidden="true" className="pointer-events-none absolute -left-12 -top-12 size-40 rounded-full bg-white/10" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full bg-primary-soft/25" />
                <h3 className="titles relative text-xl font-bold text-white md:text-3xl">¿Te ayudamos a armar tu plan?</h3>
                <p className="relative mx-auto mb-5 mt-1 max-w-md text-base text-white/80">
                    Contanos con quién venís y cuántos días, y te recomendamos qué hacer.
                </p>
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-bold leading-tight text-primary shadow-md sm:px-6 sm:text-base transition-[translate,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                    Preguntanos por WhatsApp
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
            </div>
        </section>
    );
}

export default QueHacer;

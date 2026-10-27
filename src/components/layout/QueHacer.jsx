import { useState, useEffect, useRef } from "react";

const WHATSAPP_URL = "https://wa.me/5493564507240";

/*
  ⚠️ Revisá los textos y sumá/quitá lo que quieras.
  - El PRIMER lugar de cada categoría se muestra destacado (tarjeta grande y verde).
  - Ese primer lugar puede llevar foto: campos `image` e `imageAlt`.
    Si no tiene `image` (o la imagen no carga), se muestra el diseño con emoji.
  - Las imágenes de abajo son GENÉRICAS (picsum.photos) solo para evaluar el diseño.
    Reemplazalas por fotos propias, por ejemplo "/img/nido-del-aguila.webp".
  - Los lugares están tomados de guías turísticas de Mina Clavero y Traslasierra.
  - Si querés agregar distancias, ponelas desde TU complejo, por ejemplo "A 10 min en auto".
  - En "Comercios" conviene poner nombres reales de tu zona (supermercado, panadería, farmacia, etc.).
*/
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
                image: "https://picsum.photos/seed/nido-del-aguila/1200/900",
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
                image: "https://picsum.photos/seed/altas-cumbres/1200/900",
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
                image: "https://picsum.photos/seed/museo-rocsen/1200/900",
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
                image: "https://picsum.photos/seed/supermercado/1200/900",
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

/* Hook: marca un elemento como visible cuando entra en pantalla */
function useInView(threshold = 0.1) {
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

/* Tarjeta destacada (primer lugar de cada categoría) */
function FeaturedCard({ emoji, title, text, image, imageAlt, animate }) {
    // Si la imagen falta o no carga, vuelve al diseño con emoji
    const [imgOk, setImgOk] = useState(Boolean(image));
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <li
            className={`group sm:col-span-2 md:row-span-2 ${animate ? "zone-card-in" : "opacity-0"}`}
        >
            <article className="relative h-full min-h-64 md:min-h-80 flex flex-col justify-end gap-3 rounded-3xl p-6 md:p-8 text-left overflow-hidden bg-linear-to-br from-[#3E6143] via-[#34553A] to-[#2A4530] shadow-lg shadow-[#3E6143]/20 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-[#3E6143]/30">
                {/* Foto de fondo (opcional) */}
                {imgOk && (
                    <>
                        <img
                            src={image}
                            alt={imageAlt || title}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgOk(false)}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                                imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        {/* Degradado para que el texto se lea siempre */}
                        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#1F3524] via-[#2A4530]/70 to-[#2A4530]/20" />
                    </>
                )}

                {/* Decoración original: círculos + emoji (siempre visibles, con o sin foto) */}
                <span className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />
                <span className="pointer-events-none absolute top-16 -right-4 h-20 w-20 rounded-full bg-[#6E9B72]/30 transition-transform duration-700 group-hover:scale-125" />
                <span
                    className={`pointer-events-none absolute top-5 right-6 md:top-6 md:right-8 text-[3.5rem] md:text-[5rem] leading-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                        imgOk ? "opacity-95 drop-shadow-[0_4px_10px_rgba(0,0,0,.35)]" : "opacity-90"
                    }`}
                    aria-hidden="true"
                >
                    {emoji}
                </span>

                <span className="relative self-start inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[.7rem] titles font-bold tracking-widest uppercase text-white">
                    <span aria-hidden="true">★</span> Imperdible
                </span>
                <h4 className="relative titles font-bold text-[1.35rem] md:text-[1.6rem] leading-tight text-white max-w-[85%] drop-shadow-sm">
                    {title}
                </h4>
                <p className="relative text-[.92rem] md:text-[1rem] leading-relaxed text-white/90 max-w-md">{text}</p>
            </article>
        </li>
    );
}

/* Tarjeta común */
function PlaceCard({ emoji, title, text, index, animate, wideOnSm }) {
    return (
        <li
            className={`group ${wideOnSm ? "sm:col-span-2 md:col-span-1" : ""} ${animate ? "zone-card-in" : "opacity-0"}`}
            style={{ animationDelay: `${index * 70}ms` }}
        >
            <article className="relative h-full flex flex-row items-start gap-3.5 sm:flex-col sm:gap-3 bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#3E6143]/10 text-left overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg group-hover:shadow-[#3E6143]/10 group-hover:border-[#3E6143]/20">
                {/* Franja de acento que se expande al pasar el mouse */}
                <span className="absolute top-0 left-0 h-1 w-10 bg-linear-to-r from-[#3E6143] to-[#6E9B72] rounded-br-full transition-all duration-500 group-hover:w-full" />

                <div className="h-11 w-11 shrink-0 rounded-xl bg-linear-to-br from-[#3E6143]/10 to-[#6E9B72]/20 flex items-center justify-center text-[1.4rem] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <span aria-hidden="true">{emoji}</span>
                </div>
                <div className="min-w-0 flex flex-col gap-1 sm:gap-2">
                    <h4 className="titles font-bold text-[1rem] leading-snug text-[#3E6143]">{title}</h4>
                    <p className="text-[.88rem] sm:text-[.9rem] leading-relaxed text-[#3E6143]/70">{text}</p>
                </div>
            </article>
        </li>
    );
}

function QueHacer() {
    const [ref, visible] = useInView();
    const [activeId, setActiveId] = useState(CATEGORIES[0].id);

    return (
        <section
            ref={ref}
            className="relative isolate max-w-md md:max-w-5xl mx-auto mt-16"
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
            <div className="pointer-events-none absolute -z-10 top-0 left-0 h-56 w-56 rounded-full bg-[#6E9B72]/15 blur-3xl" />
            <div className="pointer-events-none absolute -z-10 bottom-24 right-0 h-64 w-64 rounded-full bg-[#E0A526]/10 blur-3xl" />

            {/* Encabezado */}
            <div
                className={`mb-8 transition-all text-center duration-700 ease-out ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                <span className="inline-block text-[.75rem] titles font-bold tracking-widest uppercase text-[#6E9B72] mb-2">
                    La zona
                </span>
                <h2 id="que-hacer-title" className="text-[1.5rem] md:text-[1.75rem] titles font-bold text-[#3E6143]">
                    Qué hacer en Mina Clavero
                </h2>
                <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#3E6143]/20 overflow-hidden">
                    <div
                        className={`h-full bg-[#3E6143] rounded-full transition-all duration-1000 ease-out ${
                            visible ? "w-full" : "w-0"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    />
                </div>
                <p className="text-[#3E6143]/70 max-w-xl mx-auto mt-3">
                    Estamos a la entrada de Mina Clavero, en pleno Valle de Traslasierra: ríos, sierras y mucho para hacer
                    a pocos minutos del complejo.
                </p>
            </div>

            {/* Pestañas (control segmentado) */}
            <div
                className={`flex justify-center transition-all duration-700 delay-200 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                <div
                    role="tablist"
                    aria-label="Categorías"
                    className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-1.5 p-1.5 rounded-3xl sm:rounded-full bg-white/80 backdrop-blur border border-[#3E6143]/10 shadow-sm"
                >
                    {CATEGORIES.map((cat) => {
                        const selected = cat.id === activeId;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                id={`tab-${cat.id}`}
                                aria-selected={selected}
                                aria-controls={`panel-${cat.id}`}
                                onClick={() => setActiveId(cat.id)}
                                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full titles font-bold text-[.88rem] cursor-pointer transition-all duration-300 active:scale-95 ${
                                    selected
                                        ? "bg-[#3E6143] text-white shadow-md shadow-[#3E6143]/25"
                                        : "text-[#3E6143]/80 hover:bg-[#3E6143]/8 hover:text-[#3E6143]"
                                }`}
                            >
                                <span aria-hidden="true" className={`transition-transform duration-300 ${selected ? "scale-110" : ""}`}>
                                    {cat.icon}
                                </span>
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Paneles: todos están en el HTML (bueno para Google), solo se muestra el activo */}
            <div className="mt-8 text-center p-4">
                {CATEGORIES.map((cat) => {
                    const [featured, ...rest] = cat.items;
                    // Si queda una tarjeta sola en la última fila (2 columnas), la estiramos
                    const orphanIndex = rest.length % 2 === 1 ? rest.length - 1 : -1;

                    return (
                        <div
                            key={cat.id}
                            role="tabpanel"
                            id={`panel-${cat.id}`}
                            aria-labelledby={`tab-${cat.id}`}
                            hidden={cat.id !== activeId}
                        >
                            <h3 className="titles font-bold text-[1.15rem] text-[#3E6143]">{cat.title}</h3>
                            <p className="text-[#3E6143]/70 max-w-2xl mx-auto mt-1 mb-6 text-[.9rem] sm:text-[.95rem]">
                                {cat.intro}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 list-none p-0 m-0">
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
            <div
                className={`relative mt-10 overflow-hidden text-center m-4 rounded-3xl bg-linear-to-br from-[#3E6143] to-[#2A4530] px-6 py-8 shadow-lg shadow-[#3E6143]/20 transition-all duration-700 delay-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
                <span className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-white/10" />
                <span className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#6E9B72]/25" />
                <h3 className="relative titles font-bold text-xl md:text-3xl text-white">¿Te ayudamos a armar tu plan?</h3>
                <p className="relative text-white/80 mt-1 mb-5 max-w-md mx-auto text-[.95rem]">
                    Contanos con quién venís y cuántos días, y te recomendamos qué hacer.
                </p>
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#3E6143] titles font-bold text-[.95rem] shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                    Preguntanos por WhatsApp
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </a>
            </div>
        </section>
    );
}

export default QueHacer;    
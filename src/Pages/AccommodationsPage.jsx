import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { accommodation } from "../data/accommodation";
import AccommodationHighlights from "../components/accommodations/AccommodationHighlights";
import ImageCarousel from "../components/shared/ImageCarousel";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton";
import useScrollImageEffect from "../hooks/useScrollImageEffect";

function AccommodationsPage() {
    const { tipo } = useParams();
    return <AccommodationContent key={tipo} tipo={tipo} />;
}

function AccommodationContent({ tipo }) {
    const [servicesVisible, setServicesVisible] = useState(false);
    const servicesRef = useRef(null);
    const carouselRef = useScrollImageEffect();

    const data = accommodation.find((item) => item.slug === tipo);

    // Observer para detectar cuando la sección entra en pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setServicesVisible(true);
            },
            { threshold: 0.2 }
        );

        if (servicesRef.current) observer.observe(servicesRef.current);
        return () => observer.disconnect();
    }, []);

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F3EE] text-center px-5">
                <h1 className="titles text-[1.8rem] font-bold text-[#3E6143]">
                    Alojamiento no encontrado
                </h1>
                <p className="text-[#757575] mt-2">
                    Revisá el enlace o volvé a la página de inicio.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#F1F3EE] flex flex-col items-center">
            {/* Carrusel: queda fijo y el resto del contenido lo tapa al scrollear */}
            <div ref={carouselRef} className="sticky top-0 z-0 w-full overflow-hidden">
                <div className="scroll-image-effect">
                    <ImageCarousel images={data.photos} />
                </div>
            </div>

            {/* Todo lo que sigue se desliza por encima del carrusel */}
            <div className="relative z-10 -mt-8 flex w-full flex-col items-center rounded-t-4xl bg-[#F1F3EE]">
                {/* Encabezado */}
                <div className="text-center px-5 pt-10 pb-6 flex flex-col items-center w-full fade-down">
                    <h1 className="text-[2rem] titles font-bold text-[#3E6143]">
                        {data.title}
                    </h1>
                    <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full my-4" />

                    <div className="md:w-140 lg:w-170">
                        <p className="text-md text-defect text-[#757575] font-semibold text-lg leading-relaxed px-3">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Galería con descripciones */}
                {data.highlights?.length > 0 && (
                    <AccommodationHighlights highlights={data.highlights} slug={data.slug} />
                )}

                {/* Servicios */}
                {/* Servicios ofrecidos: reemplaza tu <div className="text-center px-5 py-10 ..."> completo */}
                <section className="relative isolate overflow-hidden text-center px-5 py-14 flex flex-col items-center w-full bg-linear-to-b from-white/60 via-white/40 to-white/60">
                    {/* Manchas de color de fondo, muy suaves */}
                    <div className="pointer-events-none absolute -z-10 -top-16 -left-16 h-56 w-56 rounded-full bg-[#6E9B72]/15 blur-3xl" />
                    <div className="pointer-events-none absolute -z-10 -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#E0A526]/10 blur-3xl" />

                    {/* Encabezado */}
                    <span className="fade-down text-[.75rem] titles font-bold tracking-widest uppercase text-[#6E9B72] mb-2">
                        Comodidades
                    </span>
                    <h2 className="fade-down titles text-[1.8rem] md:text-[2.1rem] font-bold text-[#3E6143]" style={{ animationDelay: "0.05s" }}>
                        Servicios ofrecidos
                    </h2>
                    <div className="fade-down mt-3 h-1 w-12 rounded-full bg-[#3E6143]/25" style={{ animationDelay: "0.1s" }} />

                    {data.informationText && (
                        <div className="md:w-140 fade-down" style={{ animationDelay: "0.15s" }}>
                            <h3 className="text-[.95rem] leading-relaxed text-defect font-medium text-[#757575] mt-4 px-3">
                                {data.informationText}
                            </h3>
                        </div>
                    )}

                    {/* Grilla de servicios */}
                    <div
                        ref={servicesRef}
                        className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-6 w-full max-w-3xl"
                    >
                        {data.services.map((service, index) => (
                            <div
                                key={index}
                                // Si queda un servicio solo en la última fila (2 columnas), ocupa todo el ancho
                                className={`service-card group relative overflow-hidden flex flex-col items-center justify-center gap-3.5 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#3E6143]/10 last:odd:col-span-2 md:last:odd:col-span-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#3E6143]/10 hover:border-[#3E6143]/25 ${
                                    servicesVisible ? "fade-down" : "opacity-0"
                                }`}
                                style={{ animationDelay: `${index * 0.12}s` }}
                            >
                                {/* Franja de acento que se expande al pasar el mouse */}
                                <span className="absolute top-0 left-0 h-1 w-10 bg-linear-to-r from-[#3E6143] to-[#6E9B72] rounded-br-full transition-all duration-500 group-hover:w-full" />
                                {/* Brillo suave de fondo al pasar el mouse */}
                                <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-[#3E6143]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-full bg-linear-to-br from-[#3E6143]/10 to-[#6E9B72]/25 flex items-center justify-center ring-0 ring-[#3E6143]/10 transition-all duration-300 group-hover:ring-8 group-hover:scale-105">
                                    <img
                                        src={service.img}
                                        alt=""
                                        className="h-7 w-7 md:h-8 md:w-8 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                                    />
                                </div>

                                <h3 className="relative text-[.9rem] md:text-[.95rem] font-bold text-defect text-[#3E6143] leading-tight">
                                    {service.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Llamado a la acción */}
               {/* CTA de reserva: reemplaza tu <div className="mx-auto my-12 flex w-[90%] ..."> completo */}
                <div className="relative isolate mx-auto my-12 flex w-[90%] max-w-2xl flex-col items-center overflow-hidden rounded-3xl bg-linear-to-br from-[#3E6143] via-[#34553A] to-[#2A4530] px-6 py-12 text-center shadow-xl shadow-[#3E6143]/25 md:px-12">
                    {/* Decoración de fondo */}
                    <span aria-hidden="true" className="pointer-events-none absolute -z-10 -left-14 -top-14 h-48 w-48 rounded-full bg-white/10" />
                    <span aria-hidden="true" className="pointer-events-none absolute -z-10 -bottom-20 -right-12 h-56 w-56 rounded-full bg-[#6E9B72]/25" />
                    <span aria-hidden="true" className="pointer-events-none absolute -z-10 right-10 top-8 h-16 w-16 rounded-full bg-[#E0A526]/15 blur-xl" />

                    {/* Insignia: "en línea" */}
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[.75rem] titles font-bold tracking-wide text-white backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#8FE0A0] opacity-75 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8FE0A0]" />
                        </span>
                        Respondemos todos los días
                    </span>

                    <h3 className="titles text-[1.6rem] font-bold leading-tight text-white md:text-[2rem]">
                        ¿Te gustaría reservar {data.title.toLowerCase()}?
                    </h3>

                    {/* Línea decorativa */}
                    <span className="mb-4 mt-3 block h-1 w-12 rounded-full bg-white/40" aria-hidden="true" />

                    <p className="max-w-md text-[1rem] leading-relaxed text-white/80">
                        Escribinos y te contamos disponibilidad, precios y todo lo que necesites saber.
                    </p>

                    <a
                        href={`https://wa.me/5493564507240?text=${encodeURIComponent(`Hola, quisiera consultar por ${data.title.toLowerCase()}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-3.5 titles font-bold text-[#3E6143] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A4530]"
                    >
                        {/* Fondo que se completa de izquierda a derecha */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 origin-left scale-x-0 bg-[#E4EDE0] transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />

                        {/* Icono de chat */}
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="relative z-10 size-5 transition-transform duration-300 motion-safe:group-hover:-rotate-12 motion-safe:group-hover:scale-110"
                        >
                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>

                        <span className="relative z-10">Consultar por WhatsApp</span>

                        {/* Flecha que aparece en hover */}
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="relative z-10 -ml-4 size-4 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>

                    {/* Puntos de confianza */}
                    <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[.82rem] text-white/70">
                        {["Disponibilidad", "Precios", "Sin compromiso"].map((item) => (
                            <li key={item} className="inline-flex items-center gap-1.5">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-[#8FE0A0]">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default AccommodationsPage;
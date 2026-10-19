import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { accommodation } from "../data/accommodation";
import CaruselImagesComponente from "../Components/Home/CaruselImagesComp";
import WhatsAppFloatingButton from "../Components/WppButton";

/* Hace aparecer el contenido una sola vez, cuando entra en pantalla */
function Reveal({ children, className = "", delay = 0 }) {
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
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

/* Un bloque foto + texto. Los impares se invierten en desktop */
function HighlightBlock({ item, index }) {
    const reversed = index % 2 === 1;

    return (
        <Reveal>
            <article
                className={`flex flex-col items-center gap-6 md:gap-10 ${
                    reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
                {/* Foto */}
                <div className="group w-full md:w-1/2 overflow-hidden rounded-2xl shadow-md border border-[#3E6143]/10">
                    <img
                        src={item.img}
                        alt={item.alt ?? item.title}
                        loading="lazy"
                        className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                </div>

                {/* Texto */}
                <div className="w-full md:w-1/2 text-center md:text-left px-2">
                    <span className="titles text-[.85rem] font-bold tracking-widest text-[#3E6143]/50">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="titles mt-1 text-2xl font-bold text-[#3E6143]">
                        {item.title}
                    </h3>
                    <span
                        className="mx-auto md:mx-0 my-3 block h-0.75 w-12 rounded-full bg-[#3E6143]/40"
                        aria-hidden="true"
                    />
                    <p className="text-lg leading-relaxed text-[#757575]">
                        {item.text}
                    </p>
                </div>
            </article>
        </Reveal>
    );
}

function AccommodationsPage() {
    const { tipo } = useParams();
    const [servicesVisible, setServicesVisible] = useState(false);
    const servicesRef = useRef(null);

    const data = accommodation.find((item) => item.slug === tipo);

    // Reinicia animación cuando cambia el alojamiento
    useEffect(() => {
        setServicesVisible(false);
    }, [tipo]);

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
    }, [tipo]);

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
            <CaruselImagesComponente images={data.photos} />

            {/* Encabezado */}
            <div className="text-center px-5 pt-10 pb-6 flex flex-col items-center w-full fade-down">
                <h1 className="text-[2rem] titles font-bold text-[#3E6143]">
                    {data.title}
                </h1>
                <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full my-4" />

                <div className="md:w-140">
                    <p className="text-md text-defect text-[#757575] font-semibold text-lg leading-relaxed px-3">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Galería con descripciones */}
            {data.highlights?.length > 0 && (
                <section className="w-full max-w-4xl px-5 py-10 flex flex-col items-center">
                    <h2 className="titles text-[1.8rem] font-bold text-[#3E6143] text-center">
                        Conocé el alojamiento
                    </h2>
                    <span className="block w-14 h-0.75 bg-[#3E6143]/40 rounded-full my-4" />

                    <div className="mt-6 flex w-full flex-col gap-12 md:gap-16">
                        {data.highlights.map((item, index) => (
                            <HighlightBlock
                                key={`${data.slug}-${index}`}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Servicios */}
            <div className="text-center px-5 py-10 flex flex-col items-center w-full bg-white/40">
                <h2 className="titles text-[1.8rem] font-bold text-[#3E6143]">
                    Servicios ofrecidos
                </h2>

                {data.informationText && (
                    <div className="md:w-140">
                        <h3 className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                            {data.informationText}
                        </h3>
                    </div>
                )}

                <div
                    ref={servicesRef}
                    className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:w-2xl w-full max-w-2xl"
                >
                    {data.services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card flex flex-col items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-[#3E6143]/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${
                                servicesVisible ? "fade-down" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${index * 0.12}s` }}
                        >
                            <div className="h-14 w-14 rounded-full bg-[#3E6143]/10 flex items-center justify-center">
                                <img src={service.img} alt="" className="h-7 w-7" />
                            </div>
                            <h3 className="text-[.9rem] font-bold text-defect text-[#3E6143] leading-tight">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Llamado a la acción */}
            <div className="mx-auto my-12 flex w-[90%] max-w-xl flex-col items-center rounded-2xl border border-[#3E6143]/15 bg-[#3E6143]/5 px-6 py-10 text-center">
                <h3 className="titles text-2xl font-bold text-[#3E6143]">
                    ¿Te gustaría reservar {data.title.toLowerCase()}?
                </h3>

                {/* Línea decorativa */}
                <span className="mb-3 mt-2 block h-0.5 w-12 rounded-full bg-[#3E6143]/40" aria-hidden="true" />

                <p className="max-w-md text-base text-[#757575]">
                    Escribinos y te contamos disponibilidad, precios y todo lo que necesites saber.
                </p>

                <a
                    href={`https://wa.me/5493564507240?text=${encodeURIComponent(`Hola, quisiera consultar por ${data.title.toLowerCase()}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-6 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[#3E6143] bg-[#446b4a] px-7 py-3 titles font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E6143] focus-visible:ring-offset-2"
                >
                    {/* Fondo que se completa de izquierda a derecha */}
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-left scale-x-0 bg-[#2f4d33] transition-transform duration-500 ease-out group-hover:scale-x-100"
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
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default AccommodationsPage;
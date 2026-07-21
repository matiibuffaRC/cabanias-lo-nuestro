import { useState, useRef, useEffect, useCallback } from "react";

import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";
import MapaComponent from "../Components/Mapa/MapaComponent";

import MinaClavero1 from "../imgs/MinaClavero.jpg";
import MinaClavero2 from "../imgs/MinaClavero2.jpg";
import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";

const MinaClaveroPhotos = [MinaClavero1, MinaClavero2];

const WHATSAPP_OPTIONS = [
    {
        href: "https://wa.me/549XXXXXXXXXX?text=Hola%20quisiera%20consultar%20los%20precios%20de%20las%20caba%C3%B1as",
        title: "Consultar precios",
        subtitle: "Tarifas y promociones",
        variant: "accent",
        delay: "0.12s",
    },
    {
        href: "https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20la%20disponibilidad",
        title: "Consultar disponibilidad",
        subtitle: "Fechas libres para tu estadía",
        variant: "primary",
        delay: "0.22s",
    },
];

function MapPage() {
    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickWhatsapp = useCallback(() => {
        setHasInteracted(true);
        setOpenMenuWhatsapp((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => setOpenMenuWhatsapp(false), []);

    // Cerrar el menú al hacer click afuera o al presionar Escape.
    useEffect(() => {
        if (!openMenuWhatsapp) return;

        const handlePointerDown = (event) => {
            if (
                menuRef.current?.contains(event.target) ||
                buttonRef.current?.contains(event.target)
            ) {
                return;
            }
            closeMenu();
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeMenu();
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openMenuWhatsapp, closeMenu]);

    const menuTransitionClass = !hasInteracted
        ? "hidden"
        : openMenuWhatsapp
        ? "fade-top-menu pointer-events-auto"
        : "fadeOutDown pointer-events-none";

    const bubbleTransitionClass = !hasInteracted
        ? ""
        : openMenuWhatsapp
        ? "fadeOutDown"
        : "fade-top-menu";

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <CaruselImagesComponente images={MinaClaveroPhotos} />
            <div className="p-8 text-center max-w-150 fade-down">
                <h2 className="titles-and-subtitles font-bold text-[#3E6143] text-[2rem] my-2">
                    Cómo llegar a Mina Clavero
                </h2>
                <h3 className="text-defect text-[#757575]">
                    Mina Clavero queda en la provincia de Córdoba, Argentina, específicamente en el
                    corazón del Valle de Traslasierra. Se ubica al pie de las Sierras Grandes,
                    aproximadamente a 120-150 km de Córdoba Capital y a 110-120 km de Villa Carlos
                    Paz, siendo accesible a través del pintoresco camino de las Altas Cumbres (Ruta
                    Provincial 34).
                </h3>
            </div>
            <div className="mx-5 mb-10 fade-down">
                <MapaComponent />
            </div>
            <div className="flex flex-col md:flex-row mb-10 fade-down">
                <div className="m-4 p-4 text-center border border-black rounded-xl bg-[#3E6143]/20 flex flex-col items-center justify-between flex-1 max-w-125">
                    <h3 className="text-[#3E6143] text-[1.4rem] titles-and-subtitles font-bold">
                        Como llegar a la entrada de las cabañas
                    </h3>
                    <h4 className="text-defect text-[.9rem] text-[#757575]">
                        Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se
                        toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido a su izquierda
                        ya se encuentra con la entrada frontal del complejo.
                    </h4>
                    <div className="my-2 flex flex-row justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.7774544157692!2d-65.0038206407185!3d-31.740215244786018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a3142f657%3A0x5fb0905c56f4d3a1!2sCruz%20Del%20Eje%202080%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773323933919!5m2!1sen!2sar"
                            width="350"
                            height="250"
                            className="rounded-2xl md:h-65 md:w-[95%] lg:h-70 lg:w-105"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de la región"
                        />
                    </div>
                </div>
                <div className="m-4 p-4 text-center border border-black rounded-xl bg-[#3E6143]/20 flex flex-col items-center justify-between flex-1 max-w-125">
                    <h3 className="text-[#3E6143] text-[1.4rem] titles-and-subtitles font-bold">
                        Como llegar a la entrada de los dormis
                    </h3>
                    <h4 className="text-defect text-[.9rem] text-[#757575]">
                        Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se
                        toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido toma la calle
                        "Los Ceibos" a la izquierda y dobla en la proxima calle "Tanti" a la
                        derecha y a 50mtrs ya encuentra la entrada trasera del complejo.
                    </h4>
                    <div className="my-2 flex flex-row justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.2773267131151!2d-65.00391871550505!3d-31.740217264151354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a2e3be031%3A0x4412eb98c3c0c23c!2sTanti%202085%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773324731315!5m2!1sen!2sar"
                            width="350"
                            height="250"
                            className="rounded-2xl md:h-65 md:w-[95%] lg:h-70 lg:w-105"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de la región"
                        />
                    </div>
                </div>
            </div>

            {/* Botón flotante */}
            <div className="fixed bottom-3 right-7.5 z-50 flex flex-row items-center gap-3">
                <div
                    className={`chat-bubble relative bg-[#F5F7F9] p-3 rounded-lg max-w-50 ${bubbleTransitionClass}`}
                    style={{ transformOrigin: "right center" }}
                >
                    <h3 className="text-defect text-[.8rem]">¿Consultas y reservas?</h3>
                    <h3 className="text-defect text-[.8rem] font-bold">¡Hablemos!</h3>

                    <span
                        className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0
                                border-t-8 border-t-transparent
                                border-b-8 border-b-transparent
                                border-l-[9px] border-l-[#F5F7F9]"
                        aria-hidden="true"
                    />
                </div>

                <div
                    ref={buttonRef}
                    className={`whatsapp-btn ${!hasInteracted ? "whatsapp-pulse" : ""} bg-[#2DB742] h-13 w-13 z-70 flex items-center justify-center rounded-full relative cursor-pointer shrink-0`}
                    onClick={handleClickWhatsapp}
                    role="button"
                    aria-expanded={openMenuWhatsapp}
                    aria-label="Abrir opciones de WhatsApp"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleClickWhatsapp();
                        }
                    }}
                >
                    <img
                        src={WhatsAppIcon}
                        alt=""
                        className={`w-8 h-8 invert transition-all duration-300 absolute ${
                            openMenuWhatsapp ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                        }`}
                    />
                    <img
                        src={crossIcon}
                        alt=""
                        className={`w-8 h-8 invert transition-all duration-300 absolute ${
                            openMenuWhatsapp ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                        }`}
                    />
                </div>
            </div>

            {/* Menú WhatsApp */}
            <div
                ref={menuRef}
                className={`wa-menu bg-white z-60 right-7.5 w-[85%] md:w-90 fixed bottom-20 ${menuTransitionClass}`}
            >
                <div className="wa-menu-header p-4 flex flex-row items-center gap-3">
                    <div className="wa-avatar h-11 w-11 rounded-full flex items-center justify-center shrink-0">
                        <img src={WhatsAppIcon} alt="" className="w-6 h-6 invert" />
                    </div>
                    <div className="flex flex-col text-white">
                        <h3 className="font-bold text-[1.05rem] leading-tight">¡Hablemos!</h3>
                        <p className="text-[.75rem] text-white/80 leading-tight">
                            Normalmente respondemos rápido
                        </p>
                    </div>
                </div>

                <div className="py-2">
                    {WHATSAPP_OPTIONS.map((opt) => (
                        <a
                            key={opt.title}
                            href={opt.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`wa-option wa-option--${opt.variant} flex flex-row items-center gap-3 px-5 py-3.5 cursor-pointer ${
                                openMenuWhatsapp ? "fade-down" : ""
                            }`}
                            style={{ animationDelay: opt.delay }}
                        >
                            <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-defect text-[.95rem] font-bold text-[#2A4530] leading-tight truncate">
                                    {opt.title}
                                </h3>
                                <p className="text-[.78rem] text-[#3E6143]/60 leading-tight truncate">
                                    {opt.subtitle}
                                </p>
                            </div>

                            <svg
                                className="wa-chevron w-4 h-4 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MapPage;
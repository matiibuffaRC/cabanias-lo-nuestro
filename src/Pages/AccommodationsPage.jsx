import { useParams } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import { accommodation } from "../data/accommodation";
import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";

import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";

const WHATSAPP_OPTIONS = [
    {
        href: "https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20los%20precios%20de%20las%20caba%C3%B1as",
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

function AccommodationsPage() {
    const { tipo } = useParams();

    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [servicesVisible, setServicesVisible] = useState(false);

    const servicesRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const data = accommodation.find((item) => item.slug === tipo);

    // Reinicia animación cuando cambia el alojamiento
    useEffect(() => {
        setServicesVisible(false);
    }, [tipo]);

    // Observer para detectar cuando la sección entra en pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setServicesVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (servicesRef.current) {
            observer.observe(servicesRef.current);
        }

        return () => observer.disconnect();
    }, [tipo]);

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

    if (!data) {
        return <h1>Alojamiento no encontrado</h1>;
    }

    const printAccommodationsServices = () => {
        return data.services.map((service, index) => {
            return (
                <div
                    key={index}
                    className={`flex flex-row justify-start md:flex-col md:justify-center items-center gap-4 md:gap-2 p-4 md:py-2 md:px-0 ${
                        servicesVisible ? "fade-down" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <img src={service.img} alt="" className="h-10 w-10" />
                    <h3 className="text-[1.1rem] md:text-[.8rem] text-defect">{service.title}</h3>
                </div>
            );
        });
    };

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <CaruselImagesComponente images={data.photos} />

            <div className="text-center p-5 flex flex-col items-center w-full">
                <h1 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143]">
                    {data.title}
                </h1>

                <div className="md:w-140">
                    <p className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="text-center p-5 flex flex-col items-center w-full">
                <h2 className="titles-and-subtitles text-[1.8rem] font-bold text-[#3E6143]">
                    Servicios ofrecidos
                </h2>

                <div className="md:w-140">
                    <h3 className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                        {data.informationText}
                    </h3>
                </div>

                <div
                    ref={servicesRef}
                    className="my-5 flex flex-col md:grid md:grid-cols-3 md:justify-center lg:w-2xl"
                >
                    {printAccommodationsServices()}
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

export default AccommodationsPage;
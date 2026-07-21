import { useState, useRef, useEffect, useCallback } from "react";
import presentationImage from "../imgs/piletaConDormis.jpg";

import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";
import FacebookIcon from "../icons/facebookIcon.svg";
import GmailIcon from "../icons/gmail.svg";

// Se movieron fuera del componente: son estáticos y no dependen de
// props ni de estado, así que no tiene sentido recrearlos en cada render.
const CONTACTS = [
    { icon: WhatsAppIcon, title: "WhatsApp", name: "Cristian", href: "https://wa.me/5493564507240" },
    { icon: FacebookIcon, title: "Facebook", name: "Lo Nuestro", href: "#" },
    { icon: GmailIcon, title: "Gmail", name: "Lo Nuestro", href: "#" },
];

const WHATSAPP_OPTIONS = [
    {
        href: "https://wa.me/5493564507240?text=a%20quisiera%20consultar%20los%20precios%20de%20las%20caba%C3%B1as",
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

function ContactPage() {
    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickWhatsapp = useCallback(() => {
        setHasInteracted(true);
        setOpenMenuWhatsapp((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => setOpenMenuWhatsapp(false), []);

    // Mejora de UX: cerrar el menú al hacer click afuera o al presionar Escape.
    // Antes solo se podía cerrar volviendo a tocar el botón flotante.
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
        <div className="pt-16.25 bg-[#F1F3EE]">
            <div className="h-135 relative w-full overflow-hidden">
                <img
                    src={presentationImage}
                    alt="Patio de atrás"
                    className="hero-image w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A4530]/25 via-transparent to-transparent" />
            </div>

            <div className="text-center py-10 px-5">
                <h2 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143] fade-down">
                    Contactanos
                </h2>
                <p
                    className="text-[#3E6143]/70 max-w-md mx-auto mt-2 fade-down"
                    style={{ animationDelay: "0.1s" }}
                >
                    Escribinos por el medio que prefieras, te respondemos a la brevedad.
                </p>

                <div className="flex flex-col md:flex-row justify-center md:gap-8 gap-6 my-5 md:my-10">
                    {CONTACTS.map((contact, index) => (
                        <div
                            key={contact.title}
                            className="flex flex-row justify-center fade-down"
                            style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                        >
                            <a
                                href={contact.href}
                                target={contact.href.startsWith("http") ? "_blank" : undefined}
                                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={`${contact.title} - ${contact.name}`}
                                className="contact-card flex flex-col items-center"
                            >
                                <img
                                    src={contact.icon}
                                    alt=""
                                    className="contact-card-icon w-8 h-8"
                                />
                                <h3 className="titles-and-subtitles font-bold text-[1.1rem] pt-2 text-[#3E6143]">
                                    {contact.title}
                                </h3>
                                <h3 className="titles-and-subtitles text-[#3E6143]/70">
                                    {contact.name}
                                </h3>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón flotante */}
            <div className="fixed bottom-3 right-7.5 flex flex-row gap-2 z-50 items-end">
                <div className={`chat-bubble bg-[#F5F7F9] p-3 rounded-lg ${bubbleTransitionClass}`}>
                    <h3 className="text-defect text-[.8rem]">¿Consultas y reservas?</h3>
                    <h3 className="text-defect text-[.8rem] font-bold text-[#3E6143]">¡Hablemos!</h3>
                </div>

                <div
                    ref={buttonRef}
                    className={`whatsapp-btn ${!hasInteracted ? "whatsapp-pulse" : ""} bg-[#2DB742] h-13 w-13 z-70 flex items-center justify-center rounded-full relative cursor-pointer`}
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
                    <div className="wa-avatar h-11 w-11 rounded-full flex items-center justify-center flex-shrink-0">
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
                                className="wa-chevron w-4 h-4 flex-shrink-0"
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

export default ContactPage;
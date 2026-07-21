import { useState } from "react";
import presentationImage from "../imgs/piletaConDormis.jpg";

import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";
import FacebookIcon from "../icons/facebookIcon.svg";
import GmailIcon from "../icons/gmail.svg";

function ContactPage() {
    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleClickWhatsapp = () => {
        setHasInteracted(true);
        setOpenMenuWhatsapp((prev) => !prev);
    };

    const contacts = [
        { icon: WhatsAppIcon, title: "WhatsApp", name: "Cristian", href: "https://wa.me/5493564507240" },
        { icon: FacebookIcon, title: "Facebook", name: "Lo Nuestro", href: "#" },
        { icon: GmailIcon, title: "Gmail", name: "Lo Nuestro", href: "#" },
    ];

    const whatsappOptions = [
        {
            href: "https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20los%20precios%20de%20las%20caba%C3%B1as",
            title: "Consultar precios",
            subtitle: "Tarifas y promociones",
            iconVariant: "accent",
            delay: "0.15s",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                    <circle cx="7.5" cy="7.5" r="1.5" />
                </svg>
            ),
        },
        {
            href: "https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20la%20disponibilidad",
            title: "Consultar disponibilidad",
            subtitle: "Fechas libres para tu estadía",
            iconVariant: "primary",
            delay: "0.3s",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                </svg>
            ),
        },
    ];

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
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
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
                <div
                    className={`chat-bubble bg-[#F5F7F9] p-3 rounded-lg ${
                        !hasInteracted ? "" : openMenuWhatsapp ? "fadeOutDown" : "fade-top-menu"
                    }`}
                >
                    <h3 className="text-defect text-[.8rem]">¿Consultas y reservas?</h3>
                    <h3 className="text-defect text-[.8rem] font-bold text-[#3E6143]">¡Hablemos!</h3>
                </div>

                <div
                    className={`whatsapp-btn ${!hasInteracted ? "whatsapp-pulse" : ""} bg-[#2DB742] h-13 w-13 z-70 flex items-center justify-center rounded-full relative cursor-pointer`}
                    onClick={handleClickWhatsapp}
                    role="button"
                    aria-expanded={openMenuWhatsapp}
                    aria-label="Abrir opciones de WhatsApp"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClickWhatsapp(); }}
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
                className={`wa-menu bg-white z-60 right-7.5 w-[85%] md:w-90 fixed bottom-20 ${
                    !hasInteracted
                        ? "hidden"
                        : openMenuWhatsapp
                        ? "fade-top-menu pointer-events-auto"
                        : "fadeOutDown pointer-events-none"
                }`}
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
                    {whatsappOptions.map((opt, i) => (
                        <a
                            key={i}
                            href={opt.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`wa-option flex flex-row items-center gap-3 px-4 py-3 cursor-pointer ${
                                openMenuWhatsapp ? "fade-down" : ""
                            }`}
                            style={{ animationDelay: opt.delay }}
                        >
                            <div className={`wa-option-icon wa-option-icon--${opt.iconVariant} h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                                {opt.icon}
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-defect text-[.95rem] font-bold text-[#2A4530] leading-tight truncate">
                                    {opt.title}
                                </h3>
                                <p className="text-[.75rem] text-[#3E6143]/60 leading-tight truncate">
                                    {opt.subtitle}
                                </p>
                            </div>

                            <svg className="wa-chevron w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#3E6143" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
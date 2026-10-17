import { useState, useRef, useEffect, useCallback } from "react";
import WhatsAppIcon from "../icons/whatsappIcon.svg";
import crossIcon from "../icons/crossIcon.svg";

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

const BUBBLE_STORAGE_KEY = "wa-bubble-dismissed";
// Tiempo (ms) que espera la burbuja antes de aparecer tras entrar a la página.
const BUBBLE_DELAY_MS = 4000;

// sessionStorage puede fallar (modo privado, datos bloqueados): siempre con try/catch.
const readDismissed = () => {
    try {
        return sessionStorage.getItem(BUBBLE_STORAGE_KEY) === "1";
    } catch {
        return false;
    }
};

function WhatsAppFloatingButton({ bubbleLine1 = "¿Consultas y reservas?", bubbleLine2 = "¡Hablemos!" }) {
    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [bubbleDismissed, setBubbleDismissed] = useState(readDismissed);
    const [bubbleReady, setBubbleReady] = useState(false);

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleClickWhatsapp = useCallback(() => {
        setHasInteracted(true);
        setOpenMenuWhatsapp((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => setOpenMenuWhatsapp(false), []);

    const dismissBubble = useCallback(() => {
        setBubbleDismissed(true);
        try {
            sessionStorage.setItem(BUBBLE_STORAGE_KEY, "1");
        } catch {
            /* sin persistencia: se oculta solo en esta página */
        }
    }, []);

    // La burbuja aparece unos segundos después de entrar (si no fue descartada).
    useEffect(() => {
        if (bubbleDismissed) return;
        const timer = setTimeout(() => setBubbleReady(true), BUBBLE_DELAY_MS);
        return () => clearTimeout(timer);
    }, [bubbleDismissed]);

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
        ? "fade-top-menu"
        : openMenuWhatsapp
        ? "fadeOutDown"
        : "fade-top-menu";

    return (
        <div className="fixed bottom-4 right-5.5 flex flex-row gap-3 z-50 items-end">
            {/* Burbuja de invitación (se puede cerrar) */}
            {bubbleReady && !bubbleDismissed && (
                <div
                    className={`chat-bubble group relative bg-white border border-[#3E6143]/10 shadow-lg pl-4 pr-3 py-2.5 rounded-2xl rounded-br-sm mb-1 ${bubbleTransitionClass}`}
                >
                    <div className="pr-1">
                        <h3 className="text-defect text-[.8rem] text-[#555] leading-tight">{bubbleLine1}</h3>
                        <h3 className="text-defect text-[.85rem] font-bold text-[#3E6143] leading-tight mt-0.5">
                            {bubbleLine2}
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={dismissBubble}
                        aria-label="Cerrar mensaje"
                        className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-white border border-[#3E6143]/20 shadow-sm flex items-center justify-center text-[#3E6143]/70 hover:text-white hover:bg-[#3E6143] transition-colors cursor-pointer"
                    >
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Botón flotante */}
            <button
                type="button"
                ref={buttonRef}
                onClick={handleClickWhatsapp}
                aria-expanded={openMenuWhatsapp}
                aria-label={openMenuWhatsapp ? "Cerrar opciones de WhatsApp" : "Abrir opciones de WhatsApp"}
                className={`whatsapp-btn ${!hasInteracted ? "whatsapp-pulse" : ""} bg-[#2DB742] h-13 w-13 z-70 flex items-center justify-center rounded-full relative cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200`}
            >
                <img src={WhatsAppIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 absolute ${openMenuWhatsapp ? "rotate-180 opacity-0" : "rotate-0 opacity-100"}`} />
                <img src={crossIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 absolute ${openMenuWhatsapp ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`} />
            </button>

            {/* Menú de opciones */}
            <div
                ref={menuRef}
                aria-hidden={!openMenuWhatsapp}
                className={`wa-menu bg-white z-60 right-7.5 w-[85%] md:w-90 fixed bottom-20 overflow-hidden rounded-2xl shadow-2xl ${menuTransitionClass}`}
            >
                <div className="wa-menu-header p-4 flex flex-row items-center gap-3">
                    <div className="wa-avatar h-11 w-11 rounded-full flex items-center justify-center shrink-0">
                        <img src={WhatsAppIcon} alt="" className="w-6 h-6 invert" />
                    </div>
                    <div className="flex flex-col text-white flex-1 min-w-0">
                        <h3 className="font-bold text-[1.05rem] leading-tight">¡Hablemos!</h3>
                        <p className="text-[.75rem] text-white/80 leading-tight">
                            Normalmente respondemos rápido
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Cerrar menú"
                        className="relative z-10 pointer-events-auto h-9 w-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <div className="py-2">
                    {WHATSAPP_OPTIONS.map((opt) => (
                        <a
                            key={opt.title}
                            href={opt.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={openMenuWhatsapp ? 0 : -1}
                            className={`wa-option wa-option--${opt.variant} flex flex-row items-center gap-3 px-5 py-3.5 cursor-pointer ${openMenuWhatsapp ? "fade-down" : ""}`}
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

                            <svg className="wa-chevron w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhatsAppFloatingButton;
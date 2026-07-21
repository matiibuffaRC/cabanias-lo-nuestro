import ServiceItemComponent from "../ServiceItem/ServiceItemComponent";
import "../Animations/animations.css";

import presentationImage from "../../imgs/piletaConDormis.jpg";
import frenteImage from "../../imgs/frente2.jpg";
import patioImage from "../../imgs/patioBien.jpg";
import patioImage2 from "../../imgs/patio3.jpg";

import homeIcon from "../../icons/HomeIcon.svg";
import carIcon from "../../icons/CarIcon.svg";
import wifiIcon from "../../icons/WifiIcon.svg";
import tvIcon from "../../icons/TvIcon.svg";
import grillIcon from "../../icons/GrillIcon.svg";
import airIcon from "../../icons/AirIcon.svg";
import WhatsAppIcon from "../../icons/whatsappIcon.svg";
import crossIcon from "../../icons/crossIcon.svg";

import LogoMinaClavero from "../../icons/MinaClaveroLogo.png";

import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";

// Se movieron fuera del componente: son estáticos y no dependen de
// props ni de estado, así que no tiene sentido recrearlos en cada render.
const SERVICES = [
    { img: homeIcon, title: "+5", description: "cabañas y dormis" },
    { img: carIcon, title: "Estacionamiento", description: "individual" },
    { img: wifiIcon, title: "Conexión", description: "wifi" },
    { img: tvIcon, title: "Diversión", description: "para comodidad" },
    { img: grillIcon, title: "Parrillas", description: "individuales" },
    { img: airIcon, title: "Confort", description: "acondicionamiento" },
];

const SECTIONS = [
    {
        img: patioImage,
        title: "Complejo Lo Nuestro",
        description:
            "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables",
        route: "complejo",
    },
    {
        img: frenteImage,
        title: "Cabañas",
        description:
            "Disponemos de 2 cabañas y 3 dormis para brindar una cómoda estadía en el complejo de cabañas. Cada unidad fue diseñada y pensada para ofrecer alojamiento a grupos de 4 personas.",
        route: "cabins",
    },
    {
        img: patioImage2,
        title: "Dormis",
        description:
            "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables.",
        route: "dormis",
    },
];

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

function InicieComponent() {
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

    const printServices = () => {
        return SERVICES.map((service, index) => (
            <ServiceItemComponent key={service.title} service={service} index={index} />
        ));
    };

    const printSections = () => {
        return SECTIONS.map((section, index) => {
            const isLeft = index % 2 === 0;
            return (
                <div
                    key={index}
                    className="h-135 lg:h-150 relative w-full fade-down"
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <img src={section.img} alt="" className="w-full h-full object-cover object-center" />

                    <div
                        className={`absolute w-[90%] top-10 lg:w-150 bg-[#3E6143]/50 p-5 text-white rounded-3xl md:max-w-1/2 ${
                            isLeft
                                ? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0"
                                : "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0"
                        }`}
                    >
                        <h2 className="titles-and-subtitles text-[1.8rem] lg:text-[2rem] font-bold py-2">
                            {section.title}
                        </h2>
                        <h3 className="titles-and-subtitles text-[1rem] md:text-[.9rem] lg:text-[1.2rem]">
                            {section.description}
                        </h3>
                        <div className="my-5">
                            <Link
                                to={`/alojamiento/${section.route}`}
                                className="titles-and-subtitles font-bold bg-[#446b4a] border border-[#3E6143] py-2 px-3 rounded-xl"
                            >
                                Saber más
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="pt-16 bg-[#F1F3EE] flex flex-col items-center relative">
            <div className="h-120 relative w-full">
                <img
                    src={presentationImage}
                    alt="Patio de atras"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="my-10 p-4 max-w-150 fade-down">
                <h2 className="titles-and-subtitles font-bold text-center text-[1.9rem] text-[#3E6143] py-4">
                    Lo Nuestro, complejo de alojamiento en traslasierras
                </h2>

                <h3 className="titles-and-subtitles text-center text-[1.1rem] text-[#757575] px-10">
                    Somos un complejo vacacional único ubicado a la entrada de Mina Clavero desde el Valle de Traslasierras.
                </h3>
            </div>

            {/* Servicios que ofrecemos */}

            <div className="mb-10 grid grid-cols-2 md:grid-cols-6 md:mx-10 gap-5 p-2">
                {printServices()}
            </div>

            <div className="w-full flex flex-col gap-2 mt-10">
                {printSections()}
            </div>
            <div>
                <img src={LogoMinaClavero} alt="Mina Clavero ciudad" className="w-60 h-60 md:w-100 md:h-100" />
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

export default InicieComponent;
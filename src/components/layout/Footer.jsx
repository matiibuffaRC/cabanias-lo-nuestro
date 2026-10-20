import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import GmailIcon from "../../assets/icons/gmail.svg";
import WhatsAppIcon from "../../assets/icons/whatsappIcon.svg";
import FacebookIcon from "../../assets/icons/facebookIcon.svg";

// Datos fuera del componente: son estáticos, no dependen de props ni estado.
const FOOTER_COLUMNS = [
    {
        title: "Lo nuestro",
        links: [
            { label: "Complejo", to: "/alojamiento/complejo" },
            { label: "Cabañas", to: "/alojamiento/cabins" },
            { label: "Dormis", to: "/alojamiento/dormis" },
        ],
    },
    {
        title: "Sobre nosotros",
        links: [
            { label: "Inicio", to: "/" },
            { label: "Cómo llegar", to: "/comoLlegar" },
            { label: "Contacto", to: "/contact" },
        ],
    },
];

const SOCIALS = [
    {
        icon: GmailIcon,
        title: "Gmail",
        href: "#",
    },
    {
        icon: WhatsAppIcon,
        title: "WhatsApp",
        href: "https://wa.me/5493564507240",
    },
    {
        icon: FacebookIcon,
        title: "Facebook",
        href: "#",
    },
];

function FooterComponent() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <footer className="bg-linear-to-b from-[#3E6143] to-[#2f4c34] text-[#F1F3EE]" ref={ref}>
            {/* Línea decorativa superior */}
            <div className="h-1 w-full bg-linear-to-r from-transparent via-[#F1F3EE]/40 to-transparent" />

            <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
                {/* Marca */}
                <div className="text-center mb-8">
                    <h2 className="titles font-bold text-[2rem] md:text-[2.4rem] leading-tight">
                        Lo Nuestro
                    </h2>
                    <span className="block w-14 h-0.75 bg-[#F1F3EE]/40 rounded-full mx-auto mt-3" />
                    <p className="text-defect text-[.9rem] text-[#F1F3EE]/75 mt-3">
                        Cabañas y dormis en Mina Clavero, Córdoba
                    </p>
                </div>

                {/* Enlaces */}
                <nav
                    aria-label="Enlaces del sitio"
                    className="grid grid-cols-2 md:gap-24 gap-6 md:max-w-xl mx-auto py-8 border-y border-[#F1F3EE]/20"
                >
                    {FOOTER_COLUMNS.map((column, index) => (
                        <div
                            key={column.title}
                            className={`text-center ${
                                isVisible
                                    ? index === 0
                                        ? "fade-side-to-right"
                                        : "fade-side-to-left"
                                    : "opacity-0"
                            }`}
                        >
                            <h3 className="titles font-bold text-[1rem] md:text-[1.2rem] uppercase tracking-[0.12em] mb-3">
                                {column.title}
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-defect text-[.9rem] md:text-[1rem] text-[#F1F3EE]/80 hover:text-white hover:underline underline-offset-4 decoration-[#F1F3EE]/50 transition-colors cursor-pointer"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Redes */}
                <div className="flex flex-col items-center pt-8">
                    <h3 className="titles font-bold text-[1.2rem]">
                        ¡Sigamos conectados!
                    </h3>

                    <div
                        className={`flex flex-row justify-center gap-4 mt-4 ${
                            isVisible ? "fade-top" : "opacity-0"
                        }`}
                    >
                        {SOCIALS.map((social) => (
                            <a
                                key={social.title}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={social.title}
                                title={social.title}
                                className="footer-social-icon w-12 h-12 rounded-full flex items-center justify-center bg-[#F1F3EE]/10 border border-[#F1F3EE]/20 hover:bg-[#F1F3EE]/25 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                            >
                                <img src={social.icon} alt="" className="w-5 h-5 invert" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t border-[#F1F3EE]/15 bg-black/10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-1 text-center">
                    <p className="text-[.75rem] text-[#F1F3EE]/60">
                        © {new Date().getFullYear()} Lo Nuestro. Todos los derechos reservados.
                    </p>
                    <p className="text-[.75rem] text-[#F1F3EE]/70">
                        Sitio diseñado y desarrollado por{" "}
                        <span className="font-semibold text-[#F1F3EE]/90">Matías Buffa</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
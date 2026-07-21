import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import GmailIcon from "../../icons/gmail.svg";
import WhatsAppIcon from "../../icons/whatsappIcon.svg";
import FacebookIcon from "../../icons/facebookIcon.svg";

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
        <footer className="bg-[#3E6143]" ref={ref}>
            <h2 className="titles-and-subtitles font-bold text-[2rem] text-[#F1F3EE] text-center pt-5">
                Lo Nuestro
            </h2>

            <nav
                aria-label="Enlaces del sitio"
                className="flex flex-row justify-around md:justify-center md:gap-24 items-start border-b border-t m-5 border-[#F1F3EE]/30 py-6"
            >
                {FOOTER_COLUMNS.map((column, index) => (
                    <div
                        key={column.title}
                        className={`text-[#F1F3EE] text-center ${
                            isVisible
                                ? index === 0
                                    ? "fade-side-to-right"
                                    : "fade-side-to-left"
                                : "opacity-0"
                        }`}
                    >
                        <h3 className="titles-and-subtitles font-bold text-[1.1rem] md:text-[1.4rem]">
                            {column.title}
                        </h3>
                        <ul className="flex flex-col gap-1 mt-2">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-defect text-[.9rem] md:text-[1rem] text-[#F1F3EE]/85 hover:text-[#F1F3EE] transition-colors cursor-pointer"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="titles-and-subtitles pb-5 font-bold text-center text-[1.2rem] text-[#F1F3EE] flex flex-col items-center justify-center">
                <h3>Sigamos conectados!</h3>

                <div
                    className={`flex flex-row justify-center gap-4 m-3 ${
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
                            className="footer-social-icon w-11 h-11 rounded-full flex items-center justify-center bg-[#F1F3EE]/10 hover:bg-[#F1F3EE]/20 transition-colors"
                        >
                            <img src={social.icon} alt="" className="w-5 h-5 invert" />
                        </a>
                    ))}
                </div>

                <h4 className="text-[.8rem] pt-1 font-normal text-[#F1F3EE]/80">
                    Sitio diseñado y desarrollado por Matías Buffa
                </h4>
                <h4 className="text-[.7rem] pb-1 font-normal text-[#F1F3EE]/60">
                    © {new Date().getFullYear()} Lo Nuestro
                </h4>
            </div>
        </footer>
    );
}

export default FooterComponent;
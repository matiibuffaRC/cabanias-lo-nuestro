import { Link } from "react-router-dom";

import WhatsAppIcon from "../../assets/icons/whatsappIcon.svg";
import FacebookIcon from "../../assets/icons/facebookIcon.svg";
import MaskIcon from "../shared/MaskIcon";
import useInView from "../../hooks/useInView";
import { FACEBOOK_URL, getWhatsAppUrl } from "../../config/contact";

// Datos fuera del componente: son estáticos, no dependen de props ni estado.
const FOOTER_COLUMNS = [
    {
        title: "Alojamientos",
        links: [
            { label: "Complejo", to: "/alojamiento/complejo" },
            { label: "Cabañas", to: "/alojamiento/cabins" },
            { label: "Dormis", to: "/alojamiento/dormis" },
        ],
    },
    {
        title: "Lo Nuestro",
        links: [
            { label: "Inicio", to: "/" },
            { label: "Cómo llegar", to: "/comoLlegar" },
            { label: "Contacto", to: "/contact" },
        ],
    },
];

const SOCIALS = [
    { icon: WhatsAppIcon, title: "WhatsApp", href: getWhatsAppUrl() },
    { icon: FacebookIcon, title: "Facebook", href: FACEBOOK_URL },
];

function FooterComponent() {
    const [ref, isVisible] = useInView({ threshold: 0.2, rootMargin: "0px" });

    return (
        <footer className="focus-light bg-linear-to-b from-primary to-[#2f4c34] text-surface" ref={ref}>
            <div aria-hidden="true" className="h-1 w-full bg-linear-to-r from-transparent via-surface/40 to-transparent" />

            <div className="mx-auto max-w-5xl px-6 pb-6 pt-12">
                {/* Marca */}
                <div className="mb-8 text-center">
                    <p className="titles text-[2rem] font-bold leading-tight md:text-[2.4rem]">Lo Nuestro</p>
                    <span aria-hidden="true" className="mx-auto mt-3 block h-0.75 w-14 rounded-full bg-surface/40" />
                    <p className="mt-3 text-[.95rem] text-surface/85">Cabañas y dormis en Mina Clavero, Córdoba</p>
                    <address className="mt-1 text-[.9rem] not-italic text-surface/75">
                        Cruz del Eje 2080 y Tanti 2085, Mina Clavero
                    </address>
                </div>

                {/* Enlaces */}
                <nav
                    aria-label="Enlaces del sitio"
                    className="mx-auto grid grid-cols-2 gap-6 border-y border-surface/20 py-8 md:max-w-xl md:gap-24"
                >
                    {FOOTER_COLUMNS.map((column, index) => (
                        <div
                            key={column.title}
                            className={`text-center ${
                                isVisible ? (index === 0 ? "fade-side-to-right" : "fade-side-to-left") : "opacity-0"
                            }`}
                        >
                            <h2 className="titles mb-3 text-[1.05rem] font-bold md:text-[1.2rem]">{column.title}</h2>
                            <ul className="flex flex-col gap-2">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-[.95rem] text-surface/85 decoration-surface/50 underline-offset-4 transition-colors hover:text-white hover:underline md:text-[1rem]"
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
                    <h2 className="titles text-[1.2rem] font-bold">¡Sigamos conectados!</h2>
                    <div className={`mt-4 flex flex-row justify-center gap-4 ${isVisible ? "fade-top" : "opacity-0"}`}>
                        {SOCIALS.map((social) => (
                            <a
                                key={social.title}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${social.title} (se abre en una pestaña nueva)`}
                                title={social.title}
                                className="flex size-12 items-center justify-center rounded-full border border-surface/20 bg-surface/10 text-white transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-surface/25 hover:shadow-lg"
                            >
                                <MaskIcon src={social.icon} className="size-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="border-t border-surface/15 bg-black/10">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-1 px-6 py-4 text-center md:flex-row">
                    <p className="text-[.8rem] text-surface/75">
                        © {new Date().getFullYear()} Lo Nuestro. Todos los derechos reservados.
                    </p>
                    <p className="text-[.8rem] text-surface/75">
                        Sitio diseñado y desarrollado por <span className="font-semibold text-surface/95">Matías Buffa</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;

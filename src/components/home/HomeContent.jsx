import { Link } from "react-router-dom";
import ServiceItem from "./ServiceItem";
import AccommodationCard from "./AccommodationCard";
import WhatsAppFloatingButton from "../layout/WhatsAppButton";

import presentationImage from "../../assets/images/piletaConDormis.jpg";
import frenteImage from "../../assets/images/frente21.jpg";
import patioImage from "../../assets/images/patioBien.jpg";
import patioImage2 from "../../assets/images/patio3.jpeg";

import homeIcon from "../../assets/icons/HomeIcon.svg";
import carIcon from "../../assets/icons/CarIcon.svg";
import wifiIcon from "../../assets/icons/WifiIcon.svg";
import tvIcon from "../../assets/icons/TvIcon.svg";
import grillIcon from "../../assets/icons/GrillIcon.svg";
import airIcon from "../../assets/icons/AirIcon.svg";

import LogoMinaClavero from "../../assets/icons/MinaClaveroLogo.png";


const SERVICES = [
    { id: "alojamiento", img: homeIcon, title: "+5", description: "cabañas y dormis" },
    { id: "estacionamiento", img: carIcon, title: "Estacionamiento", description: "individual" },
    { id: "wifi", img: wifiIcon, title: "Wifi", description: "en todo el complejo" },
    { id: "tv", img: tvIcon, title: "TV", description: "para tu comodidad" },
    { id: "parrillas", img: grillIcon, title: "Parrillas", description: "individuales" },
    { id: "aire", img: airIcon, title: "Acondicionado", description: "para tu confort" },
];

const SECTIONS = [
    {
        img: patioImage,
        alt: "Patio del complejo Lo Nuestro con parquizado y zona de descanso",
        title: "Complejo Lo Nuestro",
        description:
            "El lugar ideal en la entrada de Mina Clavero para recorrer los atractivos de la zona y disfrutar de unas vacaciones inolvidables.",
        route: "complejo",
    },
    {
        img: frenteImage,
        alt: "Frente de las cabañas de Lo Nuestro",
        title: "Cabañas",
        description:
            "Espacios diseñados para ofrecer una estadía cómoda y relajante. Ideales para alojar grupos o familias de hasta 4 personas.",
        route: "cabins",
    },
    {
        img: patioImage2,
        alt: "Patio frente a los dormis de Lo Nuestro",
        title: "Dormis",
        description:
            "El espacio ideal para un descanso cómodo y práctico. Cuenta con baño privado, capacidad para 4 personas y equipamiento para desayunos.",
        route: "dormis",
    },
];

function HomeContent() {
    return (
        <div className="bg-surface flex flex-col items-center relative bg-[#F1F3EE]">
            {/* Hero: queda fijo y el resto del contenido lo tapa al scrollear */}
            <div className="sticky top-0 z-0 h-110 w-full overflow-hidden">
                <img src={presentationImage} alt="Patio de atras" className="hero-image w-full h-full object-cover object-center" />

                {/* Velo general: baja el brillo de la foto para que el texto blanco destaque */}
                <div className="absolute inset-0 bg-[#1F3524]/25" />
                {/* Degradé inferior más profundo, donde vive el texto */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1F3524]/70 via-[#1F3524]/20 via-45% to-transparent" />

                <div className="absolute inset-x-0 bottom-14 flex flex-col items-center px-5 text-center fade-down md:bottom-16">
                    <p className="titles text-[.8rem] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] md:text-[.95rem]">
                        Mina Clavero · Traslasierra
                    </p>
                    <h1 className="titles mt-2 text-[1.8rem] font-bold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] md:text-[2.6rem]">
                        Tu descanso empieza acá
                    </h1>
                    <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] md:text-base">
                        Cabañas, dormis y momentos para disfrutar Traslasierra.
                    </p>
                    <Link
                        to="/alojamiento/complejo"
                        className="titles mt-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white px-6 py-3 text-sm font-bold text-[#3E6143] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F1F3EE] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#3E6143]"
                    >
                        Conocé nuestros alojamientos
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Todo lo que sigue se desliza por encima del hero */}
            <div className="relative z-10 -mt-8 flex w-full flex-col items-center rounded-t-4xl bg-[#F1F3EE]">

            {/* Presentación */}
            <div className="max-w-3xl px-5 py-14 text-center fade-down md:py-16">
                <p className="mb-2 text-[.75rem] font-semibold uppercase tracking-[0.2em] text-[#3E6143]/65">
                    Tu lugar en Traslasierra
                </p>
                <h2 className="titles py-2 text-[1.8rem] font-bold text-[#3E6143] md:text-[2.1rem]">
                    Lo Nuestro, complejo de alojamiento en Traslasierra
                </h2>
                <span className="mx-auto mb-4 block h-0.75 w-14 rounded-full bg-[#3E6143]/40" />
                <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[#757575] md:text-lg">
                    Somos un complejo vacacional único ubicado a la entrada de Mina Clavero desde el Valle de Traslasierra.
                </p>
            </div>

            {/* Servicios */}
            <div className="w-full bg-[#F7F8F5] py-10 flex flex-col justify-center items-center">
                <h2 className="titles text-center font-bold text-[1.6rem] text-primary mb-6 fade-down text-[#3E6143]">
                    Lo que ofrecemos
                </h2>
                <div className="grid w-full max-w-6xl grid-cols-2 gap-3 px-5 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
                    {SERVICES.map((service, index) => (
                        <ServiceItem key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Secciones */}
            <div className="w-full flex flex-col gap-2 mt-10">
                {SECTIONS.map((section, index) => (
                    <AccommodationCard key={section.route} section={section} index={index} />
                ))}
            </div>

            {/* Cierre con logo */}
            <div className="w-full flex flex-col items-center py-14 px-5 text-center">
                <h2 className="titles font-bold text-3xl lg:text-4xl text-primary mb-2 fade-down text-[#3E6143]">
                    En el corazón de Mina Clavero
                </h2>
                <p className="text-muted text-lg max-w-md mb-6 fade-down font-semibold text-[#3E6143]" style={{ animationDelay: "0.1s" }}>
                    A minutos de los principales atractivos del Valle de Traslasierra.
                </p>
                <img
                    src={LogoMinaClavero}
                    alt="Logo de Mina Clavero"
                    loading="lazy"
                    decoding="async"
                    className="w-60 h-60 md:w-80 md:h-80 fade-down"
                    style={{ animationDelay: "0.2s" }}
                />
            </div>

            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default HomeContent;
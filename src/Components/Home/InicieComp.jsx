import ServiceItemComponent from "./ServiceItemComp";
import SectionCard from "./SectionCard";
import WhatsAppFloatingButton from "../WppButton";
import "../animations.css";

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

import LogoMinaClavero from "../../icons/MinaClaveroLogo.png";


const SERVICES = [
    { id: "alojamiento", img: homeIcon, title: "+5", description: "cabañas y dormis" },
    { id: "estacionamiento", img: carIcon, title: "Estacionamiento", description: "individual" },
    { id: "wifi", img: wifiIcon, title: "Wifi", description: "en todo el complejo" },
    { id: "tv", img: tvIcon, title: "TV", description: "para tu comodidad" },
    { id: "parrillas", img: grillIcon, title: "Parrillas", description: "individuales" },
    { id: "aire", img: airIcon, title: "Aire acondicionado", description: "para tu confort" },
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

function InicieComponent() {
    return (
        <div className="bg-surface flex flex-col items-center relative bg-[#F1F3EE]">
            {/* Hero */}
            <div className="h-110 relative w-full overflow-hidden">
                <img src={presentationImage} alt="Patio de atras" className="hero-image w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-linear-to-t from-[#2A4530]/60 via-[#2A4530]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-8 text-center px-5 fade-down">
                    <p className="titles-and-subtitles text-white/90 text-[.95rem] md:text-[1.05rem] tracking-wide uppercase">
                        Mina Clavero · Traslasierra
                    </p>
                    <h1 className="titles-and-subtitles text-white font-bold text-[1.6rem] md:text-[2.2rem] drop-shadow-sm">
                        Tu descanso empieza acá
                    </h1>
                </div>
            </div>

            {/* Presentación */}
            <div className="my-10 p-4 max-w-150 text-center fade-down">
                <h2 className="titles-and-subtitles font-bold text-[1.9rem] text-primary py-2">
                    Lo Nuestro, complejo de alojamiento en Traslasierra
                </h2>
                <span className="block w-14 h-0.75 bg-primary/40 rounded-full mx-auto my-3" />
                <p className="titles-and-subtitles text-[1.1rem] text-muted px-10">
                    Somos un complejo vacacional único ubicado a la entrada de Mina Clavero desde el Valle de Traslasierra.
                </p>
            </div>

            {/* Servicios */}
            <div className="w-full bg-[#F7F8F5] py-10 flex flex-col justify-center items-center">
                <h2 className="titles-and-subtitles text-center font-bold text-[1.6rem] text-primary mb-6 fade-down">
                    Lo que ofrecemos
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-6 md:mx-10 gap-10 p-2 max-w-6xl">
                    {SERVICES.map((service, index) => (
                        <ServiceItemComponent key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Secciones */}
            <div className="w-full flex flex-col gap-2 mt-10">
                {SECTIONS.map((section, index) => (
                    <SectionCard key={section.route} section={section} index={index} />
                ))}
            </div>

            {/* Cierre con logo */}
            <div className="w-full flex flex-col items-center py-14 px-5 text-center">
                <h2 className="titles-and-subtitles font-bold text-[1.4rem] text-primary mb-2 fade-down">
                    En el corazón de Mina Clavero
                </h2>
                <p className="text-muted max-w-md mb-6 fade-down" style={{ animationDelay: "0.1s" }}>
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

            <WhatsAppFloatingButton />
        </div>
    );
}

export default InicieComponent;
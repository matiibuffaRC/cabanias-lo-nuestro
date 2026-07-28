import ServiceItemComponent from "../ServiceItem/ServiceItemComponent";
import WhatsAppFloatingButton from "../WhatsAppButton/WhatsAppFloatingButton";
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

import LogoMinaClavero from "../../icons/MinaClaveroLogo.png";

import { Link } from "react-router-dom";

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

function InicieComponent() {
    return (
        <div className="pt-16 bg-[#F1F3EE] flex flex-col items-center relative">
            {/* Hero */}
            <div className="h-120 relative w-full overflow-hidden">
                <img src={presentationImage} alt="Patio de atras" className="hero-image w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A4530]/60 via-[#2A4530]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-8 text-center px-5 fade-down">
                    <p className="titles-and-subtitles text-white/90 text-[.95rem] md:text-[1.05rem] tracking-wide uppercase">
                        Mina Clavero · Traslasierra
                    </p>
                    <h1 className="titles-and-subtitles text-white font-bold text-[1.6rem] md:text-[2.2rem] mt-1 drop-shadow-sm">
                        Tu descanso empieza acá
                    </h1>
                </div>
            </div>

            <div className="my-10 p-4 max-w-150 text-center fade-down">
                <h2 className="titles-and-subtitles font-bold text-[1.9rem] text-[#3E6143] py-2">
                    Lo Nuestro, complejo de alojamiento en traslasierras
                </h2>
                <span className="block w-14 h-[3px] bg-[#3E6143]/40 rounded-full mx-auto my-3" />
                <h3 className="titles-and-subtitles text-[1.1rem] text-[#757575] px-10">
                    Somos un complejo vacacional único ubicado a la entrada de Mina Clavero desde el Valle de Traslasierras.
                </h3>
            </div>

            {/* Servicios */}
            <div className="w-full bg-white/50 py-10 flex flex-col justify-center items-center">
                <h3 className="titles-and-subtitles text-center font-bold text-[1.6rem] text-[#3E6143] mb-6 fade-down">
                    Lo que ofrecemos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 md:mx-10 gap-10 p-2 max-w-6xl ">
                    {SERVICES.map((service, index) => (
                        <ServiceItemComponent key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>

            {/* Secciones */}
            <div className="w-full flex flex-col gap-2 mt-10">
                {SECTIONS.map((section, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div key={section.title} className="section-card h-135 lg:h-150 relative w-full overflow-hidden fade-down" style={{ animationDelay: `${index * 0.15}s` }} >
                            <img src={section.img} alt="" className="section-card-img w-full h-full object-cover object-center transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                            <div className={`absolute w-[90%] top-10 lg:w-150 bg-[#3E6143]/60 backdrop-blur-[2px] p-5 text-white rounded-3xl md:max-w-1/2 shadow-lg ${ isLeft ? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0" : "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0" }`} >
                                <h2 className="titles-and-subtitles text-[1.8rem] lg:text-[2rem] font-bold py-2">
                                    {section.title}
                                </h2>
                                <h3 className="titles-and-subtitles text-[1rem] md:text-[.9rem] lg:text-[1.2rem]">
                                    {section.description}
                                </h3>
                                <div className="my-5">
                                    <Link to={`/alojamiento/${section.route}`} className="titles-and-subtitles font-bold bg-[#446b4a] border border-[#3E6143] py-2 px-3 rounded-xl hover:bg-[#3E6143] transition-colors duration-200 inline-block" >
                                        Saber más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cierre con logo */}
            <div className="w-full flex flex-col items-center py-14 px-5 text-center">
                <h3 className="titles-and-subtitles font-bold text-[1.4rem] text-[#3E6143] mb-2 fade-down">
                    En el corazón de Mina Clavero
                </h3>
                <p className="text-[#757575] max-w-md mb-6 fade-down" style={{ animationDelay: "0.1s" }}>
                    A minutos de los principales atractivos del Valle de Traslasierra.
                </p>
                <img src={LogoMinaClavero} alt="Mina Clavero ciudad" className="w-60 h-60 md:w-80 md:h-80 fade-down" style={{ animationDelay: "0.2s" }} />
            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default InicieComponent;
import ServiceItemComponent from "../ServiceItem/ServiceItemComponent";

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

import "../Animations/animations.css";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function InicieComponent() {

    const services = [
        { img: homeIcon, title: "+5", description: "cabañas y dormis" },
        { img: carIcon, title: "Estacionamiento", description: "individual" },
        { img: wifiIcon, title: "Conexión", description: "wifi" },
        { img: tvIcon, title: "Diversión", description: "para comodidad" },
        { img: grillIcon, title: "Parrillas", description: "individuales" },
        { img: airIcon, title: "Confort", description: "acondicionamiento" }
    ];


    const sections = [
        {
            img: patioImage,
            title: "Complejo Lo Nuestro",
            description:
                "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables",
            route:"complejo",
        },
        {
            img: frenteImage,
            title: "Cabañas",
            description:
                "Disponemos de 2 cabañas y 3 dormis para brindar una cómoda estadía en el complejo de cabañas. Cada unidad fue diseñada y pensada para ofrecer alojamiento a grupos de 4 personas.",
            route:"cabins",
        },
        {
            img: patioImage2,
            title: "Dormis",
            description:
                "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables.",
            route:"dormis",
        },
    ];

    const printServices = () => {
        return services.map((service, index) => (
            <ServiceItemComponent key={service.title} service={service} index={index} />
        ));
    };

    const printSections = () => {
        return(
            sections.map((section, index) => {
                const isLeft = index % 2 === 0;
                return (
                    <div key={index} className="h-135 relative w-full fade-down" style={{ animationDelay: `${index * 0.15}s` }}>
                        <img src={section.img} alt="" className="w-full h-full object-cover object-center"/>

                        <div className={`absolute w-[90%] top-10 bg-[#3E6143]/50 p-5 text-white rounded-3xl md:max-w-1/2 ${isLeft? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0": "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0"}`}>
                            <h2 className="titles-and-subtitles text-[1.8rem] font-bold py-2">
                                {section.title}
                            </h2>
                            <h3 className="titles-and-subtitles text-[1rem] md:text-[.9rem] lg:text-[1rem]">
                                {section.description}
                            </h3>
                            <div className="my-5">
                                <Link to={`/alojamiento/${section.route}`} className="titles-and-subtitles font-bold bg-[#446b4a] border border-[#3E6143] py-2 px-3 rounded-xl">
                                    Saber más
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    };

    return (
        <div className="pt-16 bg-[#F1F3EE] flex flex-col items-center">
            <div className="h-135 relative w-full">
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

            
            <div className="w-full flex flex-col gap-2 my-10">
                {printSections()}
            </div>

        </div>
    );
}

export default InicieComponent;
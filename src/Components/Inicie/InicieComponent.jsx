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

function InicieComponent() {

    const services = [
        { img: homeIcon, title: "+6", description: "Cabañas y dormis" },
        { img: carIcon, title: "Estacionamiento", description: "individual" },
        { img: wifiIcon, title: "Conexión", description: "wifi" },
        { img: tvIcon, title: "Diversión", description: "para comodidad" },
        { img: grillIcon, title: "Parrillas", description: "individuales" },
        { img: airIcon, title: "Confort", description: "acondicionamiento" }
    ];

    const sections = [
        {
            img: frenteImage,
            title: "Complejo Lo Nuestro",
            description:
                "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables",
        },
        {
            img: patioImage,
            title: "Cabañas y dormis",
            description:
                "Disponemos de 2 cabañas y 3 dormis para brindar una cómoda estadía en el complejo de cabañas. Cada unidad fue diseñada y pensada para ofrecer alojamiento a grupos de 4 personas.",
        },
        {
            img: patioImage2,
            title: "Complejo Lo Nuestro",
            description:
                "Un lugar ideal, en la entrada de Mina Clavero para visitar los principales atractivos de la zona y vivir unas vacaciones inolvidables.",
        },
    ];

    const [showServices, setShowServices] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setShowServices(true);
                }
            });
        }, { threshold: 0.3 });

        if (servicesRef.current) observer.observe(servicesRef.current);

        return () => observer.disconnect();

    }, []);

    const printServices = () => {
        return services.map((service, index) => {

            const delay =
                window.innerWidth >= 768 ? `${index * 0.15}s` : "0s";

            return (
                <div key={service.title} style={{ animationDelay: delay }} className={`flex flex-col items-center my-5 md:my-0  ${showServices ? "fade-down" : "opacity-0"}`}>
                    <img src={service.img} alt="" className="h-12 w-12" />
                    <h3 className="font-bold text-[1.1rem] md:text-[.9rem] lg:text-[1.1rem]">
                        {service.title}
                    </h3>
                    <h3 className="text-[.9rem] md:text-[.7rem] lg:text-[.9rem] text-center">
                        {service.description}
                    </h3>
                </div>
            );
        });
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

            <div ref={servicesRef} className="mb-10 grid grid-cols-2 md:grid-cols-6 md:mx-10 gap-5 p-2">
                {printServices()}
            </div>

            
            <div className="w-full flex flex-col gap-2">
                {sections.map((section, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div key={index} className="h-135 relative w-full">
                            <img src={section.img} alt="" className="w-full h-full object-cover object-center"/>

                            <div className={`absolute w-[90%] top-10 bg-[#3E6143]/50 p-5 text-white rounded-3xl md:max-w-1/2 ${isLeft? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0": "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0"}`}>
                                <h2 className="titles-and-subtitles text-[1.8rem] font-bold py-2">
                                    {section.title}
                                </h2>
                                <h3 className="titles-and-subtitles text-[1rem] md:text-[.9rem] lg:text-[1rem]">
                                    {section.description}
                                </h3>
                                <div className="my-5">
                                    <a href="#" className="titles-and-subtitles font-bold bg-[#446b4a] border border-[#3E6143] py-2 px-3 rounded-xl">
                                        Saber más
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default InicieComponent;
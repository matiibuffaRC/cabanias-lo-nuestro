import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { accommodation } from "../data/accommodation";
import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";

import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";

function AccommodationsPage() {

    const { tipo } = useParams();

    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [servicesVisible, setServicesVisible] = useState(false);

    const servicesRef = useRef(null);

    const data = accommodation.find(item => item.slug === tipo);

    // Reinicia animación cuando cambia el alojamiento
    useEffect(() => {
        setServicesVisible(false);
    }, [tipo]);

    // Observer para detectar cuando la sección entra en pantalla
    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setServicesVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (servicesRef.current) {
            observer.observe(servicesRef.current);
        }

        return () => observer.disconnect();

    }, [tipo]);

    const handleClickWhatsapp = () => {
        setHasInteracted(true);
        setOpenMenuWhatsapp(prev => !prev);
    };

    if (!data) {
        return <h1>Alojamiento no encontrado</h1>;
    }

    const printAccommodationsServices = () => {
        return data.services.map((service, index) => {

            return (
                <div key={index} className={`flex flex-row justify-start md:flex-col md:justify-center items-center gap-4 md:gap-2 p-4 md:py-2 md:px-0 ${servicesVisible ? "fade-down" : "opacity-0"}`}style={{ animationDelay: `${index * 0.15}s` }}>
                    <img src={service.img} alt="" className="h-10 w-10"/>
                    <h3 className="text-[1.1rem] md:text-[.8rem] text-defect">
                        {service.title}
                    </h3>
                </div>
            );

        });
    };

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">

            <CaruselImagesComponente images={data.photos} />

            <div className="text-center p-5 flex flex-col items-center w-full">

                <h1 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143]">
                    {data.title}
                </h1>

                <div className="md:w-140">
                    <p className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                        {data.description}
                    </p>
                </div>

            </div>

            <div className="text-center p-5 flex flex-col items-center w-full">

                <h2 className="titles-and-subtitles text-[1.8rem] font-bold text-[#3E6143]">
                    Servicios ofrecidos
                </h2>

                <div className="md:w-140">
                    <h3 className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                        {data.informationText}
                    </h3>
                </div>

                <div ref={servicesRef} className="my-5 flex flex-col md:grid md:grid-cols-3 md:justify-center lg:w-2xl">
                    {printAccommodationsServices()}
                </div>

            </div>

            {/* Botón WhatsApp */}

            <div className="fixed bottom-3 right-7.5 flex flex-row gap-2 z-50">

                <div className={`bg-[#F5F7F9] p-2 rounded-lg ${!hasInteracted ? "" : openMenuWhatsapp ? "fadeOutDown" : "fade-top-menu"}`}>
                    <h3 className="text-defect text-[.8rem]">Consultas y reservas?</h3>
                    <h3 className="text-defect text-[.8rem] font-bold">Hablemos!</h3>
                </div>

                <div className="bg-[#2DB742] h-13 w-13 z-70 flex flex-col justify-center items-center rounded-[50%] relative cursor-pointer" onClick={handleClickWhatsapp}>
                    <img src={WhatsAppIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 absolute ${openMenuWhatsapp? "rotate-180 opacity-0": "rotate-0 opacity-100"}`}/>
                    <img src={crossIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 ${openMenuWhatsapp? "rotate-0 opacity-100": "-rotate-180 opacity-0"}`}/>
                </div>

                {/* MENÚ WHATSAPP */}

                <div className={`bg-white rounded-xl z-60 right-7.5 h-55 w-[80%] md:w-90 fixed bottom-20 ${!hasInteracted? "hidden": openMenuWhatsapp? "fade-top-menu": "fadeOutDown"}`}>
                    <div className="bg-[#2DB742] rounded-t-xl p-3 flex flex-row text-[#F5F7F9] font-bold text-defect gap-2">
                        <div className="flex flex-col justify-center p-1">
                            <img src={WhatsAppIcon} alt="" className="w-9 h-9 invert"/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3>Hablemos!</h3>
                            <h4 className="text-[.7rem]">
                                Hace click abajo para comunicarte.
                            </h4>
                        </div>
                    </div>

                    <div>
                        {/* OPCIÓN 1 */}

                        <a href="https://wa.me/549XXXXXXXXXX?text=Hola%20quisiera%20consultar%20los%20precios%20de%20las%20caba%C3%B1as" target="_blank" rel="noopener noreferrer" className={`rounded-xl flex flex-row justify-start items-center p-3 gap-2 m-3 bg-[#ddd] border-l-5 border-[#2DB742] cursor-pointer ${openMenuWhatsapp ? "fade-down" : ""}`} style={{ animationDelay: "0.5s" }} >
                            <img src={WhatsAppIcon} alt="" className="w-8 h-8"/>
                            <h3 className="text-defect text-[1.1rem]">
                                Consultar precios
                            </h3>
                        </a>

                        {/* OPCIÓN 2 */}

                        <a href="https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20la%20disponibilidad" target="_blank" className={`rounded-xl flex flex-row justify-start items-center p-3 gap-2 m-3 bg-[#ddd] border-l-5 border-[#2DB742] cursor-pointer ${openMenuWhatsapp ? "fade-down" : ""}`} style={{ animationDelay: "0.65s" }} >
                            <img src={WhatsAppIcon} alt="" className="w-8 h-8"/>
                            <h3 className="text-defect text-[1.1rem]">
                                Consultar disponibilidad
                            </h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccommodationsPage;
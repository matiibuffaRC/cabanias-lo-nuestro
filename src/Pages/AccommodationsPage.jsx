import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { accommodation } from "../data/accommodation";
import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";
import WhatsAppFloatingButton from "../Components/WhatsappButton/WhatsAppFloatingButton";

function AccommodationsPage() {
    const { tipo } = useParams();
    const [servicesVisible, setServicesVisible] = useState(false);
    const servicesRef = useRef(null);

    const data = accommodation.find((item) => item.slug === tipo);

    // Reinicia animación cuando cambia el alojamiento
    useEffect(() => {
        setServicesVisible(false);
    }, [tipo]);

    // Observer para detectar cuando la sección entra en pantalla
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setServicesVisible(true);
            },
            { threshold: 0.2 }
        );

        if (servicesRef.current) observer.observe(servicesRef.current);
        return () => observer.disconnect();
    }, [tipo]);

    if (!data) {
        return (
            <div className="pt-16.25 min-h-screen flex flex-col items-center justify-center bg-[#F1F3EE] text-center px-5">
                <h1 className="titles-and-subtitles text-[1.8rem] font-bold text-[#3E6143]">
                    Alojamiento no encontrado
                </h1>
                <p className="text-[#757575] mt-2">
                    Revisá el enlace o volvé a la página de inicio.
                </p>
            </div>
        );
    }

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <CaruselImagesComponente images={data.photos} />

            {/* Encabezado */}
            <div className="text-center px-5 pt-10 pb-6 flex flex-col items-center w-full fade-down">
                <h1 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143]">
                    {data.title}
                </h1>
                <span className="block w-14 h-[3px] bg-[#3E6143]/40 rounded-full my-4" />

                <div className="md:w-140">
                    <p className="text-[.95rem] text-defect text-[#757575] leading-relaxed px-3">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Servicios */}
            <div className="text-center px-5 py-10 flex flex-col items-center w-full bg-white/40">
                <h2 className="titles-and-subtitles text-[1.8rem] font-bold text-[#3E6143]">
                    Servicios ofrecidos
                </h2>

                <div className="md:w-140">
                    <h3 className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">
                        {data.informationText}
                    </h3>
                </div>

                <div ref={servicesRef} className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:w-2xl w-full max-w-2xl" >
                    {data.services.map((service, index) => (
                        <div key={index} className={`service-card flex flex-col items-center gap-3 bg-white rounded-2xl p-5 shadow-sm border border-[#3E6143]/10 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${ servicesVisible ? "fade-down" : "opacity-0" }`} style={{ animationDelay: `${index * 0.12}s` }} >
                            <div className="h-14 w-14 rounded-full bg-[#3E6143]/10 flex items-center justify-center">
                                <img src={service.img} alt="" className="h-7 w-7" />
                            </div>
                            <h3 className="text-[.9rem] font-bold text-defect text-[#3E6143] leading-tight">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Llamado a la acción */}
            <div className="text-center px-5 py-12 flex flex-col items-center w-full">
                <h3 className="titles-and-subtitles text-[1.3rem] font-bold text-[#3E6143]">
                    ¿Te gustaría reservar {data.title.toLowerCase()}?
                </h3>
                <p className="text-[.9rem] text-[#757575] mt-2 max-w-md">
                    Escribinos y te contamos disponibilidad, precios y todo lo que necesites saber.
                </p>
                <a href="https://wa.me/5493564507240?text=Hola%20quisiera%20consultar%20por%20este%20alojamiento" target="_blank" rel="noopener noreferrer" className="mt-5 titles-and-subtitles font-bold bg-[#446b4a] text-white border border-[#3E6143] py-2.5 px-6 rounded-xl hover:bg-[#3E6143] transition-colors duration-200" >
                    Consultar por WhatsApp
                </a>
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default AccommodationsPage;
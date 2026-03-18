import { useState, useEffect } from "react";

import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";
import MapaComponent from '../Components/Mapa/MapaComponent';

import MinaClavero1 from "../imgs/MinaClavero.jpg";
import MinaClavero2 from "../imgs/MinaClavero2.jpg";
import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";


const MinaClaveroPhotos = [MinaClavero1, MinaClavero2];


function MapPage() {
    const [openMenuWhatsapp, setOpenMenuWhatsapp] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const handleClickWhatsapp = () => {
        setHasInteracted(true);
        setOpenMenuWhatsapp(prev => !prev);
        
    }

    return (
        <div className='pt-16.25 bg-[#F1F3EE] flex flex-col items-center'>
            <CaruselImagesComponente images={MinaClaveroPhotos}></CaruselImagesComponente>
            <div className='p-8 text-center max-w-150 fade-down'>
                <h2 className='titles-and-subtitles font-bold text-[#3E6143] text-[2rem] my-2'>Cómo llegar a Mina Clavero</h2>
                <h3 className='text-defect text-[#757575]'>Mina Clavero queda en la provincia de Córdoba, Argentina, específicamente en el corazón del Valle de Traslasierra. Se ubica al pie de las Sierras Grandes, aproximadamente a 120-150 km de Córdoba Capital y a 110-120 km de Villa Carlos Paz, siendo accesible a través del pintoresco camino de las Altas Cumbres (Ruta Provincial 34).</h3>
            </div>
            <div className='mx-5 mb-10 fade-down'>
                <MapaComponent></MapaComponent>
            </div>
            <div className='flex flex-col md:flex-row mb-10 fade-down'>
                <div className='m-4 p-4 text-center border border-black rounded-xl bg-[#3E6143]/20 flex flex-col items-center justify-between flex-1 max-w-125'>
                    <h3 className='text-[#3E6143] text-[1.4rem] titles-and-subtitles font-bold'>Como llegar a la entrada de las cabañas</h3>
                    <h4 className='text-defect text-[.9rem] text-[#757575]'>Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido a su izquierda ya se encuentra con la entrada frontal del complejo.</h4>
                    <div className='my-2 flex flex-row justify-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.7774544157692!2d-65.0038206407185!3d-31.740215244786018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a3142f657%3A0x5fb0905c56f4d3a1!2sCruz%20Del%20Eje%202080%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773323933919!5m2!1sen!2sar" 
                            width="350" 
                            height="250" 
                            className='rounded-2xl md:h-65 md:w-[95%]'
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de la región"
                        />
                    </div>
                </div>
                <div className='m-4 p-4 text-center border border-black rounded-xl bg-[#3E6143]/20 flex flex-col items-center justify-between flex-1 max-w-125'>
                    <h3 className='text-[#3E6143] text-[1.4rem] titles-and-subtitles font-bold'>Como llegar a la entrada de los dormis</h3>
                    <h4 className='text-defect text-[.9rem] text-[#757575]'>Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido toma la calle "Los Ceibos" a la izquierda y dobla en la proxima calle "Tanti" a la derecha y a 50mtrs ya encuentra la entrada trasera del complejo.</h4>
                    <div className='my-2 flex flex-row justify-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.2773267131151!2d-65.00391871550505!3d-31.740217264151354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a2e3be031%3A0x4412eb98c3c0c23c!2sTanti%202085%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773324731315!5m2!1sen!2sar"  
                            width="350" 
                            height="250" 
                            className='rounded-2xl md:h-65 md:w-[95%]'
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de la región"
                        />
                    </div>
                </div>
            </div>
            <div className={`fixed bottom-3 right-7.5 flex flex-row gap-2 z-50`}>
                <div className={`bg-[#F5F7F9] p-2 rounded-lg ${!hasInteracted? "": openMenuWhatsapp? "fadeOutDown": "fade-top-menu"}`}>
                    <h3 className="text-defect text-[.8rem]">Consultas y reservas?</h3>
                    <h3 className="text-defect text-[.8rem] font-bold">Hablemos!</h3>
                </div>
                <div className="bg-[#2DB742] h-13 w-13 z-70 flex flex-col justify-center items-center rounded-[50%] relative cursor-pointer" onClick={()=>{handleClickWhatsapp()}}>
                    <img src={WhatsAppIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 absolute ${openMenuWhatsapp ? "rotate-180 opacity-0 " : "rotate-0 opacity-100"}`}/>
                    <img src={crossIcon} alt="" className={`w-8 h-8 invert transition-all duration-300 ${openMenuWhatsapp ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"}`}/>
                </div>

                {/* Menú de opciones */}

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
    )
}

export default MapPage
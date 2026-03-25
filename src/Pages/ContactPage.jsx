import React from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import presentationImage from "../imgs/piletaConDormis.jpg";

import crossIcon from "../icons/crossIcon.svg";
import WhatsAppIcon from "../icons/whatsappIcon.svg";
import FacebookIcon from "../icons/facebookIcon.svg";
import GmailIcon from "../icons/gmail.svg";



function ContactPage() {

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

        const contacts = [
            { icon: WhatsAppIcon, title: "WhatsApp", name: "Cristian" },
            { icon: FacebookIcon, title: "Facebook", name: "Lo Nuestro" },
            { icon: GmailIcon, title: "Gmail", name: "Lo Nuestro" }
        ];
    
    return (
        <div className='pt-16.25 bg-[#F1F3EE]'>
            <div className="h-135 relative w-full">
                <img
                    src={presentationImage}
                    alt="Patio de atras"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className='text-center py-10 px-5'> 
                <h2 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143]">Contactanos</h2>
                <div className='flex flex-col md:flex-row justify-center md:gap-15 gap-10 my-5 md:my-10'>
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            className='flex flex-row justify-center fade-down'
                            style={{ animationDelay: `${index * 0.20}s` }}
                        >
                            <a href="#" className='flex flex-col items-center'>
                                <img src={contact.icon} alt="" className='w-8 h-8'/>
                                <h3 className='titles-and-subtitles font-bold text-[1.1rem] pt-1'>
                                    {contact.title}
                                </h3>
                                <h3 className='titles-and-subtitles font-bold'>
                                    {contact.name}
                                </h3>
                            </a>
                        </div>
                    ))}
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

                <div className={`bg-white rounded-xl z-60 right-7.5 h-55 w-[80%] md:w-90 fixed bottom-20 ${!hasInteracted ? "hidden" : openMenuWhatsapp ? "fade-top-menu pointer-events-auto" : "fadeOutDown pointer-events-none"}`}>
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

export default ContactPage
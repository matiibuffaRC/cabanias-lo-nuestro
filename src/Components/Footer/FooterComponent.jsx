import React from 'react'
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import GmailIcon from "../../icons/gmail.svg";
import WhatsAppIcon from "../../icons/whatsappIcon.svg";
import FacebookIcon from "../../icons/facebookIcon.svg";


function FooterComponent() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );
    
        if (ref.current) observer.observe(ref.current);
    
        return () => observer.disconnect();
    }, []);
    
    
    return (
        <div className='bg-[#3E6143]' ref={ref}>
            <div>
                <h2 className='titles-and-subtitles font-bold text-[2rem] text-[#F1F3EE] text-center pt-5'>Lo Nuestro</h2>
            </div>
            <div className='flex flex-row justify-around md:justify-center md:gap-20 items-start border-b border-t m-5 border-[#F1F3EE] py-5 '>
                <div className={`text-[#F1F3EE] ${isVisible ? "fade-side-to-right" : "opacity-0" }`}>
                    <h3 className='titles-and-subtitles font-bold text-[1.1rem] md:text-[1.4rem]'>Lo nuestro</h3>
                    <div className='flex flex-col text-center'>
                        <Link to="/alojamiento/complejo" className='text-defect text-[.9rem] md:text-[1rem] cursor-pointer'>Complejo</Link>
                        <Link to="/alojamiento/cabins" className='text-defect text-[.9rem] md:text-[1rem] cursor-pointer'>Cabañas</Link>
                        <Link to="/alojamiento/dormis" className='text-defect text-[.9rem] md:text-[1rem] cursor-pointer'>Dormis</Link>
                    </div>
                </div>
                <div className={`text-[#F1F3EE] flex flex-col justify-start ${isVisible ? "fade-side-to-left" : "opacity-0" }`}>
                    <h3 className='titles-and-subtitles font-bold text-[1.1rem] md:text-[1.4rem]'>Sobre nosotros</h3>
                    <div className='flex flex-col text-center'>
                        <Link to="/comoLlegar" className='text-defect text-[.9rem] md:text-[1rem] cursor-pointer'>Como llegar</Link>
                        <Link to="/contact" className='text-defect text-[.9rem] md:text-[1rem] cursor-pointer'>Contacto</Link>
                        <h4 className='text-defect text-[.9rem] md:text-[1rem] text-transparent'>hola</h4>
                        
                    </div>
                </div>
            </div>
            <div className='titles-and-subtitles pb-5 font-bold text-center text-[1.2rem] text-[#F1F3EE] flex flex-col items-center justify-center'>
                <h3>Sigamos conectados!</h3>
                <div className={`flex flex-row justify-center gap-5 m-3 ${isVisible ? "fade-top" : "opacity-0" }`}>
                    <a href="#">
                        <img src={GmailIcon} alt="" className='w-7 h-7 invert'/>
                    </a>
                    <a href="#">
                        <img src={WhatsAppIcon} alt="" className='w-7 h-7 invert'/>
                    </a>
                    <a href="#">
                        <img src={FacebookIcon} alt="" className='w-7 h-7 invert'/>
                    </a>
                </div>
                <h4 className='text-[.8rem] pt-1'>Sitio diseñado y desarrollador por MatíasBuffa</h4>
                <h4 className='text-[.7rem] pb-1'>2026</h4>
            </div>
        </div>
    )
}

export default FooterComponent
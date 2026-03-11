import React from 'react'
import { Link } from "react-router-dom";

function FooterComponent() {
    return (
        <div className='bg-[#3E6143]'>
            <div className='text-[#b5b5b5] border border-red-500'>
                <h3 className='titles-and-subtitles font-bold text-[1.1rem]'>Lo nuestro</h3>
                <div className='flex flex-col pl-2'>
                    <Link to="/alojamiento/complejo">Complejo</Link>
                    <Link to="/alojamiento/cabins">Cabanias</Link>
                    <Link to="/alojamiento/dormis">Dormis</Link>
                </div>
            </div>
            <div>
                <h3>Sobre nosotros</h3>
                <h4>Como llegar</h4>
                <h4>Contacto</h4>
            </div>
        </div>
    )
}

export default FooterComponent
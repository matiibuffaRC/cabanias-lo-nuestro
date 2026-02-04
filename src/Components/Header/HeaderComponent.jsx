import "./HeaderComponent.css"
import { useState, useEffect } from "react";
import menuIcon from "../../icons/Menu.svg";

function HeaderComponent({ scrollToSection , refs }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // lg


    useEffect(() => {
        const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);


        if (!mobile) {
            setMenuOpen(false);
        }
    };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const openMenu = () => {
        if (!isMobile) return;
        setMenuOpen(prev => !prev);
    };

    const handleNavClick = (ref) => {
        scrollToSection(ref);
        setMenuOpen(false);
    };

    return (
    <header className="header h-16.25 w-screen shadow-md bg-[#3E6143] flex items-center justify-between text-white fixed left-0 top-0 z-15  lg:justify-center">
        <div
            className={`fixed inset-0 bg-[rgba(0,0,0,.45)] z-10 
            ${menuOpen ? "block" : "hidden"} lg:hidden`}
            onClick={openMenu}
        />

        <div className=" w-full h-full justify-between flex flex-row lg:w-5xl lg:justify-between lg:items-center">
            <div className="header-title flex flex-row items-center gap-2 ml-5">
            
            <h4 className="titles text-[1.1rem] md:text-[1rem] lg:text-[1.1rem]">
                Lo nuestro
            </h4>
        </div>

        <div className="header-btns flex flex-row items-center lg:hidden mr-5">
            <img 
                src={menuIcon}
                alt="Menú" 
                className="cursor-pointer w-6 h-6 invert"
                onClick={openMenu}
            />
        </div>

        <nav
            className={`fixed top-0 left-0 z-20 h-screen w-62.5 bg-[#3E6143]
            transition-transform duration-300 ease-in-out
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
            md:w-80
            lg:static lg:h-full lg:w-auto lg:bg-transparent
            lg:translate-x-0 lg:transition-none lg:flex lg:items-center`}
        >
            <ul className="nav-list flex flex-col p-0 lg:flex-row lg:gap-4 lg:p-0 lg:h-full lg:items-center">
                <li 
                    className="titles nav-list-item cursor-pointer lg:hover:bg-[#355039] rounded-[25px] lg:text-[1rem] my-3.75 mx-1.25 pl-3" onClick={()=>handleNavClick(refs.inicieRef)}>
                    Inicio
                </li>
                <li 
                    className="titles nav-list-item cursor-pointer lg:hover:bg-[#355039] rounded-[25px] lg:text-[1rem] my-3.75 mx-1.25 pl-3" onClick={()=>handleNavClick(refs.aboutUsRef)}>
                    Sobre el complejo
                </li>
                <li 
                    className="titles nav-list-item cursor-pointer lg:hover:bg-[#355039] rounded-[25px] lg:text-[1rem] my-3.75 mx-1.25 pl-3" onClick={()=>handleNavClick(refs.accomodationsRef)}>
                    Alojamientos
                </li>
                <li 
                    className="titles nav-list-item cursor-pointer lg:hover:bg-[#355039] rounded-[25px] lg:text-[1rem] my-3.75 mx-1.25 pl-3" onClick={()=>handleNavClick(refs.galleryRef)}>
                    Galeria
                </li>
                <li 
                    className="titles nav-list-item cursor-pointer lg:hover:bg-[#355039] rounded-[25px] lg:text-[1rem] my-3.75 mx-1.25 pl-3" onClick={()=>handleNavClick(refs.contactRef)}>
                    Contacto
                </li>
            </ul>
        </nav>
        </div>

    </header>
    );
}

export default HeaderComponent;
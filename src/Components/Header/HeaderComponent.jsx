import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import menuIcon from "../../icons/Menu.svg";

function HeaderComponent({ scrollToSection, refs }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const location = useLocation();

    const navItems = [
        { text: "Inicio", link: "/" },
        { text: "Complejo", link: "/alojamiento/complejo" },
        { text: "Cabañas", link: "/alojamiento/cabins" },
        { text: "Dormis", link: "/alojamiento/dormis" },
        { text: "Contacto", link: "/contact" },
        { text: "Como llegar", link: "/comoLlegar" }
    ];

    // 👉 NUEVO HOVER CON LÍNEA ANIMADA
    const liClasses = (isActive) => `
        relative titles py-0.5 md:py-1 
        lg:px-3 lg:my-4 cursor-pointer 
        text-white text-[1rem] lg:text-[0.95rem] px-1.5

        after:content-[''] after:absolute after:left-1/2 after:-bottom-0.5
        after:h-[1.5px] after:bg-white
        after:transition-all after:duration-200
        after:-translate-x-1/2

        ${isActive ? 'after:w-1/2' : 'after:w-0 hover:after:w-1/2'}
        `;

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
        <header className="titles-and-subtitles header h-16.25 w-screen shadow-md bg-[#3E6143] flex items-center justify-between text-white fixed left-0 top-0 z-105 lg:justify-center">
            
            {/* Overlay mobile */}
            <div
                className={`fixed inset-0 bg-[rgba(0,0,0,.45)] z-10 
                ${menuOpen ? "block" : "hidden"} lg:hidden`}
                onClick={openMenu}
            />

            <div className="w-full h-full justify-between flex flex-row lg:w-5xl lg:justify-between lg:items-center">
                
                {/* Logo */}
                <div className="header-title flex flex-row items-center gap-2 ml-5">
                    <Link to="/" className="title text-[1.2rem] md:text-[1rem] lg:text-[1.1rem]">
                        Lo nuestro
                    </Link>
                </div>

                {/* Botón mobile */}
                <div className="header-btns flex flex-row items-center lg:hidden mr-5">
                    <img
                        src={menuIcon}
                        alt="Menú"
                        className="cursor-pointer w-7 h-7 invert"
                        onClick={openMenu}
                    />
                </div>

                {/* Nav */}
                <nav
                    className={`fixed top-0 left-0 z-20 h-screen w-62.5 bg-[#3E6143] transition-transform duration-300 ease-in-out ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    } 
                    md:w-80 
                    lg:static lg:h-full lg:w-auto lg:bg-transparent 
                    lg:translate-x-0 lg:transition-none lg:flex lg:items-center`}
                >
                    <ul className="ml-3 pt-5 lg:pt-0 flex flex-col p-0 lg:flex-row lg:gap-2 lg:h-full lg:items-center">
                        {navItems.map((item) => (
                            <li
                                key={item.text}
                                className="my-3.5 lg:my-0 lg:border-none lg:ml-0"
                                onClick={() => handleNavClick(item.ref)}
                            >
                                <Link
                                    to={item.link}
                                    className={liClasses(location.pathname === item.link)}
                                    onClick={() => openMenu()}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default HeaderComponent;
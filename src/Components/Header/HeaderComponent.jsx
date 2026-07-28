import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import menuIcon from "../../icons/Menu.svg";
import crossIcon from "../../icons/crossIcon.svg";

function HeaderComponent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const location = useLocation();

    const navItems = [
        { text: "Inicio", link: "/" },
        { text: "Complejo", link: "/alojamiento/complejo" },
        { text: "Cabañas", link: "/alojamiento/cabins" },
        { text: "Dormis", link: "/alojamiento/dormis" },
        { text: "Como llegar", link: "/comoLlegar" },
        { text: "Contacto", link: "/contact" },
    ];

    const liClasses = (isActive) => `
        relative titles py-2 px-3 my-0.5
        block rounded-lg cursor-pointer
        text-white text-[1rem] lg:text-[0.95rem]
        transition-colors duration-200

        lg:py-1 lg:my-4 lg:rounded-none lg:px-3

        md:after:content-[''] md:after:absolute md:after:left-1/2 md:after:-bottom-0.5
        md:after:h-[1.5px] md:after:bg-white
        md:after:transition-all md:after:duration-200
        md:after:-translate-x-1/2

        ${isActive
            ? "bg-white/10 lg:bg-transparent md:after:w-1/2"
            : "hover:bg-white/10 lg:hover:bg-transparent md:after:w-0 md:hover:after:w-1/2"
        }
    `;

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Bloquea el scroll del body mientras el menú mobile está abierto
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const toggleMenu = () => {
        if (!isMobile) return;
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="titles-and-subtitles header h-16.25 w-screen shadow-md bg-[#3E6143] flex items-center justify-between text-white fixed left-0 top-0 z-105 lg:justify-center">

            {/* Overlay mobile */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-[1px] z-10 transition-opacity duration-300 ${ menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" } lg:hidden`} onClick={closeMenu} />

            <div className="w-full h-full justify-between flex flex-row lg:w-5xl lg:justify-between lg:items-center">

                {/* Logo */}
                <div className="header-title flex flex-row items-center gap-2 ml-5">
                    <Link to="/" className="title text-[1.2rem] md:text-[1rem] lg:text-[1.15rem] font-bold tracking-wide lg:tracking-wider" onClick={closeMenu} >
                        Lo nuestro
                    </Link>
                </div>

                {/* Botón mobile (hamburguesa animada) */}
                <div className="header-btns flex flex-row items-center lg:hidden mr-5">
                    <div className="cursor-pointer w-8 h-8 relative" onClick={toggleMenu} role="button" aria-expanded={menuOpen} aria-label="Abrir menú de navegación" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMenu(); } }} >
                        <img src={menuIcon} alt="" className={`w-7 h-7 invert absolute inset-0 m-auto transition-all duration-300 ${ menuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0" }`} />
                        <img src={crossIcon} alt="" className={`w-7 h-7 invert absolute inset-0 m-auto transition-all duration-300 ${ menuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90" }`} />
                    </div>
                </div>

                {/* Nav */}
                <nav className={`fixed top-0 left-0 z-20 h-screen w-62.5 bg-[#3E6143] shadow-2xl transition-transform duration-300 ease-in-out ${ menuOpen ? "translate-x-0" : "-translate-x-full" } md:w-80 lg:static lg:h-full lg:w-auto lg:bg-transparent lg:shadow-none lg:translate-x-0 lg:transition-none lg:flex lg:items-center`} >
                    <div className="flex items-center justify-between px-5 pt-5 lg:hidden">
                        <span className="title text-[1.1rem] font-bold">Lo nuestro</span>
                        <img src={crossIcon} alt="Cerrar menú" className="w-5 h-5 invert cursor-pointer" onClick={closeMenu} />
                    </div>

                    <span className="block h-px bg-white/15 mx-5 mt-4 lg:hidden" />

                    <ul className="px-3 pt-3 lg:pt-0 flex flex-col gap-0.5 lg:flex-row lg:gap-1 lg:h-full lg:items-center">
                    {navItems.map((item) => {
                        const isContact = item.link === "/contact";

                        if (isContact) {
                            return (
                                <li key={item.text} className="lg:my-0">
                                    {/* Mobile: mismo estilo que el resto de los ítems */}
                                    <Link to={item.link} className={`lg:hidden ${liClasses(location.pathname === item.link)}`} onClick={closeMenu} >
                                        {item.text}
                                    </Link>

                                    {/* Desktop: botón píldora */}
                                    <Link to={item.link} className="hidden lg:inline-flex titles items-center text-[.9rem] font-bold bg-white text-[#3E6143] py-1.5 px-4 rounded-full ml-2 hover:bg-white/90 transition-colors duration-200" onClick={closeMenu} >
                                        {item.text}
                                    </Link>
                                </li>
                            );
                        }
                        return (
                            <li key={item.text} className="lg:my-0">
                                <Link to={item.link} className={liClasses(location.pathname === item.link)} onClick={closeMenu} >
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                </nav>
            </div>
        </header>
    );
}

export default HeaderComponent;
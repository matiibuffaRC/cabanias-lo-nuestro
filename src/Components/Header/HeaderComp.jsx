import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LEFT_ITEMS = [
    { text: "Inicio", link: "/" },
    { text: "Complejo", link: "/alojamiento/complejo" },
    { text: "Cabañas", link: "/alojamiento/cabins" },
];
const RIGHT_ITEMS = [
    { text: "Dormis", link: "/alojamiento/dormis" },
    { text: "Cómo llegar", link: "/comoLlegar" },
];
const ALL_ITEMS = [...LEFT_ITEMS, ...RIGHT_ITEMS];
const CTA = { text: "Contacto", link: "/contact" };

// Transparente sobre el hero, logo centrado, menú mobile a pantalla completa
function HeaderComponente() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setMenuOpen(false), [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    // La opción activa va en negrita y a opacidad completa.
    // El pseudo-elemento ::before reserva el ancho del texto en negrita para que
    // el menú no se desplace al cambiar de opción.
    const desktopLink = (isActive) =>
        `titles block px-3 py-1 text-[0.8rem] uppercase tracking-[0.18em] text-white transition-all duration-300
        before:invisible before:block before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)]
        ${isActive ? "font-bold opacity-100" : "font-normal opacity-80 hover:opacity-100"}`;

    // La altura depende SOLO del scroll (así el logo no salta al abrir el menú).
    // Con el menú abierto el header se vuelve transparente: el fondo lo da el menú.
    const headerHeight = scrolled ? "h-16" : "h-20";
    const headerSurface = menuOpen
        ? "border-transparent bg-transparent"
        : scrolled
        ? "border-transparent bg-[#3E6143] shadow-lg"
        : "border-white/10 bg-[#3E6143]/60 backdrop-blur-md";

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-250 border-b transition-all duration-500 ${headerHeight} ${headerSurface}`}
            >
                <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
                    {/* Izquierda (desktop) */}
                    <nav aria-label="Navegación principal" className="hidden items-center gap-2 lg:flex">
                        {LEFT_ITEMS.map((item) => (
                            <NavLink
                                key={item.link}
                                to={item.link}
                                end={item.link === "/"}
                                data-text={item.text}
                                className={({ isActive }) => desktopLink(isActive)}
                            >
                                {item.text}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logo */}
                    <Link to="/" className="titles relative z-30 text-[1.3rem] font-bold tracking-wider text-white drop-shadow-sm lg:text-[1.4rem]">
                        Lo nuestro
                    </Link>

                    {/* Derecha (desktop) */}
                    <nav aria-label="Navegación secundaria" className="hidden items-center justify-end gap-2 lg:flex">
                        {RIGHT_ITEMS.map((item) => (
                            <NavLink
                                key={item.link}
                                to={item.link}
                                data-text={item.text}
                                className={({ isActive }) => desktopLink(isActive)}
                            >
                                {item.text}
                            </NavLink>
                        ))}
                        <Link
                            to={CTA.link}
                            className="titles ml-3 rounded-full border border-white px-5 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#3E6143]"
                        >
                            {CTA.text}
                        </Link>
                    </nav>

                    {/* Botón mobile */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        className="relative z-230 -mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
                    >
                        <span className="relative block h-3.5 w-6">
                            <span className={`absolute right-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                            <span className={`absolute right-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`absolute right-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
                        </span>
                    </button>
                </div>
            </header>

            <nav
                id="mobile-nav"
                aria-label="Navegación principal"
                aria-hidden={!menuOpen}
                className={`fixed inset-0 z-240 flex flex-col justify-center bg-[#3E6143] px-10 transition-opacity duration-500 lg:hidden ${
                    menuOpen ? "visible opacity-100" : "invisible opacity-0 delay-0"
                }`}
            >
                <ul className="flex flex-col gap-2">
                    {ALL_ITEMS.map((item, i) => (
                        <li
                            key={item.link}
                            style={{ transitionDelay: menuOpen ? `${150 + i * 60}ms` : "0ms" }}
                            className={`transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                        >
                            <NavLink
                                to={item.link}
                                end={item.link === "/"}
                                className={({ isActive }) =>
                                    `titles block py-2 text-3xl font-bold text-white transition-opacity ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`
                                }
                            >
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                    <li
                        style={{ transitionDelay: menuOpen ? `${150 + ALL_ITEMS.length * 60}ms` : "0ms" }}
                        className={`mt-6 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                    >
                        <Link
                            to={CTA.link}
                            className="titles inline-flex w-fit items-center rounded-full border border-white/70 px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-white hover:text-[#3E6143] active:scale-95"
                        >
                            {CTA.text}
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default HeaderComponente;
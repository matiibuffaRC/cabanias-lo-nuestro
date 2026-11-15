import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { accommodation } from "../../data/accommodation";

// Páginas que empiezan con una foto grande: ahí el header es translúcido.
// En el resto va sólido para que el texto blanco tenga contraste.
const HERO_ROUTES = new Set(["/", ...accommodation.map((item) => `/alojamiento/${item.slug}`)]);

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
    const { pathname } = useLocation();

    return <HeaderContent key={pathname} overHero={HERO_ROUTES.has(pathname)} />;
}

function HeaderContent({ overHero }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const firstLinkRef = useRef(null);
    const toggleRef = useRef(null);
    const wasOpen = useRef(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            // Al cerrar, el foco vuelve al botón que abrió el menú
            if (wasOpen.current) toggleRef.current?.focus();
            return;
        }
        wasOpen.current = true;
        const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
        // Con el menú abierto, el teclado y el lector de pantalla no pueden irse a la página de atrás
        const background = [document.getElementById("contenido"), document.querySelector("footer")];
        background.forEach((el) => el && (el.inert = true));
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        firstLinkRef.current?.focus();
        return () => {
            background.forEach((el) => el && (el.inert = false));
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    // La opción activa va en negrita y a opacidad completa.
    // El pseudo-elemento ::before reserva el ancho del texto en negrita para que
    // el menú no se desplace al cambiar de opción.
    const desktopLink = (isActive) =>
        `titles block px-3 py-1 text-xs uppercase tracking-[0.18em] text-white transition-all duration-300
        before:invisible before:block before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)]
        ${isActive ? "font-bold opacity-100" : "font-normal opacity-90 hover:opacity-100"}`;

    // La altura depende SOLO del scroll (así el logo no salta al abrir el menú).
    // Con el menú abierto el header se vuelve transparente: el fondo lo da el menú.
    const headerHeight = scrolled ? "h-16" : "h-18";
    const headerSurface = menuOpen
        ? "border-transparent bg-transparent"
        : scrolled
        ? "border-transparent bg-[#3E6143] shadow-lg"
        : overHero
        ? "border-white/10 bg-primary-dark/55 backdrop-blur-md"
        : "border-transparent bg-primary";

    return (
        <>
            <header
                className={`focus-light fixed inset-x-0 top-0 z-250 border-b transition-all duration-500 ${headerHeight} ${headerSurface}`}
            >
                <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
                    {/* Izquierda (desktop): pegada al logo */}
                    <nav aria-label="Navegación principal" className="hidden items-center justify-end gap-2 lg:flex">
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

                    {/* Marca: el padding da el mismo aire a ambos lados */}
                    <Link
                        to="/"
                        aria-label="Lo Nuestro, ir al inicio"
                        className="titles relative z-30 inline-flex items-center pb-1 text-xl font-bold tracking-wider text-white drop-shadow-sm lg:px-10 lg:text-2xl"
                    >
<<<<<<< HEAD
                        Lo nuestro
=======
                        <span>Lo nuestro</span>
>>>>>>> defb39038ee2da2dbba69aafcf4ad742a6b46b55
                    </Link>

                    {/* Derecha (desktop): items pegados al logo, CTA al borde */}
                    <div className="hidden items-center justify-between lg:flex">
                        <nav aria-label="Navegación secundaria" className="flex items-center gap-2">
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
                        </nav>
                        <Link
                            to={CTA.link}
                            className="titles rounded-full border border-white px-5 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#3E6143]"
                        >
                            {CTA.text}
                        </Link>
                    </div>

                    {/* Botón mobile */}
                    <button
                        ref={toggleRef}
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
                className={`focus-light fixed inset-0 z-240 flex flex-col justify-center bg-[#3E6143] px-10 transition-opacity duration-500 lg:hidden ${
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
                                ref={i === 0 ? firstLinkRef : undefined}
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
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { accommodation } from "../../data/accommodation";
import logo from "../../assets/images/Lo-Nuestro-logo.png";

// Páginas que empiezan con una foto grande: ahí el header es transparente.
// En el resto va sólido para que el texto tenga contraste.
const HERO_ROUTES = new Set(["/", "/comoLlegar", "/contact", ...accommodation.map((item) => `/alojamiento/${item.slug}`)]);

const HOME = { text: "Inicio", link: "/" };
const MAP = { text: "Cómo llegar", link: "/comoLlegar" };
const CTA = { text: "Contacto", link: "/contact" };

// Bajada corta de cada alojamiento en el menú mobile
const SUBTITLES = {
    complejo: "Pileta, patio y parrillas",
    cabins: "Hasta 4 personas · cochera propia",
    dormis: "Hasta 4 personas · baño privado",
};
const STAYS = accommodation.map((item) => ({
    text: item.shortTitle,
    link: `/alojamiento/${item.slug}`,
    img: item.cardImage,
    subtitle: SUBTITLES[item.slug],
}));

const DESKTOP_ITEMS = [HOME, ...STAYS, MAP];

// Desktop: barra flotante rectangular con bordes redondeados; vidrio sobre la foto y blanca con scroll.
// Mobile: barra con logo + hamburguesa; el menú agrupa los alojamientos en un acordeón con miniaturas.
function HeaderComponente() {
    const { pathname } = useLocation();

    return <HeaderContent key={pathname} pathname={pathname} overHero={HERO_ROUTES.has(pathname)} />;
}

function HeaderContent({ pathname, overHero }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [staysOpen, setStaysOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const firstLinkRef = useRef(null);
    const toggleRef = useRef(null);
    const wasOpen = useRef(false);

    const inStay = pathname.startsWith("/alojamiento/");

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

    // ---------- Desktop ----------

    const deskLight = scrolled || !overHero;
    const deskBar = deskLight
        ? "top-3 h-16 border-primary-wash bg-white/95 text-primary-dark shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]"
        : "focus-light top-5 h-15 border-white/30 bg-white/15 text-white";
    const deskActive = deskLight ? "bg-primary-wash" : "bg-white/20";
    const deskHover = deskLight ? "hover:bg-surface" : "hover:bg-white/10";
    const deskCta = deskLight
        ? "bg-primary text-white hover:bg-primary-dark"
        : "bg-white text-primary hover:bg-surface";

    const desktopLink = (isActive) =>
        `block rounded-xl px-4 py-2 text-sm transition-colors duration-250
        before:invisible before:block before:h-0 before:overflow-hidden before:font-semibold before:content-[attr(data-text)]
        ${isActive ? `font-semibold ${deskActive}` : `font-medium ${deskHover}`}`;

    // ---------- Mobile ----------
    
    const mobileSurface = menuOpen
        ? "border-b border-primary-wash bg-white"
        : scrolled
        ? "bg-primary shadow-lg"
        : overHero
        ? "bg-linear-to-b from-[#142318]/55 to-transparent"
        : "bg-primary";
    const mobileText = menuOpen ? "text-primary-dark" : "focus-light text-white";

    // La altura depende SOLO del scroll (así el logo no salta al abrir el menú).
    const headerHeight = scrolled ? "h-16" : "h-18";

    const mobileRow = "titles flex items-center justify-between border-b border-primary-wash py-3.5 text-lg font-semibold";

    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-250 transition-[height] duration-350 ${headerHeight}`}>
                {/* Fondos por separado para cada tamaño de pantalla */}
                <div aria-hidden="true" className={`absolute inset-0 transition-all duration-350 lg:hidden ${mobileSurface}`} />

                {/* ===== Desktop: barra flotante ===== */}
                <div
                    className={`absolute inset-x-8 mx-auto hidden max-w-6xl items-center rounded-2xl border pl-8 pr-3 backdrop-blur-md transition-all duration-350 lg:flex ${deskBar}`}
                >
                    <Link to="/" aria-label="Lo Nuestro, ir al inicio" className="titles text-xl font-bold tracking-wide">
                        Lo nuestro
                    </Link>

                    {/* Menú centrado entre la marca y el botón */}
                    <nav aria-label="Navegación principal" className="mx-auto flex items-center gap-1.5 px-6">
                        {DESKTOP_ITEMS.map((item) => (
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

                    <Link
                        to={CTA.link}
                        className={`rounded-xl px-6 py-2 text-sm font-semibold transition-colors duration-250 ${deskCta}`}
                    >
                        {CTA.text}
                    </Link>
                </div>

                {/* ===== Mobile ===== */}
                <div className={`relative z-230 flex h-full items-center justify-between px-6 transition-colors duration-250 lg:hidden ${mobileText}`}>
                    <Link to="/" aria-label="Lo Nuestro, ir al inicio" className="titles flex items-center gap-2.5 text-xl font-bold tracking-wide">
                        <img src={logo} alt="" width="32" height="32" className="size-8 rounded-[3px]" />
                        Lo nuestro
                    </Link>

                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        className="-mr-2 flex h-10 w-10 items-center justify-center"
                    >
                        <span className="relative block h-3.5 w-6">
                            <span className={`absolute right-0 h-0.5 w-full rounded-full bg-current transition-all duration-250 ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                            <span className={`absolute right-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current transition-all duration-250 ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`absolute right-0 h-0.5 w-full rounded-full bg-current transition-all duration-250 ${menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
                        </span>
                    </button>
                </div>
            </header>

            <nav
                id="mobile-nav"
                aria-label="Navegación principal"
                aria-hidden={!menuOpen}
                className={`fixed inset-0 z-240 flex flex-col overflow-y-auto bg-white px-5 pb-8 pt-22 text-primary-dark transition-opacity duration-300 lg:hidden ${
                    menuOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >
                <ul className={`flex flex-col transition-all duration-350 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
                    <li>
                        <NavLink
                            ref={firstLinkRef}
                            to={HOME.link}
                            end
                            className={({ isActive }) => `${mobileRow} ${isActive ? "font-extrabold text-primary" : ""}`}
                        >
                            {HOME.text}
                        </NavLink>
                    </li>

                    <li>
                        <button
                            type="button"
                            onClick={() => setStaysOpen((p) => !p)}
                            aria-expanded={staysOpen}
                            aria-controls="mobile-stays"
                            className={`${mobileRow} w-full text-left ${inStay ? "font-extrabold text-primary" : ""}`}
                        >
                            Alojamiento
                            <ChevronIcon className={`size-4.5 transition-transform duration-250 ${staysOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Acordeón con miniaturas: grid-rows anima la altura sin medirla */}
                        <div
                            id="mobile-stays"
                            className={`grid transition-[grid-template-rows] duration-300 ${staysOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                        >
                            <div className="overflow-hidden" inert={!staysOpen}>
                                <ul className="flex flex-col gap-1 border-b border-primary-wash py-2">
                                    {STAYS.map((item) => (
                                        <li key={item.link}>
                                            <NavLink
                                                to={item.link}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3.5 rounded-xl p-1.5 transition-colors hover:bg-surface ${isActive ? "bg-primary-wash" : ""}`
                                                }
                                            >
                                                <img
                                                    src={item.img}
                                                    alt=""
                                                    loading="lazy"
                                                    className="h-12 w-16 flex-none rounded-lg object-cover"
                                                />
                                                <span className="min-w-0">
                                                    <span className="titles block text-base font-bold">{item.text}</span>
                                                    <span className="block text-sm text-muted">{item.subtitle}</span>
                                                </span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li>
                        <NavLink
                            to={MAP.link}
                            className={({ isActive }) => `${mobileRow} ${isActive ? "font-extrabold text-primary" : ""}`}
                        >
                            {MAP.text}
                            <ChevronIcon className="size-4.5 -rotate-90" />
                        </NavLink>
                    </li>
                </ul>

                <Link
                    to={CTA.link}
                    className={`mt-auto block rounded-full bg-primary py-3.5 text-center font-bold text-white transition-all duration-350 hover:bg-primary-dark active:scale-[0.98] ${
                        menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                    }`}
                >
                    Contacto
                </Link>
            </nav>
        </>
    );
}

function ChevronIcon({ className }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

export default HeaderComponente;

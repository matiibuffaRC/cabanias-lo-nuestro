import Reveal from "./Reveal";

/**
 * Encabezado de sección del sitio: título, línea corta y bajada opcional.
 * `as` permite elegir el nivel (h2 por defecto) sin cambiar el estilo.
 */
function SectionHeading({ as = "h2", id, title, lead, align = "center", light = false, className = "" }) {
    const Heading = as;
    const centered = align === "center";

    return (
        <Reveal className={`${centered ? "text-center" : "text-left"} ${className}`}>
            <Heading
                id={id}
                className={`titles text-2xl font-bold leading-tight md:text-3xl ${
                    light ? "text-white" : "text-primary"
                }`}
            >
                {title}
            </Heading>
            <span
                aria-hidden="true"
                className={`mt-3 block h-0.75 w-12 rounded-full ${light ? "bg-white/45" : "bg-primary/35"} ${
                    centered ? "mx-auto" : ""
                }`}
            />
            {lead && (
                <p
                    className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${
                        light ? "text-white/80" : "text-muted"
                    } ${centered ? "mx-auto" : ""}`}
                >
                    {lead}
                </p>
            )}
        </Reveal>
    );
}

export default SectionHeading;

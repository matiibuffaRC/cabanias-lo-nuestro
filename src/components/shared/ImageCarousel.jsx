import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * Carrusel liviano de fotos con fundido cruzado (reemplaza a Ignite UI).
 * - Avanza solo cada `interval` ms, salvo con "reducir movimiento" activado
 *   o mientras la pestaña está oculta.
 * - Los puntos permiten elegir una foto (y quedan accesibles por teclado).
 */
function ImageCarousel({
    images,
    alt = "Foto",
    interval = 5500,
    className = "h-150 md:h-90 lg:h-155",
    showIndicators = true,
    indicatorsClassName = "bottom-14",
}) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    // Pausa elegida por el usuario (botón). Con "reducir movimiento" arranca pausado.
    const reducedMotion = usePrefersReducedMotion();
    const [userStopped, setUserStopped] = useState(null);
    const stopped = userStopped ?? reducedMotion;
    const count = images.length;

    useEffect(() => {
        if (count <= 1 || paused || stopped) return;
        const id = setInterval(() => {
            if (!document.hidden) setActive((i) => (i + 1) % count);
        }, interval);
        return () => clearInterval(id);
    }, [count, interval, paused, stopped, active]);

    return (
        <div
            className={`relative w-full overflow-hidden bg-primary-dark ${className}`}
            role="group"
            aria-roledescription="carrusel"
            aria-label={alt}
        >
            {images.map((src, index) => (
                <div
                    key={src}
                    className="carousel-slide absolute inset-0"
                    data-active={index === active}
                    aria-hidden={index !== active}
                >
                    <img
                        src={src}
                        alt={`${alt} (${index + 1} de ${count})`}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            ))}

            {showIndicators && count > 1 && (
                <div
                    className={`absolute inset-x-0 z-10 flex items-center justify-center gap-1.5 ${indicatorsClassName}`}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    <button
                        type="button"
                        onClick={() => setUserStopped(!stopped)}
                        aria-label={stopped ? "Reanudar el pase de fotos" : "Pausar el pase de fotos"}
                        className="focus-light mr-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                            {stopped ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
                        </svg>
                    </button>
                    {images.map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setActive(index)}
                            aria-label={`Ver foto ${index + 1} de ${count}`}
                            aria-current={index === active ? "true" : undefined}
                            className="focus-light flex h-6 min-w-6 items-center justify-center px-1 cursor-pointer"
                        >
                            <span
                                className={`block h-1.5 rounded-full shadow-sm transition-all duration-500 ${
                                    index === active ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageCarousel;

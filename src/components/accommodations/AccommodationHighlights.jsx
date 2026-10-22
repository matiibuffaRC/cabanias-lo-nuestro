import { useEffect, useRef, useState } from "react";

function Reveal({ children }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
        >
            {children}
        </div>
    );
}

function HighlightBlock({ item, index }) {
    const reversed = index % 2 === 1;

    return (
        <Reveal>
            <article
                className={`flex flex-col items-center gap-8 md:gap-12 ${
                    reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
                {/* Imagen con marco desfasado detrás */}
                <div className="group relative isolate w-full md:flex-3">
                    {/* Marco decorativo: se acerca a la foto al pasar el mouse */}
                    <span
                        aria-hidden="true"
                        className={`absolute inset-0 -z-10 rounded-3xl border-2 border-[#3E6143]/25 bg-[#3E6143]/5 transition-transform duration-500 ease-out motion-reduce:transition-none ${
                            reversed
                                ? "-translate-x-3 translate-y-3 group-hover:-translate-x-1.5 group-hover:translate-y-1.5"
                                : "translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                        }`}
                    />

                    <div className="relative overflow-hidden rounded-3xl shadow-[0_18px_36px_-16px_rgba(62,97,67,0.55)]">
                        <img
                            src={item.img}
                            alt={item.alt ?? item.title}
                            loading="lazy"
                            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                        />

                        {/* Degradado suave abajo para dar profundidad */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/25 to-transparent"
                        />

                        {/* Borde interno sutil */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30"
                        />

                        {/* Número sobre la foto */}
                        <span className="titles absolute left-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/40 bg-[#3E6143]/60 text-sm font-bold tracking-wider text-white backdrop-blur-sm">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                <div className="w-full px-2 text-center md:flex-2 md:text-left">
                    <h3 className="titles text-2xl font-bold text-[#3E6143]">
                        {item.title}
                    </h3>
                    <span
                        className="mx-auto my-3 block h-0.75 w-12 rounded-full bg-[#3E6143]/40 md:mx-0"
                        aria-hidden="true"
                    />
                    <p className="text-lg leading-relaxed text-[#757575]">{item.text}</p>
                </div>
            </article>
        </Reveal>
    );
}

function AccommodationHighlights({ highlights, slug }) {
    return (
        <section className="flex w-full max-w-6xl flex-col items-center px-8 py-10 md:px-10">
            <h2 className="titles text-center text-[1.8rem] font-bold text-[#3E6143]">
                Conocé el alojamiento
            </h2>
            <span className="my-4 block h-0.75 w-14 rounded-full bg-[#3E6143]/40" />

            <div className="mt-6 flex w-full flex-col gap-14 md:gap-20">
                {highlights.map((item, index) => (
                    <HighlightBlock key={`${slug}-${index}`} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

export default AccommodationHighlights;
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
                className={`flex flex-col items-center gap-6 md:gap-10 ${
                    reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
                <div className="group w-full overflow-hidden rounded-2xl border border-[#3E6143]/10 shadow-md md:flex-3">
                    <img
                        src={item.img}
                        alt={item.alt ?? item.title}
                        loading="lazy"
                        className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                </div>

                <div className="w-full px-2 text-center md:flex-2 md:text-left">
                    <span className="titles text-[.85rem] font-bold tracking-widest text-[#3E6143]/50">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="titles mt-1 text-2xl font-bold text-[#3E6143]">
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
        <section className="flex w-full max-w-6xl flex-col items-center px-5 py-10">
            <h2 className="titles text-center text-[1.8rem] font-bold text-[#3E6143]">
                Conocé el alojamiento
            </h2>
            <span className="my-4 block h-0.75 w-14 rounded-full bg-[#3E6143]/40" />

            <div className="mt-6 flex w-full flex-col gap-12 md:gap-16">
                {highlights.map((item, index) => (
                    <HighlightBlock key={`${slug}-${index}`} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

export default AccommodationHighlights;

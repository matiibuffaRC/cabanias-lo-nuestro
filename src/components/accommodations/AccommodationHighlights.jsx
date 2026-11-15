import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";

function HighlightBlock({ item, index }) {
    const reversed = index % 2 === 1;

    return (
        <Reveal
            as="article"
            className={`flex flex-col items-center gap-7 md:gap-12 ${reversed ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
            {/* Foto con marco desfasado detrás */}
            <div className="group relative isolate w-full md:flex-3">
                <span
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 rounded-3xl border-2 border-primary/20 bg-primary/5 transition-transform duration-500 ease-out ${
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
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-video"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/25"
                    />
                </div>
            </div>

            <div className="w-full px-1 text-center md:flex-2 md:text-left">
                <h3 className="titles text-[1.5rem] font-bold leading-tight text-primary md:text-[1.65rem]">
                    {item.title}
                </h3>
                <span aria-hidden="true" className="mx-auto my-3 block h-0.75 w-10 rounded-full bg-accent/70 md:mx-0" />
                <p className="mx-auto max-w-prose text-[1.05rem] leading-relaxed text-muted md:mx-0 md:text-lg">
                    {item.text}
                </p>
            </div>
        </Reveal>
    );
}

function AccommodationHighlights({ highlights, slug }) {
    return (
        <section aria-labelledby="highlights-title" className="flex w-full max-w-6xl flex-col items-center px-6 py-12 md:px-10 md:py-16">
            <SectionHeading id="highlights-title" title="Conocé el lugar" />

            <div className="mt-10 flex w-full flex-col gap-16 md:mt-14 md:gap-24">
                {highlights.map((item, index) => (
                    <HighlightBlock key={`${slug}-${index}`} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

export default AccommodationHighlights;

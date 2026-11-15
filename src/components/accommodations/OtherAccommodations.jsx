import { Link } from "react-router-dom";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";
import { accommodation } from "../../data/accommodation";

/** Enlaces a los otros tipos de alojamiento, para seguir recorriendo sin volver al inicio. */
function OtherAccommodations({ currentSlug }) {
    const others = accommodation.filter((item) => item.slug !== currentSlug);

    return (
        <section aria-labelledby="otros-title" className="w-full max-w-5xl px-5 pb-20 pt-4">
            <SectionHeading id="otros-title" title="Otros alojamientos" />

            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {others.map((item, index) => (
                    <Reveal as="li" key={item.slug} delay={index * 0.1}>
                        <Link
                            to={`/alojamiento/${item.slug}`}
                            className="group relative flex h-56 overflow-hidden rounded-3xl shadow-md shadow-primary/15 md:h-64"
                        >
                            <img
                                src={item.cardImage}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-primary-dark/85 via-primary-dark/30 to-transparent" />
                            <span className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 text-left text-white md:p-6">
                                <span className="min-w-0">
                                    <span className="titles block text-[1.4rem] font-bold leading-tight">{item.title}</span>
                                    <span className="mt-1 block text-[.9rem] leading-snug text-white/85">{item.cardText}</span>
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </span>
                        </Link>
                    </Reveal>
                ))}
            </ul>
        </section>
    );
}

export default OtherAccommodations;

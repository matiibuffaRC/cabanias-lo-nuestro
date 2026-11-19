import { Link } from "react-router-dom";
import Reveal from "../shared/Reveal";

function AccommodationCard({ section, index }) {
    const isLeft = index % 2 === 0;
    const position = isLeft ? "md:left-10 lg:left-16" : "md:right-10 lg:right-16";

    return (
        <Reveal as="article" className="section-card relative h-135 w-full overflow-hidden lg:h-150">
            <img
                src={section.img}
                alt={section.alt}
                loading="lazy"
                decoding="async"
                className="section-card-img h-full w-full object-cover object-center transition-transform duration-700 ease-out"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

            <div
                className={`absolute inset-x-4 bottom-6 flex flex-col rounded-[2rem] bg-primary-dark/70 p-6 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-md md:inset-x-auto md:bottom-auto md:top-1/2 md:w-[min(32rem,46%)] md:-translate-y-1/2 md:p-8 ${position}`}
            >
                <h3 className="titles text-2xl font-bold leading-tight lg:text-3xl">{section.title}</h3>
                <span aria-hidden="true" className="mb-3 mt-2.5 block h-0.75 w-12 rounded-full bg-white/60" />
                <p className="text-base leading-relaxed text-white/90 md:text-lg">{section.description}</p>

                <Link
                    to={`/alojamiento/${section.route}`}
                    className="focus-light group/btn relative mt-5 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 font-bold text-primary shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-left scale-x-0 bg-primary-wash transition-transform duration-500 ease-out group-hover/btn:scale-x-100"
                    />
                    <span className="relative">{section.cta}</span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative size-4 transition-transform duration-300 group-hover/btn:translate-x-1">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </Reveal>
    );
}

export default AccommodationCard;

import { Link } from "react-router-dom";

function SectionCard({ section, index }) {
    const isLeft = index % 2 === 0;

    const position = isLeft
        ? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0"
        : "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0";

    return (
        <div
            className="section-card h-135 lg:h-150 relative w-full overflow-hidden fade-down"
            style={{ animationDelay: `${index * 0.15}s` }}
        >
            <img
                src={section.img}
                alt={section.alt}
                loading="lazy"
                decoding="async"
                className="section-card-img w-full h-full object-cover object-center transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

            <div
                className={`absolute w-[90%] top-10 lg:w-150 bg-primary/70 backdrop-blur-[2px] p-5 text-white rounded-3xl md:max-w-1/2 shadow-lg ${position}`}
            >
                <h2 className="titles-and-subtitles text-[1.8rem] lg:text-[2rem] font-bold py-2">
                    {section.title}
                </h2>
                <p className="titles-and-subtitles text-[1rem] md:text-[.9rem] lg:text-[1.2rem]">
                    {section.description}
                </p>
                <div className="my-5">
                    <Link
                        to={`/alojamiento/${section.route}`}
                        aria-label={`Saber más sobre ${section.title}`}
                        className="titles-and-subtitles font-bold bg-primary-light border border-primary py-2 px-3 rounded-xl hover:bg-primary transition-colors duration-200 inline-block"
                    >
                        Saber más
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SectionCard;

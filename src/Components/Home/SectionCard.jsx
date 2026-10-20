import { Link } from "react-router-dom";

function SectionCard({ section, index }) {
    const isLeft = index % 2 === 0;

    const position = isLeft
        ? "left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0"
        : "right-1/2 translate-x-1/2 md:right-10 md:translate-x-0";

    return (
        <div className="section-card h-135 lg:h-150 relative w-full overflow-hidden fade-down" style={{ animationDelay: `${index * 0.15}s` }} >
            <img
                src={section.img}
                alt={section.alt}
                loading="lazy"
                decoding="async"
                className="section-card-img w-full h-full object-cover object-center transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"/>

            <div className={`absolute w-[90%] top-10 lg:w-150 bg-[#3E6143]/50 backdrop-blur-[2px] p-5 text-white flex flex-col justify-center rounded-4xl md:max-w-1/2 shadow-lg  ${position}`} >
                <h2 className="titles text-[1.8rem] lg:text-[2rem] font-bold pt-2">
                    {section.title}
                </h2>

                {/* Línea decorativa */}
                <span className="block h-0.5 w-2/3 rounded-full bg-white/60 mb-3" aria-hidden="true" />

                <p className="titles text-md md:text-lg lg:text-lg leading-relaxed">
                    {section.description}
                </p>

                <div className="my-5 ">
                    <Link
                        to={`/alojamiento/${section.route}`}
                        aria-label={`Saber más sobre ${section.title}`}
                        className="group relative inline-flex items-center gap-2 overflow-hidden titles font-bold bg-primary-light border border-primary py-2 px-5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3E6143]"
                    >
                        {/* Fondo que se completa de izquierda a derecha */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-primary origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />

                        <span className="relative z-10">Saber más</span>

                        {/* Icono flecha */}
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SectionCard;

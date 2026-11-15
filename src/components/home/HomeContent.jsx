import AccommodationCard from "./AccommodationCard";
import WhatsAppFloatingButton from "../layout/WhatsAppButton";
import QueHacer from "../layout/QueHacer.jsx";
import Reveal from "../shared/Reveal";
import SectionHeading from "../shared/SectionHeading";
import useScrollImageEffect from "../../hooks/useScrollImageEffect";
import ServicesBand from "./ServicesBand";

import presentationImage from "../../assets/images/piletaConDormis.jpg";
import frenteImage from "../../assets/images/frente21.jpg";
import patioImage from "../../assets/images/patioBien.jpg";
import patioImage2 from "../../assets/images/patio3.jpeg";

import LogoMinaClavero from "../../assets/icons/MinaClaveroLogo.png";

const SECTIONS = [
    {
        img: patioImage,
        alt: "Patio del complejo Lo Nuestro con parquizado y zona de descanso",
        title: "Complejo Lo Nuestro",
        description:
            "El lugar ideal en la entrada de Mina Clavero para recorrer los atractivos de la zona y disfrutar de unas vacaciones inolvidables.",
        route: "complejo",
        cta: "Conocer el complejo",
    },
    {
        img: frenteImage,
        alt: "Frente de las cabañas de Lo Nuestro",
        title: "Cabañas",
        description:
            "Espacios diseñados para ofrecer una estadía cómoda y relajante. Ideales para grupos o familias de hasta 4 personas.",
        route: "cabins",
        cta: "Ver las cabañas",
    },
    {
        img: patioImage2,
        alt: "Patio frente a los dormis de Lo Nuestro",
        title: "Dormis",
        description:
            "El espacio ideal para un descanso cómodo y práctico. Con baño privado, capacidad para 4 personas y equipamiento para desayunar.",
        route: "dormis",
        cta: "Ver los dormis",
    },
];

function HomeContent() {
    const heroRef = useScrollImageEffect();

    return (
        <div className="relative flex flex-col items-center bg-surface">
            {/* Hero: queda fijo y el resto del contenido lo tapa al scrollear */}
            <div ref={heroRef} className="sticky top-0 z-0 h-[min(82vh,44rem)] min-h-[30rem] w-full overflow-hidden">
                <div className="scroll-image-effect absolute inset-0">
                    <img
                        src={presentationImage}
                        alt="Pileta del complejo Lo Nuestro con los dormis al fondo"
                        fetchPriority="high"
                        className="hero-image h-full w-full object-cover object-center"
                    />
                </div>

                {/* Velo + degradé inferior, donde vive el texto */}
                <div aria-hidden="true" className="absolute inset-0 bg-[#1F3524]/25" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#1F3524]/80 via-[#1F3524]/20 via-50% to-transparent" />

                <div className="absolute inset-x-0 bottom-16 flex flex-col items-center px-5 text-center md:bottom-20">
                    <p
                        className="titles fade-down text-[.85rem] font-semibold tracking-[0.12em] text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] md:text-[.95rem]"
                    >
                        Mina Clavero, Traslasierra
                    </p>
                    <h1
                        className="titles fade-down mt-2 text-[2.3rem] font-bold leading-[1.05] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.55)] sm:text-[3rem] md:text-[3.8rem]"
                        style={{ animationDelay: "0.1s" }}
                    >
                        Tu descanso empieza acá
                    </h1>
                    <p
                        className="fade-down mt-3 max-w-xl text-[1rem] font-medium leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] md:text-[1.1rem]"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Cabañas y dormis con pileta, a 5 minutos del centro y de los ríos.
                    </p>
                    <a
                        href="#alojamientos"
                        className="titles fade-down focus-light mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[.95rem] font-bold text-primary shadow-lg transition-[translate,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-xl"
                        style={{ animationDelay: "0.3s" }}
                    >
                        Ver los alojamientos
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                            <path d="M12 5v14" />
                            <path d="m19 12-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Todo lo que sigue se desliza por encima del hero */}
            <div className="relative z-10 -mt-8 flex w-full flex-col items-center rounded-t-4xl bg-surface shadow-[0_-14px_30px_-14px_rgba(0,0,0,0.3)]">
                {/* Presentación */}
                <section aria-labelledby="intro-title" className="w-full max-w-5xl px-5 pb-12 pt-14 md:pb-14 md:pt-20">
                    <SectionHeading
                        id="intro-title"
                        title="Lo Nuestro, complejo de alojamiento en Traslasierra"
                        lead="Somos un complejo vacacional a la entrada de Mina Clavero: el punto de partida para recorrer los ríos y las sierras del valle."
                    />
                </section>

                <ServicesBand />

                {/* Alojamientos */}
                <section id="alojamientos" aria-labelledby="alojamientos-title" className="mt-12 w-full scroll-mt-20 md:mt-16">
                    <SectionHeading
                        id="alojamientos-title"
                        title="Elegí tu alojamiento"
                        lead="Dos cabañas y tres dormis dentro del mismo complejo, todos con acceso a la pileta."
                        className="px-5"
                    />
                    <div className="mt-10 flex w-full flex-col gap-2">
                        {SECTIONS.map((section, index) => (
                            <AccommodationCard key={section.route} section={section} index={index} />
                        ))}
                    </div>
                </section>

                <QueHacer />

                {/* Cierre con logo */}
                <Reveal as="section" aria-labelledby="cierre-title" className="flex w-full flex-col items-center px-5 pb-16 pt-6 text-center">
                    <h2 id="cierre-title" className="titles mb-2 text-3xl font-bold text-primary lg:text-4xl">
                        En el corazón de Mina Clavero
                    </h2>
                    <p className="mb-6 max-w-md text-lg font-medium text-muted">
                        A minutos de los principales atractivos del Valle de Traslasierra.
                    </p>
                    <img
                        src={LogoMinaClavero}
                        alt="Logo de la ciudad de Mina Clavero"
                        loading="lazy"
                        decoding="async"
                        className="size-56 object-contain md:size-72"
                    />
                </Reveal>
            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default HomeContent;

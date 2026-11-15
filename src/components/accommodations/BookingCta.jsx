import Reveal from "../shared/Reveal";
import { getWhatsAppUrl } from "../../config/contact";

const CHECKS = ["Disponibilidad", "Precios", "Sin compromiso"];

/** Bloque verde de "Consultar por WhatsApp" al final de cada alojamiento. */
function BookingCta({ title, message }) {
    return (
        <Reveal
            as="section"
            aria-labelledby="cta-title"
            className="focus-light relative isolate mx-auto my-14 flex w-[calc(100%-2.5rem)] max-w-3xl flex-col items-center overflow-hidden rounded-[2rem] bg-linear-to-br from-primary via-[#34553A] to-primary-dark px-6 py-12 text-center shadow-xl shadow-primary/25 md:px-14 md:py-14"
        >
            <span aria-hidden="true" className="pointer-events-none absolute -left-14 -top-14 -z-10 size-48 rounded-full bg-white/10" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-12 -z-10 size-56 rounded-full bg-primary-soft/25" />

            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[.8rem] font-semibold text-white">
                <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full rounded-full bg-[#8FE0A0] opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#8FE0A0]" />
                </span>
                Respondemos todos los días
            </p>

            <h2 id="cta-title" className="titles text-[1.6rem] font-bold leading-tight text-white md:text-[2.1rem]">
                {title}
            </h2>
            <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-white/80">
                Escribinos y te contamos disponibilidad, precios y todo lo que necesites saber.
            </p>

            <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-flex max-w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-6 py-3.5 text-center titles font-bold leading-tight text-primary sm:px-8 shadow-lg shadow-black/20 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
            >
                <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 bg-primary-wash transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative size-5">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                <span className="relative">Consultar por WhatsApp</span>
                <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[.85rem] text-white/75">
                {CHECKS.map((item) => (
                    <li key={item} className="inline-flex items-center gap-1.5">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-[#8FE0A0]">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {item}
                    </li>
                ))}
            </ul>
        </Reveal>
    );
}

export default BookingCta;

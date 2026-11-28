import Reveal from "../shared/Reveal";
import BookingForm from "../shared/BookingForm";
import { getWhatsAppUrl } from "../../config/contact";

const CHECKS = ["Disponibilidad", "Precios", "Sin compromiso"];

/** Bloque verde al final de cada alojamiento, con el formulario de consulta por WhatsApp. */
function BookingCta({ title, message, stay = "" }) {
    return (
        <Reveal
            as="section"
            aria-labelledby="cta-title"
            className="focus-light relative isolate mx-auto my-14 flex w-[calc(100%-2.5rem)] max-w-3xl flex-col items-center overflow-hidden rounded-[2rem] bg-linear-to-br from-primary via-[#34553A] to-primary-dark px-4 py-12 text-center shadow-xl shadow-primary/25 sm:px-6 md:px-14 md:py-14"
        >
            <span aria-hidden="true" className="pointer-events-none absolute -left-14 -top-14 -z-10 size-48 rounded-full bg-white/10" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-12 -z-10 size-56 rounded-full bg-primary-soft/25" />

            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
                <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full rounded-full bg-[#8FE0A0] opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#8FE0A0]" />
                </span>
                Respondemos todos los días
            </p>

            <h2 id="cta-title" className="titles px-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                {title}
            </h2>
            <p className="mt-3 max-w-md px-2 text-base leading-relaxed text-white/80">
                Contanos las fechas y cuántos son: te respondemos con disponibilidad y precios.
            </p>

            <BookingForm defaultStay={stay} className="mt-8 max-w-xl" />

            <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            >
                Prefiero escribir mi propio mensaje
                <span className="sr-only"> (se abre WhatsApp en una pestaña nueva)</span>
            </a>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/75">
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

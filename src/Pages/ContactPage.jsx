import { useId, useState } from "react";
import presentationImage from "../assets/images/piletaConDormis.jpg";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton.jsx";
import Testimonials from "../components/layout/Testimonials.jsx";
import ReglasCondiciones from "../components/layout/ReglasCondiciones.jsx";
import Reveal from "../components/shared/Reveal";
import SectionHeading from "../components/shared/SectionHeading";
import MaskIcon from "../components/shared/MaskIcon";
import useScrollImageEffect from "../hooks/useScrollImageEffect";
import { FACEBOOK_URL, getWhatsAppUrl } from "../config/contact";

import WhatsAppIcon from "../assets/icons/whatsappIcon.svg";
import FacebookIcon from "../assets/icons/facebookIcon.svg";

const CONTACTS = [
    {
        icon: WhatsAppIcon,
        title: "WhatsApp",
        detail: "Escribile a Cristian",
        href: getWhatsAppUrl("Hola, quisiera hacer una consulta sobre Lo Nuestro"),
        tone: "bg-[#2DB742] text-white",
    },
    {
        icon: FacebookIcon,
        title: "Facebook",
        detail: "Lo Nuestro",
        href: FACEBOOK_URL,
        tone: "bg-[#1877F2] text-white",
    },
];

// ⚠️ Revisá que estas respuestas coincidan con tus condiciones reales
const FAQS = [
    {
        q: "¿En qué horarios atienden?",
        a: "Respondemos mensajes todos los días. Si no contestamos enseguida, es porque estamos ocupados; te escribimos apenas podamos.",
    },
    {
        q: "Seña y política de cancelación",
        a: "La reserva se confirma con una seña del 30%. Si cancelás con más de 15 días de anticipación, te devolvemos la seña. Con menos tiempo, la seña no es reembolsable pero podemos reprogramar tu fecha según disponibilidad.",
    },
    {
        q: "¿Qué medios de pago aceptan?",
        a: "Trabajamos con transferencias bancarias y efectivo. El saldo restante se abona al ingresar. Lo coordinamos con vos por WhatsApp.",
    },
    {
        q: "Temporada alta y fines de semana largos",
        a: "En vacaciones de verano, invierno y fines de semana largos el mínimo de noches puede ser mayor y las tarifas cambian. Consultanos las fechas que tenés en mente.",
    },
];

/* Un ítem del acordeón */
function FaqItem({ q, a, open, onToggle }) {
    const id = useId();

    return (
        <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300 ${open ? "border-primary/30" : "border-primary/10"}`}>
            <h3>
                <button
                    type="button"
                    id={`${id}-btn`}
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left md:px-5"
                >
                    <span className="titles text-base font-bold text-primary">{q}</span>
                    <span
                        aria-hidden="true"
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-[rotate,background-color,color] duration-300 ${
                            open ? "rotate-180 bg-primary text-white" : "bg-primary/10 text-primary"
                        }`}
                    >
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </span>
                </button>
            </h3>

            {/* Truco grid-rows: anima la altura sin conocerla */}
            <div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-btn`}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-left text-base leading-relaxed text-muted md:px-5">{a}</p>
                </div>
            </div>
        </div>
    );
}

function ContactPage() {
    const [openIndex, setOpenIndex] = useState(0);
    const heroRef = useScrollImageEffect();

    return (
        <div className="bg-surface">
            <div ref={heroRef} className="relative h-[min(60vh,32rem)] min-h-72 w-full overflow-hidden">
                <div className="scroll-image-effect absolute inset-0">
                    <img
                        src={presentationImage}
                        alt="Pileta del complejo Lo Nuestro"
                        fetchPriority="high"
                        className="hero-image h-full w-full object-cover object-center"
                    />
                </div>
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-primary-dark/40 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 -mt-8 rounded-t-4xl bg-surface px-5 pb-16 pt-11 text-center">
                <h1 className="titles fade-down text-3xl font-bold text-primary md:text-4xl">Contactanos</h1>
                <p className="fade-down mx-auto mt-2 max-w-md text-lg text-muted" style={{ animationDelay: "0.1s" }}>
                    Escribinos por el medio que prefieras: te respondemos a la brevedad.
                </p>

                <ul className="mx-auto my-8 grid max-w-md gap-3 md:max-w-2xl md:grid-cols-2">
                    {CONTACTS.map((contact, index) => (
                        <li key={contact.title} className="fade-down" style={{ animationDelay: `${0.2 + index * 0.12}s` }}>
                            <a
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-4 text-left shadow-sm transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${contact.tone}`}>
                                    <MaskIcon src={contact.icon} className="size-6" />
                                </span>
                                <span className="flex min-w-0 flex-col">
                                    <span className="titles truncate text-lg font-bold text-primary">{contact.title}</span>
                                    <span className="truncate text-sm text-muted">{contact.detail}</span>
                                </span>
                                <span className="sr-only">(se abre en una pestaña nueva)</span>
                                <svg aria-hidden="true" className="ml-auto size-4 shrink-0 text-primary/40 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>

                <Testimonials />
                <ReglasCondiciones />

                {/* Preguntas frecuentes */}
                <section aria-labelledby="faq-title" className="mx-auto mt-6 max-w-md md:max-w-3xl">
                    <SectionHeading id="faq-title" title="Preguntas frecuentes" className="mb-8" />
                    <div className="flex flex-col gap-3">
                        {FAQS.map((item, i) => (
                            <Reveal key={item.q} delay={i * 0.08}>
                                <FaqItem
                                    {...item}
                                    open={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            </Reveal>
                        ))}
                    </div>
                </section>
            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default ContactPage;

import { useState, useEffect, useRef } from "react";
import presentationImage from "../assets/images/piletaConDormis.jpg";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton.jsx";

import WhatsAppIcon from "../assets/icons/whatsappIcon.svg";
import FacebookIcon from "../assets/icons/facebookIcon.svg";

const CONTACTS = [
    { icon: WhatsAppIcon, title: "WhatsApp", name: "Cristian", href: "https://wa.me/5493564507240" },
    { icon: FacebookIcon, title: "Facebook", name: "Lo Nuestro", href: "https://www.facebook.com/p/Lo-Nuestro-100054220102040/" },
];

// ⚠️ Texto de ejemplo: reemplazalo por tus preguntas reales
const FAQS = [
    { q: "¿Cómo puedo hacer una consulta o reserva?", a: "Escribinos por WhatsApp o Facebook y te respondemos a la brevedad con disponibilidad y precios." },
    { q: "¿En qué horarios atienden?", a: "Respondemos mensajes todos los días. Si no contestamos enseguida, es porque estamos ocupados; te escribimos apenas podamos." },
    { q: "¿Dónde están ubicados?", a: "Estamos a la entrada de Mina Clavero. Te pasamos la ubicación exacta por WhatsApp cuando coordinemos con vos para que no tengas problemas con ubicarnos." },
    { q: "¿Qué medios de pago aceptan?", a: "Trabajamos con transferencias bancarias y entregas en efectivo, lo podemos coordinar una vez que nos contactemos." },
];

/* Hook: marca un elemento como visible cuando entra en pantalla */
function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, visible];
}

/* Un ítem del acordeón */
function FaqItem({ q, a, open, onToggle }) {
    return (
        <div className="bg-white rounded-2xl border border-[#3E6143]/10 shadow-sm overflow-hidden">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-4 p-4 text-left cursor-pointer"
            >
                <span className="titles font-bold text-[1rem] text-[#3E6143]">{q}</span>
                <svg
                    className={`w-4 h-4 text-[#3E6143]/60 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </button>

            {/* Truco grid-rows: anima la altura sin conocerla */}
            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[.95rem] text-[#3E6143]/70 text-left">{a}</p>
                </div>
            </div>
        </div>
    );
}

function ContactPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [faqRef, faqVisible] = useInView();

    // Parallax suave del hero
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="pt-16.25 bg-[#F1F3EE]">
            <div className="h-135 relative w-full overflow-hidden">
                <img
                    src={presentationImage}
                    alt="Patio de atrás"
                    className="hero-image w-full h-full object-cover object-center will-change-transform"
                    style={{ transform: `translateY(${Math.min(scrollY * 0.25, 120)}px) scale(1.1)` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#2A4530]/25 via-transparent to-transparent" />
            </div>

            <div className="text-center py-10 px-5">
                <h2 className="text-[2rem] titles font-bold text-[#3E6143] fade-down">Contactanos</h2>
                <p className="text-[#3E6143]/70 max-w-md mx-auto mt-2 fade-down" style={{ animationDelay: "0.1s" }}>
                    Escribinos por el medio que prefieras, te respondemos a la brevedad.
                </p>

                <div className="flex flex-col md:flex-row md:max-w-3xl md:justify-center gap-3 my-6 max-w-md mx-auto">
                    {CONTACTS.map((contact, index) => (
                        <a
                            key={contact.title}
                            href={contact.href}
                            target={contact.href.startsWith("http") ? "_blank" : undefined}
                            rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            aria-label={`${contact.title} - ${contact.name}`}
                            className="fade-down flex flex-row items-center gap-4 bg-white rounded-2xl p-4 hover:scale-102 shadow-sm border border-[#3E6143]/10 transition-transform duration-200 active:scale-[0.98]"
                            style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                        >
                            <div className="h-12 w-12 rounded-full bg-[#3E6143]/10 flex items-center justify-center shrink-0">
                                <img src={contact.icon} alt="" className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col text-left min-w-0">
                                <h3 className="titles font-bold text-[1rem] text-[#3E6143] truncate">{contact.title}</h3>
                                <h3 className="titles text-[.9rem] text-[#3E6143]/60 truncate">{contact.name}</h3>
                            </div>
                            <svg className="w-4 h-4 text-[#3E6143]/40 shrink-0 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Preguntas frecuentes */}
                <section ref={faqRef} className="max-w-md md:max-w-3xl mx-auto mt-14">
                    <h2 className="text-[1.5rem] titles font-bold text-[#3E6143] mb-5">Preguntas frecuentes</h2>
                    <div className="flex flex-col gap-3">
                        {FAQS.map((item, i) => (
                            <div
                                key={item.q}
                                className={`transition-all duration-700 ease-out ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <FaqItem
                                    {...item}
                                    open={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <WhatsAppFloatingButton />
        </div>
    );
}

export default ContactPage;
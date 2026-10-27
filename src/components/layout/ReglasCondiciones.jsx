import { useState, useEffect, useRef } from "react";

const DEFAULT_HIGHLIGHTS = [
    { emoji: "🔑", label: "Check-in", value: "14:00 hs", note: "Desde esa hora podés ingresar" },
    { emoji: "🚪", label: "Check-out", value: "10:00 hs", note: "Hasta esa hora se libera" },
    { emoji: "🌙", label: "Mínimo de noches", value: "2 noches", note: "En temporada alta puede variar" },
    { emoji: "👨‍👩‍👧‍👦", label: "Capacidad máxima", value: "6 personas", note: "Consultá por persona extra" },
    { emoji: "🐾", label: "Mascotas", value: "Consultar", note: "Según tamaño y cantidad" },
    { emoji: "💳", label: "Seña", value: "30%", note: "Para confirmar la reserva" },
];


/* Hook: marca un elemento como visible cuando entra en pantalla */
function useInView(threshold = 0.1) {
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

function HighlightCard({ emoji, label, value, note, index, visible }) {
    return (
        <div
            className={`group relative overflow-hidden flex flex-col items-center gap-1.5 bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-[#3E6143]/10 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#3E6143]/10 hover:border-[#3E6143]/25 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            <span className="absolute top-0 left-0 h-1 w-10 bg-linear-to-r from-[#3E6143] to-[#6E9B72] rounded-br-full transition-all duration-500 group-hover:w-full" />
            <div className="h-11 w-11 rounded-full bg-linear-to-br from-[#3E6143]/10 to-[#6E9B72]/25 flex items-center justify-center text-[1.3rem] mb-1 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <span aria-hidden="true">{emoji}</span>
            </div>
            <span className="text-[.7rem] titles font-bold tracking-wider uppercase text-[#6E9B72]">{label}</span>
            <span className="titles font-bold text-[1.15rem] md:text-[1.25rem] leading-tight text-[#3E6143]">{value}</span>
            <span className="text-[.8rem] leading-snug text-[#3E6143]/60">{note}</span>
        </div>
    );
}

function RuleItem({ q, a, open, onToggle }) {
    return (
        <div
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors duration-300 ${
                open ? "border-[#3E6143]/30" : "border-[#3E6143]/10"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-4 p-4 text-left cursor-pointer"
            >
                <span className="titles font-bold text-[1rem] text-[#3E6143]">{q}</span>
                <span
                    className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                        open ? "bg-[#3E6143] text-white rotate-180" : "bg-[#3E6143]/10 text-[#3E6143]"
                    }`}
                >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </button>

            <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[.92rem] leading-relaxed text-[#3E6143]/75 text-left">{a}</p>
                </div>
            </div>
        </div>
    );
}

function ReglasCondiciones({ highlights = DEFAULT_HIGHLIGHTS }) {
    const [ref, visible] = useInView();
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section
            ref={ref}
            id="reglas"
            className="relative isolate overflow-hidden w-full px-5 py-14 text-center"
            aria-labelledby="reglas-title"
        >
            <div className="pointer-events-none absolute -z-10 top-0 right-0 h-56 w-56 rounded-full bg-[#6E9B72]/15 blur-3xl" />

            <div className="max-w-md md:max-w-3xl mx-auto">
                {/* Encabezado */}
                <div
                    className={`mb-8 transition-all duration-700 ease-out ${
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                >
                    <span className="inline-block text-[.75rem] titles font-bold tracking-widest uppercase text-[#6E9B72] mb-2">
                        Antes de reservar
                    </span>
                    <h2 id="reglas-title" className="text-[1.5rem] md:text-[1.75rem] titles font-bold text-[#3E6143]">
                        Reglas y condiciones
                    </h2>
                    <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#3E6143]/20 overflow-hidden">
                        <div
                            className={`h-full bg-[#3E6143] rounded-full transition-all duration-1000 ease-out ${
                                visible ? "w-full" : "w-0"
                            }`}
                            style={{ transitionDelay: "300ms" }}
                        />
                    </div>
                    <p className="text-[#3E6143]/70 max-w-md mx-auto mt-3">
                        Lo principal para organizar tu estadía, así evitamos idas y vueltas.
                    </p>
                </div>

                {/* Datos clave */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {highlights.map((item, i) => (
                        <HighlightCard key={item.label} {...item} index={i} visible={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ReglasCondiciones;

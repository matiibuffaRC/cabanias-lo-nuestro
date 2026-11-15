import useInView from "../../hooks/useInView";
import SectionHeading from "../shared/SectionHeading";

const DEFAULT_HIGHLIGHTS = [
    { emoji: "🔑", label: "Check-in", value: "14:00 hs", note: "Desde esa hora podés ingresar" },
    { emoji: "🚪", label: "Check-out", value: "10:00 hs", note: "Hasta esa hora se libera" },
    { emoji: "🌙", label: "Mínimo de noches", value: "2 noches", note: "En temporada alta puede variar" },
    { emoji: "👨‍👩‍👧‍👦", label: "Capacidad máxima", value: "4 personas", note: "Por cabaña o dormi" },
    { emoji: "🐾", label: "Mascotas", value: "Consultar", note: "Según tamaño y cantidad" },
    { emoji: "💳", label: "Seña", value: "30%", note: "Para confirmar la reserva" },
];

function ReglasCondiciones({ highlights = DEFAULT_HIGHLIGHTS }) {
    const [ref, visible] = useInView({ threshold: 0.1 });

    return (
        <section
            id="reglas"
            className="relative isolate w-full overflow-hidden px-0 py-14 text-center md:px-5"
            aria-labelledby="reglas-title"
        >
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-10 size-56 rounded-full bg-primary-soft/15 blur-3xl" />

            <div className="mx-auto max-w-md md:max-w-3xl">
                <SectionHeading
                    id="reglas-title"
                    title="Reglas y condiciones"
                    lead="Lo principal para organizar tu estadía, así evitamos idas y vueltas."
                    className="mb-8"
                />

                <dl ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                    {highlights.map((item, index) => (
                        <div
                            key={item.label}
                            style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
                            className={`flex flex-col items-center gap-1 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition-[opacity,translate] duration-500 ease-out md:p-5 ${
                                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                            }`}
                        >
                            <span aria-hidden="true" className="mb-1 flex size-11 items-center justify-center rounded-full bg-primary-wash text-[1.3rem]">
                                {item.emoji}
                            </span>
                            <dt className="text-[.85rem] font-medium text-muted">{item.label}</dt>
                            <dd className="titles text-[1.2rem] font-bold leading-tight text-primary md:text-[1.3rem]">{item.value}</dd>
                            <dd className="text-[.82rem] leading-snug text-muted">{item.note}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

export default ReglasCondiciones;

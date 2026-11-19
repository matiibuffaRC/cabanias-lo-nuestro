import MaskIcon from "./MaskIcon";
import useInView from "../../hooks/useInView";

/**
 * Lista de comodidades: ícono + nombre (+ detalle opcional).
 * Se usa en el inicio y en cada tipo de alojamiento. No son botones, así
 * que no reaccionan al hover: solo aparecen en cascada al entrar en pantalla.
 */
function AmenityGrid({ items, columns = 3, className = "" }) {
    const [ref, visible] = useInView({ threshold: 0.1 });

    const cols =
        columns === 4
            ? "min-[440px]:grid-cols-2 lg:grid-cols-4"
            : columns === 2
            ? "min-[440px]:grid-cols-2"
            : "min-[440px]:grid-cols-2 md:grid-cols-3";

    return (
        <ul ref={ref} className={`grid grid-cols-1 gap-x-6 gap-y-1 ${cols} ${className}`}>
            {items.map((item, index) => (
                <li
                    key={item.title}
                    style={{ transitionDelay: visible ? `${Math.min(index, 8) * 60}ms` : "0ms" }}
                    className={`flex items-center gap-3.5 rounded-2xl px-2 py-3 text-left transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
                        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
                    }`}
                >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-wash text-primary">
                        <MaskIcon src={item.img} className="size-6" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                        <span className="titles text-base font-bold leading-snug text-primary-dark">
                            {item.title}
                        </span>
                        {item.note && (
                            <span className="text-sm leading-snug text-muted">{item.note}</span>
                        )}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export default AmenityGrid;

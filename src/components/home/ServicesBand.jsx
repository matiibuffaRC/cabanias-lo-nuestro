import MaskIcon from "../shared/MaskIcon";
import useInView from "../../hooks/useInView";
import { HOME_SERVICES } from "./homeServices";

/**
 * "Lo que ofrecemos" del inicio: banda verde de lado a lado con los servicios en fila.
 * En vez de seis tarjetas sueltas, una sola franja con divisiones finas:
 * se lee de un vistazo y marca el pase de la presentación a los alojamientos.
 */
function ServicesBand() {
    const [ref, visible] = useInView({ threshold: 0.2 });

    return (
        <section
            aria-labelledby="ofrecemos-band-title"
            className="relative isolate w-full overflow-hidden bg-linear-to-br from-primary to-primary-dark px-4 py-12 text-white sm:px-5 md:py-14"
        >
            <span aria-hidden="true" className="pointer-events-none absolute -left-16 -top-20 -z-10 size-64 rounded-full bg-white/6" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-10 -z-10 size-72 rounded-full bg-primary-soft/20" />

            <div className="mx-auto max-w-6xl">
                <h2 id="ofrecemos-band-title" className="titles text-center text-2xl font-bold md:text-3xl">
                    Lo que ofrecemos
                </h2>
                <span aria-hidden="true" className="mx-auto mb-9 mt-2 block h-0.75 w-12 rounded-full bg-white/45" />

                <ul
                    ref={ref}
                    className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 md:grid-cols-3 lg:grid-cols-6"
                >
                    {HOME_SERVICES.map((service, index) => (
                        <li
                            key={service.id}
                            className="flex min-w-0 flex-col items-center gap-2.5 bg-primary px-3 py-6 text-center sm:px-4 md:py-7"
                        >
                            <span
                                style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
                                className={`flex size-13 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20 transition-[opacity,scale] duration-500 ease-out ${
                                    visible ? "scale-100 opacity-100" : "scale-75 opacity-0 motion-reduce:scale-100 motion-reduce:opacity-100"
                                }`}
                            >
                                <MaskIcon src={service.img} className="size-6.5 text-white" />
                            </span>
                            <span className="titles w-full text-sm font-bold leading-tight [overflow-wrap:anywhere] hyphens-auto min-[380px]:text-base">
                                {service.title}
                            </span>
                            <span className="-mt-1 text-xs leading-snug text-white/75 md:text-sm">
                                {service.description}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default ServicesBand;

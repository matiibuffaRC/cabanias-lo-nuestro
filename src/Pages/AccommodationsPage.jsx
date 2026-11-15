import { useParams } from "react-router-dom";
import { accommodation } from "../data/accommodation";
import AccommodationHighlights from "../components/accommodations/AccommodationHighlights";
import BookingCta from "../components/accommodations/BookingCta";
import OtherAccommodations from "../components/accommodations/OtherAccommodations";
import AmenityGrid from "../components/shared/AmenityGrid";
import ImageCarousel from "../components/shared/ImageCarousel";
import Reveal from "../components/shared/Reveal";
import WhatsAppFloatingButton from "../components/layout/WhatsAppButton";
import useScrollImageEffect from "../hooks/useScrollImageEffect";
import NotFoundPage from "./NotFoundPage";

function AccommodationsPage() {
    const { tipo } = useParams();
    const data = accommodation.find((item) => item.slug === tipo);

    if (!data) return <NotFoundPage />;
    return <AccommodationContent key={tipo} data={data} />;
}

/** Datos rápidos debajo del título (capacidad, entrada, etc.). */
function QuickFacts({ facts }) {
    return (
        <dl className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm sm:grid-cols-3">
            {facts.map((fact) => (
                <div
                    key={fact.label}
                    className="flex flex-col gap-0.5 border-primary/10 px-5 py-4 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r"
                >
                    <dt className="text-[.82rem] text-muted">{fact.label}</dt>
                    <dd className="titles text-[1.08rem] font-bold leading-snug text-primary">{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}

/** Panel "Qué incluye": comodidades propias y, si hay, espacios compartidos. */
function AmenitiesPanel({ data }) {
    const own = data.services.filter((s) => !s.shared);
    const shared = data.services.filter((s) => s.shared);
    const isComplex = data.slug === "complejo";

    return (
        <section aria-labelledby="incluye-title" className="w-full max-w-5xl px-5 py-8 md:py-12">
            <Reveal className="rounded-[2rem] border border-primary/10 bg-white px-5 py-8 shadow-[0_20px_40px_-28px_rgba(42,69,48,0.45)] sm:px-8 md:px-12 md:py-12">
                <div className="grid gap-x-12 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end">
                    <div className="text-left">
                        <h2 id="incluye-title" className="titles text-[1.65rem] font-bold leading-tight text-primary md:text-[2rem]">
                            {isComplex ? "Servicios del complejo" : "Qué incluye"}
                        </h2>
                        <span aria-hidden="true" className="mt-3 block h-0.75 w-12 rounded-full bg-primary/35" />
                    </div>
                    {data.informationText && (
                        <p className="text-left text-[.98rem] leading-relaxed text-muted md:text-[1.02rem]">
                            {data.informationText}
                        </p>
                    )}
                </div>

                <AmenityGrid items={own} className="mt-8" />

                {shared.length > 0 && (
                    <div className="mt-8 rounded-3xl bg-surface px-4 py-5 sm:px-6">
                        <h3 className="titles px-2 text-left text-[1.05rem] font-bold text-primary-dark">
                            Espacios compartidos del complejo
                        </h3>
                        <AmenityGrid items={shared} columns={3} className="mt-2" />
                    </div>
                )}
            </Reveal>
        </section>
    );
}

function AccommodationContent({ data }) {
    const carouselRef = useScrollImageEffect();
    const ctaTitle =
        data.slug === "complejo"
            ? "¿Querés reservar en Lo Nuestro?"
            : `¿Te gustaría reservar ${data.slug === "cabins" ? "una cabaña" : "un dormi"}?`;

    return (
        <div className="flex flex-col items-center bg-surface">
            {/* Carrusel: queda fijo y el resto del contenido lo tapa al scrollear */}
            <div ref={carouselRef} className="sticky top-0 z-0 w-full overflow-hidden">
                <div className="scroll-image-effect">
                    <ImageCarousel
                        images={data.photos}
                        alt={`Fotos de ${data.title.toLowerCase()}`}
                        className="h-[min(72vh,40rem)] min-h-[24rem]"
                    />
                </div>
            </div>

            {/* Todo lo que sigue se desliza por encima del carrusel */}
            <div className="relative z-10 -mt-8 flex w-full flex-col items-center rounded-t-4xl bg-surface shadow-[0_-14px_30px_-14px_rgba(0,0,0,0.3)]">
                <header className="flex w-full flex-col items-center px-5 pb-4 pt-11 text-center fade-down">
                    <h1 className="titles text-[2.2rem] font-bold leading-tight text-primary md:text-[2.8rem]">
                        {data.title}
                    </h1>
                    <span aria-hidden="true" className="my-4 block h-0.75 w-14 rounded-full bg-primary/35" />
                    <p className="max-w-2xl text-[1.05rem] font-medium leading-relaxed text-muted md:text-lg">
                        {data.description}
                    </p>
                    {data.facts?.length > 0 && <QuickFacts facts={data.facts} />}
                </header>

                {data.highlights?.length > 0 && (
                    <AccommodationHighlights highlights={data.highlights} slug={data.slug} />
                )}

                <AmenitiesPanel data={data} />

                <BookingCta
                    title={ctaTitle}
                    message={`Hola, quisiera consultar por ${data.title.toLowerCase()} de Lo Nuestro`}
                />

                <OtherAccommodations currentSlug={data.slug} />
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default AccommodationsPage;

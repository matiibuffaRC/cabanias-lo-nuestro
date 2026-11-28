import { useEffect, useId, useRef, useState } from "react";
import { getWhatsAppUrl } from "../../config/contact";
import { trackEvent } from "../../lib/analytics";

// Formulario de consulta: arma el mensaje de WhatsApp con fechas, personas y alojamiento.
// No envía nada por su cuenta: abre WhatsApp con el texto listo y la persona lo manda.

const STAYS = [
    { value: "cabins", label: "Cabaña", text: "Cabaña" },
    { value: "dormis", label: "Dormi", text: "Dormi" },
    { value: "", label: "Me da igual", text: "Cabaña o dormi, lo que esté libre" },
];
const ADULTS = Array.from({ length: 10 }, (_, i) => i + 1);
const KIDS = Array.from({ length: 9 }, (_, i) => i);
const DAY_MS = 86_400_000;

// Fechas siempre en hora local ("YYYY-MM-DD" es lo que usan los <input type="date">)
const parseDate = (value) => {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
};
const toInputDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const addDays = (value, days) => {
    const date = parseDate(value);
    date.setDate(date.getDate() + days);
    return toInputDate(date);
};
const nightsBetween = (from, to) => Math.round((parseDate(to) - parseDate(from)) / DAY_MS);
const formatDate = (value) =>
    new Intl.DateTimeFormat("es-AR", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }).format(
        parseDate(value)
    );
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function buildBookingMessage({ stay, checkIn, checkOut, adults, kids, name, comment }) {
    const stayText = STAYS.find((s) => s.value === stay)?.text ?? STAYS[2].text;
    const nights = nightsBetween(checkIn, checkOut);
    const people = plural(adults, "adulto", "adultos") + (kids > 0 ? ` y ${plural(kids, "menor", "menores")}` : "");

    const lines = [
        "¡Hola! Quisiera consultar disponibilidad en Lo Nuestro:",
        "",
        `• Alojamiento: ${stayText}`,
        `• Llegada: ${formatDate(checkIn)}`,
        `• Salida: ${formatDate(checkOut)} (${plural(nights, "noche", "noches")})`,
        `• Personas: ${people}`,
    ];
    if (comment.trim()) lines.push("", comment.trim());
    if (name.trim()) lines.push("", `Soy ${name.trim()}. ¡Gracias!`);
    return lines.join("\n");
}

const LABEL = "mb-1.5 block text-sm font-semibold text-primary-dark";
const FIELD =
    "block min-h-12 w-full rounded-xl border border-primary/15 bg-surface-alt px-3.5 py-2.5 text-base text-primary-dark transition-colors duration-200 hover:border-primary/30 focus:border-primary focus:bg-white [&::-webkit-date-and-time-value]:text-left";

function BookingForm({ defaultStay = "", className = "" }) {
    const id = useId();
    const checkInRef = useRef(null);
    const [form, setForm] = useState({
        stay: defaultStay,
        checkIn: "",
        checkOut: "",
        adults: 2,
        kids: 0,
        name: "",
        comment: "",
    });
    const [error, setError] = useState("");

    // La fecha mínima se pone recién en el navegador: la página se pre-renderiza al compilar
    // y "hoy" no es el mismo día ahí que cuando alguien la visita.
    useEffect(() => {
        if (checkInRef.current) checkInRef.current.min = toInputDate(new Date());
    }, []);

    const update = (field) => (event) => {
        const value = ["adults", "kids"].includes(field) ? Number(event.target.value) : event.target.value;
        setError("");
        setForm((prev) => {
            const next = { ...prev, [field]: value };
            // Si la llegada pasa a ser igual o posterior a la salida, la salida se vacía
            if (field === "checkIn" && next.checkOut && value && next.checkOut <= value) next.checkOut = "";
            return next;
        });
    };

    const nights = form.checkIn && form.checkOut ? nightsBetween(form.checkIn, form.checkOut) : 0;
    const totalPeople = form.adults + form.kids;

    const handleSubmit = (event) => {
        event.preventDefault();
        const today = toInputDate(new Date());
        if (!form.checkIn || !form.checkOut) return setError("Elegí la fecha de llegada y la de salida.");
        if (form.checkIn < today) return setError("La fecha de llegada ya pasó.");
        if (nights < 1) return setError("La salida tiene que ser después de la llegada.");

        trackEvent("consulta_whatsapp", {
            pagina: location.pathname,
            alojamiento: form.stay || "indistinto",
            noches: nights,
            personas: totalPeople,
        });

        const url = getWhatsAppUrl(buildBookingMessage(form));
        const win = window.open(url, "_blank");
        if (win) win.opener = null;
        else window.location.assign(url); // si el navegador bloqueó la pestaña nueva, abre en la misma
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={`${id}-note`}
            className={`focus-dark w-full rounded-3xl bg-white p-5 text-left text-primary-dark shadow-lg sm:p-7 ${className}`}
        >
            <fieldset>
                <legend className={LABEL}>¿Qué alojamiento buscás?</legend>
                <div className="grid grid-cols-3 gap-2">
                    {STAYS.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                            <input
                                type="radio"
                                name={`${id}-stay`}
                                value={option.value}
                                checked={form.stay === option.value}
                                onChange={update("stay")}
                                className="peer sr-only"
                            />
                            <span className="flex h-full min-h-11 items-center justify-center rounded-xl border border-primary/15 bg-surface-alt px-2 py-2 text-center text-sm font-semibold leading-tight transition-colors duration-200 hover:border-primary/35 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor={`${id}-in`} className={LABEL}>
                        Llegada
                    </label>
                    <input
                        ref={checkInRef}
                        id={`${id}-in`}
                        type="date"
                        required
                        value={form.checkIn}
                        onChange={update("checkIn")}
                        className={FIELD}
                    />
                </div>
                <div>
                    <label htmlFor={`${id}-out`} className={LABEL}>
                        Salida
                    </label>
                    <input
                        id={`${id}-out`}
                        type="date"
                        required
                        min={form.checkIn ? addDays(form.checkIn, 1) : undefined}
                        value={form.checkOut}
                        onChange={update("checkOut")}
                        className={FIELD}
                    />
                </div>

                <div>
                    <label htmlFor={`${id}-adults`} className={LABEL}>
                        Adultos
                    </label>
                    <select id={`${id}-adults`} value={form.adults} onChange={update("adults")} className={FIELD}>
                        {ADULTS.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor={`${id}-kids`} className={LABEL}>
                        Menores
                    </label>
                    <select id={`${id}-kids`} value={form.kids} onChange={update("kids")} className={FIELD}>
                        {KIDS.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-5">
                <label htmlFor={`${id}-name`} className={LABEL}>
                    Tu nombre <span className="font-normal text-muted">(opcional)</span>
                </label>
                <input
                    id={`${id}-name`}
                    type="text"
                    autoComplete="given-name"
                    maxLength={60}
                    value={form.name}
                    onChange={update("name")}
                    className={FIELD}
                />
            </div>

            <div className="mt-5">
                <label htmlFor={`${id}-comment`} className={LABEL}>
                    ¿Algo más que quieras contarnos? <span className="font-normal text-muted">(opcional)</span>
                </label>
                <textarea
                    id={`${id}-comment`}
                    rows={2}
                    maxLength={400}
                    placeholder="Ej: viajamos con una mascota, llegamos tarde…"
                    value={form.comment}
                    onChange={update("comment")}
                    className={`${FIELD} resize-y placeholder:text-muted/70`}
                />
            </div>

            <p role="alert" className="mt-4 min-h-5 text-sm font-semibold text-[#B3261E] empty:mt-0 empty:min-h-0">
                {error}
            </p>

            <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1F8F3A] px-6 py-3.5 text-center font-bold text-white shadow-md shadow-[#1F8F3A]/25 transition-[background-color,translate] duration-200 hover:bg-[#187530] active:translate-y-px"
            >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                {nights > 0
                    ? `Consultar ${plural(nights, "noche", "noches")} · ${plural(totalPeople, "persona", "personas")}`
                    : "Armar consulta por WhatsApp"}
            </button>

            <p id={`${id}-note`} className="mt-3 text-center text-xs leading-relaxed text-muted">
                Se abre WhatsApp con el mensaje listo. No se envía nada hasta que lo confirmes.
            </p>
        </form>
    );
}

export default BookingForm;

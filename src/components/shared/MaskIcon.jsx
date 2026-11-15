/**
 * Pinta un ícono SVG externo con el color del texto (currentColor) usando
 * mask-image. Así todos los íconos quedan en el verde del sitio aunque el
 * archivo original venga en negro o azul.
 */
function MaskIcon({ src, className = "size-6" }) {
    const mask = `url("${src}") center / contain no-repeat`;
    return (
        <span
            aria-hidden="true"
            className={`inline-block shrink-0 bg-current ${className}`}
            style={{ mask, WebkitMask: mask }}
        />
    );
}

export default MaskIcon;

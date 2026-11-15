import useInView from "../../hooks/useInView";

/**
 * Aparece suavemente cuando entra en pantalla (no al montar la página),
 * así los bloques de más abajo animan recién cuando el usuario llega a ellos.
 */
function Reveal({ as = "div", children, delay = 0, className = "", ...rest }) {
    const Tag = as;
    const [ref, visible] = useInView();

    return (
        <Tag
            ref={ref}
            style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
            className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            } ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
}

export default Reveal;

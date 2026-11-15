import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="flex min-h-[80vh] flex-col items-center justify-center bg-surface px-5 pb-16 pt-28 text-center">
            <p aria-hidden="true" className="titles text-[4.5rem] font-bold leading-none text-primary/70 md:text-[6rem]">404</p>
            <h1 className="titles mt-2 text-[1.9rem] font-bold text-primary"><span className="sr-only">Error 404: </span>No encontramos esta página</h1>
            <p className="mt-3 max-w-md text-muted">
                Puede que el enlace esté mal escrito o que la página ya no exista. Desde el inicio podés ver todos nuestros alojamientos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                    to="/"
                    className="titles rounded-full bg-primary px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-primary-dark"
                >
                    Ir al inicio
                </Link>
                <Link
                    to="/contact"
                    className="titles rounded-full border border-primary/30 px-6 py-3 font-bold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                    Contactarnos
                </Link>
            </div>
        </section>
    );
}

export default NotFoundPage;

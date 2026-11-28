import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/layout/ScrollToTop";
import HomePage from "../pages/HomePage";
import PageMetadata from "../components/seo/PageMetadata";
import usePageTracking from "../hooks/usePageTracking";

// El inicio va en el paquete principal (es la página más visitada).
// El resto se descarga recién cuando alguien entra a esa página.
const AccommodationsPage = lazy(() => import("../pages/AccommodationsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const MapPage = lazy(() => import("../pages/MapPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function App() {
  usePageTracking();

  return (
    <>
      {/* Accesibilidad: permite saltar el menú con el teclado */}
      <a
        href="#contenido"
        className="fixed left-4 top-3 z-300 -translate-y-24 rounded-full bg-white px-5 py-2.5 font-bold text-primary shadow-lg transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <PageMetadata />
      <Header />
      <ScrollToTop />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen bg-surface" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/alojamiento/:tipo" element={<AccommodationsPage />} />
            <Route path="/comoLlegar" element={<MapPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;

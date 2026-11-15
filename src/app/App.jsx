import { Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/layout/ScrollToTop";
import AccommodationsPage from "../Pages/AccommodationsPage";
import ContactPage from "../Pages/ContactPage";
import HomePage from "../Pages/HomePage";
import MapPage from "../Pages/MapPage";
import NotFoundPage from "../Pages/NotFoundPage";
import PageMetadata from "../components/seo/PageMetadata";

function App() {
  return (
    <>
      {/* Accesibilidad: permite saltar el menú con el teclado */}
      <a
        href="#contenido"
        className="titles fixed left-4 top-3 z-300 -translate-y-24 rounded-full bg-white px-5 py-2.5 font-bold text-primary shadow-lg transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <PageMetadata />
      <Header />
      <ScrollToTop />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alojamiento/:tipo" element={<AccommodationsPage />} />
          <Route path="/comoLlegar" element={<MapPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

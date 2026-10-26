import { Route, Routes } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/layout/ScrollToTop";
import AccommodationsPage from "../Pages/AccommodationsPage";
import ContactPage from "../Pages/ContactPage";
import HomePage from "../Pages/HomePage";
import MapPage from "../Pages/MapPage";
import PageMetadata from "../components/seo/PageMetadata";

function App() {
  return (
    <>
      <PageMetadata />
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alojamiento/:tipo" element={<AccommodationsPage />} />
        <Route path="/comoLlegar" element={<MapPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

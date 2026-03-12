import { useRef} from "react";
import HeaderComponent from './Components/Header/HeaderComponent';
import FooterComponent from "./Components/Footer/FooterComponent";
import './App.css';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import ScrollToTop from "../src/Components/ScrollToTop/ScrollToTopComponent";

// Importamos las pages

import HomePage from "./Pages/HomePage";
import AccommodationsPage from "./Pages/AccommodationsPage";
import MapPage from "./Pages/MapPage";
import ContactPage from "./Pages/ContactPage";

function App() {

  const inicieRef = useRef(null);
  // const aboutUsRef = useRef(null);
  // const accomodationsRef = useRef(null);
  // const galleryRef = useRef(null);
  // const contactRef = useRef(null);


  const scrollToSection = (ref) =>{
    ref.current?.scrollIntoView({behavior : 'smooth'});
  }

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/alojamiento/:tipo" element={<AccommodationsPage />}></Route>
        <Route path="/comoLlegar" element={<MapPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
      </Routes>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default App

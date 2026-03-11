import { useRef} from "react";
import HeaderComponent from './Components/Header/HeaderComponent';
import FooterComponent from "./Components/Footer/FooterComponent";
import './App.css';
import { BrowserRouter ,Routes, Route } from "react-router-dom";

// Importamos las pages

import HomePage from "./Pages/HomePage";
import AccommodationsPage from "./Pages/AccommodationsPage";


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
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/alojamiento/:tipo" element={<AccommodationsPage />}></Route>
      </Routes>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default App

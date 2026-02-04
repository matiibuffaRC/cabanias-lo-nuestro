import { useRef} from "react";
import HeaderComponent from './Components/Header/HeaderComponent';
import InicieComponent from './Components/Inicie/InicieComponent';
import AboutUsComponent from './Components/AboutUs/AboutUsComponent';
import AccomodationsComponent from './Components/Accomodations/AccomodationsComponent';
import GalleryComponent from './Components/Gallery/GalleryComponent';
import ContactComponent from './Components/Contact/ContactComponent';
import FooterComponent from './Components/Footer/FooterComponent';

import './App.css'

function App() {

  const inicieRef = useRef(null);
  const aboutUsRef = useRef(null);
  const accomodationsRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);


  const scrollToSection = (ref) =>{
    ref.current?.scrollIntoView({behavior : 'smooth'});
  }

  return (
    <div>
      <HeaderComponent scrollToSection={scrollToSection} refs={{inicieRef, aboutUsRef, accomodationsRef, galleryRef, contactRef}}></HeaderComponent>
      <main className='main-layout'>
        
        <div ref={inicieRef}>
          <InicieComponent></InicieComponent>
        </div>
        <div ref={aboutUsRef}>
          <AboutUsComponent></AboutUsComponent>
        </div>
        <div ref={accomodationsRef}>
          <AccomodationsComponent ></AccomodationsComponent>
          </div>
        <div ref={galleryRef}>
          <GalleryComponent ></GalleryComponent>
          </div>
        <div ref={contactRef}>
          <ContactComponent ></ContactComponent>
          </div>
        
        
        
      </main>
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default App

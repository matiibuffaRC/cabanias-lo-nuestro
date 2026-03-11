import { useRef} from "react";
import HeaderComponent from './Components/Header/HeaderComponent';
import InicieComponent from './Components/Inicie/InicieComponent';
import './App.css'

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
    <div>
      {/* <HeaderComponent scrollToSection={scrollToSection} refs={{inicieRef, aboutUsRef, accomodationsRef, galleryRef, contactRef}}></HeaderComponent> */}
      <HeaderComponent scrollToSection={scrollToSection} refs={{ inicieRef }}></HeaderComponent>
      <main>
        
        <div ref={inicieRef}>
          <InicieComponent></InicieComponent>
        </div>
        
        
        
        
      </main>
      {/* <FooterComponent></FooterComponent> */}
    </div>
  )
}

export default App

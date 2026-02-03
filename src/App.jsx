import HeaderComponent from './Components/Header/HeaderComponent';
import InicieComponent from './Components/Inicie/InicieComponent';
import AboutUsComponent from './Components/AboutUs/AboutUsComponent';
import AccomodationsComponent from './Components/Accomodations/AccomodationsComponent';
import GalleryComponent from './Components/Gallery/GalleryComponent';
import ContactComponent from './Components/Contact/ContactComponent';
import FooterComponent from './Components/Footer/FooterComponent';

import './App.css'

function App() {

  return (
    <div className='flex flex-col'>
      <HeaderComponent></HeaderComponent>
      <main className='main-layout'>
        <InicieComponent></InicieComponent>
        <AboutUsComponent></AboutUsComponent>
        <AccomodationsComponent></AccomodationsComponent>
        <GalleryComponent></GalleryComponent>
        <ContactComponent></ContactComponent>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  )
}

export default App

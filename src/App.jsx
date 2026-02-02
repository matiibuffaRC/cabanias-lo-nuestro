import HeaderComponent from './Components/Header/HeaderComponent';
import InicieComponent from './Components/Inicie/InicieComponent';
import AboutUsComponent from './Components/AboutUs/AboutUsComponent';
import AccomodationsComponent from './Components/Accomodations/AccomodationsComponent';
import GalleryComponent from './Components/Gallery/GalleryComponent';

import './App.css'

function App() {

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <main className='main-layout'>
        <InicieComponent></InicieComponent>
        <AboutUsComponent></AboutUsComponent>
        <AccomodationsComponent></AccomodationsComponent>
        <GalleryComponent></GalleryComponent>
      </main>
    </div>
  )
}

export default App

import HeaderComponent from './Components/Header/HeaderComponent';
import InicieComponent from './Components/Inicie/InicieComponent';
import AboutUsComponent from './Components/AboutUs/AboutUsComponent';

import './App.css'

function App() {

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <main className='main-layout'>
        <InicieComponent></InicieComponent>
        <AboutUsComponent></AboutUsComponent>

      </main>
    </div>
  )
}

export default App

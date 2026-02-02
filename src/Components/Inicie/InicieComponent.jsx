import "./InicieComponent.css"
import ImgPatio from "../../imgs/patio.jpg"
import whatsappIcon from "../../icons/whatsappIcon.svg";
import BedIcon from "../../icons/BedIcon.svg";
import WifiIcon from "../../icons/WifiIcon.svg";
import CarIcon from "../../icons/CarIcon.svg";
import GrillIcon from "../../icons/GrillIcon.svg";
import AirIcon from "../../icons/AirIcon.svg";
import TvIcon from "../../icons/TvIcon.svg";

function InicieComponent() {
    return (  
        <div className="h-full flex flex-col justify-center items-center mx-0 px-5">
            <div className="bg-[#3E6143] text-white  rounded-[15px] flex flex-col justify-center shadow-xl md:max-w-3xl md:flex-row-reverse  md:p-0 lg:max-w-5xl fade-down">
                <div>
                    <img src={ImgPatio} alt="" className="rounded-t-[15px] md:rounded-none md:rounded-r-[15px] md:h-full md:object-cover"/>
                </div>

                <div className="py-4 flex flex-col items-center md:w-[50%] justify-center md:px-2.5 lg:w-[40%]">
                    <h1 className="titles text-[1.5rem] text-center md:text-[1.7rem] lg:text-[2rem]">Complejo Lo Nuestro</h1>
                    <h2 className="titles text-[1.5rem] text-center pb-1 md:text-[1.7rem] lg:text-[2rem]">Mina Clavero</h2>
                    <h3 className="text-[#ddd] text-[1rem] text-center p-2 md:p-0">Desde 2015, nuestro complejo de alojamiento abre sus puertas para ofrecer una experiencia única de descanso y confort. Pensado para quienes buscan tranquilidad, comodidad y un descanso merecido en las sierras cordobesas.</h3>
                    <div className="md:w-full flex flex-row justify-center mt-3">
                        <a href="https://wa.me/5493564507240" target="__blank" className="flex flex-row gap-1.5 my-2 items-center justify-center bg-[#344d38] w-45 py-2.5 border rounded-[25px] border-white">
                            <img src={whatsappIcon}
                            alt="Whatsapp" 
                            className="cursor-pointer w-5 h-5 invert"/>
                            Contactanos
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden w-full md:mx-5 md:max-w-3xl md:flex md:flex-row gap-5 mt-8 rounded-[20px] lg:max-w-5xl text-[#3E6143] font-bold">
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={BedIcon} alt="bed" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Confort</h4>
                    <h4 className="text-[.7rem]">Habitaciones cómodas.</h4>
                </div>
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={WifiIcon} alt="wifi" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Wifi</h4>
                    <h4 className="text-[.7rem]">Internet gratis</h4>
                </div>
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={CarIcon} alt="car" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Vehículos</h4>
                    <h4 className="text-[.7rem]">Estacionamiento individual</h4>
                </div>
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={GrillIcon} alt="grill" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Comidas</h4>
                    <h4 className="text-[.7rem]">Parrillas</h4>
                </div>
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={AirIcon} alt="air" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Comodidad</h4>
                    <h4 className="text-[.7rem]">Aire acondicionado</h4>
                </div>
                <div className="container-hover flex-1 flex flex-col items-start justify-start bg-white rounded-[10px] p-4 pb-2 hover:bg-[#3E6143] hover:text-white cursor-pointer fade-down shadow-lg">
                    <img src={TvIcon}alt="tv" className="text-[#3E6143] hover-img"/>
                    <h4 className="text-[.8rem] mt-1">Diversión</h4>
                    <h4 className="text-[.7rem]">Television</h4>
                </div>
            </div>
        </div>
    ) 
}

export default InicieComponent  
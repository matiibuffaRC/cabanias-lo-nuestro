import "./AboutUsComponent.css";
import ImgFrente from "../../imgs/frente.jpg";
import Carousel from "../Carousel/Carousel";
import { carouselImages } from "../../data/carouselImages";

function AboutUsComponent() {
    return (
        <div className="bg-[#F1F3EE] min-h-[calc(100vh-65px)] w-full p-0 flex flex-col items-center justify-center">
            <div className="bg-white p-3 border border-red-500 ">
                <h2 className="mt-5 text-[1.5rem] w-full">Complejo de cabañas y dormis</h2>
                <h3 className="text-[1.5rem] w-full">Lo nuestro.</h3>
            </div>

        </div>
    )
}

export default AboutUsComponent

{/* <Carousel images={carouselImages} /> */}
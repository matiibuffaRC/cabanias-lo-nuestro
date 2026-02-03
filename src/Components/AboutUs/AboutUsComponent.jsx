import { useEffect, useRef } from "react";
import "./AboutUsComponent.css";
import ImgFrente from "../../imgs/frente.jpg";
import Carousel from "../Carousel/Carousel";
import { carouselImages } from "../../data/carouselImages";

function AboutUsComponent() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const items =
                        sectionRef.current.querySelectorAll(".fade-down-about");

                    items.forEach(el => el.classList.add("show"));
                    observer.disconnect(); 
                }
        },
        { threshold: 0.3 }
    );

    if (sectionRef.current) {
        observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-[#F1F3EE] min-h-screen w-full flex flex-col gap-10 items-center justify-center ">

            <div ref={sectionRef} className="bg-white mx-5 lg:w-5xl rounded-[25px] py-6 px-4 md:py-10 lg:px-15 shadow-xl">
                <div className="mb-5 md:flex md:gap-2.5 md:items-center">
                    <h2 className="text-center md:text-start titles text-[1.4rem] uppercase fade-down">Complejo</h2>
                    <h2 className="text-center md:text-start titles hidden md:block uppercase fade-down">-</h2>
                    <h2 className="text-center md:text-start titles text-[1.4rem] uppercase fade-down">Lo nuestro</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                    <div className="flex flex-col md:flex-1 items-center gap-2">
                        <div className="flex flex-col md:flex-row gap-2">
                        <div className="md:flex-1 fade-down-about delay-1">
                            <img
                                src={ImgFrente}
                                alt="Complejo"
                                className="rounded-[25px] w-full h-full object-cover shadow-xl"
                            />
                        </div>

                        <div className="bg-[#F2F3EE] rounded-[25px] shadow-md p-3 flex-1 fade-down-about delay-2">
                            <h2 className="titles text-[1.3rem]">Cabañas familiares</h2>
                            <h3>Diseñadas para brindar una experiencia única en el valle de traslasierras.</h3>
                        </div>
                    </div>

                    <div className="p-3 fade-down-about delay-3">
                        <h2 className="titles text-[1.2rem] lg:text-[1.3rem]">Ubicación</h2>
                            <h3 className="md:text-[.7rem] lg:text-[1rem]">Nos encontramos a la entrada de la ciudad de Mina Clavero desde las Altas Cumbres, con cercanía con el centro de la ciudad, principales ríos y supermercados de la misma.</h3>
                            <h4 className="text-[.9rem] md:text-[.7rem] lg:text-[1rem] pl-3 md:pt-3"> - 2 cuadras de estación GNC.</h4>
                            <h4 className="text-[.9rem] md:text-[.7rem] lg:text-[1rem] pl-3 md:pt-1"> - 8 cuadras del centro.</h4>
                            <h4 className="text-[.9rem] md:text-[.7rem] lg:text-[1rem] pl-3 md:pt-1"> - 10 cuadras del rio Mina Clavero.</h4>
                            <h4 className="text-[.9rem] md:text-[.7rem] lg:text-[1rem] pl-3 md:pt-1"> - 10 cuadras del rio San Sebastián.</h4>
                            <h4 className="text-[.9rem] md:text-[.7rem] lg:text-[1rem] pl-3 md:pt-1"> - 2 cuadras de la rotonda de ingreso.</h4>
                        </div>
                    </div>

                    <div className="md:flex-1 shadow-xl rounded-[25px] flex justify-center fade-down-about delay-4">
                        <Carousel images={carouselImages}/>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

export default AboutUsComponent;

import { useEffect, useRef } from "react";
import './AccomodationsComponent.css'
import cabaniaImg from "../../imgs/habitacionCarrusel.jpg"
import dormiImg from "../../imgs/dormis1.jpg"


function AccomodationsComponent() {

    const accomodationsRef = useRef(null);
    
        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        const items =
                            accomodationsRef.current.querySelectorAll(".fade-down-accomodations");
    
                        items.forEach(el => el.classList.add("show"));
                        observer.disconnect(); 
                    }
            },
            { threshold: 0.3 }
        );
    
        if (accomodationsRef.current) {
            observer.observe(accomodationsRef.current);
        }
    
        return () => observer.disconnect();
        }, []);


    const accomodations = [
        {
            id: 1,
            img: cabaniaImg,
            type: "Cabañas",
            for: "(4 personas)",
            amenities: "Las cabañas ofrecen una cómoda cocina-comedor equipada con vajilla para cuatro personas, televisión, aire acondicionado y heladera. En el exterior, cada cabaña dispone de su propia cochera, tendedero y asador individual, además de acceso a la pileta compartida del complejo."
            
        },{
            id: 2,
            img: dormiImg,
            type: "Dormis",
            for: "(4 personas)",
            amenities: "Los dormis cuentan con una habitación compartida para cuatro personas, baño privado, elementos para la preparación del desayuno, aire acondicionado y televisión. En el exterior, cada unidad dispone de cochera individual, además de un asador y quincho compartido equipado con mesada para el lavado de cubiertos, heladera y tendedero de uso común."
            
        }
    ];

    const printAccomodations = accomodations.map((accomodation)=>{
        return (
                <div key={accomodation.id} className='shadow-xl fade-down-accomodations lg:max-w-100'>
                    <div className='w-full h-80'>
                        <img src={accomodation.img} alt="" className='h-full w-full object-cover object-center'/>
                    </div>
                    <div className='text-center'>
                        <div className='flex items-center justify-center gap-2 pt-3 md:py-2'>
                            <h2 className='titles text-[1.4rem] m-0 p-0'>{accomodation.type}</h2>
                            <h3 className='titles text-[#777] text-[1.1rem] m-0 p-0 underline'>{accomodation.for}</h3>
                        </div>
                        <h4 className='text-left px-4 pb-4 text-[.9rem] md:text-[1rem] md:pb-6 text-[#777]'>
                            {accomodation.amenities}
                        </h4>
                    </div>
                </div>
            )
    })

    

    return (
        <div ref={accomodationsRef} className='min-h-[calc(100vh-65px)] bg-[#F1F3EE] flex flex-col justify-center pt-20 md:pt-0 items-center'>
            <div className=" mx-5 lg:w-5xl py-6 px-4 md:py-10 md:px-10">
                <h2 className='titles text-[1.3rem] text-center md:text-[1.7rem]'>Alojamientos</h2>
                <div className='flex flex-col gap-5 my-4 md:flex-row justify-center '>{printAccomodations}</div>
            </div>
        </div>
    )
}

export default AccomodationsComponent
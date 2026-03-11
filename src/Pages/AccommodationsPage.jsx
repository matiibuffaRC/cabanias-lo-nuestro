import { useParams } from "react-router-dom";
import { accommodation } from "../data/accommodation";
import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";

function AccommodationsPage() {

    const { tipo } = useParams();
    const data = accommodation.find(item => item.slug === tipo);

    if (!data) {
        return <h1>Alojamiento no encontrado</h1>;
    }

    const printAccommodationsServices = () => {
        return(
            data.services.map((service, index)=>{
                return(
                    <div key={index} className="flex flex-row justify-start md:flex-col md:justify-center items-center gap-4 md:gap-2 p-4 md:py-2 md:px-0 fade-down" style={{ animationDelay: `${index * 0.15}s` }}>
                        <img src={service.img} alt="" className="h-10 w-10"/>
                        <h3 className="text-[1.1rem] md:text-[.8rem] text-defect">{service.title}</h3>
                    </div>
                )
            })
        )
    }

    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <CaruselImagesComponente images={data.photos}></CaruselImagesComponente>
            
            <div className="text-center p-5 flex flex-col items-center w-full">
                <h1 className="text-[2rem] titles-and-subtitles font-bold text-[#3E6143]">{data.title}</h1>
                <div className="md:w-140">
                    <p className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3">{data.description}</p>
                </div>
            </div>
            
            <div className="text-center p-5 flex flex-col items-center w-full">
                <h2 className="titles-and-subtitles text-[1.8rem] font-bold text-[#3E6143]">Servicios ofrecidos</h2>
                <div className="md:w-140">
                    <h3 className="text-[.9rem] text-defect font-bold text-[#757575] my-2 px-3 ">{data.informationText}</h3>
                </div>
                
                <div className="my-5 flex flex-col md:grid md:grid-cols-3 md:justify-center lg:w-2xl">
                    {printAccommodationsServices()}
                </div>
            </div>
        </div>
    );
}

export default AccommodationsPage;
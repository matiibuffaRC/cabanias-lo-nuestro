import CarouselGallery from "../CarouselGallery/Carousel.jsx";
import { carouselImages2 } from "../../data/carouselImages2";


function GalleryComponent() {
    return (
        <div className='min-h-[calc(100vh-65px)] bg-[#F1F3EE] pt-10  flex flex-col items-center justify-center'>
            <div className='bg-white flex flex-col items-center justify-center mx-5 p-4  px-4md:w-3xl lg:w-5xl'>
                <h2 className=' py-3 pt-0 titles text-[1.3rem]'>Algunas fotos de más Lo Nuestro...</h2>
                <CarouselGallery images={carouselImages2}/>
            </div>
        </div>
    )
}

export default GalleryComponent
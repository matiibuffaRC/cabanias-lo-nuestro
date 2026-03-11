import { IgrCarousel, IgrCarouselSlide } from 'igniteui-react';
import 'igniteui-webcomponents/themes/light/bootstrap.css';

function CaruselImagesComponent({ images }) {

    return (
        <div className='w-full h-150 md:h-90 lg:h-155   '>

            <IgrCarousel
                hideNavigation={true}
                hideIndicators={true}
                interval={5000}
                disablePauseOnInteraction={true}
            >

                {images.map((image, index) => (
                    <IgrCarouselSlide key={index}>
                        <img
                            src={image}
                            alt=""
                            className='h-full w-full object-cover object-center'
                        />
                    </IgrCarouselSlide>
                ))}

            </IgrCarousel>

        </div>
    )
}

export default CaruselImagesComponent;
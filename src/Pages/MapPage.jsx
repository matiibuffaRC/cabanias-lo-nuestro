import CaruselImagesComponente from "../Components/CarouselImages/CaruselImagesComponent";
import MapaComponent from "../Components/Mapa/MapaComponent";
import WhatsAppFloatingButton from "../Components/WhatsappButton/WhatsAppFloatingButton";

import MinaClavero1 from "../imgs/MinaClavero.jpg";
import MinaClavero2 from "../imgs/MinaClavero2.jpg";

const MinaClaveroPhotos = [MinaClavero1, MinaClavero2];

const ROUTES = [
    {
        title: "Cómo llegar a la entrada de las cabañas",
        description:
            'Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido a su izquierda ya se encuentra con la entrada frontal del complejo.',
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1008.7774544157692!2d-65.0038206407185!3d-31.740215244786018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a3142f657%3A0x5fb0905c56f4d3a1!2sCruz%20Del%20Eje%202080%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773323933919!5m2!1sen!2sar",
    },
    {
        title: "Cómo llegar a la entrada de los dormis",
        description:
            'Tomando la primer calle a la derecha desde la entrada, se hacen 200mtrs se toma la calle "Cruz del Eje". Tras 200mtrs más de recorrido toma la calle "Los Ceibos" a la izquierda y dobla en la proxima calle "Tanti" a la derecha y a 50mtrs ya encuentra la entrada trasera del complejo.',
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.2773267131151!2d-65.00391871550505!3d-31.740217264151354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260a2e3be031%3A0x4412eb98c3c0c23c!2sTanti%202085%2C%20X5889%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1773324731315!5m2!1sen!2sar",
    },
];

function MapPage() {
    return (
        <div className="pt-16.25 bg-[#F1F3EE] flex flex-col items-center">
            <CaruselImagesComponente images={MinaClaveroPhotos} />

            <div className="p-8 text-center max-w-150 fade-down">
                <h2 className="titles-and-subtitles font-bold text-[#3E6143] text-[2rem] my-2">
                    Cómo llegar a Mina Clavero
                </h2>
                <span className="block w-14 h-[3px] bg-[#3E6143]/40 rounded-full mx-auto mb-4" />
                <h3 className="text-defect text-[#757575] leading-relaxed">
                    Mina Clavero queda en la provincia de Córdoba, Argentina, específicamente en el
                    corazón del Valle de Traslasierra. Se ubica al pie de las Sierras Grandes,
                    aproximadamente a 120-150 km de Córdoba Capital y a 110-120 km de Villa Carlos
                    Paz, siendo accesible a través del pintoresco camino de las Altas Cumbres (Ruta
                    Provincial 34).
                </h3>
            </div>

            <div className="px-2 mx-5 mb-14 w-full  max-w-4xl fade-down rounded-2xl overflow-hidden md:shadow-sm">
                <MapaComponent />
            </div>

            <div className="w-full max-w-5xl px-4 mb-6">
                <h3 className="titles-and-subtitles font-bold text-[#3E6143] text-[1.5rem] text-center mb-6 fade-down">
                    Indicaciones detalladas
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 px-4 max-w-5xl w-full">
                {ROUTES.map((route, index) => (
                    <div key={route.title} className="route-card fade-down bg-white rounded-2xl border border-[#3E6143]/15 shadow-sm overflow-hidden flex flex-col" style={{ animationDelay: `${index * 0.15}s` }} >
                        <div className="p-6 flex flex-col items-center text-center gap-3 flex-1">
                            <div className="h-12 w-12 rounded-full bg-[#3E6143]/10 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-[#3E6143]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>

                            <h3 className="text-[#3E6143] text-[1.2rem] titles-and-subtitles font-bold leading-tight">
                                {route.title}
                            </h3>

                            <p className="text-defect text-[.9rem] text-[#757575] leading-relaxed">
                                {route.description}
                            </p>
                        </div>

                        <div className="px-4 pb-4">
                            <iframe src={route.mapSrc} width="350" height="250" className="rounded-xl w-full h-56 md:h-60 lg:h-64" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={route.title} />
                        </div>
                    </div>
                ))}
            </div>

            <WhatsAppFloatingButton bubbleLine1="¿Consultas y reservas?" bubbleLine2="¡Hablemos!" />
        </div>
    );
}

export default MapPage;
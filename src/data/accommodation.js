import complejoPhotoFrente from "../imgs/frente.jpg";
import complejoPhotoPatio from "../imgs/patioBien.jpg";
import complejoPhotoPileta from "../imgs/piletaConDormis.jpg";

import cabaniaPhotoIndoor from "../imgs/habitacion5Carrusel.jpg";
import cabaniaPhotoIndoor2 from "../imgs/habitacion4.2Carrusel.jpg";
import cabaniaPhotoGarage from "../imgs/cocheraCarrusel.jpg";

import dormiPhoto from "../imgs/dormis3.jpeg";
import dormiPhoto2 from "../imgs/dormis1.jpg";
import dormiPhoto3 from "../imgs/dormi.jpg";

import carIcon from "../icons/CarIcon.svg";
import wifiIcon from "../icons/WifiIcon.svg";
import tvIcon from "../icons/TvIcon.svg";
import grillIcon from "../icons/GrillIcon.svg";
import airIcon from "../icons/AirIcon.svg";
import swimmingPoolIcon from "../icons/SwimmingPoolIcon.svg";
import ToysIcon from "../icons/ToysIcon.svg";
import CookingIcon from "../icons/CookingIcon.svg";

export const accommodation = [
    {
        slug: "complejo",
        title: "El Complejo",
        description:
            "Nuestro complejo vacacional está en la entrada de la ciudad de Mina Clavero, a 5 minutos del centro y de los principales ríos y supermercados de la zona. Contamos con 2 cabañas y 3 dormis para brindarte el alojamiento que estás buscando.",
        informationText:
                "Ofrecemos diferentes servicios generales para nuestros huéspedes, así como servicios particulares según el tipo de alojamiento, ya sea cabaña o dormitorio.",
        services: [
            { img: carIcon, title: "Estacionamiento" },
            { img: wifiIcon, title: "Wifi" },
            { img: tvIcon, title: "DirecTV" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: grillIcon, title: "Parrillas" },
            { img: swimmingPoolIcon, title: "Pileta" },
        ],
        photos: [complejoPhotoFrente, complejoPhotoPatio, complejoPhotoPileta],
    },
    {
        slug: "cabins",
        title: "Cabañas",
        description:
            "Nuestras cabañas se encuentran con salida a la calle Cruz del Eje, desde donde tendrán acceso directo a la ruta de ingreso a la ciudad.",
        informationText:
            "En nuestras cabañas encontrarás una cocina-comedor equipada con frigobar y la vajilla necesaria para hasta cuatro personas. Además, cada cabaña cuenta con cochera individual, asador y un tender de ropa privado para mayor comodidad durante tu estadía.",
        services: [
            { img: carIcon, title: "Estacionamiento" },
            { img: wifiIcon, title: "Wifi" },
            { img: tvIcon, title: "DirecTV" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: grillIcon, title: "Parrilla privada" },
            { img: swimmingPoolIcon, title: "Acceso a la pileta" },
            { img: CookingIcon, title: "Cocina privada" },
            { img: ToysIcon, title: "Juegos para los más chicos" },
        ],
        photos: [cabaniaPhotoGarage, cabaniaPhotoIndoor, cabaniaPhotoIndoor2],
    },
    {
        slug: "dormis",
        title: "Dormis",
        description:
            "Nuestros dormis se encuentran con salida a la calle Tanti, paralela a la Cruz del Eje, en una zona tranquila con muy poco tránsito debido a sus pocas salidas. Tienen capacidad para hasta cuatro personas y cuentan con la vajilla necesaria para disfrutar los desayunos dentro del complejo. Además, los huéspedes pueden utilizar el quincho y los asadores compartidos, así como los tendederos y el acceso a la pileta.",
        zinformationText: "",
        services: [
            { img: carIcon, title: "Estacionamiento" },
            { img: wifiIcon, title: "Wifi" },
            { img: tvIcon, title: "DirecTV" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: swimmingPoolIcon, title: "Acceso a la pileta" },
        ],
        photos: [dormiPhoto, dormiPhoto2, dormiPhoto3],
    },
];
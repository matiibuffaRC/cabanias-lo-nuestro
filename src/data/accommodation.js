import complejoPhotoFrente from "../assets/images/frente.jpg";
import complejoPhotoPatio from "../assets/images/patioBien.jpg";
import complejoPhotoPileta from "../assets/images/piletaConDormis.jpg";
import complejoPhotoAsador from "../assets/images/asador.webp";

import cabaniaPhotoIndoor from "../assets/images/habitacion5Carrusel.jpg";
import cabaniaPhotoIndoor2 from "../assets/images/habitacion4.2Carrusel.jpg";
import cabaniaPhotoGarage from "../assets/images/cocheraCarrusel.webp";
import cabaniaPhotoIndoor3 from "../assets/images/cabania2.webp";

import dormiPhoto from "../assets/images/dormis3.webp";
import dormiPhoto2 from "../assets/images/dormis1.webp";
import dormiPhoto3 from "../assets/images/dormi.webp";
import quinchoPhoto from "../assets/images/quincho.jpg";

import carIcon from "../assets/icons/CarIcon.svg";
import wifiIcon from "../assets/icons/WifiIcon.svg";
import tvIcon from "../assets/icons/TvIcon.svg";
import grillIcon from "../assets/icons/GrillIcon.svg";
import airIcon from "../assets/icons/AirIcon.svg";
import swimmingPoolIcon from "../assets/icons/SwimmingPoolIcon.svg";
import ToysIcon from "../assets/icons/ToysIcon.svg";
import CookingIcon from "../assets/icons/CookingIcon.svg";

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

        // 👇 NUEVO
        highlights: [
            {
                img: complejoPhotoFrente,
                alt: "Frente del complejo",
                title: "Ubicación ideal",
                text: "A la entrada de Mina Clavero, a 5 minutos del centro, de los principales ríos y de los supermercados de la zona.",
            },
            {
                img: complejoPhotoAsador,
                alt: "Patio del complejo",
                title: "Patio y parrillas",
                text: "Espacios al aire libre para compartir un asado, tomar unos mates y disfrutar de las tardes serranas.",
            },
            {
                img: complejoPhotoPileta,
                alt: "Pileta del complejo",
                title: "Pileta",
                text: "Un lugar para refrescarse y relajarse después de un día de ríos y paseos.",
            },
        ],
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

        // 👇 NUEVO
        highlights: [
            {
                img: cabaniaPhotoIndoor3,
                alt: "Interior de la cabaña",
                title: "Cocina-comedor equipada",
                text: "Con frigobar y la vajilla necesaria para hasta cuatro personas, además cuenta con horno y microondas para que te sientas como en casa.",
            },
            {
                img: cabaniaPhotoIndoor,
                alt: "Habitación de la cabaña",
                title: "Ambientes cómodos",
                text: "Habitaciones pensadas para descansar, con aire acondicionado y DirecTV.",
            },
            {
                img: cabaniaPhotoGarage,
                alt: "Cochera de la cabaña",
                title: "Cochera, asador y tender",
                text: "Cada cabaña tiene su cochera individual, su asador y un tender de ropa privado.",
            },
        ],
    },
    {
        slug: "dormis",
        title: "Dormis",
        description:
            "Nuestros dormis se encuentran con salida a la calle Tanti, paralela a la Cruz del Eje, en una zona tranquila con muy poco tránsito debido a sus pocas salidas. Tienen capacidad para hasta cuatro personas y cuentan con la vajilla necesaria para disfrutar los desayunos dentro del complejo. Además, los huéspedes pueden utilizar el quincho y los asadores compartidos, así como los tendederos y el acceso a la pileta.",
        informationText: "", // 👈 corregido (antes decía "zinformationText")
        services: [
            { img: carIcon, title: "Estacionamiento" },
            { img: wifiIcon, title: "Wifi" },
            { img: tvIcon, title: "DirecTV" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: swimmingPoolIcon, title: "Acceso a la pileta" },
        ],
        photos: [dormiPhoto, dormiPhoto2, dormiPhoto3],

        // 👇 NUEVO
        highlights: [
            {
                img: dormiPhoto,
                alt: "Interior del dormi",
                title: "Capacidad para cuatro personas",
                text: "Cuentan con la vajilla necesaria para disfrutar los desayunos dentro del complejo.",
            },
            {
                img: dormiPhoto2,
                alt: "Dormi",
                title: "Zona tranquila",
                text: "Con salida a la calle Tanti, paralela a la Cruz del Eje, con muy poco tránsito.",
            },
            {
                img: quinchoPhoto,
                alt: "Espacios compartidos",
                title: "Quincho y asadores compartidos",
                text: "Los huéspedes pueden usar el quincho, los asadores, los tendederos y la pileta.",
            },
        ],
    },
];
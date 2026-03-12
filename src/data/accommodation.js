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
        description: "Nuestro complejo vacacional está a la entrada de la ciudad de Mina Clavero, a 5 minutos del centro de la ciudad y los principales ríos y supermercados de la misma. Contamos con 2 cabañas y 3 dormis para brindar el alojamiento que estás buscando",
        informationText:"Ofrecemos diferentes servicios generales para nuestros huespedes y particulares dependiendo del alojamiento si es una cabaña o un dormitorio",
        services: [
            {img: carIcon, title:"Estacionamiento"},
            {img: wifiIcon, title:"Wifi"},
            {img: tvIcon,  title:"DirecTV",},
            {img: airIcon, title:"Aire condicionado"},
            {img: grillIcon, title:"Parrillas"},
            {img: swimmingPoolIcon, title:"Pileta"},

        ],
        photos: [complejoPhotoFrente, complejoPhotoPatio, complejoPhotoPileta]
    },
    {
        slug: "cabins", 
        title: "Cabañas",
        description: "Nuestras cabañas se enecuentran con salida a la calle Cruz del Eje, sobre la cual van a tener salida directa a la ruta de ingreso a la ciudad.",
        informationText:"En nuestras cabañas encontrarás una cocina-comedor equipada con frigobar y la vajilla necesaria para hasta cuatro personas. Además, cada cabaña cuenta con cochera individual, asador y un tender de ropa privado para mayor comodidad durante tu estadía.",
        services: [
            {img: carIcon, title:"Estacionamiento"},
            {img: wifiIcon, title:"Wifi"},
            {img: tvIcon,  title:"DirecTV",},
            {img: airIcon, title:"Aire condicionado"},
            {img: grillIcon, title:"Parrilla privada"},
            {img: swimmingPoolIcon, title:"Acceso a la pileta"},
            {img: CookingIcon, title:"Cocina privada"},
            {img: ToysIcon, title:"Juegos para los mas chicos"}
        ],
        photos: [cabaniaPhotoGarage, cabaniaPhotoIndoor, cabaniaPhotoIndoor2]
    },
    {
        slug: "dormis",
        title: "Dormis",
        description: "Nuestros dormis se encuentra con salida a la calle Tanti, paralela a la Cruz del Eje, siendo una zona tranquila de muy poco transito debido a las pocas salidas de la misma.",
        description: "Nuestros dormis tienen capacidad para hasta cuatro personas y cuentan con la vajilla necesaria para disfrutar los desayunos dentro del complejo. Además, los huéspedes pueden utilizar el quincho y los asadores compartidos, así como los tendedores y el acceso a la pileta del complejo.",
        informationText:"",
        services: [
            {img: carIcon, title:"Estacionamiento"},
            {img: wifiIcon, title:"Wifi"},
            {img: tvIcon,  title:"DirecTV",},
            {img: airIcon, title:"Aire condicionado"},
            {img: swimmingPoolIcon, title:"Acceso a la pileta"}
        ],
        photos: [dormiPhoto, dormiPhoto2, dormiPhoto3]
    }
]
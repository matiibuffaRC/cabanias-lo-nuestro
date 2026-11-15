import complejoPhotoFrente from "../assets/images/frente.jpg";
import complejoPhotoPatio from "../assets/images/patioBien.jpg";
import complejoPhotoPileta from "../assets/images/piletaConDormis.jpg";
import complejoPhotoAsador from "../assets/images/asador.webp";

import cabaniaPhotoIndoor from "../assets/images/habitacion5Carrusel.jpg";
import cabaniaPhotoIndoor2 from "../assets/images/habitacion4.2Carrusel.jpg";
import cabaniaPhotoGarage from "../assets/images/cocheraCarrusel.webp";
import cabaniaPhotoIndoor3 from "../assets/images/cabania2.webp";
import cabaniaPhotoFrente from "../assets/images/frente21.jpg";

import dormiPhoto from "../assets/images/dormis3.webp";
import dormiPhoto2 from "../assets/images/dormis1.webp";
import dormiPhoto3 from "../assets/images/dormi.webp";
import dormiPhotoPatio from "../assets/images/patio3.jpeg";
import quinchoPhoto from "../assets/images/quincho.jpg";

import carIcon from "../assets/icons/CarIcon.svg";
import wifiIcon from "../assets/icons/WifiIcon.svg";
import tvIcon from "../assets/icons/TvIcon.svg";
import grillIcon from "../assets/icons/GrillIcon.svg";
import airIcon from "../assets/icons/AirIcon.svg";
import swimmingPoolIcon from "../assets/icons/SwimmingPoolIcon.svg";
import toysIcon from "../assets/icons/ToysIcon.svg";
import cookingIcon from "../assets/icons/CookingIcon.svg";
import bedIcon from "../assets/icons/BedIcon.svg";
import homeIcon from "../assets/icons/HomeIcon.svg";

/**
 * Datos de cada tipo de alojamiento.
 * - facts: datos rápidos que se muestran debajo del título.
 * - services: comodidades. `shared: true` las agrupa en "Espacios compartidos".
 * - cardImage/cardText: lo que se muestra en el inicio y en "Otros alojamientos".
 */
export const accommodation = [
    {
        slug: "complejo",
        title: "El Complejo",
        shortTitle: "Complejo",
        cardImage: complejoPhotoPatio,
        cardText: "Pileta, patio con parrillas y estacionamiento, a la entrada de Mina Clavero.",
        description:
            "Nuestro complejo vacacional está en la entrada de la ciudad de Mina Clavero, a 5 minutos del centro y de los principales ríos y supermercados de la zona. Contamos con 2 cabañas y 3 dormis para brindarte el alojamiento que estás buscando.",
        facts: [
            { label: "Alojamientos", value: "2 cabañas y 3 dormis" },
            { label: "Centro y ríos", value: "A 5 minutos" },
            { label: "Ubicación", value: "Entrada de Mina Clavero" },
        ],
        informationText:
            "Estos servicios son para todos los huéspedes. Cada cabaña y cada dormi suma, además, sus comodidades propias.",
        services: [
            { img: carIcon, title: "Estacionamiento", note: "Dentro del complejo" },
            { img: wifiIcon, title: "Wifi", note: "En todo el complejo" },
            { img: tvIcon, title: "DirecTV", note: "En cada unidad" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: grillIcon, title: "Parrillas", note: "Para hacer un asado" },
            { img: swimmingPoolIcon, title: "Pileta", note: "Para todos los huéspedes" },
        ],
        photos: [complejoPhotoFrente, complejoPhotoPatio, complejoPhotoPileta],
        highlights: [
            {
                img: complejoPhotoFrente,
                alt: "Frente del complejo Lo Nuestro",
                title: "Ubicación ideal",
                text: "A la entrada de Mina Clavero, a 5 minutos del centro, de los principales ríos y de los supermercados de la zona.",
            },
            {
                img: complejoPhotoAsador,
                alt: "Asador en el patio del complejo",
                title: "Patio y parrillas",
                text: "Espacios al aire libre para compartir un asado, tomar unos mates y disfrutar de las tardes serranas.",
            },
            {
                img: complejoPhotoPileta,
                alt: "Pileta del complejo con los dormis al fondo",
                title: "Pileta",
                text: "Un lugar para refrescarse y relajarse después de un día de ríos y paseos.",
            },
        ],
    },
    {
        slug: "cabins",
        title: "Cabañas",
        shortTitle: "Cabañas",
        cardImage: cabaniaPhotoFrente,
        cardText: "Para hasta 4 personas, con cocina propia, cochera individual y asador privado.",
        description:
            "Nuestras cabañas tienen salida a la calle Cruz del Eje, con acceso directo a la ruta de ingreso a la ciudad.",
        facts: [
            { label: "Capacidad", value: "Hasta 4 personas" },
            { label: "Cochera", value: "Individual" },
            { label: "Entrada", value: "Cruz del Eje 2080" },
        ],
        informationText:
            "Cada cabaña tiene cocina-comedor equipada con frigobar y vajilla para cuatro personas, cochera individual, asador y tender de ropa privado.",
        services: [
            { img: cookingIcon, title: "Cocina privada", note: "Frigobar, horno y microondas" },
            { img: grillIcon, title: "Parrilla privada", note: "Junto a la cabaña" },
            { img: carIcon, title: "Cochera individual" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: tvIcon, title: "DirecTV" },
            { img: wifiIcon, title: "Wifi" },
            { img: swimmingPoolIcon, title: "Pileta", shared: true },
            { img: toysIcon, title: "Juegos para chicos", shared: true },
        ],
        photos: [cabaniaPhotoGarage, cabaniaPhotoIndoor, cabaniaPhotoIndoor2],
        highlights: [
            {
                img: cabaniaPhotoIndoor3,
                alt: "Cocina-comedor de la cabaña",
                title: "Cocina-comedor equipada",
                text: "Con frigobar y la vajilla necesaria para hasta cuatro personas, además de horno y microondas para que te sientas como en casa.",
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
        shortTitle: "Dormis",
        cardImage: dormiPhotoPatio,
        cardText: "Para hasta 4 personas, con baño privado y vajilla para desayunar.",
        description:
            "Nuestros dormis tienen salida a la calle Tanti, paralela a la Cruz del Eje, en una zona tranquila y con muy poco tránsito. Tienen capacidad para hasta cuatro personas y la vajilla necesaria para desayunar dentro del complejo.",
        facts: [
            { label: "Capacidad", value: "Hasta 4 personas" },
            { label: "Baño", value: "Privado" },
            { label: "Entrada", value: "Tanti 2085" },
        ],
        informationText:
            "Además de lo que tiene cada dormi, podés usar el quincho, los asadores, los tendederos y la pileta del complejo.",
        services: [
            { img: bedIcon, title: "Hasta 4 personas" },
            { img: cookingIcon, title: "Vajilla para desayunar" },
            { img: airIcon, title: "Aire acondicionado" },
            { img: tvIcon, title: "DirecTV" },
            { img: wifiIcon, title: "Wifi" },
            { img: carIcon, title: "Estacionamiento" },
            { img: homeIcon, title: "Quincho", shared: true },
            { img: grillIcon, title: "Asadores", shared: true },
            { img: swimmingPoolIcon, title: "Pileta", shared: true },
        ],
        photos: [dormiPhoto, dormiPhoto2, dormiPhoto3],
        highlights: [
            {
                img: dormiPhoto,
                alt: "Interior del dormi",
                title: "Capacidad para cuatro personas",
                text: "Cuentan con la vajilla necesaria para disfrutar los desayunos dentro del complejo.",
            },
            {
                img: dormiPhoto2,
                alt: "Vista exterior de los dormis",
                title: "Zona tranquila",
                text: "Con salida a la calle Tanti, paralela a la Cruz del Eje, con muy poco tránsito.",
            },
            {
                img: quinchoPhoto,
                alt: "Quincho compartido del complejo",
                title: "Quincho y asadores compartidos",
                text: "Los huéspedes pueden usar el quincho, los asadores, los tendederos y la pileta.",
            },
        ],
    },
];

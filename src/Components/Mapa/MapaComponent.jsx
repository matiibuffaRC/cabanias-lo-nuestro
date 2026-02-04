import background from "../../imgs/mapaBackground.avif";


function MapaComponent() {
  return (
    <div className="w-full max-w-4xl  h-75 sm:h-87.5 md:h-80 flex flex-col justify-center items-center rounded-[25px]">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d599.8255702696963!2d-65.00353377525774!3d-31.73976632187347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d260b95feab03%3A0x3a5426aa170a07e1!2sCruz%20Del%20Eje%201400!5e0!3m2!1sen!2sar!4v1770143408120!5m2!1sen!2sar"
            width="325"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            />
    </div>
    );
}




export default MapaComponent
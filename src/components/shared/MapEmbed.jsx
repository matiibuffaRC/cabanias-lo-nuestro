function MapEmbed() {
    return (
        <div className="w-full h-87.5 sm:h-96 md:h-112.5 rounded-[25px] overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217372.1247823768!2d-64.94540690000001!3d-31.6491949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d25d59048c4dd%3A0xa693b3400e45cb6c!2sMina%20Clavero%2C%20C%C3%B3rdoba%20Province!5e0!3m2!1sen!2sar!4v1773322116795!5m2!1sen!2sar"
                className="block w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de la región"
            />
        </div>
    );
}

export default MapEmbed;
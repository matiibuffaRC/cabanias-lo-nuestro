import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev + 1 === images.length ? 0 : prev + 1
            );
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
        prev - 1 < 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="carousel">
        <img
            src={images[currentIndex]}
            alt="carousel"
            className="carousel-image w-full h-full object-cover"
        />

        <button className="nav left" onClick={handlePrevious}>
            ‹
        </button>

        <button className="nav right" onClick={handleNext}>
            ›
        </button>

        <div className="indicator">
            {images.map((_, index) => (
            <span
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
            />
            ))}
        </div>
    </div>
    );
};

export default Carousel;

import { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = [
    "https://www.nituk.ac.in/frontEnd/uk/cse/cse_home.png",
    "https://nituk.ac.in/frontEnd/uk/sa/sport.png",
    "https://nitkkr.ac.in/wp-content/uploads/2023/12/20201215_103621-1-1536x1152.jpg",
    "https://nituk.ac.in/frontEnd/uk/images/alumni/AL_4(1).png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden mt-[100px] rounded-xl shadow-xl border-4 border-green-800">
      {/* Main image */}
      <img
        src={images[currentIndex]}
        alt="Slider"
        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
      />

      {/* Optional caption container (empty for now, can be customized later) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-3xl font-bold"></div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-green-900 bg-opacity-60 backdrop-blur-sm hover:bg-opacity-80 text-white p-3 rounded-full shadow-md transition"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-green-900 bg-opacity-60 backdrop-blur-sm hover:bg-opacity-80 text-white p-3 rounded-full shadow-md transition"
      >
        ❯
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-green-300"
            } transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
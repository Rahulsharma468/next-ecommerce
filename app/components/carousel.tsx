import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import dummyData from "@/app/assets/dummy/carouselDummy.json";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slides = dummyData;

  return (
    <div className="relative mb-6">
      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-none">
              <img src={`/${slide}`} alt={`Slide ${index + 1}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-4xl text-white hover:text-gray-400"
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-4xl text-white hover:text-gray-400"
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </button>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-2">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full mb-3 ${
                index === currentSlide ? "bg-gray-600" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

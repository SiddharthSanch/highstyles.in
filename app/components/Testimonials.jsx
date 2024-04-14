"use client";
import React, { useState, useEffect } from "react";
import { testimonials } from "../../utils/testimonials";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="flex flex-col sm:mt-0 px-6 py-3 gap-5 items-center sm:h-screen justify-center">
      <div className="flex gap-1 flex-col items-center  justify-center">
        <div className="flex different relative">
          <div
            className="flex justify-center absolute w-full top-[-5rem] mt-4 text-2xl sm:text-[4.5rem] z-40"
            style={{
              opacity: 0.1,
            }}
          >
            What&nbsp;Customer&apos;s&nbsp;Say&nbsp;About&nbsp;Us
          </div>
          <div className="text-[2.5rem] mt-[1.5rem] z-40 different">
            <h1 className="different">Testimonials</h1>
          </div>
        </div>
        <hr className="w-[30%] bg-primary h-1" />
      </div>
      <div className="flex justify-center">
        <h1 className="text-gray-500 text-xl transition-opacity duration-500">
          Discover the impact Highstyles.in has had on the lives and careers of
          our community members.
        </h1>
      </div>
      <div className="flex sm:h-[13rem] justify-center sm:px-[12rem] mt-[3rem] transition-opacity duration-500">
        <div
          className="flex flex-col transition-opacity duration-1000 ease-in-out"
          key={testimonials[currentIndex].id}
        >
          <h1 className="text-xl sm:text-3xl sm:h-[10rem] text-center">
            {'"'}
            {testimonials[currentIndex].testimonial}
            {'"'}
          </h1>
          <div className="justify-center  items-center flex mt-6">
            <Image
              src={testimonials[currentIndex].image}
              alt="image"
              width={35}
              className="rounded-full"
            />
            &nbsp;&nbsp;
            <span className=" ">{testimonials[currentIndex].name}</span>
            <br />
            &nbsp;&nbsp;
            <span className="text-2xl">|</span>&nbsp;&nbsp;
            <h1 className="text-gray-500">
              {testimonials[currentIndex].designation}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handlePrevClick}>
          <ChevronLeft size={30} />
        </button>
        <button onClick={handleNextClick}>
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;

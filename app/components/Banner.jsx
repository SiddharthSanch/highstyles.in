"use client";
import  { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "../../public/productListing/banner_bag_1.jpg";
import img2 from "../../public/productListing/banner_bag_2.jpg";
import img3 from "../../public/productListing/banner_bag_3.jpg";
import img4 from "../../public/productListing/banner_bag_4.jpg";
import img5 from "../../public/productListing/banner_bag_5.jpg";
import img6 from "../../public/productListing/banner_bag_6.jpg";

const styles = {
  boxContainer: "flex flex-row items-center justify-between p-10",
  box: "flex flex-col items-center justify-center ",
  innerBox: "flex flex-row gap-3 object-contain",
};

const Banner = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [nextImage]);

  return (
      <div className="flex w-full rounded-xl sm:h-screen justify-center px-[3rem] py-3">
        <Image
        width={1500}
        height={1500}
          src={images[currentImageIndex]}
          alt="Banner Image"
          className="rounded-xl brightness-90 transform-all duration-500 w-full object-cover hover:brightness-100 cursor-pointer"
        />
      </div>
  );
};

export default Banner;

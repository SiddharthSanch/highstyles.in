import React from "react";
import hero_1 from "../../public/hero/bag_1.jpg";
import bag_3 from "../../public/hero/bag_3.jpg";
import hero_2 from "../../public/bag-dumy.jpg";
import Image from "next/image";
import "../globals.css";
import { Search } from "lucide-react";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router=useRouter()
  const data=["Style in Every Stitch: Shop Trendy Bags Now!",
  "Bag the Best: Elevate Your Look Instantly.",
  "Chic Carry, Every Day: Explore Our Latest Bags.",
  "Fashion Meets Function: Discover Your Perfect Bag.",
  "Unleash Your Style: Browse Our Exclusive Bag Collection.",
  "Your Signature Bag Awaits: Shop Fashion Favorites!",
  "Step Out in Style: New Arrivals in Bag Fashion.",
  "Elegance Redefined: Shop Our Luxury Bag Collection.",
  "Beyond Ordinary: Bags that Match Your Personality.",
  "Fashion Focus: Explore Our Latest Bag Designs.",
  "Carry Confidence: Elevate Your Presence Today!",
  "Bag Bliss: Your Journey to Effortless Style.",
  "Chic Statements: Find Your Perfect Bag Match.",
  "Effortless Style: Shop Our Curated Bag Collection.",
  "Fashion Unleashed: Discover Must-Have Bags Now!"]
  return (
    <div className="flex flex-col gap-8 bg-[url('/hero/hero_1_bg.jpg')] mt-[-5rem] sm:mt-[-7.5rem]">
      <div className="flex sm:flex-row flex-col items-center gap-4 bg-contain">
        <div className="flex sm:w-1/2 p-4 sm:p-0">
          <Image src={hero_2} alt="hero_1" width={2000} height={2000} className="rounded-3xl sm:rounded-none" />
        </div>
        <div className="flex flex-col gap-6 sm:w-1/2 px-[2.5rem] sm:px-[5rem] mt-10 "
        >
          <h1 className="text-3xl sm:text-5xl sm:max-w-md hero_section sm:leading-[3.5rem] font-bold text-gray-800">
            Unleash Style with Our Exclusive Bag Collection!
          </h1>
          <div className="flex line-clamp-1 h-[7rem] border-2 border-secondary gap-4 rounded-2xl p-4 sm:w-[85%]">
            <Search size={24} className="text-gray-500" />
            <div className="flex line-clamp-1"><Typewriter
            className=""
              options={{
                strings: data,
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            /></div>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row-reverse flex-col sm:y-0 py-6 items-center gap-4  bg-contain">
      <div className="flex sm:w-1/2 p-4 sm:p-0">
          <Image src={hero_1} alt="hero_1" width={2000} height={2000} className="rounded-3xl sm:rounded-none" />
        </div>
        <div className="flex flex-col gap-6 sm:w-1/2 px-[2.5rem] sm:px-[5rem] mt-10 "
        
        >
          <h1 className="text-3xl hero_section font-bold text-gray-800">
          Fashion Unleashed: Discover Must-Have Bags Now!
          </h1>
          <h1 className="text-gray-500">Beyond Ordinary: Bags that Match Your Personality.</h1>
          <button className="bg-secondary w-[11rem] text-white p-4 rounded-2xl"
          onClick={()=>router.push("/products-listing")}
          >Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

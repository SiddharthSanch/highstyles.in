"use client";

// rating in specific product page

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/utils/reviews";
import StarRating from "./StarRating";
import { supabase } from "@/utils/supabase";

const Reviews = (product) => {
  const item = product.product;
  const [ratingAvg, setRatingAvg] = useState(0);
  const [ratingObject, setRatingObject] = useState();
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating5, setRating5] = useState(0);
  const arr = [rating1, rating2, rating3, rating4, rating5];
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Ratings")
        .select("*")
        .eq("product_id", item.id);
      if (error) {
        console.log(error);
        return;
      }
      if (data.length === 0) {
        return;
      } else {
        console.log(data);
        setRatingObject(data);
        getRatingAverage(data);
      }
    }
    fetchData();
  }, [item]);
  const getRatingAverage = (items) => {
    console.log(items);
    var total=0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      total+=element.ratings;
      if (element.ratings === 1) {
        setRating1((prev) => prev + 1);
      } else if (element.ratings === 2) {
        setRating2((prev) => prev + 1);
      } else if (element.ratings === 3) {
        setRating3((prev) => prev + 1);
      } else if (element.ratings === 4) {
        setRating4((prev) => prev + 1);
      } else if (element.ratings === 5) {
        setRating5((prev) => prev + 1);
      }
    }
      console.log(total,items.length)
      console.log("Total", total / items.length);
      setRatingAvg(total / items.length);
    }
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ratingObject?.length);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [ratingObject]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="flex sm:flex-row flex-col justify-between mt-[3rem] items-center w-full">
      <div className="flex sm:w-1/2 flex-col gap-4">
        <div className="flex justify-center items-center p-3 rounded-md">
          <h1 className="text-3xl flex gap-3 items-center text-gray-500 font-semibold">
            {ratingAvg.toFixed(2)}&nbsp;
            <StarIcon className="w-6 h-6 mr-4 text-[#eab308]" fill="#eab308" />
          </h1>
          <h1 className="text-3xl text-gray-500">Rating</h1>
        </div>
        <div className="flex justify-center">
          <hr className="h-[0.15rem] w-[80%] bg-[#f1f1f1] border-0 rounded" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-4">
            <StarRating rating={5} />
            <h1>{arr[4]}</h1>
          </div>
          <div className="flex gap-4">
            <StarRating rating={4} />
            <h1>{arr[3]}</h1>
          </div>
          <div className="flex gap-4">
            <StarRating rating={3} />
            <h1>{arr[2]}</h1>
          </div>
          <div className="flex gap-4">
            <StarRating rating={2} />
            <h1>{arr[1]}</h1>
          </div>
          <div className="flex gap-4">
            <StarRating rating={1} />
            <h1>{arr[0]}</h1>
          </div>
        </div>
      </div>
      <div className="flex sm:w-1/2 justify-center">
        <div className="flex flex-col px-6 py-3 gap-5 mt-6 w-full">
          <div className="flex gap-1 flex-col w-full">
            <h1 className="text-3xl flex justify-center font-bold transition-opacity duration-500">
              Reviews
            </h1>
            <div className="flex justify-center">
              <hr className="w-[30%] bg-primary h-1" />
            </div>
          </div>
          {ratingObject && <div className="flex justify-center transition-opacity duration-1000 ease-in-out"
        >
          <h1 className="text-xl sm:text-2xl max-w-4xl sm:h-[10rem] text-justify">
            {ratingObject[currentIndex].text_review?ratingObject[currentIndex].text_review:ratingObject[0].text_review}
          </h1>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

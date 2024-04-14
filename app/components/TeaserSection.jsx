"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const TeaserSection = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("products", data);
  }, [data]);
  // const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [data]);
  return (
    <>
      {loading ? (
        <div className="flex items-center h-[15rem] text-gray-500 justify-center">
          <h1 className="text-xl">Loading Items...</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-8 items-center">
          <div className="flex mt-6">
            <h1 className="text-lightText uppercase">Style in motion</h1>
          </div>
          <div className="flex different relative">
            <div
              className="flex justify-center absolute w-full top-[-5rem] mt-8 sm:mt-6 text-[4rem] sm:text-[6rem] z-40"
              style={{
                opacity: 0.05,
              }}
            >
              Top&nbsp;Trending
            </div>
            <div className="text-[2.5rem] mt-[2rem] sm:mt-[4rem] z-40">
              Best Seller Product
            </div>
          </div>
          <div className="flex sm:px-[4rem] flex-wrap gap-10 justify-center">
            {data?.slice(0, 4).map((item) => (
              <div
                className="flex flex-col gap-2 p-2 rounded-xl w-[16.5rem] h-[26rem]"
                key={item.id}
              >
                <Link href={`/product/${item?.id}`}>
                  <div className="flex justify-center h-[15rem]">
                    <Image
                      src={item.url[0]}
                      // src="https://drive.google.com/file/d/1Pdo01w1Y_Bc68w12drjhTfYOL9RIzvIB/view?usp=drive_link"
                      // works for react

                      // src="https://drive.google.com/uc?export=view&id=1Pdo01w1Y_Bc68w12drjhTfYOL9RIzvIB"
                      // works for next

                      alt={item.title}
                      className="rounded-xl object-contain w-[15rem] hover:scale-105 cursor-pointer transform-all duration-300"
                      width={300}
                      height={300}
                    />
                  </div>
                </Link>
                <div className="flex flex-col bg-white rounded-xl p-3">
                  <div className="flex justify-between">
                    <h1 className="line-clamp-1" title={item.title}>
                      {item.title}
                    </h1>
                    <h1 className="line-through text-sm text-lightText">
                      ₹{item.price}
                    </h1>
                  </div>
                  <div className="flex justify-center mt-3 mb-3">
                    <hr className="w-[80%] h-[0.15rem] bg-secondary border-0 rounded" />
                  </div>
                  <div className="flex">
                    <h1>₹{item.price}</h1>
                  </div>
                  <div className="flex" title={item.description}>
                    <h1 className="text-sm line-clamp-4 text-lightText">
                      {item.description}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-secondary w-[11rem] text-white p-4 rounded-2xl"
              onClick={() => router.push("/products-listing")}
            >
              See More
            </button>
          </div>
          <div className="flex justify-center mt-[3rem]">
            {/* {!showAll ? (
          <button
            className="flex items-center justify-center w-[10rem] h-[3rem] bg-secondary text-white rounded-md"
            onClick={() => setShowAll(true)}
          >
            <h1 className="text-sm">Shop All Products</h1>
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-[10rem] h-[3rem] bg-secondary text-white rounded-md"
            onClick={() => {
              window.scrollBy({
                top: -2500,
                behavior: "smooth",
              });
              // setShowAll(false);
              setTimeout(() => {
                setShowAll(false);
              }, 1000);
            }}
          >
            <h1 className="text-sm">Shop Trending</h1>
          </button>
        )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default TeaserSection;

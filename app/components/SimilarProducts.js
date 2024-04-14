"use client";

import { useEffect, useState } from "react";
import ProductComp from "./Product";
import { BiLoader } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

export default function SimilarProducts() {
  const [products, setProducts] = useState([]);

  const getRandomProducts = async () => {
    try {
      // const response = await fetch("/api/products/get-random");
      // const result = await response.json();
      const { data: response, error } = await supabase
        .from("Products")
        .select("*")
        .order("id", { ascending: true });
      if (error) return;
      const result = response;
      if (result) {
        setProducts(result);
        console.log(result);
        return;
      }
      setProducts([]);
    } catch (error) {
      console.log(error);
      // alert(error)
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <>
      <div className="max-w-[1200px] mx-auto mt-[4rem]">
        <div className="flex different relative">
          <div
            className="flex justify-center absolute w-full top-[-5rem] mt-4 text-4xl sm:text-[5rem] z-40"
            style={{
              opacity: 0.2,
            }}
          >
            <h1>Similar Items</h1>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="flex flex-wrap gap-10 justify-center mt-[5rem]">
            {products?.slice(0, 4)?.map((item) => (
              <div
                className="flex flex-col gap-2 p-2 rounded-xl w-[16.5rem] min-h-[26rem]"
                key={item.id}
              >
                <Link href={`/product/${item?.id}`}>
                  <div className="flex justify-center h-[15rem]">
                    <Image
                      src={item.url[0]}
                      alt={item.title}
                      className="rounded-xl object-contain w-[15rem] brightness-75 hover:brightness-100 hover:scale-105 cursor-pointer transform-all duration-300"
                      width={200}
                      height={200}
                    />
                  </div>
                </Link>
                <div className="flex flex-col bg-white rounded-xl p-3">
                  <div className="flex justify-between">
                    <h1 className="line-clamp-1" title={item.title}>
                      {item.title}
                    </h1>
                    <h1 className="line-through text-sm text-lightText">
                      ₹{(item.price * 1.2).toFixed(2)}
                    </h1>
                  </div>
                  <div className="flex justify-center mt-3 mb-3">
                    <hr className="w-[80%] h-[0.15rem] bg-secondary border-0 rounded" />
                  </div>
                  <div className="flex">
                    <h1>₹{item.price.toFixed(2)}</h1>
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
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-4 font-semibold">
              <BiLoader size={30} className="text-blue-400 animate-spin" />
              Loading Products...
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import CarouselComp from "./components/CarouselComp";
import Product from "./components/Product";
import MainLayout from "./layouts/MainLayout";
import useIsLoading from "@/app/hooks/useIsLoading";
import TeaserSection from "./components/TeaserSection";
import Testimonials from "./components/Testimonials";
import Hero from "./components/Hero";
import { useUser } from "./context/user";
import { supabase } from "@/utils/supabase";
import HomeFAQ from "./components/HomeFAQ";

export default function Home() {
  const arin=process.env.NODE_ENV
  console.log(arin)
  const [products, setProducts] = useState([]);

  

  useEffect(() => {
    const getProducts = async () => {
      // useIsLoading(true)
      // const response = await fetch("/api/products");
      // const prods = await response.json();
      const { data: prods, error } = await supabase.from("Products").select("*").order("id", { ascending: true });
      if (error) console.log(error);
      console.log(prods);
      // setProducts([])
      setProducts(prods);
      // useIsLoading(false)
    };
    getProducts();
  }, []);
  const user = useUser();
  
  useEffect(() => {
    async function addProfile() {
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id);
      if (users.length <=0) {
        const { data, error } = await supabase.from("users").insert({
          user_id: user.id,
          email: user.email,
          name: user.name,
        });
        if (error) console.log(error);
        console.log(data);
      } else {
        return;
      }
    }
    if (user.id !== null) {
      localStorage.setItem("user", JSON.stringify(user));
      addProfile();
    }
  }, [user]);

  return (
    <>
      <MainLayout> 
        <Hero />
        <TeaserSection data={products} />
        <div className="max-w-[1200px] mx-auto flex flex-col">
          <Testimonials />
          <HomeFAQ />
        </div>
      </MainLayout>
    </>
  );
}

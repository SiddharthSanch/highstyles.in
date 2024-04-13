"use client"
import React from "react";
import "./Cart.css";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import ClientOnly from "../ClientOnly";
const GoToCart = () => {    
    const cart=useCart()

  return (
    <ClientOnly>
    <button className="cssbuttons-io-buttons">
      Cart
      <div className="icons flex justify-center items-center text-black">
        {cart.cartCount()}
      </div>
    </button></ClientOnly>
  );
};

export default GoToCart;

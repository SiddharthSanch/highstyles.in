"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/nobg_logo.png";
import Hamburger from "./Hamburger";
import { useRouter } from "next/navigation";
import GoToCart from "@/app/components/buttons/GoToCart";
import Cart from "@/app/components/buttons/Cart";
import header_svg from "../../../public/header.svg";
export default function MainLayout() {
  const [items, setItems] = useState([]);
  const [isSearching, setIsSearching] = useState(null);
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="hidden sm:flex w-full justify-center z-50 fixed">
        <div className="flex items-center justify-between bg-[#f6f6f6] w-[90%] h-[5rem] rounded-xl px-8 ">
          <Link href={`/`}>
            <div className="flex cursor-pointer">
              <Image src={header_svg} alt="logo" width={180} height={180} />
              {/* <h1 className="text-2xl font-bold">Highstyles
                <span className="text-secondary">.in</span>
              </h1> */}
            </div>
          </Link>
          <div className="flex gap-6 text-gray-600 font-semibold">
            {navLinks.map((nav) => (
              <Link key={nav.id} href={nav.id}>
                <div className="flex">
                  <h1 className="hover:text-secondary transform-all duration-300 cursor-pointer">
                    {nav.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            {/* login icon */}
            <Link href={`/onboarding/login`}>
              <GoToCart />
            </Link>
            <Link href={`/cart`}>
              <Cart />
            </Link>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div
        id="toggle-menu"
        className={`sm:hidden z-50 flex bg-[] flex-1 justify-between items-center px-4 `}
      >
        <div className="flex items-center justify-between bg-[#f6f6f6] w-[100%] h-[5rem] rounded-xl px-8 border-2 ">
          <Link href={`/`}>
            <Image src={header_svg} alt="logo" width={150} height={150} />
            {/* <h1 className="text-2xl font-bold">Highstyles
                <span className="text-secondary">.in</span>
              </h1> */}
          </Link>
          <Hamburger
            className={`w-[35px] h-[35px] object-contain cursor-pointer transform rotate-180 transition-all duration-300`}
            onClick={() => setToggle(!toggle)}
          />
        </div>
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-20 absolute top-20 right-0 mx-3 my-2 min-w-[140px] rounded-3xl  bg-white z-50`}
        >
          <div className="flex flex-col items-center gap-[4rem]">
            <Image src={logo} alt="logo" width={150} height={150} />
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`
               font-poppins font-medium cursor-pointer text-[24px]
               `}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
            <button
              className="bg-primary text-white w-full px-4 py-3 rounded-lg"
              onClick={() => router.push("/cart")}
            >
              Your Cart
            </button>
            <button
              className="bg-secondary mt-[-3.4rem] text-white w-full px-4 py-3 rounded-lg"
              onClick={() => router.push("/onboarding/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/products-listing",
    title: "Products",
  },
  {
    id: "/my-account",
    title: "My Account",
  },
  {
    id: "/my-orders",
    title: "My Orders",
  },
  {
    id: "/contact",
    title: "Contact Us",
  },
];

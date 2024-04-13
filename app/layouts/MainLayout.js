"use client";

import TopMenu from "./includes/TopMenu";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import Footer from "./includes/Footer";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("storage", function () {
  //     let res = localStorage.getItem("isLoading");
  //     res === "false" ? setIsLoading(false) : setIsLoading(true);
  //   });
  // });

  return (
    <>
      <div id="MainLayout" className="">
        <div className="">
          {isLoading ? <Loading /> : <div></div>}
          <div className="flex mb-[6.5rem] mt-[1rem]">
            <MainHeader />
          </div>
        </div>
        <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

"use client";
import { useAppState } from "@/utils/Context";
import React, { Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CentralSection from "./components/CentralSection";
import { supabase } from "@supabase/auth-ui-shared";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const page = () => {
  useEffect(()=>{
    const user=localStorage.getItem("user");
    const userObject=JSON.parse(user);
    if(userObject?.id!=="14479371-5a4f-4d09-9154-7172bdf8c5f8"){
      window.location.href="/admin/login"
    }
  },[])
  // const { state, setState } = useAppState();
  return (
    <div className={`flex flex-col p-4`} id="AdminLayout">
      <div className="flex mb-3">
        <Navbar />
      </div>
      <div className="flex gap-4">
        <div className="sm:flex hidden w-1/6">
          <Sidebar />
        </div>
        <div className="flex sm:w-5/6 h-screen overflow-auto rounded-xl componentScroll">
          <CentralSection />
        </div>
      </div>
    </div>
  );
};

export default page;

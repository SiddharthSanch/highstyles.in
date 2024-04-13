"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
const PreorderForm = () => {
  const [PreorderForm, setPreorderForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    product_name: "",
  });
  const handleChange = (e) => {
    setPreorderForm({ ...PreorderForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(PreorderForm);
    // alert("Form Submitted Successfully");
  };
  const [data_got, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Preorder').select("*");
      if (error) {
        console.log(error);
        return;
      }
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <MainLayout>
      <div className="flex flex-col gap-5 w-full mb-8">
        <div className="flex mb-6 mt-5 flex-col items-center justify-center sm:px-[5rem] px-[1rem]">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              Unlock Early Access: Reserve Your Preorder Today!
            </h1>
          </div>
        </div>
        <div className="sm:px-[6rem] sm:flex-row-reverse flex-col gap-[2rem] flex justify-between items-center px-[1rem]">
          <div className="flex animate-hero flex-col gap-8 sm:w-1/2 leading-[3rem]">
            <Image
              src="/preorder_form.svg"
              height={500}
              alt="preorder-image"
              width={500}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col items-center gap-[.5rem] sm:w-1/2">
            <div className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide  text-xs  mb-2">
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full    rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id="grid-first-name"
                    name="firstName"
                    value={PreorderForm.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 leading-tight  focus:border-[#0050cc] bg-[#f5f5f5]"
                    id="grid-last-name"
                    type="text"
                    name="lastName"
                    value={PreorderForm.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id=""
                    type="email"
                    name="email"
                    value={PreorderForm.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id=""
                    type=""
                    name="phone"
                    value={PreorderForm.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div className="flex mb-6 flex-col">
                <label className="block uppercase tracking-wide text-xs mb-2">
                  Contact For
                </label>
                <div className="relative">
                  <select
                    required
                    name="product_name"
                    onChange={handleChange}
                    value={PreorderForm.product_name}
                    className="block gap-2 appearance-none w-full text-[#9ca3af] bg-[#f5f5f5] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    id="grid-state"
                  >
                    {data_got &&
                      data_got.map((data) => (
                        <option key={data.id} value={data.product_name}>
                          {data.product_name}
                        </option>
                      ))
                    }
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
                    <svg
                      className="fill-white h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="message"
                  className="block uppercase mb-2 text-xs font-medium dark"
                >
                  Your Address
                </label>
                <textarea
                  name="address"
                  value={PreorderForm.address}
                  onChange={handleChange}
                  id="message"
                  rows={3}
                  className="block gap-2 appearance-none w-full text-[#9ca3af] bg-[#f5f5f5] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                  placeholder="Your Complete Address Ex: 1234 Main St, City, State, Zip Code"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-secondary w-[12rem] rounded-md p-4 flex justify-center items-center text-white"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PreorderForm;

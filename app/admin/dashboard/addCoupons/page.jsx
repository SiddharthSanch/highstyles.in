"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";
import { useRouter } from "next/navigation";
const page = () => {
  const router=useRouter()
  if (!localStorage.getItem("sb-svtbcpbalgdlzpnhhdsi-auth-token")) {
    return(
      <h1>Not Allowed</h1>
    )
  }
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState();
  const [couponType, setCouponType] = useState("Public");
  const [couponStatus, setCouponStatus] = useState("Active");
  const [couponExpiryDate, setCouponExpiryDate] = useState("");
  const [couponStartDate, setCouponStartDate] = useState("");
  const [couponUsageLimit, setCouponUsageLimit] = useState(1);
  const [couponUsageCount, setCouponUsageCount] = useState();
  const [couponDescription, setCouponDescription] = useState("");
  const [brandData, setBrandData] = useState();

  const addCoupon = async () => {
    const { data, error } = await supabase.from("Coupons").insert({
      coupon_name: couponName,
      coupon_code: couponCode,
      discount_value: couponDiscount,
      type: couponType,
      status: couponStatus,
      coupon_valid_till: couponExpiryDate,
      coupon_initialised_on: couponStartDate,
      usage_limit: couponUsageLimit,
      usage_count: couponUsageCount,
      description: couponDescription,
    });
    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error);
      return;
    }
    console.log(data);
    await fetchBrands();
    toast.success("Coupon added successfully", toastsettings);
  };
  useEffect(() => {
    console.log(couponStartDate, couponExpiryDate);
  }, [couponStartDate, couponExpiryDate]);
  useEffect(async () => {
    await fetchBrands();
  }, []);
  const fetchBrands = async () => {
    const { data, error } = await supabase.from("Coupons").select("*");
    if (error) return;
    setBrandData(data);
  };
  
  return (
    <div className="flex flex-col gap-[3rem] p-[3rem]">
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-white"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center items-center p-[3rem]">
        <div className="flex flex-col gap-9">
          <div className="p-8 rounded-xl border border-stroke bg-white shadow-default">
            <div className="flex flex-col gap-4">
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="name"
                  placeholder="Enter your coupon name"
                  value={couponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  className="w-full uppercase transform-all duration-500 placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="uppercase w-full placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter your coupon code"
                  value={couponDiscount}
                  onChange={(e) => setCouponDiscount(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your coupon description"
                  value={couponDescription}
                  onChange={(e) => setCouponDescription(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                ></textarea>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={couponStartDate}
                    onChange={(e) => setCouponStartDate(e.target.value)}
                    placeholder="Starting Date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon End Date
                  </label>
                  <input
                    type="datetime-local"
                    placeholder="Ending Date"
                    value={couponExpiryDate}
                    onChange={(e) => setCouponExpiryDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon Type
                  </label>
                  <input
                    type="text"
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value)}
                    placeholder="Starting Date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon Status
                  </label>
                  <input
                    type="text"
                    placeholder="Ending Date"
                    value={couponStatus}
                    onChange={(e) => setCouponStatus(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon Usage Limit
                  </label>
                  <input
                    type="number"
                    value={couponUsageLimit}
                    onChange={(e) => setCouponUsageLimit(e.target.value)}
                    placeholder="Starting Date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Coupon Count
                  </label>
                  <input
                    type="numbers"
                    placeholder="Ending Date"
                    value={couponUsageCount}
                    onChange={(e) => setCouponUsageCount(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-white"
                onClick={addCoupon}
              >
                Add Coupons
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black ">
            Coupons Added
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Title
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Code
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Discount
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Status
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Usage Count
                </h5>
              </div>
            </div>

            {brandData?.map((brand, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${
                  key === brandData.length - 1 ? "" : "border-b border-stroke"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  {/* <div className="flex-shrink-0">
                    <Image
                      src={brand.logo}
                      alt="Brand"
                      width={48}
                      height={48}
                    />
                  </div> */}
                  <p className="hidden text-black  sm:block">
                    {brand.coupon_name}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black ">{brand.coupon_code}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">₹{brand.discount_value}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black ">{brand.status}</p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-meta-5">{brand.usage_count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

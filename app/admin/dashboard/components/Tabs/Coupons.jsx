"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import CouponsListingTable from "../Tables/CouponsListing";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";
import { Check } from "lucide-react";

const Coupons = () => {
  const [couponsData, setCouponsData] = useState();
  const [loading, setLoading] = useState(true);
  const [percentage_disc, setPercentage_disc] = useState(false);

  useEffect(() => {
    const getCoupons = async () => {
      const { data, error } = await supabase.from("Coupons").select("*");
      if (error) return;
      setCouponsData(data);
      console.log(data)
      setLoading(false);
    };
    getCoupons();
  }, []);
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
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState()
  const [couponPercentage, setCouponPercentage] = useState(0);
  // const [brandData, setBrandData] = useState();

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
      percentage:couponPercentage,
      percentage_discount:percentage_disc
    });
    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error);
      return;
    }
    console.log(data);
    // await fetchBrands();
    toast.success("Coupon added successfully", toastsettings);
  };
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setModalItem(item);
    console.log(item)
  };
  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if ((name === "url") || name === "available_colors") {
      updatedValue = value.split(/\s*,\s*/);
    }
  
    setModalItem((prevModalItem) => ({
      ...prevModalItem,
      [name]: updatedValue,
    }));
  };
  const handleEditCoupon=async()=>{
    console.log(modalItem)
    const {data,error}=await supabase.from("Coupons").update([
      {
        coupon_name:modalItem.coupon_name,
        coupon_code:modalItem.coupon_code,
        discount_value:modalItem.discount_value,
        type:modalItem.type,
        status:modalItem.status,
        coupon_valid_till:modalItem.coupon_valid_till,
        coupon_initialised_on:modalItem.coupon_initialised_on,
        usage_limit:modalItem.usage_limit,
        usage_count:modalItem.usage_count,
        description:modalItem.description,
        percentage:modalItem.percentage,
      }
    ]).eq("id",modalItem.id);
    if(error){
      toast.error(error.details,toastsettings);
      setOpenModal(false);
      return;
    }
    toast.success("Coupon updated successfully",toastsettings);
    setOpenModal(false);
    window.location.reload();
  }
  return (
    <>
      {loading ? (
        <div className="flex mt-[-3rem] w-full h-full justify-center items-center">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      ) : (
        <><div className="w-full flex flex-col gap-5">
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
            <div className="flex mb-4.5 gap-4">
              <div className="flex flex-col w-3/4">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Discount
                </label>
                <input
                    type="number"
                    placeholder={percentage_disc?"Percentage":"Amount"}
                    value={percentage_disc?couponPercentage:couponDiscount}
                    onChange={(e) => percentage_disc?setCouponPercentage(e.target.value):setCouponDiscount(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                />
              </div>
              <div className="flex items-end justify-end w-1/4">
                <button
                    className="flex w-full justify-center items-center rounded bg-[#f5f5f5] p-3 font-medium hover:bg-opacity-90"
                    onClick={() => setPercentage_disc(!percentage_disc)}>{percentage_disc ? "Percentage" : "Amount"}</button>
              </div>
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
                  placeholder="Coupon Type"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Status
                </label>
                <input
                  type="text"
                  placeholder="Coupon Status"
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
                  placeholder="Coupon Usage Limit"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black ">
                  Coupon Count
                </label>
                <input
                  type="numbers"
                  placeholder="Coupon Usage Count"
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
        <div className="flex">
        <CouponsListingTable data={couponsData} onOpenModal={handleOpenModal} />
        </div>
      </div>
      {openModal && (
        <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
            <div className="relative p-4 w-full sm:max-w-[70%] max-h-[95%] overflow-y-auto componentScroll">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                    Edit &nbsp; <h1 className="cursor-pointer underline">{modalItem?.coupon_name || "Coupon"}</h1>&nbsp; Details
                    &nbsp; <h1 className="text-gray-600 text-sm">{modalItem?.id}</h1>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpenModal(!openModal)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="flex flex-col gap-4 p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Name
                      </label>
                      <input
                        type="text"
                        name="coupon_name"
                        id="SKU"
                        value={modalItem?.coupon_name || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Coupon Name"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        name="coupon_code"
                        id="brand"
                        value={modalItem?.coupon_code || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Coupon Code"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-3">
                  <div className="col-span-2 sm:col-span-1">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Discount Value
                      </label>
                      <input
                        type="number"
                        name={modalItem?.percentage_discount===true?"percentage":"discount_value"}
                        value={modalItem?.percentage_discount===true?modalItem?.percentage:modalItem?.discount_value || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={modalItem?.percentage_discount===true?"Percentage":"Amount"}
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={modalItem?.type || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Public/Private"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        id="released_in"
                        value={modalItem?.status || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Active/Inactive"
                        required=""
                      />
                    </div>
                    
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="imageLink"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Intialised On
                      </label>
                      <input
                        type="datetime-local"
                        name="coupon_initialised_on"
                        id="url"
                        value={modalItem?.coupon_initialised_on}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Valid Till
                      </label>
                      <input
                        type="datetime-local"
                        name="coupon_valid_till"
                        value={modalItem?.coupon_valid_till}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Coupon Valid Till"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="imageLink"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Usage Count
                      </label>
                      <input
                        type="number"
                        name="usage_count"
                        id="url"
                        value={modalItem?.usage_count}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Coupon Usage Count"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Usage Limit
                      </label>
                      <input
                        type="number"
                        name="usage_limit"
                        id="available_colors"
                        value={modalItem?.usage_limit}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Coupon Usage Limit"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 mb-4">
                          <label
                            for="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Coupon Description
                          </label>
                          <textarea
                            id="description"
                            rows="4"
                            name="description"
                            value={modalItem?.description || ""}
                            onChange={handleChangeModal}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write product description here"
                          ></textarea>
                  </div>
                  <button
                  onClick={handleEditCoupon}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Check size={20} className="mr-2" />
                    Edit Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}</>
      )}
    </>
  );
};

export default Coupons;

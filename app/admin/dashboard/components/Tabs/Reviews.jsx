"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import CouponsListingTable from "../Tables/CouponsListing";
import OrdersListingTable from "../Tables/OrdersListing";
import UsersListingTable from "../Tables/UserListing";
import ReviewsListingTable from "../Tables/ReviewsListing";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";
import { Check } from "lucide-react";

const Reviews = () => {
  const getId = () => {
    if (!typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const userParsed = JSON.parse(user);
      return userParsed.id;
    }
  };
  const [couponsData, setCouponsData] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState();
  useEffect(() => {
    const getCoupons = async () => {
      const { data, error } = await supabase.from("Ratings").select("*");
      if (error) return;
      setCouponsData(data);
      setLoading(false);
    };
    getCoupons();
  }, []);
  const [formData, setFormData] = useState({
    product_id: "",
    user_id: getId(),
    added_on: new Date(),
    text_review: "",
    ratings: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const addReview = async () => {
    const { product_id, user_id, added_on, text_review, ratings } = formData;
    const { data, error } = await supabase.from("Ratings").insert([
      {
        product_id,
        user_id,
        added_on,
        text_review,
        ratings,
      },
    ]);
    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error);
      return;
    }
    console.log(data);
    toast.success("Review added successfully", toastsettings);
  };
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setModalItem(item);
    console.log(item);
  };
  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "url" || name === "available_colors") {
      updatedValue = value.split(/\s*,\s*/);
    }

    setModalItem((prevModalItem) => ({
      ...prevModalItem,
      [name]: updatedValue,
    }));
  };
  const handleEditReview = async () => {
    console.log(modalItem);
    const { data, error } = await supabase
      .from("Ratings")
      .update([
        {
          product_id: modalItem.product_id,
          user_id: modalItem.user_id,
          added_on: modalItem.added_on,
          text_review: modalItem.text_review,
          ratings: modalItem.ratings,
        },
      ])
      .eq("id", modalItem.id);
    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error)
      setOpenModal(false);
      return;
    }
    toast.success("Coupon updated successfully", toastsettings);
    setOpenModal(false);
    window.location.reload();
  };
  return (
    <>
      {loading ? (
        <div className="flex mt-[-3rem] w-full h-full justify-center items-center">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="w-full flex-col gap-4 flex">
            <div className="flex w-full p-8 rounded-xl border border-stroke bg-white shadow-default">
              <div className="flex w-full flex-col gap-4">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Product ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="product_id"
                    placeholder="Enter product ID"
                    value={formData.product_id}
                    onChange={handleChange}
                    className="w-full  transform-all duration-500 placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    placeholder="Enter user ID"
                    value={formData.user_id}
                    onChange={handleChange}
                    className=" w-full placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Text Review
                  </label>
                  <input
                    type="text"
                    name="text_review"
                    placeholder="Enter Text Review"
                    value={formData.text_review}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Rating
                  </label>
                  <input
                    placeholder="Enter Ratings (0-5)"
                    name="ratings"
                    type="number"
                    min="0"
                    max="5"
                    value={formData.ratings}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  ></input>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Added On
                  </label>
                  <input
                    placeholder="Review Added On"
                    name="added_on"
                    type="datetime-local"
                    value={formData.added_on}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  ></input>
                </div>
                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-white"
                  onClick={addReview}
                >
                  Add Review to Database
                </button>
              </div>
            </div>
            <div className="flex">
              <ReviewsListingTable
                data={couponsData}
                onOpenModal={handleOpenModal}
              />
            </div>
          </div>
          {openModal && (
            <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
              <div className="relative p-4 w-full sm:max-w-[70%] max-h-[95%] overflow-y-auto componentScroll">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                      Edit &nbsp;{" "}
                      <h1 className="cursor-pointer underline">
                        {modalItem?.product_id || "Coupon"}
                      </h1>
                      &nbsp; Product Review &nbsp;{" "}
                      <h1 className="text-gray-600 text-sm">{modalItem?.id}</h1>
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
                    <div className="grid grid-cols-1 mb-4">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User ID
                      </label>
                      <input
                        name="user_id"
                        type="text"
                        value={modalItem?.user_id || ""}
                        onChange={handleChangeModal}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></input>
                    </div>
                    <div className="grid grid-cols-1 mb-4">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Review Description
                      </label>
                      <textarea
                        id="text_review"
                        rows="4"
                        name="text_review"
                        value={modalItem?.text_review || ""}
                        onChange={handleChangeModal}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 mb-4">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Rating
                      </label>
                      <input
                        name="ratings"
                        type="number"
                        value={modalItem?.ratings || ""}
                        onChange={handleChangeModal}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></input>
                    </div>
                    <div className="grid grid-cols-1 mb-4">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Coupon Added On
                      </label>
                      <input
                        name="added_on"
                        type="datetime-local"
                        value={modalItem?.added_on || ""}
                        onChange={handleChangeModal}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></input>
                    </div>
                    <button
                      onClick={handleEditReview}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <Check size={20} className="mr-2" />
                      Edit Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Reviews;

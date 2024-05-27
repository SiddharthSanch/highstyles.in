"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { formatDate } from "@/utils/convertTime";
import Image from "next/image";
import Loader from "../components/Loader";
import { Check, X } from "lucide-react";
import { useCart } from "../context/cart";
import { Zoom, toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";

const MyOrdersPage = () => {
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    fetchOrders(user?.id);
  }, []);
  const userId = user?.id;
  console.log(userId);
  const [products, setProducts] = useState([]);
  async function fetchOrders(userID) {
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("user_id", userID)
      .order("timestamp", { ascending: false });
    if (error) console.log(error);
    else {
      setResponse(data);
      console.log(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <>
      {loading ? (
        <div className="flex h-screen justify-center items-center text-secondary text-3xl">
          <Loader />
        </div>
      ) : (
        <MainLayout>
          <div className="flex flex-col p-[1.5rem] sm:p-[5rem] gap-[2rem]">
            <div className="flex justify-center different relative mb-[5rem]">
              <div
                className="flex justify-center absolute w-full mt-4 sm:text-[6rem] text-3xl"
                style={{
                  opacity: 0.2,
                }}
              >
                Recently&nbsp;Ordered
              </div>
              <div className="flex justify-center text-gray-500 text-xl mt-[6rem] z-40">
                Check the status of recent orders, manage returns, and discover
                similar products.
              </div>
            </div>
            <div className="flex flex-col gap-[5rem] rounded-md justify-center">
              {response?.map((item, index) => {
                return (
                  <div className="flex flex-col gap-[1.5rem] border rounded-md border-gray-300" key={index}>
                    <div className="flex sm:flex-row flex-col justify-between p-4 border-b border-gray-300 items-center">
                      <div className="flex sm:flex-row flex-wrap gap-7 items-center p-4">
                        <div className="flex flex-col gap-1">
                          <h1 className="font-semibold">Order Number</h1>
                          <h1 className="text-gray-500">{item.orderNumber}</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="font-semibold">Invoice Number</h1>
                          <h1 className="text-gray-500">{item.invoiceNumber}</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="font-semibold">Date Ordered</h1>
                          <h1 className="text-gray-500">
                            {formatDate(item.timestamp)}
                          </h1>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="font-semibold">Total Amount</h1>
                          <h1 className="text-gray-500">₹ {item.amount}</h1>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 p-4">
                        <button className="border border-gray-300 flex items-center justify-center rounded-md p-2 hover:bg-gray-200 duration-300 transform-all">
                          View Order
                        </button>
                        <button className="border border-gray-300 flex items-center justify-center rounded-md p-2 hover:bg-gray-200 duration-300 transform-all">
                          View Invoice
                        </button>
                      </div>
                    </div>
                    <SpecificItem
                      itemId={item.order_products}
                      status={item.status}
                      user={user}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default MyOrdersPage;
const SpecificItem = ({ itemId, status, user }) => {
  console.log(itemId);
  const formattedData = itemId.map((item) => JSON.parse(item));
  console.log(formattedData);
  const cart = useCart();
  function getCartStatus(product) {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    cart = cart.filter((item) => item.id === product.id);
    if (cart.length > 0) {
      return true;
    }
    return false;
  }
  const [modalReview, setModalReview] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewtext, setReviewtext] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [hasReviewed, setHasReviewed] = useState(false);
  const addRating = async () => {
    if (ratingValue == 0) {
      toast.error("Please select a rating", {
        autoClose: 1000,
      });
    } else {
      const { data, error } = await supabase.from("Ratings").insert([
        {
          user_id: user.id,
          product_id: selectedProduct.id,
          ratings: ratingValue,
          text_review: reviewtext,
          added_on: new Date().toISOString(),
        },
      ]);
      if (error) {
        toast.error("Error adding review", toastsettings);
        console.log(error);
      } else {
        toast.success("Review added successfully", toastsettings);
        console.log(data);
      }
    }
    setModalReview(false);
  };
  const checkRating = async (item) => {
    setSelectedProduct(item);
    const { data, error } = await supabase
      .from("Ratings")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", item.id);
    console.log(data);
    if (error) {
      console.log(error);
    } else {
      if (data.length > 0) {
        toast("Review Already Added", {
          position: "bottom-right",
          autoClose: 1500,
          // hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // progress: undefined,
          theme: "colored",
          transition: Zoom,
        });
      } else {
        setModalReview(true);
        // addRating()
      }
    }
  };
  return (
    <>
      {formattedData.map((item, index) => {
        return (
          <div
            className={`flex flex-col px-4 ${
              index == formattedData.length - 1 ? "mb-6" : ""
            }`}
          >
            <div className="flex sm:flex-row flex-col" key={index}>
              <div className="flex justify-center sm:w-[35%] min-h-[20rem]">
                <Image
                  src={item.url?item.url[0]:""}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex sm:items-stretch items-center flex-col w-full gap-6 p-6 sm:ml-[3rem]">
                <div className="flex justify-between gap-4 items-center">
                  <h1 className="font-black w-[70%] text-gray-600 text-xl sm:text-3xl">
                    {item.title}
                  </h1>
                  <h1 className="font-black text-gray-600 sm:text-3xl">
                    ₹ {item.price}
                  </h1>
                </div>
                <div className="sm:h-[7rem] sm:max-w-[70%] text-gray-400">
                  <h1 className="line-clamp-4">{item.description}</h1>
                </div>
                <div className="flex sm:flex-row flex-col gap-4">
                  <button
                    className="font-semibold w-[11rem] text-primary hover:border-gray-400 border-2 border-white p-2 flex justify-center items-center rounded-md tranform-all duration-300"
                    onClick={() =>
                      (window.location.href = `/product/${item.id}`)
                    }
                  >
                    View Product
                  </button>
                  <button
                    className="font-semibold w-[11rem] bg-primary text-white p-2 flex justify-center items-center rounded-md tranform-all duration-300 hover:brightness-90"
                    onClick={() => {
                      if (getCartStatus(item)) {
                        cart.removeFromCart(item);
                        toast.info("Removed from cart", {
                          autoClose: 1000,
                        });
                      } else {
                        cart.addToCart(item);
                        toast.success("Added to cart", {
                          autoClose: 1000,
                        });
                      }
                    }}
                  >
                    {getCartStatus(item) ? "Remove from Cart" : "Buy Again"}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <Check size={26} className="text-green-500" />
                    <h1 className="font-semibold text-gray-600 ml-2">
                      {status}
                    </h1>
                  </div>
                  {status == "Delivered" && (
                    <div
                      className="flex p-2 hover:bg-gray-200 transform-all duration-300 font-semibold ml-6 text-gray-600 rounded-md cursor-pointer"
                      onClick={() => {
                        checkRating(item);
                      }}
                    >
                      Review Product
                    </div>
                  )}
                </div>
              </div>
            </div>
            {itemId.length > 1 && index !== formattedData.length - 1 && (
              <hr className="border-gray-300 mt-6" />
            )}
          </div>
        );
      })}
      {modalReview && (
        <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
          <div className="flex gap-4 flex-col w-[60%] p-8 overflow-y-auto rounded-md bg-white">
            <div className="flex">
              <h1 className="font-black text-2xl text-gray-600">
                Review Product
              </h1>
              <div
                className="ml-auto cursor-pointer rotate-90 transform-all duration-300 p-2 rounded-full hover:bg-gray-200"
                onClick={() => setModalReview(false)}
              >
                <X size={20} className="" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-gray-600">
                How would you rate this product?
              </h1>
              <div className="flex gap-4">
                <div
                  className="flex items-center gap-2"
                  onClick={() => setRatingValue(1)}
                >
                  <input type="radio" name="rating" id="rating1" value="1" />
                  <label htmlFor="rating1" className="text-gray-600">
                    1
                  </label>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setRatingValue(2)}
                >
                  <input type="radio" name="rating" id="rating2" value="2" />
                  <label htmlFor="rating2" className="text-gray-600">
                    2
                  </label>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setRatingValue(3)}
                >
                  <input type="radio" name="rating" id="rating3" value="3" />
                  <label htmlFor="rating3" className="text-gray-600">
                    3
                  </label>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setRatingValue(4)}
                >
                  <input type="radio" name="rating" id="rating4" value="4" />
                  <label htmlFor="rating4" className="text-gray-600">
                    4
                  </label>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setRatingValue(5)}
                >
                  <input type="radio" name="rating" id="rating5" value="5" />
                  <label htmlFor="rating5" className="text-gray-600">
                    5
                  </label>
                </div>
              </div>
              <h1 className="font-semibold text-gray-600">Write a review</h1>
              <textarea
                className="border border-gray-300 p-2 rounded-md"
                placeholder="Write your review here..."
                onChange={(e) => setReviewtext(e.target.value)}
              ></textarea>
              <button
                className="bg-primary text-white p-2 rounded-md hover:brightness-90 tranform-all duration-300"
                onClick={() => {
                  addRating();
                  console.log(reviewtext, ratingValue, selectedProduct);
                }}
              >
                {hasReviewed ? "Already Reviewed" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";
import React, { useEffect, useMemo, useState } from "react";
import Banner from "../components/Banner";
import MainLayout from "../layouts/MainLayout";
import {
  ArrowRight,
  InfoIcon,
  RotateCcw,
  Search,
  ShoppingCart,
  ArrowDown01,
  ArrowDown10,
} from "lucide-react";
import Image from "next/image";
import StarRating from "../components/StarRating";
import Loader from "../components/Loader";
import { useCart } from "../context/cart";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ClientOnly from "../components/ClientOnly";
import { supabase } from "@/utils/supabase";
import placeholder from "../../public/placeholder.png";
const page = () => {
  let sort_by;
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdown, setDropdown] = useState(true);
  const [data, setData] = useState();
  const [length, setLength] = useState();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const [amountFilter, setAmountFilter] = useState("Select Amount");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [ratingFilter, setRatingFilter] = useState([]);
  const [orgData, setOrgData] = useState();
  const [sortingMode, setSortingMode] = useState("asc");
  async function fetchData() {
    // const res = await fetch("/api/products");
    // const data_got = await res.json();
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("id", { ascending: true });
    if (error) return;
    const data_got = data;
    setOrgData(data_got);
    setData(data_got);
    setLength(data_got.length);
    setLoading(false);
    console.log("consoling the data got", data_got);
  }
  useEffect(() => {
    console.log(length);
    return () => {
      console.log("This will be called on unmount");
    };
  }, [length]);
  useEffect(() => {
    localStorage.setItem("sort_by", sortBy);
    return () => {
      console.log("This will be called on unmount");
    };
  }, [sortBy]);
  function modifyAndSortData(rule) {
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data provided");
      return [];
    }
    if (!rule || typeof rule !== "string") {
      console.error("Invalid rule provided");
      return data;
    }
    if (sortingMode === "asc") {
      switch (rule) {
        case "price":
          data.sort((a, b) => a.price - b.price);
          break;
        case "rating":
          data.sort((a, b) => a.rating - b.rating);
          break;
        case "sku":
          data.sort((a, b) => a.sku - b.sku);
          break;
        default:
          data.sort((a, b) => a.id - b.id);
      }
    } else {
      switch (rule) {
        case "price":
          data.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          data.sort((a, b) => b.rating - a.rating);
          break;
        case "sku":
          data.sort((a, b) => b.sku - a.sku);
          break;
        default:
          data.sort((a, b) => b.id - a.id);
      }
    }
    return data;
  }
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedData, setSearchedData] = useState(data);
  useEffect(() => {
    setSearchedData(data);
  }, [data]);
  useEffect(() => {
    console.log(sortBy);
    setLoading(true);
    setData(modifyAndSortData(sortBy));
    setLoading(false);
    setDropdown(!dropdown);
    localStorage.setItem("sort_by", sortBy);
    console.log(data);
    return () => {
      console.log("This will be called on unmount");
    };
  }, [sortBy]);
  const cart = useCart();
  const router = useRouter();
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
  useEffect(() => {
    console.log(amountFilter);
    console.log(selectedColors);
    console.log(ratingFilter);
    console.log(selectedGender);
    console.log(selectedYear);
    return () => {
      console.log("This will be called on unmount");
    };
  }, [
    amountFilter,
    selectedColors,
    ratingFilter,
    selectedGender,
    selectedYear,
  ]);
  const filterData = () => {
    let filteredData = orgData;
    console.log(filteredData);
    if (amountFilter !== "Select Amount") {
      filteredData = filteredData.filter(
        (item) => item.price <= amountFilter * 100
      );
    }

    if (selectedColors.length) {
      filteredData = filteredData.filter((item) =>
        selectedColors.some((color) => item.available_colors.includes(color))
      );
    }

    if (selectedCategories.length) {
      filteredData = filteredData.filter((item) =>
        selectedCategories.some((category) => item.category.includes(category))
      );
    }

    if (selectedGender !== "All") {
      filteredData = filteredData.filter(
        (item) => item.for_gender === selectedGender
      );
    }

    if (selectedYear !== "All") {
      console.log(selectedYear);
      filteredData = filteredData.filter(
        (item) => item.released_in === selectedYear
      );
    }

    if (ratingFilter.length) {
      filteredData = filteredData.filter((item) =>
        ratingFilter.includes(item.rating)
      );
    }

    setData(filteredData);
  };
  // for searching the product
  useEffect(() => {
    if (searchProduct) {
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchProduct.toLowerCase());
      });
      console.log(filteredData);
      setSearchedData(filteredData);
    } else {
      setSearchedData(data);
    }
  }, [searchProduct]);
  useEffect(() => {
    console.log(selectedCategories)
  },[selectedCategories])
  return (
    <ClientOnly>
      {loading ? (
        <div className="flex h-screen justify-center items-center text-secondary text-3xl">
          <Loader />
        </div>
      ) : (
        <MainLayout>
          <div className="flex flex-col gap-[3rem]">
            <div className="flex flex-col">
              <div className="flex justify-center text-xl font-bold">
                <h1 className="text-gray-500">
                  Home / <span className="text-secondary">All Products</span>
                </h1>
              </div>
              <div className="flex justify-center">
                <Banner />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-[3rem] px-[3rem] py-[1.5rem]">
              <div className="flex flex-col gap-[2rem] sm:w-1/4 sticky componentScroll bg-[#f5f5f5] rounded-xl sm:min-h-screen overflow-y-auto p-5">
                <div className="flex justify-between">
                  <h2 className="mb-2 text-2xl font-black">Filter Products</h2>
                  <div className="flex items-center gap-2">
                    <RotateCcw
                      size={15}
                      className="cursor-pointer"
                      onClick={() => {
                        setAmountFilter("Select Amount");
                        setSelectedColors([]);
                        setSelectedGender("All");
                        setSelectedYear("All");
                        setRatingFilter([]);
                        setData(orgData);
                      }}
                      title="Remove Filters"
                    />
                    <div
                      className="flex items-center justify-center p-2 rounded-md hover:bg-primary hover:text-white transform-all duration-500 bg-white cursor-pointer"
                      onClick={filterData}
                    >
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between text-gray-500">
                    <h1>Upto Amount</h1>
                    <span>
                      {amountFilter !== "Select Amount" && amountFilter * 100}
                    </span>
                  </div>
                  <label
                    htmlFor="default-range"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  ></label>
                  <input
                    id="default-range"
                    type="range"
                    value={amountFilter}
                    onChange={(e) => {
                      setAmountFilter(e.target.value);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <div className="flex text-gray-500">Select Colors</div>
                  <div className="flex flex-wrap gap-2">
                    {colors?.map((color) => (
                      <button
                        className={`p-2 hover:bg-gray-300 transform-all duration-300 rounded-2xl border border-gray-400 ${
                          selectedColors.includes(color.name)
                            ? "bg-gray-300"
                            : "bg-white"
                        }`}
                        key={color.id}
                        onClick={() => {
                          setSelectedColors((prevSelectedColors) =>
                            prevSelectedColors.includes(color.name)
                              ? prevSelectedColors.filter(
                                  (item) => item !== color.name
                                )
                              : [...prevSelectedColors, color.name]
                          );
                        }}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <div className="flex text-gray-500">Select Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {categories?.map((category) => (
                      <button
                        className={`p-2 hover:bg-gray-300 transform-all duration-300 rounded-2xl border border-gray-400 ${
                          selectedCategories.includes(category.name)
                            ? "bg-gray-300"
                            : "bg-white"
                        }`}
                        key={category.id}
                        onClick={() => {
                          setSelectedCategories((prevSelectedCategories) =>
                            prevSelectedCategories.includes(category.name)
                              ? prevSelectedCategories.filter(
                                  (item) => item !== category.name
                                )
                              : [...prevSelectedCategories, category.name]
                          );
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <div className="flex text-gray-500">Select Gender</div>
                  <div className="flex flex-wrap gap-2">
                    {genders?.map((item, index) => {
                      return (
                        <button
                          className={`p-2 hover:bg-gray-300 transform-all duration-300 rounded-2xl border border-gray-400 ${
                            selectedGender === item.name
                              ? "bg-gray-300"
                              : "bg-white"
                          }`}
                          key={index}
                          onClick={() =>
                            selectedGender === item.name
                              ? setSelectedGender("All")
                              : setSelectedGender(item.name)
                          }
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* <div className="flex flex-col gap-[1rem]">
                  <div className="flex text-gray-500">
                    Select Year of Production
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {years?.map((item, index) => {
                      return (
                        <button
                          className={`p-2 hover:bg-gray-300 transform-all duration-300 rounded-2xl border border-gray-400 ${
                            selectedYear === item.name
                              ? "bg-gray-300"
                              : "bg-white"
                          }`}
                          key={index}
                          onClick={() =>
                            selectedYear === item.name
                              ? setSelectedYear("All")
                              : setSelectedYear(item.name)
                          }
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div> */}
                <div className="flex flex-col gap-[1rem]">
                  <div className="flex text-gray-500">Select Rating</div>
                  <div className="flex flex-wrap gap-2">
                    {rating_data?.map((rating) => (
                      <button
                        className={`p-2 w-[5rem] hover:bg-gray-300 transform-all duration-300 rounded-2xl border border-gray-400 ${
                          ratingFilter.includes(rating.name)
                            ? "bg-gray-300"
                            : "bg-white"
                        }`}
                        key={rating.id}
                        onClick={() => {
                          setRatingFilter((prevSelectedColors) =>
                            prevSelectedColors.includes(rating.name)
                              ? prevSelectedColors.filter(
                                  (item) => item !== rating.name
                                )
                              : [...prevSelectedColors, rating.name]
                          );
                        }}
                      >
                        {rating.name}&nbsp;★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:w-3/4 sm:h-screen overflow-y-auto componentScroll">
                <div className="flex sm:flex-row flex-col gap-6 justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div className="relative items-center">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <Search className="text-gray-700" size={22} />
                        </div>
                        <input
                          type="text"
                          value={searchProduct}
                          onChange={(e) => setSearchProduct(e.target.value)}
                          className="block h-[2.5rem] sm:w-[25rem] w-full p-4 ps-12 text-sm rounded-md bg-[#f5f5f5]"
                          placeholder="Travel Bags, Handbags, College Bags, etc."
                          required
                        />
                        {/* button */}
                      </div>
                    </div>
                  </div>

                  <div className="flex font-semibold text-gray-500">
                    {searchedData?.length > 0 ? (
                      <h1>Showing {searchedData?.length} results</h1>
                    ) : (
                      <h1>Showing {data?.length} results</h1>
                    )}
                  </div>

                  <div className="flex gap-4 items-center">
                    <div
                      className="flex font-semibold cursor-pointer bg-gray-100 p-2 rounded-md text-gray-500"
                      onClick={() => {
                        setSortingMode(sortingMode === "asc" ? "desc" : "asc");
                        // setData(data.reverse());
                      }}
                    >
                      {sortingMode === "asc" ? (
                        <div className="gap-2 flex">
                          <h1>Low to High</h1>
                          <ArrowDown01 />
                        </div>
                      ) : (
                        <div className="gap-2 flex">
                          <h1>High to Low</h1>
                          <ArrowDown10 />
                        </div>
                      )}
                    </div>
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setDropdown(!dropdown)}
                        id="dropdownRadioHelperButton"
                        data-dropdown-toggle="dropdownRadioHelper"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[11rem]"
                        type="button "
                      >
                        Sort Items By
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      {dropdown && (
                        <div
                          id="dropdownRadioHelper"
                          className="z-10 absolute mt-4 flex justify-center bg-white divide-y divide-gray-100 rounded-lg shadow "
                        >
                          <ul
                            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownRadioHelperButton"
                          >
                            <li>
                              <div className="flex p-2 rounded hover:bg-gray-100 ">
                                <div className="flex items-center h-5">
                                  <input
                                    onClick={() => {
                                      setSortBy("id");
                                    }}
                                    onChange={() => {}}
                                    id="helper-radio-4"
                                    name="helper-radio"
                                    type="radio"
                                    checked={sortBy === "id"}
                                    value="helper-radio-4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                  />
                                </div>
                                <div className="ms-2 text-sm cursor-pointer">
                                  <label
                                    htmlFor="helper-radio-4"
                                    className="font-medium text-gray-900 "
                                  >
                                    <div>Sort by ID</div>
                                  </label>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="flex p-2 rounded hover:bg-gray-100 ">
                                <div className="flex items-center h-5">
                                  <input
                                    id="helper-radio-5"
                                    name="helper-radio"
                                    type="radio"
                                    value=""
                                    checked={sortBy === "price"}
                                    onClick={() => {
                                      setSortBy("price");
                                    }}
                                    onChange={() => {}}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                  />
                                </div>
                                <div className="ms-2 text-sm">
                                  <label
                                    htmlFor="helper-radio-5"
                                    className="font-medium text-gray-900 "
                                  >
                                    <div>Sort by Price</div>
                                  </label>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="flex p-2 rounded hover:bg-gray-100 ">
                                <div className="flex items-center h-5">
                                  <input
                                    id="helper-radio-6"
                                    name="helper-radio"
                                    type="radio"
                                    value=""
                                    onChange={() => {}}
                                    checked={sortBy === "rating"}
                                    onClick={() => {
                                      setSortBy("rating");
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                  />
                                </div>
                                <div className="ms-2 text-sm cursor-pointer">
                                  <label
                                    htmlFor="helper-radio-6"
                                    className="font-medium text-gray-900 "
                                  >
                                    <div>Sort by Rating</div>
                                  </label>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchedData?.map((item, index) => {
                    return (
                      <>
                        {/* 1st for web */}
                        <div
                          className="rounded-md w-[30rem] max-h-[22rem] p-[1rem] hidden sm:flex flex-wrap border border-gray-200 text-gray-600"
                          key={index}
                        >
                          <div className="flex flex-col gap-4">
                            <div className="flex w-full text-gray-600 flex-row items-center">
                              <div className="flex flex-col w-[60%]">
                                <div className="flex flex-col md:flex-row">
                                  <h2
                                    className="mb-2 line-clamp-2 text-xl font-black"
                                    title={item.title}
                                  >
                                    {item.title}
                                  </h2>
                                </div>
                                <p
                                  className="mt-3 line-clamp-2 font-sans text-base tracking-normal"
                                  title={item.description}
                                >
                                  {item.description}
                                </p>
                                <div className="flex flex-col md:flex-row md:items-end">
                                  <p className="mt-6 text-2xl sm:text-4xl font-black">
                                    ₹{item.price}
                                    <sup className="align-super text-sm">
                                      {item.id}
                                    </sup>
                                  </p>
                                  <span className="ml-2 text-xs uppercase">
                                    {item.SKU}
                                  </span>
                                </div>
                                <div className="flex" title="Per Day Use">
                                  <h1 className="text-gray-700">
                                    ₹
                                    {(
                                      item.usage_time_days / item.price
                                    ).toFixed(2)}
                                    /day
                                  </h1>
                                </div>
                              </div>
                              <div className="flex sm:flex-row flex-col-reverse gap-4 w-[40%]">
                                <div
                                  className="flex cursor-pointer items-center justify-center"
                                  onClick={() =>
                                    router.push("/product/" + item.id)
                                  }
                                >
                                  {item?.url?.[0] && (
                                    <Image
                                      className="p-3 block object-contain max-h-[16rem] max-w-full rounded-md"
                                      src={
                                        item.url[0] ? item.url[0] : placeholder
                                      }
                                      alt="Image Unavailable"
                                      width={300}
                                      height={300}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row">
                              <button
                                className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-primary py-2 px-8 text-center text-white transform-all duration-500  hover:bg-secondary"
                                onClick={() =>
                                  router.push("/product/" + item.id)
                                }
                              >
                                <InfoIcon className="mr-2" size={20} />
                                View Details
                              </button>
                              <button
                                className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md py-2 px-8 text-center text-gray-500 transform-all duration-500 border-2 border-white hover:border-primary"
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
                                <ShoppingCart className="mr-2" size={20} />
                                {getCartStatus(item)
                                  ? "Remove From Cart"
                                  : "Add To Cart"}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="rounded-md min-h-[25rem] p-[2rem] sm:hidden flex flex-col gap-2 border border-gray-200 text-gray-600"
                          key={index}
                        >
                          <div className="flex justify-between items-center">
                            <StarRating rating={item.rating} />
                            <h1 className="text-gray-600">{item.SKU}</h1>
                          </div>
                          <div className="flex max-h-[60%] justify-center">
                            <Image
                              src={item.url[0] ? item.url[0] : placeholder}
                              alt={item.title}
                              width={150}
                              height={150}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex">
                            <h1 className="line-clamp-2 font-bold">
                              {item.title}
                            </h1>
                          </div>
                          <div className="flex">
                            <h1 className="line-clamp-1">{item.description}</h1>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col p-2">
                              <h1 className="text-gray-500 text-sm line-through">
                                ₹{item.mrp}
                              </h1>
                              <h1 className="font-bold text-xl">
                                ₹{item.price}
                              </h1>
                            </div>
                            <div className="flex">
                              <button
                                className="p-2 flex justify-center items-center rounded-md bg-primary text-white"
                                onClick={() =>
                                  router.push("/product/" + item.id)
                                }
                              >
                                View Product
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </ClientOnly>
  );
};

export default page;
const colors = [
  // { id: 1, name: "Red", value: "#FF0000" },
  // { id: 2, name: "Blue", value: "#0000FF" },
  // { id: 3, name: "Green", value: "#00FF00" },
  // { id: 4, name: "Yellow", value: "#FFFF00" },
  // { id: 5, name: "Purple", value: "#800080" },
  // { id: 6, name: "Orange", value: "#FFA500" },
  { id: 7, name: "Pink", value: "#FFC0CB" },
  { id: 8, name: "Cyan", value: "#00FFFF" },
  { id: 9, name: "Navy Blue", value: "#000080" },
  { id: 10, name: "Royal Blue", value: "#4169E1" },
  { id: 11, name: "Artificial Blue", value: "#4682B4" },
  { id: 12, name: "Sky Blue", value: "#87CEEB" },
];
const rating_data = [
  { id: 1, name: 5 },
  { id: 2, name: 4 },
  { id: 3, name: 3 },
  { id: 4, name: 2 },
  { id: 5, name: 1 },
];
const genders = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
];
const years = [
  { id: 1, name: 2024 },
  { id: 2, name: 2023 },
  { id: 3, name: 2022 },
  { id: 4, name: 2021 },
];
const categories = [
  { id: 1, name: "Backpacks" },
  { id: 2, name: "Travel Bags" },
  { id: 3, name: "Handbags" },
  { id: 4, name: "Casual Bags" },
  { id: 5, name: "Sidebags" },
  { id: 6, name: "Wallets" },
  { id: 7, name: "Laptops Bags" },
  { id: 8, name: "Prefume" },
];

"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductsListingTable from "../Tables/ProductsListing";
import { supabase } from "@/utils/supabase";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";
import { Check } from "lucide-react";
import PointsForm from "@/app/components/ThingsCovered";

const Products = () => {
  const imageKeys = [
    { key: "image_black", color: "Black" },
    { key: "image_blue", color: "Blue" },
    { key: "image_grey", color: "Grey" },
    { key: "image_hutchBlue", color: "Hutch Blue" },
    { key: "image_navyBlue", color: "Navy Blue" },
    { key: "image_red", color: "Red" },
    { key: "image_royalBlue", color: "Royal Blue" },
    { key: "image_artifical_blue", color: "Artifical Blue" },
    { key: "image_sky_blue", color: "Sky Blue" },
    { key: "image_mahroon", color: "Maroon" },
    { key: "image_pink", color: "Pink" },
    { key: "image_green", color: "Green" },
    { key: "image_brown", color: "Brown" },
    { key: "image_tan", color: "Tan" },
  ];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [sortingMode, setSortingMode] = useState("asc");
  const [modalItem, setModalItem] = useState();
  const [openThingsCovered, setOpenThingsCovered] = useState(false);
  const [thingsCovered, setThingsCovered] = useState({});
  const getProducts = async () => {
    console.log("Products Fetched");
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .order("id", { ascending: true });
    if (error) return;
    const prods = data;
    console.log(prods);
    setLoading(false);
    setProducts(prods);
  };
  useEffect(() => {
    getProducts();
  }, []);
  // state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    created_at: new Date().toISOString(),
    SKU: "",
    available_colors: [],
    brand: "",
    category: "Backpacks",
    condition: "New",
    for_gender: "Unisex",
    no_of_reviews: 0,
    rating: 0,
    url: [],
    released_in: 2024,
    price: 0,
    mrp: 0,
    image_black: [],
    image_blue: [],
    image_grey: [],
    image_hutchBlue: [],
    image_navyBlue: [],
    image_red: [],
    image_royalBlue: [],
    image_pink: [],
    image_artifical_blue: [],
    image_sky_blue: [],
    image_mahroon: [],
    image_green: [],
    image_brown: [],
    image_tan: [],
    quantity_stock: 0,
    usage_time_days: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "url" ||
      name === "available_colors" ||
      name === "image_black" ||
      name === "image_blue" ||
      name === "image_grey" ||
      name === "image_hutchBlue" ||
      name === "image_navyBlue" ||
      name === "image_red" ||
      name === "image_royalBlue"||
      name === "image_artifical_blue" ||
      name === "image_sky_blue" ||
      name === "image_mahroon" ||
      name === "image_pink" ||
      name === "image_green" ||
      name === "image_brown" ||
      name === "image_tan"
    ) {
      setFormData({
        ...formData,
        [name]: value.split(","),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const addProduct = async () => {
    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.SKU === "" ||
      formData.brand === "" ||
      formData.category === "" ||
      formData.price === 0 ||
      formData.mrp === 0 ||
      formData.quantity_stock === 0
    ) {
      toast.error("Please fill all the required fields", toastsettings);
      return;
    }
    // extracting data from state
    const {
      title,
      description,
      created_at,
      SKU,
      available_colors,
      brand,
      category,
      condition,
      for_gender,
      no_of_reviews,
      rating,
      url,
      released_in,
      price,
      mrp,
      image_black,
      image_blue,
      image_grey,
      image_hutchBlue,
      image_navyBlue,
      image_red,
      image_royalBlue,
      image_artifical_blue,
      image_sky_blue,
      image_mahroon,
      image_pink,
      image_brown,
      image_green,
      image_tan,
      quantity_stock,
      usage_time_days,
    } = formData;
    const urls = [];
    imageKeys.forEach(({ key, color }) => {
      if (formData[key] && formData[key].length > 0) {
        console.log(formData[key], color);
        urls.push(...formData[key]);
        formData.available_colors.push(color);
      }
    });
    const { data, error } = await supabase.from("Products").insert([
      {
        title,
        description,
        created_at,
        SKU,
        available_colors,
        brand,
        category,
        condition,
        for_gender,
        no_of_reviews,
        rating,
        url,
        released_in,
        price,
        mrp,
        image_black,
        image_blue,
        image_grey,
        image_hutchBlue,
        image_navyBlue,
        image_red,
        image_royalBlue,
        image_artifical_blue,
        image_sky_blue,
        image_mahroon,
        image_pink,
        image_brown,
        image_green,
        image_tan,
        quantity_stock,
        things_covered: JSON.stringify(thingsCovered),
        usage_time_days,
        url: urls,
      },
    ]);

    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error);
      return;
    }

    console.log(data);

    toast.success("Product added successfully", toastsettings);
    // setTimeout(() => {
    //   setFormData({
    //     title: "",
    //     description: "",
    //     created_at: new Date().toISOString(),
    //     SKU: "",
    //     available_colors: [],
    //     brand: "",
    //     category: "",
    //     condition: "New",
    //     for_gender: "Unisex",
    //     no_of_reviews: 0,
    //     rating: 0,
    //     url: [],
    //     released_in: 2024,
    //     price: 0,
    //     mrp: 0,
    //     image_black: [],
    //     image_blue: [],
    //     image_grey: [],
    //     image_hutchBlue: [],
    //     image_navyBlue: [],
    //     image_red: [],
    //     image_royalBlue: [],
    //     quantity_stock: 0,
    //     things_covered: {},
    //     usage_time_days: 0,
    //   });
    // }, 1000);
  };
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setModalItem(item);
    console.log(item);
  };
  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (
      name === "url" ||
      name === "available_colors" ||
      name === "image_black" ||
      name === "image_blue" ||
      name === "image_grey" ||
      name === "image_hutchBlue" ||
      name === "image_navyBlue" ||
      name === "image_red" ||
      name === "image_royalBlue" ||
      name === "image_artifical_blue" ||
      name === "image_sky_blue" ||
      name === "image_mahroon" ||
      name === "image_pink" ||
      name === "image_green" ||
      name === "image_brown" ||
      name === "image_tan"
    ) {
      updatedValue = value.split(/\s*,\s*/);
    }

    setModalItem((prevModalItem) => ({
      ...prevModalItem,
      [name]: updatedValue,
    }));
  };
  const handleEditProduct = async () => {
    const urls = [];
    imageKeys.forEach(({ key, color }) => {
      if (modalItem[key] && modalItem[key].length > 0) {
        urls.push(...modalItem[key]);
        modalItem.available_colors.push(color);
      }
    });
    const { data, error } = await supabase
      .from("Products")
      .update([
        {
          title: modalItem.title,
          description: modalItem.description,
          created_at: modalItem.created_at,
          SKU: modalItem.SKU,
          brand: modalItem.brand,
          category: modalItem.category,
          condition: modalItem.condition,
          for_gender: modalItem.for_gender,
          no_of_reviews: modalItem.no_of_reviews,
          rating: modalItem.rating,
          released_in: modalItem.released_in,
          price: modalItem.price,
          mrp: modalItem.mrp,
          quantity_stock: modalItem.quantity_stock,
          usage_time_days: modalItem.usage_time_days,
          image_black: modalItem.image_black,
          image_blue: modalItem.image_blue,
          image_grey: modalItem.image_grey,
          image_hutchBlue: modalItem.image_hutchBlue,
          image_navyBlue: modalItem.image_navyBlue,
          image_red: modalItem.image_red,
          image_royalBlue: modalItem.image_royalBlue,
          image_artifical_blue: modalItem.image_artifical_blue,
          image_sky_blue: modalItem.image_sky_blue,
          image_mahroon: modalItem.image_mahroon,
          image_pink: modalItem.image_pink,
          image_green: modalItem.image_green,
          image_brown: modalItem.image_brown,
          image_tan: modalItem.image_tan,
          things_covered: modalItem.things_covered,
          url: urls,
        },
      ])
      .eq("id", modalItem.id);
    if (error) {
      toast.error(error.details, toastsettings);
      setOpenModal(false);
      return;
    }
    toast.success("Product updated successfully", toastsettings);
    setOpenModal(false);
    getProducts();
    window.location.reload();
  };
  const dropdown = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !openModal ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      console.log("event fired");
      setOpenModal(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const toggleBestSeller = async () => {
    const { data, error } = await supabase
      .from("Products")
      .select("best_seller")
      .eq("id", modalItem.id);
    if (error) return;
    const ans = data[0].best_seller;
    const { data: updatedData, error: updatedError } = await supabase
      .from("Products")
      .update({
        best_seller: !ans,
      })
      .eq("id", modalItem.id);
    if (updatedError) return;
    ans
      ? toast.success("Product removed from Best Seller", toastsettings)
      : toast.success("Product marked as Best Seller", toastsettings);
  };
  const addFakeData = () => {
    setFormData({
      title: "Product Name",
      description: "Product Description",
      created_at: new Date().toISOString(),
      SKU: "SKU1234567890",
      available_colors: [],
      brand: "Brand Name",
      category: "Backpacks",
      condition: "New",
      for_gender: "Unisex",
      no_of_reviews: 0,
      rating: 0,
      released_in: 2024,
      price: 5000,
      mrp: 6000,
      image_black: [],
      image_blue: [],
      image_grey: [],
      image_hutchBlue: [],
      image_navyBlue: [],
      image_red: [],
      image_royalBlue: [],
      quantity_stock: 100,
      usage_time_days: 0,
      url: [],
    });
  };
  useEffect(() => {
    console.log(formData.category);
  }, [formData.category]);
  return (
    <>
      {loading ? (
        <div className="flex mt-[-3rem] w-full h-full justify-center items-center">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col gap-6">
            <div className="flex w-full p-8 rounded-xl border border-stroke bg-white shadow-default">
              <div className="flex w-full flex-col gap-4">
                <h1 className="text-red-500" onClick={addFakeData}>
                  {/*<h1 className="text-red-500">*/}
                  Fields marked with * are mandatory
                </h1>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Product Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="name"
                    required
                    name="title"
                    placeholder="Enter your product name"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full  transform-all duration-500 placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
                <div className="mb-4.5 flex row gap-6">
                  <div className="flex flex-col w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product Description*
                    </label>
                    <input
                      type="text"
                      required
                      name="description"
                      placeholder="Enter your product description"
                      value={formData.description}
                      onChange={handleChange}
                      className=" w-full placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="flex flex-col w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product Quantity*
                    </label>
                    <input
                      type="number"
                      required
                      name="quantity_stock"
                      placeholder="Enter your product quantity"
                      value={formData.quantity_stock}
                      onChange={handleChange}
                      className=" w-full placeholder:capitalize rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product SKU*
                    </label>
                    <input
                      type="text"
                      required
                      name="SKU"
                      placeholder="Enter your Product SKU Code"
                      value={formData.SKU}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product MRP*
                    </label>
                    <input
                      type="text"
                      required
                      name="mrp"
                      placeholder="Enter your Product MRP"
                      value={formData.mrp}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product Brand*
                    </label>
                    <input
                      name="brand"
                      required
                      type="text"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Product's Brand"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product Category*
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    >
                      <option value="Backpacks">Backpacks</option>
                      <option value="Travel Bags">Travel Bags</option>
                      <option value="Handbags">Handbags</option>
                      <option value="Casual Bags">Casual Bags</option>
                      <option value="Sidebags">Sidebags</option>
                      <option value="Wallets">Wallets</option>
                      <option value="Laptops Bags">Laptops Bags</option>
                      <option value="Prefume">Prefume</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Condition
                    </label>
                    <input
                      type="text"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      placeholder="Product Condition"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Gender
                    </label>
                    <input
                      type="text"
                      name="for_gender"
                      placeholder="Bag For's"
                      value={formData.for_gender}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Product Price*
                    </label>
                    <input
                      type="number"
                      required
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Selling Price i.e. < MRP"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL NAVY BLUE
                    </label>
                    <input
                      type="text"
                      name="image_navyBlue"
                      placeholder="Image URL's NAVY BLUE (separated by comma)"
                      value={formData.image_navyBlue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL RED
                    </label>
                    <input
                      type="text"
                      name="image_red"
                      placeholder="Image URL's RED (separated by comma)"
                      value={formData.image_red}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL BLUE
                    </label>
                    <input
                      type="text"
                      name="image_blue"
                      placeholder="Image URL's BLUE (separated by comma)"
                      value={formData.image_blue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL GREY
                    </label>
                    <input
                      type="text"
                      name="image_grey"
                      placeholder="Image URL's GREY (separated by comma)"
                      value={formData.image_grey}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL HUTCH BLUE
                    </label>
                    <input
                      type="text"
                      name="image_hutchBlue"
                      placeholder="Image URL's HUTCH BLUE (separated by comma)"
                      value={formData.image_hutchBlue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL BLACK
                    </label>
                    <input
                      type="text"
                      name="image_black"
                      placeholder="Image URL's BLACK (separated by comma)"
                      value={formData.image_black}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL ROYAL BLUE
                    </label>
                    <input
                      type="text"
                      name="image_royalBlue"
                      placeholder="Image URL's ROYAL BLUE (separated by comma)"
                      value={formData.image_royalBlue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Maroon
                    </label>
                    <input
                      type="text"
                      name="image_mahroon"
                      placeholder="Image URL's Maroon (separated by comma)"
                      value={formData.image_mahroon}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Pink
                    </label>
                    <input
                      type="text"
                      name="image_pink"
                      placeholder="Image URL's Pink (separated by comma)"
                      value={formData.image_pink}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Sky Blue
                    </label>
                    <input
                      type="text"
                      name="image_sky_blue"
                      placeholder="Image URL's Sky Blue (separated by comma)"
                      value={formData.image_sky_blue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Artifical Blue
                    </label>
                    <input
                      type="text"
                      name="image_artifical_blue"
                      placeholder="Image URL's Artificial BLUE (separated by comma)"
                      value={formData.image_artifical_blue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Brown
                    </label>
                    <input
                      type="text"
                      name="image_brown"
                      placeholder="Image URL's Brown (separated by comma)"
                      value={formData.image_brown}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Green
                    </label>
                    <input
                      type="text"
                      name="image_green"
                      placeholder="Image URL's Green (separated by comma)"
                      value={formData.image_green}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Tan
                    </label>
                    <input
                      type="text"
                      name="image_tan"
                      placeholder="Image URL's Tan (separated by comma)"
                      value={formData.image_tan}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  {/* <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Artifical Blue
                    </label>
                    <input
                      type="text"
                      name="image_royalBlue"
                      placeholder="Image URL's Artificial BLUE (separated by comma)"
                      value={formData.image_artifical_blue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div> */}
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Last upto Days
                    </label>
                    <input
                      type="text"
                      name="usage_time_days"
                      placeholder="Enter Days till product lasts"
                      value={formData.usage_time_days}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <button
                    className="p-4 border-2 rounded-md flex justify-center items-center border-blue-500"
                    onClick={() => setOpenThingsCovered(true)}
                  >
                    Add Things Covered
                  </button>
                </div>
                <button
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-white"
                  onClick={addProduct}
                >
                  Add Product to Database
                </button>
              </div>
            </div>
            <div className="flex">
              <ProductsListingTable
                data={products}
                onOpenModal={handleOpenModal}
              />
            </div>
          </div>
          {openThingsCovered && (
            <div
              className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full"
              ref={dropdown}
            >
              <div className="flex w-[80%] h-[80%]">
                <PointsForm
                  setOpenThingsCovered={setOpenThingsCovered}
                  setThingsCovered={setThingsCovered}
                />
              </div>
            </div>
          )}
          {/* modal for editing product */}
          {openModal && (
            <div ref={trigger}>
              <div
                className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full"
                ref={dropdown}
              >
                <div className="relative p-4 w-full sm:max-w-[70%] max-h-[95%] overflow-y-auto componentScroll">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                        Edit &nbsp;{" "}
                        <h1
                          className="cursor-pointer max-w-[80%] line-clamp-1 underline"
                          title={modalItem?.title || "Product"}
                        >
                          {/* {modalItem?.title || "Product"} */}
                          Product
                        </h1>
                        &nbsp; Details &nbsp;{" "}
                        <h1 className="text-gray-600 text-sm">
                          {modalItem?.id}
                        </h1>
                      </h3>
                      <button
                        className="p-2 rounded-md border bg-gray-200 ml-4"
                        onClick={toggleBestSeller}
                      >
                        Mark as Best Seller
                      </button>
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
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="name"
                            value={modalItem?.title || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="Type product name"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Quantity
                          </label>
                          <input
                            type="text"
                            name="quantity_stock"
                            id="name"
                            value={modalItem?.quantity_stock || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="Enter quantity of product"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            value={modalItem?.price || ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                            onChange={handleChangeModal}
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Category
                          </label>
                          <input
                            type="text"
                            name="category"
                            id="category"
                            value={modalItem?.category || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Product Description
                          </label>
                          <textarea
                            id="description"
                            rows="2"
                            name="description"
                            value={modalItem?.description || ""}
                            onChange={handleChangeModal}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write product description here"
                          ></textarea>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Product MRP
                          </label>
                          <input
                            type="text"
                            name="mrp"
                            id="mrp"
                            value={modalItem?.mrp || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            SKU
                          </label>
                          <input
                            type="text"
                            name="SKU"
                            id="SKU"
                            value={modalItem?.SKU || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Brand
                          </label>
                          <input
                            type="text"
                            name="brand"
                            id="brand"
                            value={modalItem?.brand || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 mb-4 grid-cols-3">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Condition
                          </label>
                          <input
                            type="text"
                            name="condition"
                            id="condition"
                            value={modalItem?.condition || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            For Gender
                          </label>
                          <input
                            type="text"
                            name="for_gender"
                            id="for_gender"
                            value={modalItem?.for_gender || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="Unisex, Male, Female"
                            required=""
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Released In
                          </label>
                          <input
                            type="text"
                            name="released_in"
                            id="released_in"
                            value={modalItem?.released_in || ""}
                            onChange={handleChangeModal}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL RED
                          </label>
                          <input
                            type="text"
                            name="image_red"
                            placeholder="Image URL's RED (separated by comma)"
                            value={modalItem.image_red}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL BLUE
                          </label>
                          <input
                            type="text"
                            name="image_blue"
                            placeholder="Image URL's BLUE (separated by comma)"
                            value={modalItem.image_blue}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                      </div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL GREY
                          </label>
                          <input
                            type="text"
                            name="image_grey"
                            placeholder="Image URL's GREY (separated by comma)"
                            value={modalItem.image_grey}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL HUTCH BLUE
                          </label>
                          <input
                            type="text"
                            name="image_hutchBlue"
                            placeholder="Image URL's HUTCH BLUE (separated by comma)"
                            value={modalItem.image_hutchBlue}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                      </div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL BLACK
                          </label>
                          <input
                            type="text"
                            name="image_black"
                            placeholder="Image URL's BLACK (separated by comma)"
                            value={modalItem.image_black}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL ROYAL BLUE
                          </label>
                          <input
                            type="text"
                            name="image_royalBlue"
                            placeholder="Image URL's ROYAL BLUE (separated by comma)"
                            value={modalItem.image_royalBlue}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                      </div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Mahroon
                    </label>
                    <input
                      type="text"
                      name="image_mahroon"
                      placeholder="Image URL's Mahroon (separated by comma)"
                      value={modalItem.image_mahroon}
                      onChange={handleChangeModal}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Pink
                    </label>
                    <input
                      type="text"
                      name="image_pink"
                      placeholder="Image URL's Pink (separated by comma)"
                      value={modalItem.image_pink}
                      onChange={handleChangeModal}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black ">
                          Image URL Sky Blue
                        </label>
                        <input
                          type="text"
                          name="image_sky_blue"
                          placeholder="Image URL's Sky Blue (separated by comma)"
                          value={modalItem.image_sky_blue}
                          onChange={handleChangeModal}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                        />
                      </div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black ">
                          Image URL Artifical Blue
                        </label>
                        <input
                          type="text"
                          name="image_artifical_blue"
                          placeholder="Image URL's Artificial BLUE (separated by comma)"
                          value={modalItem.image_artifical_blue}
                          onChange={handleChangeModal}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Brown
                    </label>
                    <input
                      type="text"
                      name="image_brown"
                      placeholder="Image URL's Brown (separated by comma)"
                      value={modalItem.image_brown}
                      onChange={handleChangeModal}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Green
                    </label>
                    <input
                      type="text"
                      name="image_green"
                      placeholder="Image URL's Green (separated by comma)"
                      value={modalItem.image_green}
                      onChange={handleChangeModal}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Tan
                    </label>
                    <input
                      type="text"
                      name="image_tan"
                      placeholder="Image URL's Tan (separated by comma)"
                      value={modalItem.image_tan}
                      onChange={handleChangeModal}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div>
                  {/* <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black ">
                      Image URL Artifical Blue
                    </label>
                    <input
                      type="text"
                      name="image_royalBlue"
                      placeholder="Image URL's Artificial BLUE (separated by comma)"
                      value={formData.image_artifical_blue}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                    />
                  </div> */}
                </div>
                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Image URL NAVY BLUE
                          </label>
                          <input
                            type="text"
                            name="image_navyBlue"
                            placeholder="Image URL's NAVY BLUE (separated by comma)"
                            value={modalItem.image_navyBlue}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                        <div className="w-full xl:w-1/2">
                          <label className="mb-3 block text-sm font-medium text-black ">
                            Things Covered
                          </label>
                          <input
                            type="text"
                            name="things_covered"
                            placeholder="Things Covered (Just type in JSON format)"
                            value={modalItem.things_covered}
                            onChange={handleChangeModal}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleEditProduct}
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <Check size={20} className="mr-2" />
                        Edit Product
                      </button>
                    </div>
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

export default Products;

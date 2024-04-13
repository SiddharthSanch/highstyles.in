"use client";

import MainLayout from "../../layouts/MainLayout";
import SimilarProducts from "../../components/SimilarProducts";
import { useEffect, useState } from "react";
import useIsLoading from "../../hooks/useIsLoading";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import Image from "next/image";
import dummyImage from "../../../public/bag-dumy.jpg";
import logodummy from "../../../public/logo_dummy.png";
import {
  Heart,
  Paperclip,
  ShoppingBag,
  ShoppingCart,
  Star,
  TicketCheck,
  Truck,
  X,
} from "lucide-react";
import StarRating from "@/app/components/StarRating";
import Reviews from "@/app/components/Reviews";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";

export default function Product({ params }) {
  const router = useRouter();
  const cart = useCart();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getProduct () {
     // useIsLoading(true);
     setLoading(true);
     setProduct({});
     const response = await fetch(`/api/product/${params.id}`);
     const prod = await response.json();
     console.log(prod);
     setLoading(false);
     setProduct(prod);
     cart.isItemAddedToCart(prod);
     // useIsLoading(false);
   };
   getProduct();
   return () => {
     console.log("unmounted")
   }
 }, []);
  const selectTheColor = (color) => {
    let imageUrl;
    switch (color) {
      case "Red":
        imageUrl = product.image_red;
        break;
      case "Blue":
        imageUrl = product.image_blue;
        break;
      case "Black":
        imageUrl = product.image_black;
        break;
      case "Grey":
        imageUrl = product.image_grey;
        break;
      case "Hutch Blue":
        imageUrl = product.image_hutchBlue;
        break;
      case "Royal Blue":
        imageUrl = product.image_royalBlue;
        break;
      case "Navy Blue":
        imageUrl = product.image_navyBlue;
        break;
      default:
        imageUrl = product.image_red;
        break;
    }
    setProduct(prevProduct => ({
      ...prevProduct,
      url: imageUrl
    }));
  };
  
  const [selectedImage, setSelectedImage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    console.log(product.url)
  }, [product.url])
    return (
    <>
      {loading ? (
        <div className="flex h-screen justify-center items-center text-secondary text-3xl"><Loader/></div>
      ) : (
        <MainLayout>
          <div className="flex flex-col gap-3 p-8 sm:mt-0 mt-[-5.5rem]">
            <div className="flex sm:flex-row flex-col">
              <div className="flex flex-col gap-4 sm:w-1/2 sm:p-8">
                <div className="flex">
                  <h1 className="text-sm text-gray-600">
                    {product.brand ? product.brand : "Product Brand"} •{" "}
                    {product.for_gender ? product.for_gender : "Men / Women"} •{" "}
                    {product.category ? product.category : "Category"}
                  </h1>
                </div>
                <div className="flex w-full h-[40rem]">
                  <Image
                    className="w-full rounded-lg object-cover"
                    // src={product?.url[0]+'/280'}
                    src={selectedImage?selectedImage:product?.url[0]}
                    width={600}
                    height={600}
                    title={product?.title}
                    alt={product?.title}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  {product?.url.map((url, index) => (
                    <Image
                    src={url}
                    key={index}
                    width={140}
                    height={105}
                    alt="product"
                    className={`cursor-pointer object-cover rounded-md ${
                      selectedImage === url ? "border-2 border-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(url)}
                  />
                  ))}
                  {/* <div className="flex ml-5 justify-center items-center">
                    <h1 className="text-gray-500">
                      {imageLength>3?`+${imageLength-3} More`:''}
                    </h1>
                  </div> */}
                </div>
              </div>
              <hr className="sm:hidden w-full my-6" />
              <div className="flex flex-col gap-10 sm:w-1/2 sm:p-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 ">
                    <Image
                      src={logodummy}
                      width={35}
                      height={35}
                      alt="logo"
                      className="p-2 border-2 rounded-full"
                    />
                    <h1 className="">
                      {product.brand ? product.brand : "Product Brand"}
                    </h1>
                  </div>
                  <div className="flex">
                    <h1 className="text-sm text-gray-500">{product?.SKU}</h1>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold ml-1 ">{product?.title}</h1>

                  <div className="flex gap-4">
                    <StarRating rating={product?.rating} />
                    <h1 className="text-sm text-gray-500">
                      {product?.no_of_reviews} reviews
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="flex text-xl font-semibold">Colors</h1>
                  <div className="flex gap-4">
                    {product?.available_colors?.map((color, index) => (
                      <div
                        onClick={() => selectTheColor(color)}
                        key={index}
                        className={`cursor-pointer hover:scale-105 w-10 h-[3rem] rounded-md `}
                        style={{ backgroundColor: colors[color] }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex flex-col">
                    <h1 className="text-gray-500 text-xl line-through">
                      ₹ {product?.mrp}
                    </h1>
                    <h1 className="text-3xl font-bold">₹ {product?.price}</h1>
                    </div>
                    <button
                      className="bg-primary text-white p-2 rounded-md"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      {showDetails ? "Hide Details" : "Show Details"}
                    </button>
                  </div>
                </div>
                <div className="flex p-4 rounded-md bg-[#f5f5f5]">
                  <div className="flex flex-col gap-4">
                    <div className="flex">
                      <h1 className="font-bold text-xl">Availabe Offers</h1>
                    </div>
                    <div className="flex flex-col gap-3">
                      {offers.slice(0, 4).map((offer, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <div className="flex gap-2 items-center justify-between">
                            <div className="flex gap-2 items-center">
                              <Paperclip className="text-primary" size={20} />
                              <h1 className="text-gray-500">{offer.type}</h1>
                            </div>
                            <div className="flex">
                              <h1 className="text-sm text-secondary">
                                Valid until{" "}
                                {convertTimestampToDateFormat(offer.validUntil)}
                              </h1>
                            </div>
                          </div>
                          <div className="flex">
                            <h1
                              className="text-sm line-clamp-1 text-gray-500"
                              title={offer.description}
                            >
                              {offer.description}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {product?.inStock===true?(<div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    {/* add to cart */}
                    <button
                        className="w-[60%] flex justify-center items-center gap-2 bg-black text-white px-4 py-4 rounded-md"
                        onClick={() => {
                          if (cart.isItemAdded) {
                            cart.removeFromCart(product);
                            toast.info("Removed from cart", { autoClose: 1000 });
                          } else {
                            cart.addToCart(product);
                            toast.success("Added to cart", { autoClose: 1000 });
                          }
                        }}
                    >
                      <ShoppingBag size={20} />
                      <h1 className="">
                        {cart.isItemAdded ? "Remove From Cart" : "Add To Cart"}
                      </h1>
                    </button>
                    {/* buy now */}
                    <button
                        className="w-[40%] flex justify-center items-center gap-2 bg-primary text-white px-4 py-4 rounded-md"
                        onClick={() => {
                          if (cart.isItemAdded) {
                            router.push('/cart')
                            // cart.removeFromCart(product);
                            // toast.info("Removed from cart", { autoClose: 3000 });
                          } else {
                            cart.addToCart(product);
                            router.push('/cart')
                          }
                        }}
                    >
                      <TicketCheck size={20} />
                      <h1 className="">
                        Buy Now
                      </h1>
                    </button>
                    {/* <button className="w-[20%] sm:w-[10%] flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-4 rounded-md">
                      <Heart size={25} />
                    </button> */}
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Truck size={20} className="text-gray-500" />
                    <h1 className=" text-sm">
                      Free Delivery on order over ₹1000
                    </h1>
                  </div>
                </div>): (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4">
                        {/* add to cart */}
                        <button
                            className="w-[60%] flex justify-center items-center gap-2 bg-black text-white px-4 py-4 rounded-md cursor-not-allowed"
                            title="Currently Out of Stock"
                            // onClick={() => {
                            //   if (cart.isItemAdded) {
                            //     cart.removeFromCart(product);
                            //     toast.info("Removed from cart", {autoClose: 1000});
                            //   } else {
                            //     cart.addToCart(product);
                            //     toast.success("Added to cart", {autoClose: 1000});
                            //   }
                            // }}
                        >
                          <ShoppingBag size={20}/>
                          <h1 className="">
                            {cart.isItemAdded ? "Remove From Cart" : "Add To Cart"}
                          </h1>
                        </button>
                        {/* buy now */}
                        <button
                            className="w-[40%] flex justify-center items-center gap-2 bg-primary text-white px-4 py-4 rounded-md cursor-not-allowed"
                            title="Currently Out of Stock"
                            // onClick={() => {
                            //   if (cart.isItemAdded) {
                            //     router.push('/cart')
                            //     // cart.removeFromCart(product);
                            //     // toast.info("Removed from cart", { autoClose: 3000 });
                            //   } else {
                            //     cart.addToCart(product);
                            //     router.push('/cart')
                            //   }
                            // }}
                        >
                          <TicketCheck size={20}/>
                          <h1 className="">
                            Buy Now
                          </h1>
                        </button>
                        {/* <button className="w-[20%] sm:w-[10%] flex justify-center items-center gap-2 bg-red-500 text-white px-4 py-4 rounded-md">
                      <Heart size={25} />
                    </button> */}
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <Truck size={20} className="text-gray-500"/>
                        <h1 className="text-xl text-red-600">
                          Currently Out of Stock
                        </h1>
                      </div>
                    </div>
                )}
              </div>
            </div>
            <Reviews product={product}/>
            {showDetails && (
                <div
                    className="fixed flex justify-center items-center z-50 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 rounded-md">
                  <div className="p-6 flex flex-col gap-3 justify-center bg-white modal">
                    <div className="flex justify-between">
                      <div className="flex">
                        <h1 className="text-2xl font-bold">Product Details</h1>
                      </div>
                      <div className="flex">
                        <X
                            size={35}
                            className="hover:bg-primary rounded-full hover:text-white duration-300 transform-all p-2 cursor-pointer"
                            onClick={() => setShowDetails(false)}
                        />
                      </div>
                    </div>
                    <table className="max-w-5xl">
                      <thead className="mb-4">
                      <tr>
                        <th className="py-2 px-4  bg-primary backdrop-brightness-75 text-white ">
                          Features
                        </th>
                        <th className=" py-2 px-4  bg-secondary text-white">
                          Details
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Title
                        </td>
                        <td className="py-2 px-4 ">{product?.title}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Description
                        </td>
                        <td className="py-2 px-4 ">{product?.description}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Price
                        </td>
                        <td className="py-2 px-4 ">{product?.price}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Category
                        </td>
                        <td className="py-2 px-4 ">{product?.category}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Brand
                        </td>
                        <td className="py-2 px-4 ">{product?.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Available Colors
                        </td>
                        <td className="py-2 px-4 ">
                          {product?.available_colors?.join(", ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Condition
                        </td>
                        <td className="py-2 px-4 ">{product?.condition}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Rating
                        </td>
                        <td className="py-2 px-4 ">{product?.rating}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          SKU
                        </td>
                        <td className="py-2 px-4 ">{product?.SKU}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          Number of Reviews
                        </td>
                        <td className="py-2 px-4 ">{product?.no_of_reviews}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4  font-semibold bg-[#f5f5f5] w-[50%]">
                          For Gender
                        </td>
                        <td className="py-2 px-4 ">{product?.for_gender}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <SimilarProducts />
        </MainLayout>
      )}
    </>
  );
}
function convertTimestampToDateFormat(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}/${formattedMonth}/${year}`;
}
const timestamp = "2024-01-20T14:19:40.081Z";
const formattedDate = convertTimestampToDateFormat(timestamp);
console.log(formattedDate); // Output: "20/01/2024"
const offers = [
  {
    type: "Bank Offer",
    description:
      "Get 10% instant discount on all purchases using HDFC Bank Credit Card. Minimum transaction amount: $50.",
    validUntil: "2024-03-31",
  },
  {
    type: "Wallet Offer",
    description:
      "Pay with PayPal and receive $20 cashback on your first transaction. Minimum order value: $100.",
    validUntil: "2024-04-15",
  },
  {
    type: "Flash Sale",
    description:
      "Exclusive 24-hour flash sale! Get up to 50% off on selected items. Limited stock available.",
    validUntil: "2024-02-28",
  },
  {
    type: "New User Special",
    description:
      "First-time shoppers receive a welcome discount of 15% on their initial purchase. Sign up today!",
    validUntil: "2024-05-01",
  },
  {
    type: "Free Shipping",
    description:
      "Enjoy free shipping on all orders over $75. Limited time offer, no promo code needed.",
    validUntil: "2024-03-15",
  },
  {
    type: "Weekend Bonanza",
    description:
      "Shop this weekend and get a gift voucher worth $10 on orders above $50. Happy shopping!",
    validUntil: "2024-02-26",
  },
];
const colors = {
  "Red": "#FF0000",
  "Blue": "#0000FF",
  "Black": "#000000",
  "Grey": "#808080",
  "Hutch Blue": "#004F98",
  "Royal Blue": "#4169E1",
  "Navy Blue": "#000080"
};
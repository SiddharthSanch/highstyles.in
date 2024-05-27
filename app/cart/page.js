"use client";

import MainLayout from "../layouts/MainLayout";
import SimilarProducts from "../components/SimilarProducts";
import CartItem from "../components/CartItem";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useIsLoading from "../hooks/useIsLoading";
import ClientOnly from "../components/ClientOnly";
import Bread from "./components/Bread";
import {
  CheckCircle2,
  Circle,
  File,
  FilePlus2,
  Home,
  Plus,
  Shield,
  ShoppingBag,
  SquarePen,
  X,
} from "lucide-react";
import Image from "next/image";
import { BiBasket } from "react-icons/bi";
import { useUser } from "../context/user";
import { supabase } from "@/utils/supabase";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";
import Loader from "../components/Loader";
import { useAppState } from "@/utils/Context";
import { Router } from "next/router";

export default function Cart() {
  function isTimestampValid(timestamp) {
    const currentTimestamp = Date.now();
    const istTimestamp = new Date(currentTimestamp + 5.5 * 60 * 60 * 1000);
    const providedTimestamp = new Date(timestamp).getTime();
    if (istTimestamp.getTime() > providedTimestamp) {
        return false;
    } else {
        return true;
    }
}
  const [loading, setLoading] = useState(true);
  const [paymentSelected, setPaymentSelected] = useState(1);
  const [data, setData] = useState([]);
  const [couponModal, setCouponModal] = useState(false);
  const [couponName, setCouponName] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponData, setCouponData] = useState()
  const {discount,setDiscount}=useAppState()
  const { user } = useUser();
  const router = useRouter();
  const cart = useCart();
  useEffect(() => {
    const getAdddress = async () => {
      const user_id = user?.id;
      console.log(user_id);
      const { data, error } = await supabase
        .from("Addresses")
        .select("*")
        .eq("uid", user_id)
        .single();
      if (error) {
        console.error("Error fetching data:", error.message);
      }
      console.log(data);
      setData(data);
    };
    const getCart = async () => {
      cart.getCart();
      cart.cartTotal();
      useIsLoading(false);
      console.log(cart.cartCount());
    };
    setLoading(true);
    getAdddress();
    getCart();
    setLoading(false);
  }, [user, cart]);
  const goToCheckout = () => {
    if (!cart.cartTotal()) {
      toast.error("There are no items in the cart", toastsettings);
      return;
    }
    if(!data){
      toast.error("No Address Found",toastsettings)
      return;
    }
    if(couponData)
    router.push(`/checkout?couponCode=${couponData[0]?.coupon_code}`);
  else
  router.push(`/checkout`);
  };
  useEffect(()=>{
    if(couponData){
      console.log(couponData[0])
    }
  },[couponData])
  const checkCouponValidity=async()=>{
    const {data,error}=await supabase.from("Coupons").select("*").eq("coupon_code",couponName)
    if(error){
      toast.error(error,toastsettings);
      return;
    }
    if(data.length==0){
      toast.error("No Coupon Found",toastsettings)
    }
    else{
      console.log(data)
      // if((isTimestampValid(data.coupon_valid_till))){
      //   toast.error("Coupon Not Applied",toastsettings)
      //   return;
      // }
      if(data[0].percentage_discount===true){
        // if(data[0].discount_value>cart.cartTotal()){
        //   toast.error("Coupon Not Applied",toastsettings)
        //   return;
        // }
        toast.success("Coupon Applied",toastsettings)
        setCouponApplied(true)
        const value=cart.cartTotal()*(data[0].percentage/100)
        console.log(value)
        setDiscount(value)
        setCouponData(data)
        setTimeout(() => {
          setCouponModal(false)
        }, 1500);
      }
      else{
        if(data[0].discount_value>cart.cartTotal()){
          toast.error("Coupon Not Applied",toastsettings)
          return;
        }
        toast.success("Coupon Applied",toastsettings)
        setCouponApplied(true)
        setDiscount(data[0].discount_value)
        setCouponData(data)
        setTimeout(() => {
          setCouponModal(false)
        }, 1500);
      }

    }
  }
  return (
    <ClientOnly>
      {loading ? (
        <div className="flex h-screen justify-center items-center text-secondary text-3xl">
          <Loader />
        </div>
      ) : (
        <MainLayout>
          <div className="flex flex-col p-8 gap-6 mt-[-6.5rem] sm:mt-[-2rem]">
            <div className="flex justify-center">
              <div className="flex justify-center">
                <Bread />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-8">
              <div className="flex flex-col gap-4 sm:p-4 sm:w-3/5 border-2 border-[#f5f5f5] rounded-md">
                <div className="flex items-center justify-between p-5 rounded-md">
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <h1 className="text-l font-bold">
                        Debit Card / Credit Card / UPI
                      </h1>
                    </div>
                    <div className="flex">
                      <h1 className="text-gray-500">
                        Diverse Payment Options for Seamless Transactions
                      </h1>
                    </div>
                  </div>
                  <div
                    className="flex cursor-pointer hover:bg-gray-200 p-2 rounded-full"
                    onClick={() => setPaymentSelected(1)}
                  >
                    {paymentSelected !== 1 ? (
                      <Circle size={30} className="" />
                    ) : (
                      <CheckCircle2 size={30} />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 rounded-md">
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <h1 className="text-l font-bold">
                        Cash on Delivery
                      </h1>
                    </div>
                    <div className="flex">
                      <h1 className="text-gray-500 max-w-xl">
                        Enjoy the convenience of doorstep delivery with our cash on delivery feature on our shopping website.
                      </h1>
                    </div>
                  </div>
                  <div
                    className="flex cursor-pointer hover:bg-gray-200 p-2 rounded-full"
                    // onClick={() => setPaymentSelected(2)}
                    onClick={() =>
                      toast.info("Currently Not Available", toastsettings)
                    }
                  >
                    {paymentSelected !== 2 ? (
                      <Circle size={30} className="" />
                    ) : (
                      <CheckCircle2 size={30} className="" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3  border-[#f5f5f5] p-5 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Home size={20} />
                      <h1 className="text-xl font-bold">Delivery Address</h1>
                    </div>
                    <div
                      className="flex text-sm hover:bg-primary hover:text-white p-2 rounded-md transform-all duration-300 text-gray-600 cursor-pointer"
                      onClick={() => router.push("/my-account")}
                    >
                      {/* Not This? Update/Add Delivery Address */}
                      <SquarePen size={20} />
                    </div>
                  </div>
                  <hr className="h-[0.15rem] bg-[#f5f5f5] border-0 rounded" />
                  <div className="flex justify-between">
                    <h1 className="font-semibold">Address Name : </h1>
                    <h1 className="text-gray-500">{data?.name}</h1>
                  </div>
                  <hr className="h-[0.15rem] bg-[#f5f5f5] border-0 rounded" />
                  <div className="flex justify-between">
                    <h1 className="font-semibold">Address&nbsp;: </h1>
                    <h1 className="text-gray-500 justify-end text-end">
                      {data?.hno} {data?.House_Number} {data?.Apartment} {data?.locality},{" "}
                      {data?.landmark}
                    </h1>
                  </div>
                  <div className="flex justify-end mt-[-9px]">
                    <h1 className="text-gray-500">
                      {data?.city} {data?.state} - {data?.zipcode}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-3 border-2 border-[#f5f5f5] p-5 rounded-md">
                  <div className="flex gap-2">
                    <Shield size={25} className="text-primary" fill="#004cde" />
                    <h1 className="text-xl font-bold">Things Covered</h1>
                  </div>
                  <div className="flex">
                    <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                      <li>Full Product Warranty upto 4 years</li>
                      <li>Return / Replacement upto 30 days</li>
                      <li>
                        Gauranteed Minimum Price & Assured Cashback upto 15%
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex sm:w-2/5 border-2 border-[#f5f5f5] rounded-md">
                <div className="flex flex-col w-full gap-4  border-[#f5f5f5] p-5 rounded-md">
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Your Cart</h1>
                    <h1 className="text-gray-500">
                      Items in your cart are not reserved and may sell out
                    </h1>
                  </div>
                  {cart.cartCount() > 0 ? (
                    <div className="flex flex-col gap-4 overflow-y-auto h-[15rem] componentScroll cursor-pointer ">
                      {cart.getCart().map((product) => (
                        <CartItemIndividual
                          product={product}
                          key={product.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center flex-col gap-3 overflow-y-auto h-[15rem] componentScroll">
                      <h1 className="text-gray-500 text-xl">
                        There are no items in the cart
                      </h1>
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    <div
                      className="flex w-full"
                      onClick={() => setCouponModal(true)}
                    >
                      <button className="w-full bg-secondary flex justify-center items-center p-4 rounded-md text-white">
                        Apply Coupon
                      </button>
                    </div>
                    <div className="flex justify-between text-xl">
                      <h1 className="text-gray-500">Subtotal</h1>
                        <h1 className="font-bold">₹{cart.cartTotal()-discount}</h1>
                    </div>
                    <hr className="h-[0.15rem] bg-[#f1f1f1] border-0 rounded" />
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <h1 className="text-gray-500">Total Amount</h1>
                        <h1 className="flex flex-col items-end justify-end">₹{cart.cartTotal()}
                        <h1 className="text-sm text-gray-600">Inclusive of all taxes</h1>
                        </h1>
                      </div>
                      {couponApplied && 
                      <div className="flex justify-between">
                        <h1 className="text-gray-500">Coupon Discount</h1>
                        <h1 className="">₹{discount}</h1>
                      </div>
                      }
                      <div className="flex justify-between">
                        <h1 className="text-gray-500">Delivery</h1>
                        <h1 className="">FREE</h1>
                      </div>
                      <div className="flex justify-between">
                        <h1 className="text-gray-500">Convenience Charge</h1>
                        <h1 className="">₹{0}</h1>
                      </div>
                    </div>
                    <hr className="h-[0.15rem] bg-[#f1f1f1] border-0 rounded" />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-[90%] flex justify-center items-center gap-2 bg-primary text-white cursor-pointer px-4 py-4 rounded-md"
                      onClick={() => goToCheckout()}
                    >
                      <BiBasket size={20} />
                      <h1 className="">Place Order</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {couponModal && (
            <div className="fixed flex justify-center items-center z-50 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 rounded-md">
              <div className="p-[2rem] flex flex-col gap-8 w-[30rem] h-[20rem] bg-white rounded-md">
                <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center">
                      <FilePlus2 size={20} className="text-gray-600"/>
                    </div>
                    <div className="flex text-xl">
                      <h1 className="text-black">Add Coupon</h1>
                    </div>
                  </div>
                  <div className="flex p-2 cursor-pointer rounded-full justify-center items-center hover:bg-gray-200 hover:rotate-90 duration-500 transform-all" onClick={()=>setCouponModal(false)}>
                    <X size={20} className="text-gray-600"/>
                  </div>
                </div>
                <div className="flex">
                  <h1 className="text-gray-500 text-sm">Unlock savings galore with our new Coupons Page, where every click adds to your wallet's delight!</h1>
                </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">
                    Coupon Name
                  </label>
                  <input
                  type="text" 
                  className="bg-gray-100 p-3 rounded-md"
                  placeholder="Enter Coupon Code"
                  value={couponName}
                  onChange={(e)=>setCouponName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <button className="w-[50%] flex justify-center items-center p-2 rounded-md border" onClick={()=>setCouponModal(false)}>
                    Cancel
                  </button>
                  <button className="w-[50%] flex justify-center items-center p-2 rounded-md bg-primary text-white" onClick={checkCouponValidity}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </MainLayout>
      )}
    </ClientOnly>
  );
}

const CartItemIndividual = ({ product }) => {
  const router = useRouter();
  const cart = useCart();
  return (
    <ClientOnly>
      <div className="flex sm:flex-row flex-col justify-between p-3 transform-all duration-300 hover:bg-[#edebeb] rounded-md border-[#f5f5f5]">
        <div
          className="flex gap-3"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <div className="flex max-h-[5rem]">
            <Image
              src={product.url?product.url[0]:""}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-md hover:scale-105 transform-all duration-500 brightness-90 hover:brightness-100 object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex flex-col">
              <h1 className="font-semibold">
                {product.title ? product.title : "Product Title"}
              </h1>
              <h1 className="text-gray-500 text-sm">
                {product.brand ? product.brand : "Brand"}
              </h1>
            </div>
            <div className="flex">
              <h1 className="text-gray-500">
                Color :{" "}
                {product.available_colors
                  ? product.available_colors[0]
                  : "Colors Available"}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-3 justify-end">
          <div className="flex flex-col">
            <h1 className="text-gray-500 line-through flex justify-end">
              ₹{product?.mrp}
            </h1>
            <h1 className="font-bold text-xl">₹{product.price.toFixed(2)}</h1>
            {/* <div className="flex mt-2 items-center text-sm"><Plus size={18}/></div> */}
          </div>
          <div className="flex flex-col">
            <button
              className="hover:underline p-1 text-sm rounded-md"
              onClick={() => cart.removeFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

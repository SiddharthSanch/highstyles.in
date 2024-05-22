"use client";

import CheckoutItem from "../components/CheckoutItem";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { useUser } from "@/app/context/user";
import { useCart } from "../context/cart";
import { useEffect, useRef, useState } from "react";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ClientOnly from "../components/ClientOnly";
import Image from "next/image";
import { Home, SquarePen, Users2, Waypoints } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { toastsettings } from "@/utils/toast";
import {  generateOrderID } from "@/utils/createdId";
import { useAppState } from "@/utils/Context";

export default function Checkout() {
  // http://localhost:3000/checkout?couponData=happyholi1000
  const codeByParam = new URLSearchParams(window.location.search).get(
    "couponCode"
  );
  console.log(codeByParam);
  const [isProductDecremented, setIsProductDecremented] = useState(false);
  const user = useUser();
  console.log(user);
  const id_user = user.id;
  const cart = useCart();
  const router = useRouter();
  const [addressDetails, setAddressDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState([]);
  const [cartVal, setCartVal] = useState(0);
  // const [userId, setUserId] = useState("")
  const [userObject, setUserObject] = useState([]);
  const [paymentSuccessObject, setPaymentSuccessObject] = useState([]);
  const { discount, setDiscount } = useAppState();
  const [lastOrderID, setLastOrderID] = useState(0)
  useEffect(() => {
    async function fetchCouponData() {
      const { data, error } = await supabase.from("Coupons").select().eq("coupon_code", codeByParam);
      if (error) {
        console.error("Error fetching coupon data:", error.message);
        return;
      }
      if (data.length > 0) {
        if(data[0].percentage_discount===true){
          // if(data[0].discount_value>cart.cartTotal()){
          //   toast.error("Coupon Not Applied",toastsettings)
          //   return;
          // }
          // toast.success("Coupon Applied",toastsettings)
          // setCouponApplied(true)
          const value=cart.cartTotal()*(data[0].percentage/100)
          console.log(value)
          setDiscount(value)
          // setCouponData(data)
          // setTimeout(() => {
          //   setCouponModal(false)
          // }, 1500);
        }
        else{
          if(data[0].discount_value>cart.cartTotal()){
            // toast.error("Coupon Not Applied",toastsettings)
            return;
          }
          // toast.success("Coupon Applied",toastsettings)
          // setCouponApplied(true)
          setDiscount(data[0].discount_value)
          // setCouponData(data)
          // setTimeout(() => {
          //   setCouponModal(false)
          // }, 1500);
        }
      }
    }
    fetchCouponData();
  },[])
  const updateCouponCount = async () => {
    console.log("COUPON COUNT")
    try {
      const { data, error } = await supabase
        .from("Coupons")
        .select()
        .eq("coupon_code", codeByParam);
      if (error) {
        console.error("Error fetching coupon data:", error.message);
        return;
      }
      if (data.length > 0) {
        const couponData = data[0];
        const newUsageCount = couponData.usage_count + 1;
        const { error: updateError } = await supabase
          .from("Coupons")
          .update({ usage_count: newUsageCount })
          .eq("id", couponData.id);

        if (updateError) {
          console.error("Error updating usage count:", updateError.message);
          return;
        }
      } else {
        console.error("Coupon not found");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  console.log(id_user);
  // setUserId(data.id)
  useEffect(() => {
    const getUserInfo = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id_user)
        .single();
      if (error) {
        console.error("Error fetching data:", error.message);
      }
      console.log(data);
      setUserObject(data);
    };
    getUserInfo();
  }, [user, id_user]);
  useEffect(() => {
    console.log(userObject);
    console.log(paymentSuccessObject);
  }, [userObject, paymentSuccessObject]);
  useEffect(() => {
    async function getLastRecordId() {
      try {
        const { data, error } = await supabase
          .from('Orders')
          .select('id')
          .order('id', { ascending: false })
          .limit(1);
        if (error) {
          throw error;
        }
        if (data.length > 0) {
          // return data[0].id;
          setLastOrderID(data[0].id)
          console.log(data[0].id)
        } else {
          // return null;
          setLastOrderID(0)
        }
      } catch (error) {
        console.error('Error fetching last record ID:', error.message);
        return null;
      }
    }
    getLastRecordId();
  },[])
  useEffect(() => {
    const getAdddress = async () => {
      const { data, error } = await supabase
        .from("Addresses")
        .select("*")
        .eq("uid", user.id)
        .single();
      if (error) {
        console.error("Error fetching data:", error.message);
      }
      console.log(data);
      setAddData(data);
    };
    const getCart = async () => {
      cart.getCart();
      cart.cartTotal();
      setCartVal(cart.cartTotal());
      useIsLoading(false);
      console.log(cart.cartCount());
      console.log(cart.getCart());
    };
    setLoading(true);
    getAdddress();
    getCart();
    setLoading(false);
  }, [user, cart]);
  const decrement_quantity=async()=>{
    if(isProductDecremented) return;
    setIsProductDecremented(true)
    console.log("DECREMENT QUANTITY")
    //fetch products ids
    const ids=[]
    const obj=cart.getCart()
    obj.map((item)=>{
      ids.push(item.id)
    })
    // console.log(ids)
    const {data,error}=await supabase.from("Products").select("quantity_stock").in("id",ids)
    if(error) console.log(error)
    console.log(data)
    const {data:updatedData,error:updateError}=await supabase.from("Products").update({quantity_stock:data[0].quantity_stock-1}).in("id",ids)
  }
  const orderconfirmed = async (response) => {
    const { data, error } = await supabase.from("Orders").insert([
      {
        user_id: userObject.user_id,
        name: userObject.name,
        order_products: cart.getCart(),
        address_id: addData.id,
        amount: cart.cartTotal(),
        email: userObject.email,
        phone: userObject.phone,
        status: "Order Placed",
        orderNumber: generateOrderID(),
        invoiceNumber:`HS_Invoice_${lastOrderID+1}`,
        rzp_paymentId: response?.razorpay_payment_id,
        rzp_orderID: response?.razorpay_order_id,
        razorpay_signature: response?.razorpay_signature,
        paymentMethod: response?.paymentMethod,
        payment_description: response?.payment_description,
        timestamp: new Date().toISOString(),
        discount_given: discount,
      },
    ]);
    // decrement product quantity_stock by 1 in supabase
    decrement_quantity();
    if (error) {
      console.error("Error inserting data:", error.message);
    }
    console.log(data);
  };
  const makePayment = async () => {
    const toa = toast.loading("Processing Payment", toastsettings);
    console.log("here...");
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cartVal: cart.cartTotal() - discount,
      },
      body: JSON.stringify({
        amount: cartVal,
      }),
    }).then((response) => response.json());
    console.log(data);
    var options = {
      key: process.env.NEXT_PUBLIC_TEST_KEY_ID,
      name: "Arin Paliwal",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Handbags and Purses",
      image: "",
      handler: function (response) {
        orderconfirmed(response);
        updateCouponCount();
        decrement_quantity();
        toast.update(toa, {
          render: "Payment Successfull :)",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
      },
      prefill: {
        name: "Paliwal",
        email: "paliwal09@gmail.com",
        contact: "7898787897",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <ClientOnly>
      <MainLayout>
        <div className="flex sm:flex-row flex-col p-8 gap-8 sm:h-[38rem]">
          <div className="flex sm:w-1/2 gap-4 flex-col">
            <div className="flex">
              <h1 className="text-xl text-gray-600">Your Cart Items</h1>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto componentScroll cursor-pointer ">
              {cart.getCart().map((product) => (
                <CartItemIndividual product={product} key={product.id} />
              ))}
            </div>
            <div className="flex mt-6 justify-center">
              <h1 className="text-gray-400 text-xl">
                You cart contains {cart.cartCount()} items
              </h1>
            </div>
          </div>
          <div className="flex sm:w-1/2 gap-5 flex-col">
            <div className="flex flex-col gap-3  border-[#f5f5f5] p-5 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Home size={20} />
                  <h1 className="text-xl font-bold">Delivery Address</h1>
                </div>
              </div>
              <hr className="h-[0.15rem] bg-[#f5f5f5] border-0 rounded" />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Users2 size={18} className="text-gray-500" />
                  <h1 className="font-semibold">Customer Name : </h1>
                </div>
                <h1 className="text-gray-500">{addData?.name}</h1>
              </div>
              <hr className="h-[0.15rem] bg-[#f5f5f5] border-0 rounded" />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Waypoints size={18} className="text-gray-500" />
                  <h1 className="font-semibold">Address : </h1>
                </div>
                <h1 className="text-gray-500 justify-end text-end">
                  {addData?.hno} {addData?.street} {addData?.locality},{" "}
                  {addData?.landmark}
                </h1>
              </div>
              <div className="flex justify-end mt-[-9px]">
                <h1 className="text-gray-500">
                  {addData?.city} {addData?.state} - {addData?.zipcode}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <h1 className="text-gray-500">Total Amount</h1>
                  <h1 className="">₹{cart.cartTotal()}</h1>
                </div>
                {discount>0 && 
                      <div className="flex justify-between">
                        <h1 className="text-gray-500">Coupon Discount</h1>
                        <h1 className="">- ₹{discount}</h1>
                      </div>
                      }
                <div className="flex justify-between">
                  <h1 className="text-gray-500">Taxes</h1>
                  <h1 className="">₹{}</h1>
                </div>
                <div className="flex justify-between">
                  <h1 className="text-gray-500">Convenience Charge</h1>
                  <h1 className="">₹{}</h1>
                </div>
              </div>
              <hr className="h-[0.15rem] bg-[#f1f1f1] border-0 rounded" />

              <div className="flex justify-between text-xl">
                <h1 className="text-gray-500">Subtotal</h1>
                <h1 className="font-bold">₹{cart.cartTotal() - discount}</h1>
              </div>
              <hr className="h-[0.15rem] bg-[#f1f1f1] border-0 rounded" />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-primary text-white p-3 rounded-md w-full"
                onClick={makePayment}
              >
                Pay via Razorpay
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </ClientOnly>
  );
}
const CartItemIndividual = ({ product }) => {
  const router = useRouter();
  return (
    <ClientOnly>
      <div
        className="flex justify-between p-3 transform-all duration-300 hover:bg-[#edebeb] rounded-md border-[#f5f5f5]"
        // onClick={() => router.push(`/product/${product.id}`)}
      >
        <div className="flex gap-3">
          <div className="flex max-h-[5rem]">
            <Image
              src={product.url[0]}
              alt={product.title}
              width={100}
              height={100}
              className="rounded-md object-cover"
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
        <div className="flex justify-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-500 line-through flex justify-end">
              ₹{product.mrp}
            </h1>
            <h1 className="font-bold text-xl">₹{product.price.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

"use client";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import CouponsListingTable from "../Tables/CouponsListing";
import OrdersListingTable from "../Tables/OrdersListing";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";

const Orders = () => {
  const router=useRouter()
  const [ordersData, setOrdersData] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalItem, setModalItem] = useState();
  const [productIds, setProductIds] = useState('');
  const [addressForModal,setAddressForModal]=useState({})
  const [showAddress,setShowAddress]=useState('')

  useEffect(() => {
    const getOrders = async () => {
      const { data, error } = await supabase.from("Orders").select("*");
      if (error) return;
      setOrdersData(data);
      setLoading(false);
    };
    getOrders();
  }, []);
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
    // await fetchBrands();
    toast.success("Coupon added successfully", toastsettings);
  };
  const handleOpenModal =async (item) => {
    setOpenModal(true);
    setModalItem(item);
    console.log(item);
    const {data,error}=await supabase.from("Addresses").select("*").eq("id",item.address_id)
    if(error) return;
    console.log(data[0]);
    setAddressForModal(data[0])
    setShowAddress(
        `${data[0].hno ? data[0].hno + ', ' : ''}` +
        `${data[0].locality ? data[0].locality + ', ' : ''}` +
        `${data[0].city ? data[0].city + ', ' : ''}` +
        `${data[0].Block_Number ? data[0].Block_Number + ', ' : ''}` +
        `${data[0].Apartment ? data[0].Apartment + ' ' : ''}` +
        `${data[0].landmark ? data[0].landmark + ', ' : ''}` +
        `${data[0].state ? data[0].state + ', ' : ''}` +
        `${data[0].country ? data[0].country : ''}`
    );

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
  const handleEditOrder = async () => {
    console.log(modalItem);
    const { data, error } = await supabase
      .from("Orders")
      .update([
        {
          name: modalItem.name,
          user_id: modalItem.user_id,
          email: modalItem.email,
          status: modalItem.status,
          address_id: modalItem.address_id,
          amount: modalItem.amount,
          discount_given: modalItem.discount_given,
          phone: modalItem.phone,
          timestamp: modalItem.timestamp,
          orderNumber: modalItem.orderNumber,
          invoiceNumber: modalItem.invoiceNumber,
          razorpay_signature: modalItem.razorpay_signature,
          rzp_paymentId: modalItem.rzp_paymentId,
          rzp_orderID: modalItem.rzp_orderID,
        },
      ])
      .eq("id", modalItem.id);
    if (error) {
      toast.error(error.details, toastsettings);
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
        <div className="w-full flex">
          <OrdersListingTable
            data={ordersData}
            onOpenModal={handleOpenModal}
          />
        </div>
        {openModal && (
          <div className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full">
            <div className="relative p-4 w-full sm:max-w-[70%] max-h-[95%] overflow-y-auto componentScroll">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="flex text-lg font-semibold text-gray-900 dark:text-white">
                    Edit &nbsp;{" "} Order No.&nbsp;
                    <h1 className="cursor-pointer underline">
                      {modalItem?.id || "Order Number"}
                    </h1>
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
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Order User
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="condition"
                        value={modalItem?.name || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        User ID
                      </label>
                      <input
                        type="text"
                        name="user_id"
                        id="for_gender"
                        value={modalItem?.user_id || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="condition"
                        value={modalItem?.email || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Order Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        id="for_gender"
                        value={modalItem?.status || ""}
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
                        Address ID
                      </label>
                      <input
                        type="text"
                        name="address_id"
                        id="released_in"
                        value={modalItem?.address_id || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-3">
                    {/* <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Products Ordered
                      </label>
                      <input
                        type="text"
                        name=""
                        id="condition"
                        value={productIds}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div> */}
                    <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onClick={()=>{
                      router.push(`/admin/dashboard/orders/${modalItem.id}`)
                    }}>View Products</button>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Order Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="for_gender"
                        value={modalItem?.amount || ""}
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
                        Discount Given
                      </label>
                      <input
                        type="text"
                        name="discount_given"
                        id="released_in"
                        value={modalItem?.discount_given || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="condition"
                        value={modalItem?.phone || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ordered On
                      </label>
                      <input
                        type="text"
                        name="timestamp"
                        id="for_gender"
                        value={modalItem?.timestamp || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Order Number
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        id="condition"
                        value={modalItem?.orderNumber || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Invoice Number
                      </label>
                      <input
                        type="text"
                        name="invoiceNumber"
                        id="for_gender"
                        value={modalItem?.invoiceNumber || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Razorpay Signature
                      </label>
                      <input
                        type="text"
                        name="razorpay_signature"
                        id="condition"
                        value={modalItem?.razorpay_signature || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Razorpay Payment ID
                      </label>
                      <input
                        type="text"
                        name="rzp_paymentId"
                        id="for_gender"
                        value={modalItem?.rzp_paymentId || ""}
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
                        Razorpay Order ID
                      </label>
                      <input
                        type="text"
                        name="rzp_orderID"
                        id="released_in"
                        value={modalItem?.rzp_orderID || ""}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Address For Order
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="condition"
                        value={showAddress}
                        disabled={true}
                        onChange={handleChangeModal}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                    />
                  </div>
                  <button
                      onClick={handleEditOrder}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Check size={20} className="mr-2"/>
                    Edit Product
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

export default Orders;

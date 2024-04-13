"use client";

import { formatDate } from "@/utils/convertTime";
import { supabase } from "@/utils/supabase";
import { toastsettings } from "@/utils/toast";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CouponsListingTable = ({ data,onOpenModal }) => {
  const [searchProduct, setSearchProduct] = useState("")
  const [searchedData, setSearchedData] = useState(data)
  const handleChangeSearchProduct=(e)=>{
    setSearchProduct(e.target.value)
  }
  useEffect(() => {
    if (searchProduct) {
      const filteredData = data.filter((item) => {
        return item.coupon_name.toLowerCase().includes(searchProduct.toLowerCase()) || 
        item.coupon_code.toLowerCase().includes(searchProduct.toLowerCase())
      })
      setSearchedData(filteredData)
    }
    else{
      setSearchedData(data)
    
    }
  }
  , [searchProduct])
  const DeleteItem = async(item) => {
    const {data,error}=await supabase.from('Coupons').delete().eq('id',item.id)
    if(error){
      toast.error(error.message,toastsettings)
      return;
    }
    toast.success('Coupon Deleted Successfully',toastsettings)
  }
  return (
    <div className="rounded-xl w-full border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto">
      <div className="max-w-full overflow-x-auto flex flex-col gap-4">
      <div className="flex">
            <input
            type="text"
            placeholder="Search Product"
            value={searchProduct}
            onChange={handleChangeSearchProduct}
            className="rounded-md border border-stroke px-3 py-2.5 dark:border-strokedark dark:bg-boxdark w-full"
            />
          </div>
        <table className="rounded-xl w-full table-auto h-[8rem] overflow-y-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Coupon Code
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Coupon Name
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Initiated On
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Valid Till
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Orders Done
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Discount
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                  Actions
                </th>
            </tr>
          </thead>
          <tbody>
            {searchedData?.map((item, key) => (
              <tr key={key}>
                <td className="gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.coupon_code}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.coupon_name}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.coupon_initialised_on)}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.coupon_valid_till)}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.usage_count}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.percentage_discount===true?item.percentage+'%':'₹'+item.discount_value}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="flex gap-2 items-center bg-red-700 text-white p-2 rounded-md"
                      onClick={() => DeleteItem(item)}
                      >
                        <Trash size={20} />
                        <h1>Delete</h1>
                      </button>
                      <button className="flex gap-2 items-center bg-primary text-white p-2 rounded-md"
                      onClick={() => onOpenModal(item)}
                      >
                        <FilePenLine size={20} />
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponsListingTable;

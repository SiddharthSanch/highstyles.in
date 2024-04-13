"use client";

import { formatDate } from "@/utils/convertTime";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {supabase} from "@/utils/supabase";
import {toast} from "react-toastify";
import {toastsettings} from "@/utils/toast";

const OrdersListingTable = ({ data, onOpenModal }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedData, setSearchedData] = useState(data);
  const handleChangeSearchOrder = (e) => {
    setSearchProduct(e.target.value);
  };
  useEffect(() => {
    if (searchProduct) {
      const filteredData = data.filter((item) => {
        return item.orderNumber
          .toLowerCase()
          .includes(searchProduct.toLowerCase());
      });
      setSearchedData(filteredData);
    } else {
      setSearchedData(data);
    }
  }, [searchProduct]);
  const DeleteItem = async (item) => {
    const { data, error } = await supabase
      .from("Orders")
      .delete()
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Order Deleted Successfully",toastsettings);
  };
  const router=useRouter()
  return (
    <div className="rounded-xl w-full border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto">
      <div className="max-w-full overflow-x-auto flex flex-col gap-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search Orders by Order Number"
            value={searchProduct}
            onChange={handleChangeSearchOrder}
            className="rounded-md border border-stroke px-3 py-2.5 dark:border-strokedark dark:bg-boxdark w-full"
          />
        </div>
        <table className="rounded-xl w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User Details
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Initiated On
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Invoice Number
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Order Number
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {searchedData?.map((item, key) => (
              <tr key={key}
              >
                <td className="flex gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <button
                    className="flex gap-2 items-center bg-primary text-white p-2 rounded-md"
                    onClick={() => onOpenModal(item)}
                  >
                    <FilePenLine size={20} />
                  </button>
                  <div className="flex flex-col">
                    <p className="font-medium text-black dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-3 dark:text-gray-4">
                      Add. Id: {item.address_id}
                    </p>
                  </div>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.amount}</p>
                  <p className="text-xs text-gray-3 dark:text-gray-4">
                    <span className="text-red-500">
                      -{item.discount_given ? item.discount_given : 0}
                    </span>
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.created_at)}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.status}</p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.invoiceNumber}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.orderNumber}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="flex gap-2 items-center bg-red-700 text-white p-2 rounded-md"
                      onClick={() => DeleteItem(item)}
                    >
                      <Trash size={20} />
                      <h1>Delete</h1>
                    </button>
                    {/* <button className="flex gap-2 items-center bg-primary text-white p-2 rounded-md"
                      onClick={() => onOpenModal(item)}
                      >
                        <FilePenLine size={20} />
                      </button> */}
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

export default OrdersListingTable;

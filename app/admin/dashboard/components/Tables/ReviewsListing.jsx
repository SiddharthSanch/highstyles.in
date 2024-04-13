import { formatDate } from "@/utils/convertTime";
import { supabase } from "@/utils/supabase";
import { toastsettings } from "@/utils/toast";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ReviewsListingTable = ({ data,onOpenModal }) => {
const getNameFromUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .eq("id", id)
    .single();
    if (error) return;
    return data.name;
}
const DeleteItem = async(item) => {
  const {data,error}=await supabase.from('Ratings').delete().eq('id',item.id)
  if(error){
    toast.error(error.message,toastsettings)
    return;
  }
  toast.success('Rating Deleted Successfully',toastsettings)
}
  return (
    <div className="rounded-xl w-full border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto">
      <div className="max-w-full overflow-x-auto">
        <table className="rounded-xl w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Product ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                User ID
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Rating
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Review
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Given On
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                  Actions
                </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => (
              <tr key={key}>
                <td className="gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.product_id}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {(item.user_id)}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.ratings}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.text_review}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.added_on)}
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

export default ReviewsListingTable;

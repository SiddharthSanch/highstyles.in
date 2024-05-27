"use client";

import { supabase } from "@/utils/supabase";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsListingTable = ({ data, onOpenModal }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedData, setSearchedData] = useState(data);
  const [sortingMode, setSortingMode] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (data?.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const handleChangeSearchProduct = (e) => {
    setSearchProduct(e.target.value);
  };
  useEffect(() => {
    if (searchProduct) {
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchProduct.toLowerCase());
      });
      setSearchedData(filteredData);
    } else {
      setSearchedData(data);
    }
  }, [searchProduct]);
  const DeleteItem = async (item) => {
    const { data, error } = await supabase
      .from("Products")
      .delete()
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product Deleted Successfully");
  };
  const handleStock = async (item) => {
    const { data, error } = await supabase
      .from("Products")
      .update({ inStock: !item.inStock })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Stock Updated Successfully");
  };
  return (
    <>
      <div className="rounded-xl w-full border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto">
        <div className="flex flex-col gap-4 max-w-full overflow-x-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Product"
              value={searchProduct}
              onChange={handleChangeSearchProduct}
              className="rounded-md border border-stroke px-3 py-2.5 dark:border-strokedark dark:bg-boxdark w-full"
            />
          </div>
          <table className="rounded-xl w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="max-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  SKU
                </th>
                {/*<th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">*/}
                {/*  Category*/}
                {/*</th>*/}
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                  Actions
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white ">
                  Stock Status
                </th>
              </tr>
            </thead>
            <tbody>
              {searchedData?.map((item, key) => (
                <tr key={key}>
                  <td className="flex gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <Image
                      src={item.url[0]}
                      width={60}
                      height={60}
                      alt={item.title}
                      className="rounded-md object-contain h-14"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-black dark:text-white max-w-md">
                        {item.title}
                      </p>
                      <p className="text-sm">{item.brand}</p>
                    </div>
                  </td>
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.SKU}</p>
                  </td>
                  {/*<td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">*/}
                  {/*  <p className="text-black dark:text-white">*/}
                  {/*    {item.category}*/}
                  {/*  </p>*/}
                  {/*</td>*/}
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <h1 className="text-black dark:text-white">{item.price}</h1>
                    <h1 className="text-black dark:text-white text-sm line-through text-gray-500">
                      {item.mrp}
                    </h1>
                  </td>
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="flex gap-2 items-center hover:bg-red-700 hover:text-white border-2 border-red-700 p-2 rounded-md transform duration-300"
                        onClick={() => DeleteItem(item)}
                      >
                        <Trash size={20} />
                        <h1>Delete</h1>
                      </button>
                      <button
                        className="flex gap-2 items-center bg-primary text-white p-2 rounded-md"
                        onClick={() => onOpenModal(item)}
                      >
                        <FilePenLine size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="text-sm border-b dark:border-gray-500 border-[#eee] py-5 dark:border-strokedark">
                    <div
                      className={`w-full justify-center flex gap-2 items-center ${
                        item.quantity_stock > 0 ? "bg-green-500" : "bg-red-700"
                      } text-white p-2 rounded-md`}
                      // onClick={()=>handleStock(item)}
                    >
                      {item.quantity_stock > 0 ? (
                        <>
                          <h1>In Stock</h1>{" "}
                        </>
                      ) : (
                        <>
                          <h1>Out of Stock</h1>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsListingTable;

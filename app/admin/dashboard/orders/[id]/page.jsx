"use client";

import { supabase } from "@/utils/supabase";
import { FilePenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductsListingTable = () => {
  const id = useParams().id;
  console.log(id);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Orders")
        .select("order_products")
        .eq("id", id);
      if (error) {
        toast.error(error.message);
        return;
      }
      const mock_data = data[0].order_products;
      const parsedData = mock_data.map((item) => JSON.parse(item));
      setData(parsedData);
      console.log(parsedData);
      console.log(data[0].order_products);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchedData, setSearchedData] = useState(data);
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
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                  Title
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                  SKU
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Category
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, key) => (
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
                      <p className="font-medium text-black dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm">{item.brand}</p>
                    </div>
                  </td>
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.SKU}</p>
                  </td>
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.category}
                    </p>
                  </td>
                  <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.price}</p>
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
                      <button
                        className="flex gap-2 items-center bg-primary text-white p-2 rounded-md"
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
    </>
  );
};

export default ProductsListingTable;

import { useAppState } from "@/utils/Context";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import PreordersListingTable from "../Tables/PreordersListingTable";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { toastsettings } from "@/utils/toast";

const Preorder = () => {
  const { state, setState } = useAppState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        product_name:""
    })
  useEffect(() => {
    const getProducts = async () => {
      console.log("Products Fetched");
      const { data, error } = await supabase
        .from("Preorder")
        .select("*")
      if (error) return;
      const prods = data;
      console.log(prods);
      setLoading(false);
      setProducts(prods);
    };
    getProducts();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    const [openModal, setOpenModal] = useState(false);
    const [modalItem, setModalItem] = useState({});
  const handleOpenModal = (item) => {
    setOpenModal(true);
    setModalItem(item);
    console.log(item);
  };
  const handleChangeModal = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    setModalItem((prevModalItem) => ({
      ...prevModalItem,
      [name]: updatedValue,
    }));
  };
  const handleEditProduct = async () => {
    console.log(modalItem);
    const { data, error } = await supabase
      .from("Preorder")
      .update([
        {
          product_name: modalItem.product_name,
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
    window.location.reload();
  };
  const addProduct = async () => {
    const {
      product_name
    } = formData;
    const { data, error } = await supabase.from("Preorder").insert([
      {
        product_name
      },
    ]);

    if (error) {
      toast.error(error.details, toastsettings);
      console.log(error);
      return;
    }

    console.log(data);

    toast.success("Product added successfully", toastsettings);
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
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2 w-full p-8 rounded-xl border border-stroke bg-white shadow-default">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    placeholder="Enter your Product Name for PreOrder"
                    value={formData.product_name}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  />
                </div>
                {/* <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black ">
                    Product MRP
                  </label>
                  <input
                    type="text"
                    name="mrp"
                    placeholder="Enter your Product MRP"
                    value={formData.mrp}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                  />
                </div> */}
              </div>
              <button
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 text-white"
                    onClick={addProduct}
                >
                  Add Product to Database
                </button>
            </div>
            <div className="flex">
              <PreordersListingTable
                  data={products}
                  onOpenModal={handleOpenModal}
              />
            </div>
          </div>
          {openModal && (
            <div>
              <div
                  className="fixed flex justify-center items-center z-30 p-4 inset-0  backdrop-blur-sm backdrop-brightness-50 w-full"
                
              >
                <div className="relative p-4 w-full sm:max-w-[70%] max-h-[95%] overflow-y-auto componentScroll">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  
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
                    <div className="col-span-2">
                      <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                          type="text"
                          name="product_name"
                          id="name"
                          value={modalItem?.product_name || ""}
                          onChange={handleChangeModal}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                          placeholder="Type product name"
                          required=""
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

export default Preorder;

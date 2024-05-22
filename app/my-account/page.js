"use client";

// https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
import hero_1 from "../../public/hero/bag_1.jpg";
import MainLayout from "../layouts/MainLayout";
import TextInput from "../components/TextInput";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/user";
import useIsLoading from "@/app/hooks/useIsLoading";
import useCreateAddress from "../hooks/useCreateAddress";
import useUserAddress from "../hooks/useUserAddress";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ClientOnly from "../components/ClientOnly";
import { supabase } from "@/utils/supabase";
import Hero from "../components/Hero";
import Image from "next/image";
import imagebg from "../../public/delivery_hero_image.jpg";
import { toastsettings } from "@/utils/toast";
import Link from "next/link";
export default function Home() {
  const router = useRouter();
  // const { user } = useUser();
  const user = JSON.parse(localStorage.getItem("user"));
  const [addressTitle, setAddressTitle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hno, setHno] = useState("");
  // const [street, setStreet] = useState("");
  const [Block_Number, setblock_number] = useState("");
  const [Apartment, setApartment] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [data, setData] = useState([]);
  const [addressPresent, setAddressPresent] = useState(false);

  const showError = (type) => {
    if (Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };
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
      return;
    }
    console.log(data);
    setAddressPresent(true);
    setData(data);
    setAddressTitle(data?.addressTitle);
    setName(data?.name);
    setPhone(data?.phone);
    setHno(data?.hno);
    // setStreet(data?.street);
    setApartment(data?.Apartment);
    setblock_number(data?.Block_Number);
    setLocality(data?.locality);
    setLandmark(data?.landmark);
    setCountry(data?.country);
    setCity(data?.city);
    setState(data?.state);
    setZipcode(data?.zipcode);
  };
  useEffect(() => {    
    getAdddress();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressPresent) {
      try {
        const { data, error } = await supabase.from("Addresses").update([
          {
            uid: user?.id,
            name,
            phone,
            hno,
            // street,
            locality,
            landmark,
            country,
            city,
            state,
            zipcode,
            addressTitle,
            Apartment,
            Block_Number
          },
        ]).eq("uid",user?.id)
        ;
        if (error) {
          console.log(error);
          toast.error("Error updating address",toastsettings);
          return;
        } else {
          console.log("Data inserted successfully:", data);
          setAddressTitle("");
          setName("");
          setPhone("");
          setHno("");
          // setStreet("");
          setLocality("");
          setLandmark("");
          setCountry("");
          setCity("");
          setState("");
          setZipcode("");
          setblock_number("");
          setApartment("")
          toast.success("Address Updated Successfully",toastsettings);
          getAdddress();
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
      }
    } else {
      try {
        const { data, error } = await supabase.from("Addresses").insert([
          {
            uid: user?.id,
            name,
            phone,
            hno,
            // street,
            locality,
            landmark,
            country,
            city,
            state,
            zipcode,
            addressTitle,
            Apartment,
            Block_Number
          },
        ]);
        if (error) {
          toast.error("Error inserting address",toastsettings);
          console.log(error);
          return;
        } else {
          getAdddress()
          toast.success("Address Inserted Successfully",toastsettings);
          console.log("Data inserted successfully:", data);
          setAddressTitle("");
          setName("");
          setPhone("");
          setHno("");
          // setStreet("");
          setLocality("");
          setLandmark("");
          setCountry("");
          setCity("");
          setState("");
          setZipcode("");
          setblock_number("");
          setApartment("")
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
      }
    }
  };

  // const setTheCurrentAddres = (result) => {
  //   setAddressId(result.id);
  //   setName(result.name);
  //   setAddress(result.address);
  //   setZipcode(result.zipcode);
  //   setCity(result.city);
  //   setCountry(result.country);
  // };

  // const validate = () => {
  //   setError(null);
  //   setError({});
  //   let isError = false;

  //   if (!name) {
  //     setError({ type: "name", message: "A name is required" });
  //     isError = true;
  //   } else if (!address) {
  //     setError({ type: "address", message: "An address is required" });
  //     isError = true;
  //   } else if (!zipcode) {
  //     setError({ type: "zipcode", message: "A zipcode is required" });
  //     isError = true;
  //   } else if (!city) {
  //     setError({ type: "city", message: "A city is required" });
  //     isError = true;
  //   } else if (!country) {
  //     setError({ type: "country", message: "A country is required" });
  //     isError = true;
  //   }
  //   return isError;
  // };

  // const submit = async (event) => {
  //   event.preventDefault();
  //   let isError = validate();

  //   if (isError) {
  //     toast.error(error.message, { autoClose: 3000 });
  //     return;
  //   }

  //   try {
  //     setIsUpdatingAddress(true);

  //     const response = await useCreateAddress({
  //       addressId,
  //       name,
  //       address,
  //       zipcode,
  //       city,
  //       country,
  //     });

  //     setTheCurrentAddres(response);
  //     setIsUpdatingAddress(false);

  //     toast.success("Address updated!", { autoClose: 3000 });

  //     router.push("/checkout");
  //   } catch (error) {
  //     setIsUpdatingAddress(false);
  //     console.log(error);
  //     alert(error);
  //   }
  // };
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <>
      <MainLayout>
        {/* <div id="AddressPage" className="mt-4 max-w-[600px] mx-auto px-2">
          <div className="mx-auto bg-white rounded-lg p-3">
            <div className="text-xl text-bold mb-2">Address Details</div>

            <form onSubmit={submit}>
              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={name}
                    placeholder="Name"
                    onUpdate={setName}
                    error={showError("name")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full"
                    string={address}
                    placeholder="Address"
                    onUpdate={setAddress}
                    error={showError("address")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={zipcode}
                    placeholder="Zip Code"
                    onUpdate={setZipcode}
                    error={showError("zipcode")}
                  />
                </ClientOnly>
              </div>

              <div className="mb-4">
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={city}
                    placeholder="City"
                    onUpdate={setCity}
                    error={showError("city")}
                  />
                </ClientOnly>
              </div>

              <div>
                <ClientOnly>
                  <TextInput
                    className="w-full mt-2"
                    string={country}
                    placeholder="Country"
                    onUpdate={setCountry}
                    error={showError("country")}
                  />
                </ClientOnly>
              </div>

              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`
                                mt-6
                                w-full 
                                text-white 
                                text-lg 
                                font-semibold 
                                p-3 
                                rounded
                                ${
                                  isUpdatingAddress
                                    ? "bg-blue-800"
                                    : "bg-blue-600"
                                }
                            `}
              >
                {!isUpdatingAddress ? (
                  <div>Update Address</div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Please wait...
                  </div>
                )}
              </button>
            </form>
          </div>
        </div> */}
        <div className="flex flex-col gap-6 p-4">
          <div className="flex">
            <div className="flex sm:flex-row-reverse flex-col sm:y-0 py-6 items-center gap-4  bg-contain">
              <div className="flex sm p-4 sm:p-0">
                <Image
                  src={hero_1}
                  alt="hero_1"
                  width={2000}
                  height={2000}
                  className="rounded-3xl sm:rounded-none"
                />
              </div>
              <div className="flex flex-col gap-6 sm px-[2.5rem] sm:px-[5rem] mt-10 ">
                <h1 className="text-3xl hero_section font-bold text-gray-800">
                  Discover swift, secure, and stylish delivery options tailored
                  to your doorstep for our premium bag collection.
                </h1>
                <h1 className="text-gray-500">
                  Beyond Ordinary: Bags that Match Your Personality.
                </h1>
                <Link href="/products-listing">
                <button className="bg-secondary w-[11rem] text-white p-4 rounded-2xl">
                  Shop More
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col">
            <div className="flex flex-col gap-6 p-4 sm:min-w-[33.5rem]">
              <div className="flex gap-2 justify-center bg-[#f5f5f5] rounded-xl p-2">
                <div
                  className={`flex justify-center  items-center w-[48%] bg-white p-2 rounded-md cursor-pointer hover:bg-secondary hover:text-white transform-all duration-300 ${
                    selectedTab == 1
                      ? "border-2 border-secondary"
                      : "border-2 border-white"
                  }`}
                  onClick={() => setSelectedTab(1)}
                >
                  Add Address
                </div>
                <div
                  className={`flex justify-center  items-center w-[48%] bg-white p-2 rounded-md cursor-pointer hover:bg-secondary hover:text-white transform-all duration-300 ${
                    selectedTab == 2
                      ? "border-2 border-secondary"
                      : "border-2 border-white"
                  }`}
                  onClick={() => setSelectedTab(2)}
                >
                  Saved Addresses
                </div>
              </div>
              {selectedTab === 1 ? (
                  <div className="flex flex-col gap-2 p-5">
                    <div className="flex flex-col">
                      <label>Address Title</label>
                      <input
                          value={addressTitle}
                          onChange={(e) => setAddressTitle(e.target.value)}
                          type="text"
                          className="w-full sm:w-[30rem] border p-2 rounded-lg"
                      />
                    </div>
                    <div className="sm:flex-row flex-col flex gap-4">
                      <div className="flex flex-col">
                        <label>Customer Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Phone</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="sm:flex-row flex-col flex gap-4 w-full">
                      <div className="flex flex-col">
                        <label>H.No</label>
                        <input
                            value={hno}
                            onChange={(e) => setHno(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                      {/*<div className="flex flex-col">*/}
                      {/*  <label>Street</label>*/}
                      {/*  <input*/}
                      {/*      value={street}*/}
                      {/*      onChange={(e) => setStreet(e.target.value)}*/}
                      {/*      type="text"*/}
                      {/*      className="sm:w-[14.5rem] border p-2 rounded-lg"*/}
                      {/*  />*/}
                      {/*</div>*/}
                    </div>
                    <div className="sm:flex-row flex-col flex gap-4 w-full">
                      <div className="flex flex-col">
                        <label>Block Number</label>
                        <input
                            value={Block_Number}
                            onChange={(e) => setblock_number(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>Apartment</label>
                        <input
                            value={Apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label>Locality</label>
                      <input
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          type="text"
                          className="w-full sm:w-[30rem] border p-2 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label>Landmark</label>
                      <input
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          type="text"
                          className="w-full sm:w-[30rem] border p-2 rounded-lg"
                      />
                    </div>
                    <div className="sm:flex-row flex-col flex gap-4">
                      <div className="flex flex-col">
                        <label>City</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>State</label>
                        <input
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="sm:flex-row flex-col flex gap-4">
                      <div className="flex flex-col">
                        <label>Country</label>
                        <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label>ZIP Code</label>
                        <input
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            type="text"
                            className="sm:w-[14.5rem] border p-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div
                        className="flex mt-6 items-center ml-4 justify-center"
                        onClick={handleSubmit}
                    >
                      <button
                          className="bg-black w-full flex items-center justify-center text-white py-4 px-2 rounded-md">
                        Save Address
                      </button>
                    </div>
                  </div>
              ) : (
                  data ? (<div className="flex flex-col gap-2 p-5 bg-[#f5f5f5] rounded-xl">
                    <div className="flex flex-col gap-2">
                      <div className="flex">
                        <h1 className="text-gray-500">Billing Address</h1>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex">{data?.name}</div>
                        <div className="flex">{data?.phone}</div>
                        <div className="flex">
                          {data?.hno} {data?.locality}
                        </div>
                        <div className="flex">
                          {data?.Block_Number} {data?.Apartment}
                        </div>
                        <div className="flex">{data?.landmark}</div>
                        <div className="flex">
                          {data?.city} {data?.state} {data?.zipcode}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center py-3">
                      <hr className="w-[80%]" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <h1 className="text-gray-500">Delivery Address</h1>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex">{data?.name}</div>
                    <div className="flex">{data?.phone}</div>
                    <div className="flex">
                      {data?.hno} {data?.locality}
                    </div>
                    <div className="flex">{data?.landmark}</div>
                    <div className="flex">
                      {data?.city} {data?.state} {data?.zipcode}
                    </div>
                  </div>
                </div>
              </div>):(
                <h1 className="h-[5rem] flex justify-center items-center text-xl">Address Not Saved</h1>
              )
              )}
            </div>
            <div className="flex">
              <Image
                src={imagebg}
                alt="hero_1"
                width={2000}
                height={2000}
                className="rounded-3xl sm:rounded-none"
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

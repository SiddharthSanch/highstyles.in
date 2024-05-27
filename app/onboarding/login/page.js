"use client";
import { ChevronRight, Copyright, Moon, Sun } from "lucide-react";
import dummyImage from "../../../public/login/login.png";
import { useEffect, useRef, useState } from "react";
import { Cookie, EyeIcon, EyeOffIcon, GraduationCap } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { toastsettings } from "@/utils/toast";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@/app/context/user";
const NewLogin = () => {
  const router = useRouter();
  const user = useUser();
  // if (user.id !== null) {
  //   setTimeout(() => {
  //     toast.success("You are already logged in", toastsettings);
  //     router.push("/");
  //   }, 2000);
  // }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    const toa = toast.loading("Wait :) Logging you in", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: "#000",
        color: "#f5f6f9",
      },
      progressBar: {
        background: "#a32b04",
      },
    });
    if (!email || !password) {
      return toast.update(toa, {
        render: "All fields are mandatory ;)",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    try {
      const base = process.env.BASE_URL;
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      // console.log("response", response, "and data", data);
      if (response.ok) {
        toast.update(toa, {
          render: "Successfully Logged in :)",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
        setTimeout(() => {
          document.cookie = `access_token=${data.data.access_token}`;
          document.cookie = `refresh_token=${data.data.refresh_token}`;
          const item = localStorage.getItem("from");
          if (item) {
            const id = localStorage.getItem("from");
            router.push(`/s/${id}`);
            return;
          }
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.dismiss();
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const inputs = useRef([]);
  const [inputIndex, setInputIndex] = useState(0);
  const handleKeyDown = (event, currentIndex) => {
    // console.log(event)
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % inputs.current.length;
      if (nextIndex === 2) {
        // handleSubmit();
        return;
      }
      setInputIndex(nextIndex);
      inputs.current[nextIndex].focus();
    }
  };
  //   const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    // setTimeout(() => {
    //   if (theme === "dark") setTheme("light");
    //   if (theme === "light") setTheme("dark");
    //   if (theme === "system") setTheme("dark");
    // }, 0);
  };
  const theme = "light";
  const handleGoogleLogin = async () => {
    try {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  const handleSubmitViaEP = async () => {
    try {
      const toa = toast.loading("Wait :) Logging you in", toastsettings);
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Login failed:", error.message);
        toast.update(toa, {
          render: "Login failed :(",
          type: "error",
          autoClose: 1500,
          isLoading: false,
        });
      } else {
        localStorage.setItem("user",user)
        console.log("Login successful:", user);
        toast.update(toa, {
          render: "Successfully Logged in :)",
          type: "success",
          autoClose: 1500,
          isLoading: false,
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  const supabase = createClientComponentClient();

  return (
    <>
      <ToastContainer />
      <div className="flex sm:flex-row flex-col-reverse sm:h-screen">
        <div className="flex flex-col sm:w-1/2 p-[1.5em]">
          <div className="flex justify-between">
            {/* <div className="flex" onClick={handleTheme}>
              {theme === "light" ? (
                <>
                  <Sun
                    size={40}
                    className="p-2 cursor-pointer rounded-md bg-[#f5f5f5]"
                  />
                </>
              ) : (
                <>
                  <Moon
                    size={40}
                    className="p-2 cursor-pointer rounded-md bg-[#3b3b3b]"
                  />
                </>
              )}
            </div> */}
            <div className="flex justify-end w-full">
              {/* <button
                className="p-2 rounded-md bg-secondary text-white w-[6rem]"
                onClick={() => {
                  router.push("signup");
                }}
              >
                Register
              </button> */}
              <button className="p-2 rounded-md border-2 hover:bg-gray-200 transform-all duration-300 w-[10rem]"
                onClick={() => {
                  router.push("/admin/login");
                }}>Admin Login</button>
            </div>
          </div>
          <div className="flex flex-col gap-[2rem] justify-center items-center h-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <h1 className="text-3xl font-semibold">Login✌️</h1>
              </div>
              <div className="flex">
                <h1 className="text-xl ">
                  Chat o&apos;clock! It&apos;s time to sign in and start the
                  conversation.
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <button className="flex gap-4 items-center justify-center w-[18rem] rounded-full hover:bg-gray-100">
                  <Auth
                    onlyThirdPartyProviders
                    redirectTo={`${window.location.origin}/auth/callback`}
                    supabaseClient={supabase}
                    providers={["google"]}
                  />
                </button>
              </div>
              {/*<div className="flex">*/}
              {/*  <button className="flex gap-4 items-center justify-center px-4 py-2 w-[18rem]  text-gray-600 rounded-full  hover:bg-gray-100">*/}
              {/*    <Image*/}
              {/*      src={*/}
              {/*        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/900px-Facebook_f_logo_%282019%29.svg.png?20241203063624"*/}
              {/*      }*/}
              {/*      alt="google-logo"*/}
              {/*      width={25}*/}
              {/*      height={25}*/}
              {/*    />*/}
              {/*    <h1>Sign in with Facebook</h1>*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
            <div className="flex gap-4 w-full items-center justify-center">
              <hr className="w-[25%]" />
              <h1 className="text-gray-500 text-sm flex">
                or Sign In with Email
              </h1>
              <hr className="w-[25%]" />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-[1.5rem] items-center">
                <div className="flex ">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="bg-slate-100 w-full p-3 placeholder:text-gray-500  rounded-md"
                    onKeyDown={(e) => handleKeyDown(e, 0)}
                    ref={(input) => (inputs.current[0] = input)}
                  />
                </div>
                <div className="flex relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className=" bg-slate-100 w-full p-3 placeholder:text-gray-500  rounded-md"
                    onKeyDown={(e) => handleKeyDown(e, 1)}
                    ref={(input) => (inputs.current[1] = input)}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="text-gray-400" size={25} />
                    ) : (
                      <EyeIcon className="text-gray-400" size={25} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex ml-10">
                <button
                  className="p-4 h-fit flex items-center justify-center border hover:bg-primary hover:text-white dark:border-0 rounded-full transform-all duration-300"
                  onClick={handleSubmitViaEP}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <div className="flex gap-2  text-gray-500">
              <Copyright className=" text-gray-500" />
              <h1>Archived 2024 All Rights Reserved</h1>
            </div>
          </div>
        </div>
        <div className="flex sm:w-1/2">
          <Image src={dummyImage} alt="Image" />
        </div>
      </div>
    </>
  );
};

export default NewLogin;

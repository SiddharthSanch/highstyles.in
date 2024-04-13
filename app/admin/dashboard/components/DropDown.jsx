"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { supabase } from "@/utils/supabase";
import {
  DoorClosed,
  Home,
  List,
  ListCollapse,
  LogOut,
  Puzzle,
  SendToBack,
  StarIcon,
  Users2,
  UsersIcon,
} from "lucide-react";
import { useAppState } from "@/utils/Context";
import { useRouter } from "next/navigation";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const [userId, setuserId] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setuserId(user.id);
    }
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const logout = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({
        isActive: false,
      })
      .eq("user_id", userId);
    if (error) return;
    else toast.success("Logged out successfully");
    localStorage.clear();
    window.location.href = "/admin/login";
  };
  const { state, setState } = useAppState();
  const router = useRouter();
  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium ">
            Highstyles Administrator
          </span>
          <span className="block text-xs">Switch Entity</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/images/user/user-01.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`zindex absolute right-0 mt-4 flex w-[15rem] flex-col border border-stroke bg-white shadow-default rounded-md p-2 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-2  border-stroke p-1 ">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="flex hover:bg-[#ebebeb] p-2 rounded-md items-center cursor-pointer gap-3.5 text-sm font-medium ease-in-out  transform-all duration-300"
              onClick={() => {
                setState(item.state);
              }}
            >
              {item.icon}
              {item.text}
            </div>
          ))}
        </ul>
        <hr className="my-2" />
        <ul className="flex flex-col gap-2 border-stroke p-1 ">
          <div
            className="flex hover:bg-primary hover:text-white p-2 rounded-md items-center cursor-pointer gap-3.5 text-sm font-medium ease-in-out  transform-all duration-300"
            onClick={() => {
              router.push("/");
            }}
          >
            <Home size={20} className="text-inherit" />
            Home
          </div>
          <div
            className="flex hover:bg-red-500 hover:text-white p-2 rounded-md items-center cursor-pointer gap-3.5 text-sm font-medium ease-in-out transform-all duration-300"
            onClick={() => {
              toast.success("Logged out successfully", {
                autoClose: 1000,
              });
              setTimeout(() => {
                router.push("/admin/login");
              }, 1000);
            }}
          >
            <LogOut size={20} className="text-inherit" />
            Logout
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DropdownUser;
const navigationItems = [
  {
    state: "Products",
    icon: <ListCollapse size={20} className="text-gray-600" />,
    text: "Products",
  },
  {
    state: "Reviews",
    icon: <StarIcon size={20} className="text-gray-600" />,
    text: "Reviews",
  },
  {
    state: "Coupons",
    icon: <Puzzle size={20} className="text-gray-600" />,
    text: "Coupons",
  },
  {
    state: "Users",
    icon: <Users2 size={20} className="text-gray-600" />,
    text: "Users",
  },
  {
    state: "Orders",
    icon: <SendToBack size={20} className="text-gray-600" />,
    text: "Orders",
  },
];

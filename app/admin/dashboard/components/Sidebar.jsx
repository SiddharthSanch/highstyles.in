"use client";
import { useAppState } from "@/utils/Context";
import {
  ListCollapse,
  StarIcon,
  SendToBack,
  Users2,
  Puzzle,
  ListOrdered,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { state, setState } = useAppState();
  const { sidebarOpen, setSidebarOpen } = useAppState();
  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      <div className="flex flex-col mt-[1rem] gap-4">
        <div className="flex gap-4 items-center">
          <div
            className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md ${
              theme === "light" ? `border-2 border-white` : ``
            }  hover:border-primary  ${
              state === "Products" ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              setState("Products");
              // setSidebarOpen(!sidebarOpen);
            }}
          >
            <ListCollapse
              size={20}
              className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
                state === "Products" ? "text-[#f5f5f5]" : ""
              }`}
            />
            <h1>Products</h1>
          </div>
          <div
            className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md ${
              theme === "light" ? `border-2 border-white` : ``
            } hover:border-primary  ${
              state === "Coupons" ? "bg-primary text-white" : ""
            }`}
            onClick={() => {
              setState("Coupons");
              // setSidebarOpen(!sidebarOpen);
            }}
          >
            <Puzzle
              size={20}
              className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
                state === "Coupons" ? "text-[#f5f5f5]" : ""
              }`}
            />
            <h1>Coupons</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center">
        <div
          className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md ${
            theme === "light" ? `border-2 border-white` : ``
          } hover:border-primary  ${
            state === "Orders" ? "bg-primary text-white" : ""
          }`}
          onClick={() => {
            setState("Orders");
            // setSidebarOpen(!sidebarOpen);
          }}
        >
          <SendToBack
            size={20}
            className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
              state === "Orders" ? "text-[#f5f5f5]" : ""
            }`}
          />
          <h1>Orders</h1>
        </div>
        <div
          className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md ${
            theme === "light" ? `border-2 border-white` : ``
          } hover:border-primary  ${
            state === "Users" ? "bg-primary text-white" : ""
          }`}
          onClick={() => {
            setState("Users");
            // setSidebarOpen(!sidebarOpen);
          }}
        >
          <Users2
            size={20}
            className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
              state === "Users" ? "text-[#f5f5f5]" : ""
            }`}
          />
          <h1>Users</h1>
        </div>
        </div>
        <div className="flex gap-4 items-center">
        <div
          className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md  ${
            theme === "light" ? `border-2 border-white` : ``
          } hover:border-primary  ${
            state === "Reviews" ? "bg-primary text-white" : ""
          }`}
          onClick={() => {
            setState("Reviews");
          }}
        >
          <StarIcon
            size={20}
            className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
              state === "Reviews" ? "text-[#f5f5f5]" : ""
            }`}
          />
          <h1>Reviews</h1>
        </div>
        <div
          className={`flex flex-col w-1/2 h-[5rem] justify-center items-center transform-all duration-300 gap-4 p-2  cursor-pointer rounded-md  ${
            theme === "light" ? `border-2 border-white` : ``
          } hover:border-primary  ${
            state === "pre" ? "bg-primary text-white" : ""
          }`}
          onClick={() => {
            setState("pre");
          }}
        >
          <ListOrdered
            size={20}
            className={`${theme === "light" ? `text-[#4d4b4b]` : ``} ${
              state === "pre" ? "text-[#f5f5f5]" : ""
            }`}
          />
          <h1>Pre Orders</h1>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { useAppState } from "@/utils/Context";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DropdownUser from "./DropDown";
import { useTheme } from "next-themes";
import DarkModeSwitcher from "./ThemeToggle";

const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppState();
  const { theme, setTheme } = useTheme();
  return (
    <div className="sticky top-0 flex w-full drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2">
        <div className="flex justify-center gap-4 items-center">
          <Image
            width={32}
            height={32}
            src={"/logo/logo-icon.svg"}
            alt="Logo"
          />
          <h1 className="font-semibold text-2xl">Admin Portal</h1>
        </div>

        <div className="flex items-center gap-6 z-50">
          <DropdownUser />
        </div>
        {/* <div className="sm:hidden flex items-center gap-4">Hi</div> */}
      </div>
    </div>
  );
};

export default Navbar;
{
  /* <div
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`cursor-pointer p-2 rounded-md border
          ${theme === "light" ? "hover:bg-[#f5f5f5]" : "hover:bg-[#353738]"}
          `}
          >
            Switch Theme
          </div> */
}

"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const DarkModeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
      if (theme === "dark") setTheme("light");
      if (theme === "light") setTheme("dark");
      if (theme === "system") setTheme("dark");
  };

  return (
    <div className="flex" onClick={handleTheme}>
      {theme === "light" ? (
        <div className="flex items-center">
          <Sun
            size={40}
            className="p-2 cursor-pointer rounded-md bg-[#f5f5f5]"
          />
        </div>
      ) : (
        <div className="flex items-center">
          <Moon
            size={40}
            className="p-2 cursor-pointer rounded-md bg-[#3b3b3b]"
          />
        </div>
      )}
    </div>
  );
};

export default DarkModeSwitcher;

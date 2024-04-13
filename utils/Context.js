"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  var initialState;
  // if (typeof window !== "undefined") {
    initialState = localStorage.getItem("state");
  // } 
  const [state, setState] = useState(initialState || "Products");
  // const [state, setState] = useState("Products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("state", state);
  }, [state]);
//   const access_token=Cookies.get("access_token");
//   const refresh_token=Cookies.get("refresh_token");
    const [discount, setDiscount] = useState(0)

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        sidebarOpen,
        setSidebarOpen,
        // access_token,
        // refresh_token
        discount,
        setDiscount
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
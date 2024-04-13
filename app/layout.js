import "./globals.css";
import UserProvider from "./context/user";
import CartProvider from "./context/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Poppins, Manrope } from "next/font/google";
import { AppProvider } from "@/utils/Context";
import { ThemeProviders } from "./ThemeProvider";
export const metadata = {
  title: "Highstyles.in ",
  description: "Highstyles.in ",
};
const poppins = Manrope({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <div>
          <ToastContainer />
          {/* <ThemeProviders> */}
            <AppProvider>
              <UserProvider>
                <CartProvider>{children}</CartProvider>
              </UserProvider>
            </AppProvider>
          {/* </ThemeProviders> */}
        </div>
      </body>
    </html>
  );
}

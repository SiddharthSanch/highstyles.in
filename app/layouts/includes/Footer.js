import { Copyright } from "lucide-react";
import Link from "next/link";
import React from "react";
const Footer = () => {
  const handleEmailClick = () => {
    const emailAddress = "info@highstyles.in";
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(
      emailAddress
    )}`;

    window.open(gmailComposeUrl, "_blank");
  };
  return (
    <div className="flex flex-col">
      <div className="bg-[#181818] text-white h-auto]">
        <div className="p-12">
          <div className="flex w-full flex-col ">
            <div className="flex justify-center sm:flex-row flex-col gap-[6rem]">
              <div className="flex sm:flex-row flex-col gap-[4rem]">
                <div className="flex flex-col w-[20rem]">
                  <h1 className="text-3xl font-semibold mb-4">Highstyles.in</h1>
                  <h1 className="text-[#b1b1b1] cursor-pointer hover:text-white">
                    Phone : +91 8669340001
                  </h1>
                  {/* <h1 className="text-[#b1b1b1] cursor-pointer hover:text-white">
                    Fax : 0832 240 4202
                  </h1> */}
                  <h1
                    onClick={handleEmailClick}
                    className="text-[#b1b1b1] cursor-pointer hover:text-white"
                  >
                    info@highstyles.in
                  </h1>
                  <hr className="w-full h-[0.1rem] my-4 bg-secondary border-0 rounded" />
                  <h1 className="text-[#b1b1b1]">
                    Discover stylish and high-quality bags for every occasion at
                    Highstyles. Elevate your look with our curated collection of
                    trendy and functional designs.
                  </h1>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d235.36011255917958!2d73.05950893561031!3d19.292722132115774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1713129511622!5m2!1sen!2sin"
                  width="sm:400"
                  height="300"
                  allowFullScreen=""
                  className="border-0 rounded-md"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex gap-[4rem]">
                <div className="flex flex-col gap-1 sm:w-[15rem]">
                  <h1 className="text-xl">Quick Links</h1>
                  <hr className="w-full h-[0.1rem]  my-4 bg-secondary border-0 rounded" />
                  <div className="flex flex-col gap-2">
                    {pages.map((page) => (
                      <Link href={page.link} key={page.id}>
                        <h1 className="flex flex-col text-[#b1b1b1] cursor-pointer hover:text-white">
                          {page.name}
                        </h1>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1 sm:w-[50%]">
                  <h1 className="text-xl">User Links</h1>
                  <hr className="w-full h-[0.1rem]  my-4 bg-secondary border-0 rounded" />
                  <div className="flex flex-col gap-2">
                    {pages2.map((page) => (
                      <Link href={page.link} key={page.id}>
                        <h1 className="flex flex-col text-[#b1b1b1] cursor-pointer hover:text-white">
                          {page.name}
                        </h1>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#202020] flex sm:flex-row flex-col h-auto w-full text-[#b1b1b1] gap-6 p-3">
        <div className="sm:w-1/2 flex items-center justify-center h-full ">
          <h1 className="flex items-center">
            2024 Highstyles &nbsp;
            <Copyright size={16} /> &nbsp;All Rights Reserved
          </h1>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center h-full ">
          <h1>Maitained by DigitalGrowthEngine</h1>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center h-full cursor-pointer ">
          <div className="sm:px-4 flex sm:flex-row flex-col gap-8  w-full items-center justify-center">
            <div onClick={() => router.push("/terms-and-conditions")}>
              Terms&nbsp;&&nbsp;Conditions
            </div>
            {/* <div>Privacy&nbsp;Policy</div>
            <div>Hyperlinking&nbsp;Policy</div>
            <div>Copyright</div> */}
            <div className="" onClick={() => window.scrollTo(0, 0)}>
              <h1>Back to Top</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const pages = [
  { id: 1, name: "About Us", link: "/about" },
  { id: 2, name: "Copyright", link: "/copyright" },
  { id: 3, name: "Privacy Policy", link: "/privacy-policy" },
  { id: 4, name: "FAQ's", link: "/faqs" },
  { id: 5, name: "Contact Us", link: "/contact" },
];
const pages2 = [
  { id: 6, name: "Login", link: "/onboarding/login" },
  { id: 7, name: "Register", link: "/onboarding/signup" },
  { id: 8, name: "Cart", link: "/cart" },
  { id: 9, name: "Orders", link: "/my-orders" },
  { id: 10, name: "Address", link: "/my-account" },
];

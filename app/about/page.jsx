import React from "react";
import Banner from "../components/Banner";
import MainLayout from "../layouts/MainLayout";

const AboutUsPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-center text-xl font-bold">
            <h1 className="text-gray-500">
              Home / <span className="text-secondary">About Us</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <Banner />
          </div>
        </div>
        <div className="bg-gray-100 p-[2rem]">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex different relative mb-[5rem]">
                <div
                  className="flex justify-center absolute text-secondary w-full top-[-5rem] mt-4 sm:text-[6rem] text-3xl z-50"
                  style={{
                    opacity: 0.2,
                  }}
                >
                  About&nbsp;Highstyles.in
                </div>
                {/* <div className="text-[2.5rem] mt-[3.5rem] z-50">
              Best Seller Product
            </div> */}
              </div>
              <p className="sm:mt-4 text-lg text-gray-600">
                At Highstyles.in, we're passionate about fashion and dedicated
                to providing you with the latest trends and styles in bags to
                complement your unique personality and lifestyle.
              </p>
            </div>

            <div className="mt-20">
              <div className="flex flex-col md:flex-row justify-around items-center">
                <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md mb-8">
                  <div className="px-6 py-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Our Story
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Founded in 2024, Highstyles.in began with a simple idea:
                      to bring together a curated collection of high-quality
                      bags from around the world under one digital roof. What
                      started as a small endeavor has grown into a thriving
                      online destination for bag enthusiasts everywhere.
                    </p>
                  </div>
                </div>

                <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md mb-8">
                  <div className="px-6 py-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our mission at Highstyles.in is to offer an unparalleled
                      shopping experience, where fashion meets function. We
                      strive to provide our customers with a diverse selection
                      of bags, ranging from chic handbags and trendy backpacks
                      to versatile totes and elegant clutches, all at affordable
                      prices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto text-center mt-12">
                <p className="text-lg text-gray-600">
                  Why Choose Highstyles.in?
                </p>
                <ul className="mt-6 text-left">
                  <li className="mb-4">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      1
                    </span>
                    <span className="text-gray-700">
                      Quality Assurance: We handpick every bag in our
                      collection, ensuring that each item meets our high
                      standards of quality and craftsmanship.
                    </span>
                  </li>
                  <li className="mb-4">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      2
                    </span>
                    <span className="text-gray-700">
                      Trendsetting Styles: Stay ahead of the fashion curve with
                      our constantly updated inventory, featuring the latest
                      styles and designs.
                    </span>
                  </li>
                  <li className="mb-4">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      3
                    </span>
                    <span className="text-gray-700">
                      Customer Satisfaction: Your satisfaction is our top
                      priority. From browsing our website to receiving your
                      order, we're committed to providing exceptional customer
                      service every step of the way.
                    </span>
                  </li>
                  <li className="mb-4">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      4
                    </span>
                    <span className="text-gray-700">
                      Convenience: Enjoy the convenience of shopping from the
                      comfort of your own home with our user-friendly website
                      and secure checkout process.
                    </span>
                  </li>
                  <li className="mb-4">
                    <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                      5
                    </span>
                    <span className="text-gray-700">
                      Fast Shipping: We understand that you're eager to receive
                      your new bag, which is why we offer fast and reliable
                      shipping options to get your purchase to you as quickly as
                      possible.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="max-w-3xl mx-auto mt-12">
                <p className="text-lg text-gray-600 text-center">
                  Get in Touch
                </p>
                <p className="text-center">
                  We love hearing from our customers! Whether you have a
                  question about a product, need assistance with your order, or
                  just want to say hello, our friendly customer service team is
                  here to help. Feel free to contact us via email, phone, or
                  social media – we're always happy to assist you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;

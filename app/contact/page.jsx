import React from "react";
import MainLayout from "../layouts/MainLayout";
import Image from "next/image";
import FaQ from "../faqs/page";
import contactImage from "../../public/delivery_hero_image.jpg";
import RouteToPreorderForm from "../components/RouteToPreorderForm";
const ContactUsPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex px-[4rem] mt-8">
          <RouteToPreorderForm />
        </div>
        <div className="flex mb-6 mt-5 flex-col items-center justify-center sm:px-[5rem] px-[1rem]">
          <div className="text-center">
            <h1 className="text-6xl bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent ">
              Let&apos;s Work Together.
            </h1>
            {/* <div className="flex text-5xl">
            <h1>Tell us about your project</h1>
          </div> */}
          </div>
        </div>
        <div className="sm:px-[6rem] sm:flex-row flex-col gap-[2rem] flex justify-between items-center px-[1rem]">
          <div className="flex animate-hero flex-col gap-8 sm:w-1/2  leading-[3rem]">
            <Image
              src={contactImage}
              alt="hero-img"
              width={500}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col items-center gap-[2rem]">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide  text-xs  mb-2">
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full    rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id="grid-first-name"
                    // value={inquiryDetails?.firstName}
                    // onChange={(e) =>
                    //   setInquiryDetails({
                    //     ...inquiryDetails,
                    //     firstName: e.target.value,
                    //   })
                    // }
                    type="text"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 leading-tight  focus:border-[#0050cc] bg-[#f5f5f5]"
                    id="grid-last-name"
                    type="text"
                    // value={inquiryDetails?.lastName}
                    // onChange={(e) => {
                    //   setInquiryDetails({
                    //     ...inquiryDetails,
                    //     lastName: e.target.value,
                    //   });
                    // }}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id=""
                    type=""
                    // value={inquiryDetails?.email}
                    // onChange={(e) => {
                    //   setInquiryDetails({
                    //     ...inquiryDetails,
                    //     email: e.target.value,
                    //   });
                    // }}
                    placeholder="Your email address"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide  text-xs mb-2">
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full   rounded py-3 px-4 mb-3 leading-tight focus:border-[#0050cc] bg-[#f5f5f5]"
                    id=""
                    type=""
                    // value={inquiryDetails?.email}
                    // onChange={(e) => {
                    //   setInquiryDetails({
                    //     ...inquiryDetails,
                    //     email: e.target.value,
                    //   });
                    // }}
                    placeholder="Your phone number"
                  />
                </div>
              </div>
              <div className="flex mb-6 flex-col">
                    <label className="block uppercase tracking-wide text-xs mb-2">
                      Contact For
                    </label>
                    <div className="relative">
                      <select
                        required
                        name="projectType"
                        // value={form.projectType}
                        // onChange={handleChange}
                        className="block gap-2 appearance-none w-full text-[#9ca3af] bg-[#f5f5f5] py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        id="grid-state"
                      >
                        <option>Enquiry</option>
                        <option>Complaint</option>
                        <option>Bulk Orders</option>
                        
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-100">
                        <svg
                          className="fill-white h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="message"
                  className="block uppercase mb-2 text-xs font-medium dark"
                >
                  Your message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-100 rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-[#f5f5f5]"
                  placeholder="Share your vision, let's collaborate!"
                ></textarea>
              </div>
            </form>
            <div className="flex justify-between">
              <button className="bg-secondary w-[8rem] rounded-md p-4 flex justify-center items-center text-white">
                Send
              </button>
            </div>
          </div>
        </div>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
              {faqData.map((faq, index) => (
                <div key={index}>
                  <div className="mb-10">
                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg
                        className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {faq.question}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ContactUsPage;
const faqData = [
  {
    question: "What is the ideal use for this backpack?",
    answer: "Our backpack is versatile and suitable for various purposes, including daily commutes, travel, hiking, and outdoor activities. Its design and features make it adaptable to different lifestyles."
  },
  {
    question: "Is the backpack water-resistant?",
    answer: "Yes, our backpack is equipped with water-resistant materials to help protect your belongings in light rain or drizzle. However, it's not completely waterproof, so we recommend taking precautions in heavy rain."
  },
  {
    question: "How much can the backpack hold?",
    answer: "The capacity of our backpack varies depending on the model, but we design them with ample space for essentials. You can typically fit a laptop, books, clothing, and other daily necessities. Check the product specifications for specific details on capacity."
  },
  {
    question: "Is the backpack suitable for carrying a laptop?",
    answer: "Absolutely. Many of our backpacks feature padded compartments designed to securely hold laptops of various sizes. We prioritize both style and functionality, ensuring your devices are protected during transport."
  },
  {
    question: "Are the shoulder straps adjustable for different body sizes?",
    answer: "Yes, our backpacks come with adjustable shoulder straps to accommodate different body sizes. The adjustable straps ensure a comfortable fit for users of varying heights."
  },
  {
    question: "Can I wash the backpack in a washing machine?",
    answer: "We recommend hand washing your backpack with mild detergent and warm water. Avoid using a washing machine, as it may damage the materials and affect the structural integrity. Always refer to the care instructions provided with your specific backpack."
  },
  {
    question: "Does the backpack have warranty coverage?",
    answer: "Yes, our backpacks typically come with a warranty against manufacturing defects. Please check the product documentation or contact our customer service for specific warranty details and instructions on how to make a claim."
  },
  {
    question: "Are there different color options available?",
    answer: "Yes, we offer a range of color options for our backpacks. The available colors may vary depending on the specific model. Check our website or retailers for the current color selection."
  },
  {
    question: "How can I clean and maintain the backpack?",
    answer: "To clean the backpack, wipe it with a damp cloth. Avoid using harsh chemicals or abrasive cleaners, as they may damage the materials. Regularly check for loose threads or any signs of wear and tear, and address any issues promptly to prolong the backpack's lifespan."
  },
  {
    question: "Can I return the backpack if I'm not satisfied?",
    answer: "Yes, we have a return policy in place. If you're not satisfied with your purchase, please refer to our return policy on our website or contact our customer service for assistance with the return process."
  }
];
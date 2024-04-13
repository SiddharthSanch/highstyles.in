import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner";

const FaQ = () => {

  // Data object containing FAQ items
  // const faqData = [
  //   {
  //     question: "What types of bags do you sell on Highstyles.in?",
  //     answer: "We offer a wide range of bags including handbags, backpacks, tote bags, messenger bags, duffle bags, and more, catering to various styles and needs."
  //   },
  //   {
  //     question: "Do you offer international shipping?",
  //     answer: "Yes, we provide international shipping to many countries worldwide. You can check the shipping options and rates during the checkout process."
  //   },
  //   {
  //     question: "What payment methods do you accept?",
  //     answer: "We accept various payment methods including credit/debit cards, PayPal, Google Pay, Apple Pay, and more. You can choose your preferred payment option during checkout."
  //   },
  //   {
  //     question: "What is your return policy?",
  //     answer: "We offer a hassle-free return policy. If you're not satisfied with your purchase, you can return the item(s) within 30 days for a full refund or exchange. Please refer to our Returns & Exchanges page for detailed instructions."
  //   },
  //   {
  //     question: "How can I track my order?",
  //     answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this tracking number to monitor the status of your shipment on our website or the courier's website."
  //   },
  //   {
  //     question: "How can I contact customer support?",
  //     answer: "You can reach out to our customer support team via email at support@highstyles.in or through our contact form on the website. We're available to assist you with any queries or concerns you may have."
  //   }
  // ];
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


  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-center text-xl font-bold">
            <h1 className="text-gray-500">
              Home /{" "}
              <span className="text-secondary">Frequently Asked Questions</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <Banner />
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

export default FaQ;

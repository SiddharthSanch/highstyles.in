import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner";

const PrivacyPolicy = () => {
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
        <div className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Privacy Policy
            </h1>
            <div className="prose prose-lg text-gray-700 dark:text-gray-300">
              <p>
                This Privacy Policy describes how Highstyles collects, uses, and
                protects the information you provide on our website.
              </p>
              <h2>Information We Collect</h2>
              <p>
                We collect personal information such as your name, email
                address, and phone number when you create an account or make a
                purchase.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                We use your information to process your orders, communicate with
                you about your orders, and provide customer support.
              </p>
              <h2>Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties without your consent.
              </p>
              <h2>Security</h2>
              <p>
                We take precautions to protect your information. Your personal
                information is stored in a secure database and is only
                accessible to authorized personnel.
              </p>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at privacy@highstyles.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;

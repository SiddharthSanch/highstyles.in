import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner";

const CopyRightPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-center text-xl font-bold">
            <h1 className="text-gray-500">
              Home / <span className="text-secondary">Copyright</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <Banner />
          </div>
        </div>
        <div className="text-xl py-4 text-center">
          <div className="container mx-auto">
            <p className="text-2xl text-secondary">
              &copy; {new Date().getFullYear()} Highstyles.in. All rights
              reserved. Designed and Developed by Highstyles.in.
            </p>
            <p className="mt-6">
              All content, trademarks, designs, logos, and intellectual property
              rights associated with Highstyles.in are the property of
              Highstyles.in and its licensors.
            </p>
            <p className="mt-2">
              Unauthorized use, reproduction, or distribution of any content
              from this website is strictly prohibited without prior written
              consent from Highstyles.in.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CopyRightPage;

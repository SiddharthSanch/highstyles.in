import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner";

const TermsAndConditions = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-center text-xl font-bold">
            <h1 className="text-gray-500">
              Home / <span className="text-secondary">Terms & Conditions</span>
            </h1>
          </div>
          <div className="flex justify-center">
            <Banner />
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Terms & Conditions
              </h2>
              <div className="mt-8 text-lg text-gray-600">
                <h3 className="text-xl font-semibold mb-4">1. Introduction</h3>
                <p>
                  Welcome to Highstyles.in. These terms and conditions outline
                  the rules and regulations for the use of Highstyles.in's
                  Website.
                </p>
                <p>
                  By accessing this website we assume you accept these terms and
                  conditions. Do not continue to use Highstyles.in if you do not
                  agree to take all of the terms and conditions stated on this
                  page.
                </p>
                <p>
                  The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: "Client", "You" and "Your" refers to you, the
                  person log on this website and compliant to the Company’s
                  terms and conditions. "The Company", "Ourselves", "We", "Our"
                  and "Us", refers to our Company. "Party", "Parties", or "Us",
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client’s needs in respect of provision of the Company’s
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4">2. License</h3>
                <p>
                  Unless otherwise stated, Highstyles.in and/or its licensors
                  own the intellectual property rights for all material on
                  Highstyles.in. All intellectual property rights are reserved.
                  You may access this from Highstyles.in for your own personal
                  use subjected to restrictions set in these terms and
                  conditions.
                </p>
                <p>You must not:</p>
                <ul className="list-disc ml-8">
                  <li>Republish material from Highstyles.in</li>
                  <li>Sell, rent or sub-license material from Highstyles.in</li>
                  <li>
                    Reproduce, duplicate or copy material from Highstyles.in
                  </li>
                  <li>Redistribute content from Highstyles.in</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  3. Hyperlinking to our Content
                </h3>
                <p>
                  The following organizations may link to our Website without
                  prior written approval:
                </p>
                <ul className="list-disc ml-8">
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>
                    Online directory distributors may link to our Website in the
                    same manner as they hyperlink to the Websites of other
                    listed businesses; and
                  </li>
                  <li>
                    System wide Accredited Businesses except soliciting
                    non-profit organizations, charity shopping malls, and
                    charity fundraising groups which may not hyperlink to our
                    Web site.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </MainLayout>
  );
};

export default TermsAndConditions;

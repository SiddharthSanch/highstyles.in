"use client";

import { formatDate } from "@/utils/convertTime";
import Image from "next/image";
import { useEffect, useState } from "react";

const UsersListingTable = ({ data }) => {
  return (
    <div className="rounded-xl w-full border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto">
      <div className="max-w-full overflow-x-auto">
        <table className="rounded-xl w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User ID
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Active
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, key) => (
              <tr key={key}>
                <td className="gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.name}
                  </p>
                </td>
                <td className="gap-3 border-b dark:border-gray-500 border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="font-medium text-black dark:text-white">
                    {item.user_id}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.email}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.isActive ? "Yes" : "No"}
                  </p>
                </td>
                <td className="border-b dark:border-gray-500 border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.phone}
                  </p>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListingTable;

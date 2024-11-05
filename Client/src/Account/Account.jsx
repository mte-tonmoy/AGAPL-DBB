import React, { useEffect, useState } from "react";
import MovingComponent from "react-moving-text";
import useUserData from "../hooks/useUserData";
import NavBar from "../NavBar/NavBar";


// const Account = () => {
//   const [userData, refetch] = useUserData([]);
//   console.log(userData);

//   return (
//     <div className="">
     
//         <div className="">
//           <div className="">
//             <MovingComponent
//               type="fadeInFromLeft"
//               duration="1000ms"
//               delay="0s"
//               direction="normal"
//               timing="ease"
//               iteration="1"
//               fillMode="none"
//               className="tracking-wider text-4xl text-bold text-gray-700 rounded-lg inline-block"
//             >
//               Profile Information
//             </MovingComponent>
//           </div>
//           <div className="">
//             <div className="mt-10 divide-y divide-gray-100">
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-700">
//                   Full name
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
//                   {userData[0]?.name}
//                 </dd>
//               </div>

//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-700">
//                   Email address
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
//                   {userData[0]?.email}
//                 </dd>
//               </div>
//               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                 <dt className="text-sm font-medium leading-6 text-gray-700">
//                   Role
//                 </dt>
//                 <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
//                   {userData[0]?.role}
//                 </dd>
//               </div>
//             </div>
//           </div>
//         </div>
      
//     </div>
//   );
// };

// export default Account;


const Account = () => {
  const [userData, refetch] = useUserData([]);
  console.log(userData);

  return (
    <div>

      <div className="w-full">
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-xl font-semibold">User Details</p>
        </div>
        </div>
          <div className="sm:px-40 md:px-45 lg:px-50 xl:px-55">
            <div className="mt-10 divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {userData[0]?.name}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {userData[0]?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-700">
                  Role
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {userData[0]?.role}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Account;
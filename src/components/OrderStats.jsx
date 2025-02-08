import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaShoppingCart,
  FaCogs,
} from "react-icons/fa";
import { CURRENCY } from "../utils/constants";
import {
  IoBagCheckOutline,
  IoCashOutline,
  IoCubeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const OrderStats = () => {
  const totalOrders = 80;
  const completedOrders = 7;
  const pendingOrders = 0;
  const canceledOrders = 1;
  const processingOrders = 10; // Assuming processing orders are provided

  const statsData = [
    {
      bgColor: "linear-gradient(to right, rgb(1,98,232) 0,rgba(1,98,232, 0.5) 100%)",
      icon: <FaCogs className="text-[#C6D9FA] text-5xl" />,
      title: "Total Orders",
      // isLoadingKey: isUsersLoading,
      valueKey: "orders",
      valueColor: "text-[#C6D9FA]",
      value: totalOrders,
    },
    {
      bgColor: "linear-gradient(45deg,#f93a5a,#f7778c)" ,
      icon: <FaCogs className="text-[#FFCBD2] text-5xl" />,
      title: "Total Revenue",
      // isLoadingKey: isOrdersLoading,
      valueKey: "totalRevenue",
      valueColor: "text-[#FFCAD1]",
      value: 89,
    },
    {
      bgColor: "linear-gradient(to left,#48d6a8 0,#029666 100%)",
      icon: <FaCogs className="text-[#C4E4D5] text-5xl" />,
      title: "Total  Products",
      // isLoadingKey: isProductLoading,
      valueKey: "allProducts",
      valueColor: "text-[#C4E4D5]",
      // value: totalProducts,
    },
    {
      bgColor: "linear-gradient(to left, #efa65f, #f76a2d)",
      icon: <FaCogs className="text-[#FDD9C7] text-5xl" />,
      title: "Active Users",
      // isLoadingKey: isUsersLoading,
      valueKey: "allUsers",
      valueColor: "text-[#FDD9C7]",
      // value: totalUsers,
    },
    {
      bgColor: "linear-gradient(87deg, rgb(23, 43, 77) 0px, rgb(26, 23, 77) 100%)",
      icon: <FaCogs className="text-[#FDD9C7] text-5xl" />,
      title: "Active Users",
      // isLoadingKey: isUsersLoading,
      valueKey: "allUsers",
      valueColor: "rgb(206, 212, 218)",
      // value: totalUsers,
    },
    {
      bgColor: "linear-gradient(87deg, rgb(94, 114, 228) 0px, rgb(130, 94, 228) 100%)",
      icon: <FaCogs className="text-[#FDD9C7] text-5xl" />,
      title: "Active Users",
      // isLoadingKey: isUsersLoading,
      valueKey: "allUsers",
      valueColor: "rgb(206, 212, 218)",
      // value: totalUsers,
    },
    {
      bgColor: "linear-gradient(87deg, rgb(245, 54, 92) 0px, rgb(245, 96, 54) 100%)",
      icon: <FaCogs className="text-[#FDD9C7] text-5xl" />,
      title: "Active Users",
      // isLoadingKey: isUsersLoading,
      valueKey: "allUsers",
      valueColor: "rgb(206, 212, 218)",
      // value: totalUsers,
    },
  ];

  return (

      <div className="grid grid-cols-4 gap-5 mb-10">
        {statsData.map(
          (
            { bgColor, icon, title, isLoadingKey, value, valueColor },
            index
          ) => {
            console.log(bgColor)
           return <div
           key={index}
           style={{ background: bgColor, position: "relative", overflow: "hidden" }}
           className="flex justify-between p-3 rounded shadow-md pb-8"
         >
           <div className="text-white">
             <div className="uppercase text-xs mb-2">{title}</div>
             <div className="text-xl font-semibold mb-1">
               {CURRENCY}57412.8
             </div>
             <p className={`text-sm ${valueColor}`}>
               Current compared to last week
             </p>
           </div>
         
           {icon}
         
           {/* Decorative SVG at the bottom */}
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 1440 320"
             className="absolute bottom-0 left-0 w-full opacity-15"
           >
  <path fill="#f3f4f5" fill-opacity="1" d="M0,128L160,160L320,224L480,224L640,96L800,128L960,160L1120,96L1280,128L1440,96L1440,320L1280,320L1120,320L960,320L800,320L640,320L480,320L320,320L160,320L0,320Z"></path>
  </svg>
         </div>
         
          }
        )}
      </div>
  );
};

export default OrderStats;

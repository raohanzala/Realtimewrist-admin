import React from "react";

const StatusLabel = ({ status }) => {
  return (
    <div>
      <span
        className={`py-1 px-2 rounded-sm text-xs font-bold 
${status === "Order Placed" ? "bg-blue-100 text-blue-800" : ""} 
${status === "Packing" ? "bg-yellow-100 text-yellow-800" : ""} 
${status === "Shipped" ? "bg-purple-100 text-purple-800" : ""} 
${status === "Out for Delivery" ? "bg-orange-100 text-orange-800" : ""} 
${status === "Delivered" ? "bg-green-100 text-green-800" : ""}`}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusLabel;

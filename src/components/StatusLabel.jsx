import React from "react";

const StatusLabel = ({ status }) => {
  const statusClasses = {
    "Pending": "bg-gray-200 text-gray-800", // Order placed but not yet confirmed
    "Order Confirmed": "bg-blue-100 text-blue-800", // Payment verified
    "Processing": "bg-yellow-100 text-yellow-800", // Preparing for shipment
    "Out for Delivery": "bg-orange-100 text-orange-800", // Shipped, on the way
    "Delivered": "bg-green-100 text-green-800", // Order successfully received
    "Canceled": "bg-red-100 text-red-800", // Order canceled
  };

  return (
    <div>
      <span className={`py-1 px-2 rounded-sm text-xs font-bold ${statusClasses[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    </div>
  );
};

export default StatusLabel;

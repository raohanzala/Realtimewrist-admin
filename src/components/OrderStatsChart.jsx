import React from "react";
import ReactECharts from "echarts-for-react";
import Box from "./Box";
import { useOrdersDetails } from "../features/useOrdersDetails";
import SpinnerMini from "./SpinnerMini";
import Empty from "./Empty";
import HeadingLink from "./HeadingLink";

const OrderStatsChart = () => {
  const {
    completedOrders,
    pendingOrders,
    canceledOrders,
    totalOrders,
    isPending,
  } = useOrdersDetails();

  const statsData = [
    {
      bgColor: "bg-blue-100",
      title: "Total Orders",
      value: totalOrders,
    },
    {
      bgColor: "bg-red-100",
      title: "Canceled Orders",
      value: canceledOrders,
    },
    {
      bgColor: "bg-green-100",
      title: "Completed Orders",
      value: completedOrders,
    },
    {
      bgColor: "bg-orange-100",
      title: "Processing Orders",
      value: completedOrders,
    },
    {
      bgColor: "bg-yellow-100",
      title: "Pending Orders",
      value: pendingOrders,
    },
  ];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: 0,
    },
    series: [
      {
        name: "Orders",
        type: "pie",
        radius: ["40%", "70%"], // Donut style
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: "{b}: {d}%",
        },
        labelLine: {
          show: true,
        },
        data: statsData?.map((item) => ({
          value: item.value,
          name: item.title,
          itemStyle: { color: getColor(item.bgColor) },
        })),
      },
    ],
  };

  // Function to convert Tailwind classes to HEX codes for ECharts
  function getColor(bgClass) {
    const colors = {
      "bg-blue-100": "#3b82f6", // Blue
      "bg-red-100": "#ef4444", // Red
      "bg-green-100": "#22c55e", // Green
      "bg-orange-100": "#f97316", // Orange
      "bg-yellow-100": "#eab308", // Yellow
    };
    return colors[bgClass] || "#999";
  }

  return (
    <Box>
      {" "}
      {isPending ? (
        <SpinnerMini variant="secondary" />
      ) : statsData?.length > 0 ? (
        <>
          <HeadingLink title="Orders Statistics" />
          <ReactECharts
            option={option}
            style={{ height: "400px", width: "100%" }}
          />
        </>
      ) : (
        <div className="flex flex-1 w-full h-full items-center justify-center">
          {" "}
          <Empty resourceName="recent orders" />
        </div>
      )}{" "}
    </Box>
  );
};

export default OrderStatsChart;

import React from "react";
import ReactECharts from "echarts-for-react";
import Box from "./Box";

const OrderStatsChart = ({ data }) => {
  const option = {
    title: {
      text: "Order Statistics",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
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
        data: data?.map((item) => ({
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

  return <Box> <ReactECharts option={option} style={{ height: "400px", width: "100%" }} /> </Box>;
};

export default OrderStatsChart;

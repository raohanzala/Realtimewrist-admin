import React from "react";
import ReactECharts from "echarts-for-react";
import Box from "./Box";

const OrdersBarChart = ({ statsData }) => {
  const option = {
    title: {
      text: "Order Trends",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: statsData?.map((item) => item.title),
      axisLabel: {
        rotate: 15, // Tilt labels if needed
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Orders",
        type: "bar",
        data: statsData?.map((item) => ({
          value: item.value,
          itemStyle: { color: getColor(item.bgColor) },
        })),
        barWidth: "50%",
        label: {
          show: true,
          position: "top",
          fontSize: 12,
          color: "#555",
        },
      },
    ],
  };

  // Function to convert Tailwind classes to HEX colors
  function getColor(bgClass) {
    const colors = {
      "bg-blue-100": "#3b82f6", // Blue
      "bg-yellow-100": "#eab308", // Yellow
      "bg-green-100": "#22c55e", // Green
      "bg-purple-100": "#9333ea", // Purple
      "bg-red-100": "#ef4444", // Red
    };
    return colors[bgClass] || "#999";
  }

  return <Box> <ReactECharts option={option} style={{ height: "400px", width: "100%" }} /> </Box>;
};

export default OrdersBarChart;

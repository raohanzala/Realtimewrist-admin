import React from "react";
import ReactECharts from "echarts-for-react";
import Box from "./Box";
import { useOrdersDetails } from "../features/useOrdersDetails";
import SpinnerMini from "./SpinnerMini";
import Empty from "./Empty";
import HeadingLink from "./HeadingLink";

const OrdersBarChart = () => {
  const {
    isPending,
    todayOrdersValue,
    yesterdayOrdersValue,
    thisMonthOrdersValue,
    lastMonthOrdersValue,
    allTimeSalesValue,
  } = useOrdersDetails();

  const statsData = [
    {
      bgColor: "bg-blue-100",
      title: "Today Orders",
      value: todayOrdersValue,
    },
    {
      bgColor: "bg-yellow-100",
      title: "Yesterday Orders",
      value: yesterdayOrdersValue,
    },
    {
      bgColor: "bg-green-100",
      title: "This Month",
      value: thisMonthOrdersValue,
    },
    {
      bgColor: "bg-purple-100",
      title: "Last Month",
      value: lastMonthOrdersValue,
    },
    {
      bgColor: "bg-red-100",
      title: "All-Time Sales",
      value: allTimeSalesValue,
    },
  ];

  const option = {
    // title: {
    //   text: "Order Trends",
    //   left: "left",
    //   textStyle: {
    //     fontSize: '20px',
    //     fontWeight: 600,
    //   },
    // },
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

  return (
    <Box>
      {" "}
      {isPending ? (
        <SpinnerMini variant="secondary" />
      ) : statsData?.length > 0 ? (
        <>
          <HeadingLink title="Orders trends" />
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

export default OrdersBarChart;

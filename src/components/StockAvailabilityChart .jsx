import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import Box from "./Box";
import SpinnerMini from "./SpinnerMini";
import Empty from "./Empty";
import { useProductsDetials } from "../features/useProductsDetials";

const StockAvailabilityChart = () => {
  const { availabilityStatus, isPending } = useProductsDetials();

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Extracting data
      const chartData = availabilityStatus?.map((item) => ({
        name: item._id,
        value: item.count,
      }));

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          data: chartData?.map((item) => item.name),
        },
        series: [
          {
            name: "Stock",
            type: "pie",
            radius: "50%",
            data: chartData,
            label: {
              show: true,
              formatter: "{b}: {c} ({d}%)",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            itemStyle: {
              color: (params) => {
                return params.name === "In stock" ? "#28a745" : "#dc3545";
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [availabilityStatus]);

  return (
    <Box>
      {isPending ? (
        <SpinnerMini variant="secondary" />
      ) : availabilityStatus?.length > 0 ? (
        <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>
      ) : (
        <div className="flex flex-1 w-full h-full items-center justify-center">
          {" "}
          <Empty resourceName="recent orders" />
        </div>
      )}
    </Box>
  );
};

export default StockAvailabilityChart;

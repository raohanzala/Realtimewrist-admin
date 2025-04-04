import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import Box from "./Box";
import { useProductsDetials } from "../features/useProductsDetials";
import SpinnerMini from "./SpinnerMini";
import Empty from "./Empty";

const ProductPriceChart = () => {
  const chartRef = useRef(null);

  const { bestSellers, isPending } = useProductsDetials();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Prepare the data
      const productNames = bestSellers?.map((item) => item.name);
      const oldPrices = bestSellers?.map((item) => item.oldPrice);
      const newPrices = bestSellers?.map((item) => item.newPrice);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            return `${params[0].name}<br/>Old Price: ${params[0].value} | New Price: ${params[1].value}`;
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          type: "category",
          data: productNames,
          axisLabel: {
            rotate: 45,
            interval: 0,
          },
          axisPointer: {
            type: "shadow",
          },
        },
        yAxis: {
          type: "value",
          name: "Price (in Rs.)",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "Old Price",
            type: "bar",
            data: oldPrices,
            itemStyle: {
              color: "#ff6f61",
            },
            tooltip: {
              valueFormatter: function (value) {
                return "₹" + value;
              },
            },
          },
          {
            name: "New Price",
            type: "bar",
            data: newPrices,
            itemStyle: {
              color: "#82ca9d",
            },
            tooltip: {
              valueFormatter: function (value) {
                return "₹" + value;
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose(); // Cleanup when the component is unmounted
      };
    }
  }, [bestSellers]);

  return (
    <Box>
      {isPending ? (
        <SpinnerMini variant="secondary" />
      ) : bestSellers?.length > 0 ? (
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

export default ProductPriceChart;

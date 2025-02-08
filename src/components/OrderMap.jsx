import React, { useEffect, useState } from "react";
// import ReactECharts from "echarts-for-react";
// import "echarts/map/js/world"; // Load world map
// import "echarts/map/js/pakistan"; // Load Pakistan map

const OrderMap = ({ orders }) => {
  const [option, setOption] = useState(null);

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const geoCoordMap = {
      Karachi: [67.0011, 24.8607],
      Lahore: [74.3436, 31.5497],
      Islamabad: [73.0479, 33.6844],
      Peshawar: [71.5249, 34.0151],
      Multan: [71.5249, 30.1575],
      Quetta: [66.9905, 30.1798],
      Faisalabad: [73.0741, 31.4504],
    };

    const data = orders.map((order) => ({
      name: order.city,
      value: [...geoCoordMap[order.city], order.count || 1], // [longitude, latitude, size]
    }));

    setOption({
      title: {
        text: "Orders by City",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      geo: {
        map: "pakistan",
        roam: true,
        label: {
          show: true,
          color: "#fff",
        },
        emphasis: {
          label: {
            show: true,
            color: "#f90",
          },
        },
      },
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          data: data,
          symbolSize: (val) => val[2] * 5, // Increase size based on order count
          itemStyle: {
            color: "red",
          },
        },
      ],
    });
  }, [orders]);

  return (
    <div className="w-full h-[400px]">
      {option ? null : ''}
    {/* //   <ReactECharts option={option} style={{ height: "100%" }} /> : <p>Loading Map...</p> */}
    </div>
  );
};

export default OrderMap;

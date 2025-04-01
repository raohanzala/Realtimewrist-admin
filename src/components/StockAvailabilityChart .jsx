import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Box from './Box';

const StockAvailabilityChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Extracting data
      const chartData = data?.map(item => ({
        name: item._id,
        value: item.count
      }));

      const option = {
        title: {
          text: 'Stock Availability',
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          bottom: 0,
          data: chartData?.map(item => item.name),
        },
        series: [
          {
            name: 'Stock',
            type: 'pie',
            radius: '50%',
            data: chartData,
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              color: (params) => {
                return params.name === 'In stock' ? '#28a745' : '#dc3545';
              }
            }
          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return <Box>
    <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
  </Box>
};

export default StockAvailabilityChart;

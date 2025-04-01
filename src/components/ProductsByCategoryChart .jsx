import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Box from './Box';

const ProductsByCategoryChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Prepare the data
      const categories = data?.map(item => `Category ${item._id.slice(0, 6)}`); // Using part of _id for categories
      const totalProducts = data?.map(item => item.totalProducts);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: function (params) {
            return `${params[0].name}<br/>Total Products: ${params[0].value}`;
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            rotate: 45,
            interval: 0,
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Total Products',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'Total Products',
            type: 'bar',
            data: totalProducts,
            itemStyle: {
              color: '#82ca9d'
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' products';
              }
            }
          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose(); // Cleanup when the component is unmounted
      };
    }
  }, [data]);

  return (
    <Box>

      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
    </Box>
  );
};

export default ProductsByCategoryChart;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Box from './Box';

const UsersByMonthChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Prepare the data
      const months = data?.map(item => `${item._id.month} - ${item._id.year}`);
      const totalUsers = data?.map(item => item.totalUsers);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function (params) {
            const { value } = params[0];
            return `Users: ${value}`;
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
        legend: {
          data: ['Total Users'],
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: {
            rotate: 45,
            interval: 0
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Users',
          min: 0,
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'Total Users',
            type: 'line',
            data: totalUsers,
            smooth: true, // Smooth line curve
            lineStyle: {
              width: 3,
              color: '#82ca9d'
            },
            itemStyle: {
              color: '#82ca9d',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            areaStyle: {
              color: 'rgba(130, 202, 157, 0.4)'
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

export default UsersByMonthChart;

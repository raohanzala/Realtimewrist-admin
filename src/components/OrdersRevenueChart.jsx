import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Box from './Box';

const OrdersRevenueChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Extracting data
      const days = data?.map(item => `Day ${item._id.day}`);
      const totalOrders = data?.map(item => item.totalOrders);
      const totalRevenue = data?.map(item => item.totalRevenue);

      const option = {
        title: {
          text: 'Orders & Revenue Trend',
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: (params) => {
            let tooltip = `${params[0].name}<br/>`;
            params.forEach(param => {
              tooltip += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
            });
            return tooltip;
          }
        },
        legend: {
          data: ['Total Orders', 'Total Revenue'],
          bottom: 0
        },
        xAxis: {
          type: 'category',
          data: days,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Total Orders',
            position: 'left',
            minInterval: 1
          },
          {
            type: 'value',
            name: 'Total Revenue (Rs.)',
            position: 'right',
            axisLabel: {
              formatter: 'Rs. {value}'
            }
          }
        ],
        series: [
          {
            name: 'Total Orders',
            type: 'bar',
            data: totalOrders,
            itemStyle: {
              color: '#007BFF'
            }
          },
          {
            name: 'Total Revenue',
            type: 'line',
            yAxisIndex: 1,
            data: totalRevenue,
            itemStyle: {
              color: '#FF5733'
            },
            smooth: true
          }
        ]
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return <Box> <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div> </Box>;
};

export default OrdersRevenueChart;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Box from './Box';

const OrdersRevenueChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Prepare the data
      const days = data?.map(item => `Day ${item._id.day}`);
      const totalOrders = data?.map(item => item.totalOrders);
      const totalRevenue = data?.map(item => item.totalRevenue);

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
            const orders = params[0].value;
            const revenue = params[1].value;
            return `Orders: ${orders}<br/>Revenue: ${revenue}`;
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
          data: ['Total Orders', 'Total Revenue'],
          textStyle: {
            color: '#333'
          }
        },
        xAxis: {
          type: 'category',
          data: days,
          axisLabel: {
            rotate: 45,
            interval: 0
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Total Orders',
            min: 0,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'Revenue',
            min: 0,
            axisLabel: {
              formatter: '${value}'
            }
          }
        ],
        series: [
          {
            name: 'Total Orders',
            type: 'bar',
            data: totalOrders,
            itemStyle: {
              color: '#82ca9d'
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' Orders';
              }
            }
          },
          {
            name: 'Total Revenue',
            type: 'line',
            yAxisIndex: 1,
            data: totalRevenue,
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#ff7300'
            },
            itemStyle: {
              color: '#ff7300',
              borderColor: '#ffffff',
              borderWidth: 2
            },
            tooltip: {
              valueFormatter: function (value) {
                return '$' + value.toLocaleString();
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

export default OrdersRevenueChart;

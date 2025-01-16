import Box from './Box'
import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import { useOrders } from '../features/useOrders';
import { useProducts } from '../features/useProducts';
import { useUsers } from '../features/useUsers';
import SpinnerMini from './SpinnerMini';


const Chart = () => {
const { isLoading: isOrdersLoading, totalOrders, totalRevenue } = useOrders();
const { isLoading: isProductLoading, totalProducts } = useProducts();
const { isLoading: isUsersLoading, totalUsers } = useUsers();

// Prepare data for charts
const chartData = [
  { name: 'Total', Orders: totalOrders, Products: totalProducts, Users: totalUsers },
];

const revenueData = [
{ name: 'Revenue', value: totalRevenue },
];

// Pie chart colors
const pieColors = ['#8884d8', '#82ca9d', '#ffc658'];
  return (
    <Box className='pt-6'>
        {/* <h3 className="text-xl font-semibold mb-4">Total Overview</h3> */}
  {/* {(isOrdersLoading ||isProductLoading ||  isUsersLoading) ? <SpinnerMini/> :
   <ResponsiveContainer width="100%" height={300}>
  <BarChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Orders" fill="#82ca9d" />
    <Bar dataKey="Products" fill="#8884d8" />
    <Bar dataKey="Users" fill="#ffc658" />
  </BarChart>
</ResponsiveContainer>} */}

      {/* Pie Chart Section */}
      {/* <div className="w-full md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={revenueData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div> */}
        </Box>
  )
}

export default Chart
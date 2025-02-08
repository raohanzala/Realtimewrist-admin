import Box from './Box'
import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import { useOrders } from '../features/useOrders';
import { useProducts } from '../features/useProducts';
import { useUsers } from '../features/useUsers';
import SpinnerMini from './SpinnerMini';
import HeadingLink from './HeadingLink';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const Chart = ({userGrowth}) => {
const { isLoading: isOrdersLoading, totalOrders, totalRevenue } = useOrders();
const { isLoading: isProductLoading, totalProducts } = useProducts();
const { isLoading: isUsersLoading, totalUsers } = useUsers();

  return (
    <Box>
      <HeadingLink title='User Growth Over Time' />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
  )
}

export default Chart
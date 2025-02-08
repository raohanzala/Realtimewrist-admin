import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts';

const OrderDashboard = () => {
  const totalOrders = 80;
  const totalRevenue = 167827;
  const completedOrders = 7;
  const averageOrderValue = 2097.8375;
  const pendingOrders = 0;
  const canceledOrders = 1;

  const topProducts = [
    { _id: "Rolex Yatch master ", totalSales: 53 },
    { _id: "Universe Point Nautilus", totalSales: 21 },
    { _id: "Universe Point", totalSales: 8 },
    { _id: "Low weight ", totalSales: 6 },
    { _id: "Heavy weight", totalSales: 5 }
  ];

  const dailyOrders = [
    { _id: { day: 17, year: 2025 }, totalOrders: 4, totalRevenue: 800 },
    { _id: { day: null, year: null }, totalOrders: 76, totalRevenue: 167027 }
  ];

  const repeatCustomers = [
    { totalRepeatCustomers: 1, customers: [null] }
  ];

  const averageCompletionTime = [
    { _id: null, avgTime: 331574887 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Total Orders and Revenue */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Total Orders</h4>
            <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Total Revenue</h4>
            <p className="text-3xl font-bold text-gray-800">${totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Orders Status */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Completed Orders</h4>
            <p className="text-2xl font-bold text-gray-800">{completedOrders}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Pending Orders</h4>
            <p className="text-2xl font-bold text-gray-800">{pendingOrders}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800">Canceled Orders</h4>
            <p className="text-2xl font-bold text-gray-800">{canceledOrders}</p>
          </div>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Order Value</h3>
        <div className="text-3xl font-bold text-gray-800">${averageOrderValue.toFixed(2)}</div>
      </div>

      {/* Top Products */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Products by Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar dataKey="totalSales" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Orders */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Orders Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.day" />
            <YAxis />
            <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
            <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Repeat Customers */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Repeat Customers</h3>
        <div className="text-xl font-bold text-gray-800">{repeatCustomers[0].totalRepeatCustomers}</div>
      </div>

      {/* Average Completion Time */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Order Completion Time</h3>
        <div className="text-xl font-bold text-gray-800">
          {averageCompletionTime[0].avgTime} ms
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;

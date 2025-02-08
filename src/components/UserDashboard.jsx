import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const userGrowth = [
    {
      "_id": {
        "year": 2025,
        "month": 1
      },
      "totalUsers": 17
    },
    {
      "_id": {
        "year": 2024,
        "month": 12
      },
      "totalUsers": 2
    },
    {
      "_id": {
        "year": 2024,
        "month": 9
      },
      "totalUsers": 1
    },
    {
      "_id": {
        "year": 2024,
        "month": 8
      },
      "totalUsers": 5
    },
    {
      "_id": {
        "year": null,
        "month": null
      },
      "totalUsers": 10
    }
  ];

  const topCartUsers = [
    {
      "_id": "66d17f4fa7f87bbc04dd7a67",
      "name": "Hanzala",
      "cartSize": 300
    },
    {
      "_id": "66d17f95a7f87bbc04dd7a6c",
      "name": "asheel",
      "cartSize": 300
    },
    {
      "_id": "66d16f683d74c6e2462fbdef",
      "name": "chek user",
      "cartSize": 300
    },
    {
      "_id": "66d16d4c035a0b4153b1feb1",
      "name": "cheking user",
      "cartSize": 300
    },
    {
      "_id": "66d16f2e3d74c6e2462fbdea",
      "name": "chek user",
      "cartSize": 300
    }
  ];

  const averageCartSize = 51.77;

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* User Growth Chart */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">User Growth Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Average Cart Size */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Cart Size</h3>
        <div className="text-3xl font-bold text-gray-800">{averageCartSize.toFixed(2)}</div>
      </div>

      {/* Top Cart Users */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Cart Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCartUsers} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" />
            <Bar dataKey="cartSize" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboard;

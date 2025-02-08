import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Box from "../components/Box";
import Loader from "../components/Loader";
import RecentOrder from "../components/RecentOrder";
import LatestCustomers from "../components/LatestCustomers";
import TopProducts from "../components/TopProducts";
import DashboardStats from "../components/DashboardStats";
import Chart from "../components/Chart";
import DashboardTopStats from "../components/DashboardTopStats";
import UserDashboard from "../components/UserDashboard";
import ProductDashboard from "../components/ProductDashboard";
import OrderDashboard from "../components/OrderDashboard";
import OrderStats from "../components/OrderStats";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import HeadingLink from "../components/HeadingLink";
import { useOrdersDetails } from "../features/useOrdersDetails";
import { useProductsDetials } from "../features/useProductsDetials";
import { useUsersDetails } from "../features/useUsersDetails";
import DashboardStats2 from "../components/DashboardStats2";
import SpinnerMini from "../components/SpinnerMini";
import Empty from "../components/Empty";
import OrderMap from "../components/OrderMap";
import LiveVisitors from "../components/LiveVisitors";

const Dashboard = () => {
  const { setPageTitle } = useContext(ShopContext);
  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  const {
    totalRevenue,
    totalRevenueAmount,
    completedOrders,
    averageOrderValue,
    pendingOrders,
    canceledOrders,
    topProducts,
    totalOrders,
    dailyOrders,
    repeatCustomers,
    averageCompletionTime,
  } = useOrdersDetails();

  const {
    totalProducts,
    productsByCategory,
    bestSellers,
    averagePrice,
    availabilityStatus,
    recentProducts,
    priceRange,
    productsBySubCategory,
  } = useProductsDetials();

  const { totalUsers, topCartUsers, averageCartSize, userGrowth, isLoading } =
    useUsersDetails();


    console.log('averageOrderValue', averageOrderValue, 'canceledOrders', canceledOrders, 'completedOrders', completedOrders, 'pendingOrders', pendingOrders, 'totalOrders', totalOrders , 'totalRevenue', totalRevenue)

  return (
    <div>
        <DashboardStats2/>
        <LiveVisitors/>
        <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Chart userGrowth={userGrowth} />
        <TopProducts />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">
        <RecentOrder />
        {/* <LatestCustomers />
         */}
         {/* <OrderMap/> */}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">
        <Box>
        <div className='min-h-64 flex flex-col'>
          <HeadingLink title="User Growth Over Time" />
          {isLoading ? <SpinnerMini variant='secondary'/> : userGrowth?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>: <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
            </div>
        </Box>

        <Box>
        <div className='min-h-64 flex flex-col'>

          <HeadingLink title="Product Availability" />
          {isLoading ? <SpinnerMini variant='secondary'/> : availabilityStatus?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={availabilityStatus}
                dataKey="count"
                nameKey="_id"
                outerRadius={120}
                fill="#8884d8"
                label
                />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer> : <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
                </div>
        </Box>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-6 mb-6">
        <Box>
        <div className='min-h-64 flex flex-col'>

          <HeadingLink title="Products by Subcategory" />
          {isLoading ? <SpinnerMini variant='secondary'/> : productsBySubCategory?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productsBySubCategory}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Bar dataKey="totalProducts" fill="#82ca9d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>: <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
            </div>
        </Box>
        <Box>
        <div className='min-h-64 flex flex-col'>

          <HeadingLink title="Top Products by Sales" />
          {isLoading ? <SpinnerMini variant='secondary'/> : productsBySubCategory?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Bar dataKey="totalSales" fill="#82ca9d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>: <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
            </div>
        </Box>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Box>
        <div className='min-h-64 flex flex-col'>

          <HeadingLink title="Daily Orders Overview" />
          {isLoading ? <SpinnerMini variant='secondary'/> : productsBySubCategory?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.day" />
              <YAxis />
              <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" />
              <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>: <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
            </div>
        </Box>
        <Box>
        <div className='min-h-64 flex flex-col'>

          <HeadingLink title="Products by Category" />
          {isLoading ? <SpinnerMini variant='secondary'/> : productsBySubCategory?.length > 0 ?
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productsByCategory}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Bar dataKey="totalProducts" fill="#82ca9d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>: <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='User Growth'/></div>}
            </div>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;

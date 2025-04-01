import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import RecentOrder from "../components/RecentOrder";
import TopProducts from "../components/TopProducts";
import DashboardStats from "../components/DashboardStats";
import { useOrdersDetails } from "../features/useOrdersDetails";
import { useProductsDetials } from "../features/useProductsDetials";
import { useUsersDetails } from "../features/useUsersDetails";
import DashboardStats2 from "../components/DashboardStats2";
import SpinnerMini from "../components/SpinnerMini";
import LiveVisitors from "../components/LiveVisitors";
import UsersByMonthChart from "../components/UsersByMonthChart ";
import OrdersRevenueChart from "../components/OrdersRevenueChart ";
import ProductPriceChart from "../components/ProductPriceChart";
import StockAvailabilityChart from "../components/StockAvailabilityChart ";
import OrderStatsChart from "../components/OrderStatsChart";
import { IoBagCheckOutline, IoBarChartOutline, IoCalendarOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoTimeOutline, IoTrendingUpOutline, IoWalletOutline } from "react-icons/io5";
import { RiOrderPlayLine } from "react-icons/ri";
import { useOrders } from "../features/useOrders";
import { useProducts } from "../features/useProducts";
import { useUsers } from "../features/useUsers";
import OrdersBarChart from "../components/OrdersBarChart";

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

  const { isLoading: isOrdersLoading } = useOrders()
  const { isLoading: isProductLoading } = useProducts()
  const { isLoading: isUsersLoading } = useUsers()
  const statsData = [
    {
      bgColor: 'bg-blue-100',
      icon: <IoBagCheckOutline className="text-blue-700 text-4xl" />, // Blue for total orders
      title: 'Total Orders',
      isLoadingKey: isUsersLoading,
      valueKey: 'orders',
      valueColor: 'text-blue-700',
      value: totalOrders
    },
    {
      bgColor: 'bg-red-100',
      icon: <IoCloseCircleOutline className="text-red-600 text-4xl" />, // Red for canceled orders
      title: 'Canceled Orders',
      isLoadingKey: isOrdersLoading,
      valueKey: 'totalRevenue',
      valueColor: 'text-red-600',
      value: canceledOrders
    },
    {
      bgColor: 'bg-green-100',
      icon: <IoCheckmarkCircleOutline className="text-green-600 text-4xl" />, // Green for completed orders
      title: 'Completed Orders',
      isLoadingKey: isProductLoading,
      valueKey: 'allProducts',
      valueColor: 'text-green-600',
      value: completedOrders
    },
    {
      bgColor: 'bg-orange-100',
      icon: <RiOrderPlayLine className="text-orange-600 text-4xl" />, // Green for completed orders
      title: 'Processing Orders',
      isLoadingKey: isProductLoading,
      valueKey: 'allProducts',
      valueColor: 'text-orange-600',
      value: completedOrders
    },
    {
      bgColor: 'bg-yellow-100',
      icon: <IoTimeOutline className="text-yellow-500 text-4xl" />, // Yellow for pending orders
      title: 'Pending Orders',
      isLoadingKey: isUsersLoading,
      valueKey: 'allUsers',
      valueColor: 'text-yellow-500',
      value: pendingOrders
    }
  ];


  const {
    isPending,
    todayOrdersValue,
    yesterdayOrdersValue,
    thisMonthOrdersValue,
    lastMonthOrdersValue,
    allTimeSalesValue,
  } = useOrdersDetails();

  const statsData2 = [
    {
      bgColor: 'bg-blue-100',
      iconBg: 'bg-blue-700', // Slightly darker shade for contrast
      icon: <IoBagCheckOutline className="text-white text-4xl" />, // Icon for orders
      title: 'Today Orders',
      value: todayOrdersValue,
      valueColor: 'text-blue-700',
    },
    {
      bgColor: 'bg-yellow-100',
      iconBg: 'bg-yellow-600',
      icon: <IoCalendarOutline className="text-white text-4xl" />, // Icon for yesterday (calendar)
      title: 'Yesterday Orders',
      value: yesterdayOrdersValue,
      valueColor: 'text-yellow-600',
    },
    {
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-600',
      icon: <IoTrendingUpOutline className="text-white text-4xl" />, // Icon for revenue (upward trend)
      title: 'This Month',
      value: thisMonthOrdersValue,
      valueColor: 'text-green-600',
    },
    {
      bgColor: 'bg-purple-100',
      iconBg: 'bg-purple-600',
      icon: <IoBarChartOutline className="text-white text-4xl" />, // Icon for last month's performance (bar chart)
      title: 'Last Month',
      value: lastMonthOrdersValue,
      valueColor: 'text-purple-600',
    },
    {
      bgColor: 'bg-red-100',
      iconBg: 'bg-red-600',
      icon: <IoWalletOutline className="text-white text-4xl" />, // Icon for all-time sales (wallet or earnings)
      title: 'All-Time Sales',
      value: allTimeSalesValue,
      valueColor: 'text-red-600',
    },
  ];

  console.log('averageOrderValue', averageOrderValue, 'canceledOrders', canceledOrders, 'completedOrders', completedOrders, 'pendingOrders', pendingOrders, 'totalOrders', totalOrders, 'totalRevenue', totalRevenue)

  return (
    <div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"> */}
      <LiveVisitors />
      <DashboardStats2 />
      <DashboardStats />
      {/* <div className="grid grid-cols-[1.5fr_1fr] gap-6 mb-6">

        <OrdersBarChart statsData={statsData2} />
        <OrderStatsChart data={statsData} />
      </div> */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-6 mb-6">
        <StockAvailabilityChart data={availabilityStatus} />
        <OrdersRevenueChart data={dailyOrders} />
      </div>
      <div className="grid grid-cols-[1.5fr_1fr] gap-6 mb-6">
        <RecentOrder />
        <UsersByMonthChart data={userGrowth} />
      </div>
      {/* <ProductsByCategoryChart data={productsByCategory} /> */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-6">
        <TopProducts />
        <ProductPriceChart data={bestSellers} />
      </div>
    </div >
  );

};

export default Dashboard;

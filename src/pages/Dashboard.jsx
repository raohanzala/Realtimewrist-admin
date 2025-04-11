import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import RecentOrder from "../components/RecentOrder";
import TopProducts from "../components/TopProducts";
import DashboardStats from "../components/DashboardStats";
import DashboardStats2 from "../components/DashboardStats2";
import LiveVisitors from "../components/LiveVisitors";
import UsersByMonthChart from "../components/UsersByMonthChart ";
import OrdersRevenueChart from "../components/OrdersRevenueChart ";
import ProductPriceChart from "../components/ProductPriceChart";
import StockAvailabilityChart from "../components/StockAvailabilityChart ";
import OrdersBarChart from "../components/OrdersBarChart";
import TopOrderCities from "../components/TopOrderCities";

const Dashboard = () => {
  const { setPageTitle } = useContext(ShopContext);
  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div>
      <LiveVisitors />
      <DashboardStats2 />
      <DashboardStats />
      <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-6">
        <OrdersBarChart />
        <TopOrderCities />
      </div>
      <div className="grid grid-cols-[1fr_1.5fr] gap-3 mb-6">
      </div>
      <div className="grid grid-cols-[1fr_1.5fr] gap-3 mb-6">
        <StockAvailabilityChart />
        <OrdersRevenueChart />
      </div>
      <div className="grid grid-cols-[1.5fr_1fr] gap-3 mb-6">
        <RecentOrder />
        <UsersByMonthChart />
      </div>
      <div className="grid grid-cols-[1fr_1.5fr] gap-3">
        <TopProducts />
        <ProductPriceChart />
      </div>
    </div >
  );

};

export default Dashboard;

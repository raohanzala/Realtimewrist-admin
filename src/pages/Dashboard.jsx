import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Box from "../components/Box";
import Loader from "../components/Loader";
import RecentOrder from "../components/RecentOrder";
import LatestCustomers from "../components/LatestCustomers";
import TopProducts from "../components/TopProducts";
import DashboardStats from "../components/DashboardStats";
import Chart from "../components/Chart";

const Dashboard = () => {
  const { setPageTitle, isLoading } = useContext(ShopContext);
  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* {isLoading && <Loader type='full' />} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <DashboardStats />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Chart/>
          <TopProducts />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">
          <RecentOrder />
          <LatestCustomers />
      </div>
    </div>
  );
};

export default Dashboard;

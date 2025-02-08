import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useOrdersDetails() {
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/order/ordersDetails`,);
      return data
    },
  });

  const { totalOrders,
    totalRevenue,
    totalRevenueAmount,
    completedOrders,
    averageOrderValue,
    pendingOrders,
    canceledOrders,
    topProducts,
    dailyOrders,
    repeatCustomers,
    averageCompletionTime, todayOrdersValue,
    yesterdayOrdersValue,
    thisMonthOrdersValue,
    lastMonthOrdersValue,
    allTimeSalesValue, } = data || {}

  return {
    isPending, error, totalOrders,
    totalRevenue,
    totalRevenueAmount,
    completedOrders,
    averageOrderValue,
    pendingOrders,
    canceledOrders,
    topProducts,
    dailyOrders,
    repeatCustomers,
    averageCompletionTime, todayOrdersValue,
    yesterdayOrdersValue,
    thisMonthOrdersValue,
    lastMonthOrdersValue,
    allTimeSalesValue,
  };
}
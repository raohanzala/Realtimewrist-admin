import { useQuery } from "@tanstack/react-query";
import { getOrdersDetailsApi } from "../api/apiOrders";

export function useOrdersDetails() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersDetailsApi,
  });

  const {totalOrders,
    totalRevenue,
    totalRevenueAmount,
    completedOrders,
    averageOrderValue,
    pendingOrders,
    canceledOrders,
    topProducts,
    dailyOrders,
    repeatCustomers,
    averageCompletionTime} = data || {}

  return { isLoading, error, totalOrders,
    totalRevenue,
    totalRevenueAmount,
    completedOrders,
    averageOrderValue,
    pendingOrders,
    canceledOrders,
    topProducts,
    dailyOrders,
    repeatCustomers,
    averageCompletionTime};
}
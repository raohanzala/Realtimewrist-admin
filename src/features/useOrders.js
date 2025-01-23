import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api-test/axiosInstance";
import { PAGE_SIZE } from "../utils/constants";

export function useOrders() {

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageSize = PAGE_SIZE

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/order/orders?page=${page}&pageSize=${pageSize}`);
      return data
    },
  });

  const { orders, currentPage, totalPages, totalOrders, totalRevenue } = data || {};

  return { isLoading, orders, currentPage, totalPages, totalOrders, error, totalRevenue };
}


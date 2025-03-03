import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "../api-test/axiosInstance";

export function useOrders() {

  const [searchParams] = useSearchParams();
  
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageSize = PAGE_SIZE
  const search = searchParams.get("search") || "";
  const sortField = searchParams.get("sortBy") || "date";
  const sortOrder = "desc"; // or use a query parameter for dynamic sorting
  const filterBy = searchParams.get("filterBy") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const status = searchParams.get("status") || "";


  const { isPending, data, error } = useQuery({
    queryKey: ["orders", page, search,
      sortField,
      sortOrder,
      filterBy,
      startDate, 
      endDate, 
      status],
    queryFn: async ()=> {
      const {data} = await axiosInstance.get(`/order/orders?page=${page}&pageSize=${pageSize}`, {
        params: {
          page,
          pageSize,
          search,
          sortField,
          sortOrder,
          filterBy,
          startDate, 
          endDate, 
          status,
        },
      });
    return data
    },
  });

  const { orders, currentPage, totalPages, totalOrders, totalRevenue } = data || {};
  console.log(data, 'RODER')

  return { isPending, orders, currentPage, totalPages, totalOrders, error, totalRevenue };
}


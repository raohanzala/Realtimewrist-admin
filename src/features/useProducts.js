import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "../api-test/axiosInstance";

export function useProducts() {

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageSize = PAGE_SIZE;
  const sortBy = searchParams.get("sortBy") || "price-high-to-low";
  const filterBy = searchParams.get("filterBy") || "";
  const search = searchParams.get("search") || "";


  const { isLoading, error, data } = useQuery({
    queryKey: ["products", page, pageSize, sortBy, filterBy, search, true],
    queryFn: async()=> { 
      const {data} = await axiosInstance.get(
        `/product/products`, {
          params: { page, pageSize, sortBy, filterBy, search, isAdmin: true },
        }
      );
      return data;
    },
    keepPreviousData: true,
  });

  const { products, currentPage, totalPages, totalProducts } = data || {};

  return { isLoading,error, products, currentPage, totalPages, totalProducts};
}

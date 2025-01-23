import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api-test/axiosInstance";

export function useProducts() {

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: async (page, pageSize) => {
      const { data } = await axiosInstance.get(
        `/product/products?page=${page}&pageSize=${pageSize}`
      );
      return data;
    },
  });

  const { products, currentPage, totalPages, totalProducts } = data || {};

  return { isLoading, error, products, currentPage, totalPages, totalProducts };
}

import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: ()=> getProductsApi(page),
  });

  const { products, currentPage, totalPages, totalProducts } = data || {};

  return { isLoading,error, products, currentPage, totalPages, totalProducts};
}

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductApi } from "../api/apiProducts";

export function useProduct() {
  const { productId } = useParams();

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductApi(productId),
    retry: false,
  });

  const { product } = data || {}

  return { isLoading, error, product };
}
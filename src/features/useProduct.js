import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../api-test/axiosInstance";

export function useProduct() {
  const { productId } = useParams();

  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/product/single/${productId}`
      );
      return data;
    },
    retry: false,
  });

  const { product } = data || {}

  return { isPending, error, product };
}
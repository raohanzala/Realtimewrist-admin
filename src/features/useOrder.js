import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../api-test/axiosInstance";

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/order/singleOrder/${orderId}`);
      return data
    },
    retry: false,

  });

  return { isLoading, error, order };
}
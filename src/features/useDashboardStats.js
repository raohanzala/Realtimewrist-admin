import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useDashboardStats() {

  const { isLoading, error, data } = useQuery({
    // queryKey: ["socialLinks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/product/stats`);
      return data
    },
  });

  console.log(data, 'stats')
  return { isLoading, error, data };
}
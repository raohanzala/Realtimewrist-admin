import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useSocialLinks() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/customize/social-links`);
      return data
    },
  });

  console.log(data, 'SOCIALLINKS')
  return { isLoading, error, data };
}
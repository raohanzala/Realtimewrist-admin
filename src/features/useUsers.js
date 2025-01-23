import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useUsers() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/user/users`);
      return data
    },
  });

  const { totalUsers, users } = data || {}

  return { isLoading, error, users, totalUsers };
}
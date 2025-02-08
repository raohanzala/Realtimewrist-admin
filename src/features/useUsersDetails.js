import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useUsersDetails() {
  const { isLoading, error, data } = useQuery({
    // queryKey: ["users"],
    queryFn: async ()=> {
      const {data} = await axiosInstance.get(`/user/user-details`);
          return data
    },

  });
  const {totalUsers,
    topCartUsers,
    averageCartSize,
    userGrowth,} = data ||{}

  return { isLoading, error, totalUsers,
    topCartUsers,
    averageCartSize,
    userGrowth,};
}
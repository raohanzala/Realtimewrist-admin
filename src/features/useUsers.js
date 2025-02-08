import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";
import { useSearchParams } from "react-router-dom";

export function useUsers() {

  const [searchParams] = useSearchParams();


  const sortBy = searchParams.get("sortBy") || "price-high-to-low";
  const filterBy = searchParams.get("filterBy") || "";
  const search = searchParams.get("search") || "";


  const { isLoading, error, data } = useQuery({
    queryKey: ["users", sortBy, filterBy, search],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/user/users`, {
        params: { sortBy, filterBy, search },
      });
      return data
    },
    keepPreviousData: true,
  });

  const { totalUsers, users } = data || {}

  return { isLoading, error, users, totalUsers };
}
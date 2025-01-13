import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/apiUsers";

export function useUsers() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });

  const {totalUsers, users} = data || {}

  return { isLoading, error, users,totalUsers};
}
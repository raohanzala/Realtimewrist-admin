import { useQuery } from "@tanstack/react-query";
import { getOrdersApi } from "../api/apiOrders";
import { useSearchParams } from "react-router-dom";

export function useOrders() {

  const [searchParams] = useSearchParams();
  
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", page],
    queryFn: ()=> getOrdersApi(page),
  });

  return { isLoading, data, error, };
}
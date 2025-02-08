import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "../api-test/axiosInstance";

export function useCategories() {
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageSize = PAGE_SIZE;
  const sortBy = searchParams.get("sortBy") || "name-asc"; // Default sort by name A-Z
  const search = searchParams.get("search") || "";

  const { isLoading, error, data } = useQuery({
    queryKey: ["categories", page, pageSize, sortBy, search],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/category", {
        params: { page, pageSize, sortBy, search },
      });
      return data;
    },
    keepPreviousData: true,
  });

  const { categories, currentPage, totalPages, totalCategories } = data || {};

  return { isLoading, error, categories, currentPage, totalPages, totalCategories };
}

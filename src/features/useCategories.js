import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "../api-test/axiosInstance";
import { useEffect } from "react";

export function useCategories(isAll = false) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = isAll ? 1 : (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const pageSize = isAll ? 20 : PAGE_SIZE; // Undefined is ignored in axios params
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const search = searchParams.get("search") || "";

  const { isPending, error, data } = useQuery({
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

  // ✅ Prefetch next page (only if not fetching all)
  useEffect(() => {
    if (isAll) return;

    const nextPage = page + 1;
    if (nextPage <= (totalPages || 0)) {
      queryClient.prefetchQuery({
        queryKey: ["categories", nextPage, pageSize, sortBy, search],
        queryFn: async () => {
          const { data } = await axiosInstance.get("/category", {
            params: { page: nextPage, pageSize, sortBy, search },
          });
          return data;
        },
      });
    }
  }, [isAll, page, pageSize, sortBy, search, totalPages, queryClient]);

  return { isPending, error, categories, currentPage, totalPages, totalCategories };
}


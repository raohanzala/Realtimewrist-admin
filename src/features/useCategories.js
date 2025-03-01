import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import axiosInstance from "../api-test/axiosInstance";

export function useCategories(isAll = false) {
  const [searchParams] = useSearchParams();

  const page = isAll ? 1 :  (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
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

  // If fetching all, return only categories array
  // if (isAll) {
  //   return { isPending, error, categories: data || [] };
  // }

  const { categories, currentPage, totalPages, totalCategories } = data || {};

  return { isPending, error, categories, currentPage, totalPages, totalCategories };
}


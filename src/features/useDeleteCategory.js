import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteCategory } = useMutation({
    mutationFn: async (categoryId) => {
      const { data } = await axiosInstance.delete(`/category/${categoryId}`);
      return data;
    },

    onSuccess: (data) => {
      if (data.message) {
        toast.success(data.message || "Category deleted successfully");
        queryClient.invalidateQueries(["categories"]);
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    },

    onError: (err) => {
      toast.error(err.message || "Something went wrong while deleting the category");
    },
  });

  return { isLoading, deleteCategory };
}

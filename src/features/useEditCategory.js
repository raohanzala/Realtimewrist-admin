import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutate: editCategory } = useMutation({
    mutationFn: async ({ categoryId, categoryData }) => {
      const { data } = await axiosInstance.put(`/category/category/${categoryId}`, categoryData);
      return data;
    },
    
    onSuccess: (data) => {
      toast.success(data.message || "Category successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, editCategory };
}
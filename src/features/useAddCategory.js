import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useAddCategory() {
  const queryClient = useQueryClient();

  const { isPending, mutate: addCategory } = useMutation({
    mutationFn: async (categoryName) => {
      const { data } = await axiosInstance.post("/category/add", categoryName);
      return data;
    },

    onSuccess: (data) => {
      if (data) {
        toast.success("Category added successfully");
        queryClient.invalidateQueries(["categories"]);
      } else {
        toast.error("Failed to add category");
      }
    },

    onError: (err) => {
      toast.error(err.message || "Something went wrong while adding the category");
    },
  });

  return { isPending, addCategory };
}

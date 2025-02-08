import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useUpdateProductPublish() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updatePublish } = useMutation({
    mutationFn: async ({ productId, published }) => {
      const { data } = await axiosInstance.post(`/product/product/publish-status`, {
        productId,
        published,
      });
      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Product publish status updated");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update publish status");
    },
  });

  return { isLoading, updatePublish };
}

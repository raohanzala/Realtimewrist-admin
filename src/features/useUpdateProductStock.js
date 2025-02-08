import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useUpdateProductStock() {
  const queryClient = useQueryClient()

  const { isLoading, mutate: updateStock } = useMutation({
    mutationFn: async ({ productId, status }) => {
      const { data } = await axiosInstance.post(`/product/productstatus`,
        { productId, status },
      );
      return data
    },

    onSuccess: (data) => {
      toast.success(data.message || 'Product stock successfully updated')

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message)
  })

  return { isLoading, updateStock }
}
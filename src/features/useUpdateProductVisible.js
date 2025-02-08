import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useUpdateProductVisible() {
  const queryClient = useQueryClient()

  const { isLoading, mutate: updateVisiblity } = useMutation({
    mutationFn: async (details) => {
      const { status, orderId } = details
      const { data } = await axiosInstance.post(`/order/orderstatus`,
        { orderId, status },
      );
      return data
    },

    onSuccess: () => {
      toast.success('Product visibility successfully updated')

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message)
  })

  return { isLoading, updateVisiblity }
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  const { isLoading, mutate: updateStatus } = useMutation({
    mutationFn: async (details) => {
      const { status, orderId } = details
      const { data } = await axiosInstance.post(`/order/orderstatus`,
        { orderId, status },
      );
      return data
    },

    onSuccess: (data) => {
      toast.success(data.message || 'Order status successfully updated')

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    onError: (err) => toast.error(err.message)
  })

  return { isLoading, updateStatus }
}
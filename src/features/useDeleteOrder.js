import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: async (orderId) => {
      const { data } = await axiosInstance.delete(`/order/order/${orderId}`);
      return data;
    },

    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Order deleted successfully");
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        }); // Refetch orders list
      } else {
        toast.error(data.message || "Failed to delete order");
      }
    },

    onError: (err) => {
      toast.error(err.message || "Something went wrong while deleting the order");
    },
  });

  return { isDeleting, deleteOrder };
}

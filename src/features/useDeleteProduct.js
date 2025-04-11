import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: async (productId) => {
      const { data } = await axiosInstance.post(`/product/remove`, { id: productId });
      return data
    },

    onSuccess: () => {
      toast.success('Product successfully deleted')

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message)

  })
  console.log('Loadig in mutate :', isDeleting)

  return { isDeleting, deleteProduct }
}
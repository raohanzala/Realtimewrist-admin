import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useEditProduct() {
  const queryClient = useQueryClient()

  const { isPending, mutate: editProduct } = useMutation({
    mutationFn: async (formData) => {
      console.log(formData, 'EDITED Values')
      const productId = formData.get("productId");
      const { data } = await axiosInstance.patch(`/product/edit/${productId}`, formData);
      return data
    },

    onSuccess: () => {
      toast.success('Product successfully edited')

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message)
  })

  return { isPending, editProduct }
}
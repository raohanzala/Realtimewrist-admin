import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useAddProduct() {
  const queryClient = useQueryClient()

  const { isPending, mutate: addProduct } = useMutation({
    mutationFn: async (productData) => {
      const { data } = await axiosInstance.post("/product/add", productData);
      return data
    },

    onSuccess: (data) => {
      toast.success(data.message || 'Product successfully created')
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => toast.error(err.message)
  })

  return { isPending, addProduct }
}
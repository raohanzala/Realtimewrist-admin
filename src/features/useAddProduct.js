import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductApi } from "../api/apiProducts";
import toast from "react-hot-toast";

export function useAddProduct() {
    const queryClient = useQueryClient()

    const {isPending , mutate : addProduct } = useMutation({
      mutationFn : addProductApi,
      
      onSuccess : (data)=> {
        toast.success(data.message || 'Product successfully created')

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, addProduct}
}
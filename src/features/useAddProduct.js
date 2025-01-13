import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductApi } from "../api/apiProducts";
import toast from "react-hot-toast";

export function useAddProduct() {
    const queryClient = useQueryClient()

    const {isLoading, mutate : addProduct } = useMutation({
      mutationFn : addProductApi,
      
      onSuccess : ()=> {
        toast.success('Product successfully created')

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, addProduct}
}
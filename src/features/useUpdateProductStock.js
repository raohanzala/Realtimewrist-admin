import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProductStatus } from "../api/apiProducts";

export function useUpdateProductStock() {
    const queryClient = useQueryClient()

    const {isLoading, mutate : updateStock } = useMutation({
      mutationFn : updateProductStatus,
      
      onSuccess : ()=> {
        toast.success('Product stock successfully updated')

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, updateStock}
}
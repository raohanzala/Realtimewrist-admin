import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductApi } from "../api/apiProducts";
import toast from "react-hot-toast";

export function useEditProduct() {
    const queryClient = useQueryClient()

    const {isPending, mutate : editProduct } = useMutation({
      mutationFn : editProductApi,
      
      onSuccess : ()=> {
        toast.success('Product successfully edited')

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, editProduct}
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../api/apiOrders";

export function useUpdateProductVisible() {
    const queryClient = useQueryClient()

    const {isLoading, mutate : updateVisiblity} = useMutation({
      mutationFn : updateOrderStatus,
      
      onSuccess : ()=> {
        toast.success('Product visibility successfully updated')

        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, updateVisiblity}
}
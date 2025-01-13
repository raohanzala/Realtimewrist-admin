import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../api/apiOrders";

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()

    const {isLoading, mutate : updateStatus } = useMutation({
      mutationFn : updateOrderStatus,
      
      onSuccess : ()=> {
        toast.success('Order status successfully updated')

        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, updateStatus}
}
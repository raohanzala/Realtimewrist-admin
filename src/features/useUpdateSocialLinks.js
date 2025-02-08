import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useUpdateSocialLinks() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateLinks } = useMutation({
    mutationFn: async (socialLinks) => {
      // Send social links as the request body
      const { data } = await axiosInstance.put(`/customize/social-links`, socialLinks);
      return data;
    },

    onSuccess: () => {
      toast.success('Social links successfully updated');
      // Optionally, invalidate queries if needed, depending on your app structure
      queryClient.invalidateQueries({
        queryKey: ["social-links"], // Adjust the query key as per your implementation
      });
    },
    
    onError: (err) => {
      toast.error(err.response?.data?.error || "Error updating social links");
    },
  });

  return { isPending, updateLinks };
}
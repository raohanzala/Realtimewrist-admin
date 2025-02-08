import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api-test/axiosInstance";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteUser } = useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosInstance.delete(`/user/delete/${userId}`);
      return data;
    },

    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "User deleted successfully");
        queryClient.invalidateQueries(["users"]);
      } else {
        toast.error(data.message || "Failed to delete user");
      }
    },

    onError: (err) => {
      toast.error(err.message || "Something went wrong while deleting the user");
    },
  });

  return { isLoading, deleteUser };
}

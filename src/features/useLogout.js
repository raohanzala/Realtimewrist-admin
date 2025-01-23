import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutFunc } from "../api-test/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const navigate = useNavigate()

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutFunc,
    onSuccess: () => {
      toast.success('Logout successfully')
      navigate('/login', { replace: true })
    },
    onError: (err) => toast.error(err.message)
  })

  return { logout, isLoading }
}
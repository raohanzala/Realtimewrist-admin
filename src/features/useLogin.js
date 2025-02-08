import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api-test/axiosInstance";
import { login } from "../store/slices/authSlice";

export function useLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isPending, mutate: loginFnc } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axiosInstance.post('/user/admin', values)
      return data
    },
    onSuccess: (data) => {
      toast.success('Login successfully')
      console.log(data, 'LOIGNDATA')
      dispatch(login(data))
      navigate('/', { replace: true })
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error(err.message);
    }
  })

  return { isPending, loginFnc }
}
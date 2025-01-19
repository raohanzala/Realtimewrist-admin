import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginApi } from "../api/apiAuth";
import { useDispatch } from "react-redux";
import { login as loginSlice } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

export function useLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {login} = useContext(ShopContext)

    const {isPaused , mutate : loginFnc } = useMutation({
      mutationFn : loginApi,
      onSuccess : (data)=> {
        toast.success('Login successfully')
        dispatch(loginSlice(data))
        login(data)
        navigate('/', { replace: true })
      },
      onError: (err)=> {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
      } 
    })

    return {isPaused, loginFnc}
}
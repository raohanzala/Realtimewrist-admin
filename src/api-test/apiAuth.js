import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




export const loginApi = async (values) => {

  // setToken(userToken);
  
  const response = await axios.post(backendUrl + '/api/user/admin',values)
    //   console.log(response, 'asdf')
    try{
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        // navigate('/');
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
      // localStorage.setItem('token', userToken);

      return response.data.token;
};  
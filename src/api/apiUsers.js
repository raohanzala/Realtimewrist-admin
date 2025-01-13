import axiosInstance from "./axiosInstance";

export const getUsersApi = async () => {
  try {
    const response = await axiosInstance.get(`/user/users`);
    return response.data.users
  } catch (error) {
    console.log(error, 'Failed to fetch users.');
  }
};

// const fetchUser = async () => {
//   try {
//     const response = await axiosInstance.get(`/user/user`, { headers: { token } });
//   } catch (error) {
//     console.log(error, 'Failed to fetch user.');
//   }
// };

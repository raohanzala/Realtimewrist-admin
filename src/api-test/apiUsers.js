import axiosInstance from "./axiosInstance";

export const getUsersApi = async () => {
  try {
    const {data} = await axiosInstance.get(`/user/users`);
    return data
  } catch (error) {
    console.log(error, 'Failed to fetch users.');
  }
};

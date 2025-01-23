import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";


export const getOrdersApi = async (page = 1, pageSize = 10)=> {
  try {
    const {data} = await axiosInstance.get(`/order/orders?page=${page}&pageSize=${pageSize}`);
    return data
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export const getOrderApi = async (orderId)=> {
  try {
    const {data} = await axiosInstance.get(`/order/singleOrder/${orderId}`);
    return data
  } catch (error) {
    toast.error(error.message);
  }
}

export const updateOrderStatus = async (details) => {
  const {status, orderId} = details
  console.log(status, orderId, 'ORDER DATA')
  try {
    const {data} = await axiosInstance.post(`/order/orderstatus`,
      { orderId, status },
    );
    return data
  } catch (error) {
    console.log(error, 'Failed to update order status.');
  } 
};

export const getOrdersDetailsApi = async () => {
  try {
    const {data} = await axiosInstance.get(`/order/ordersDetails`,);
    return data
  } catch (error) {
    console.log(error, 'Failed to fetch orders details.');
  } 
};
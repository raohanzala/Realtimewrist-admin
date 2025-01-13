import axios from "axios";
import { backendUrl } from "../App";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";


export const getOrdersApi = async (page = 1, pageSize = 1)=> {
  try {
    const response = await axiosInstance.get(`/order/orders?page=${page}&pageSize=${pageSize}`);
    const data = response.data
    return data
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export const getOrderApi = async (orderId)=> {
  try {
    const response = await axiosInstance.get(`/order/singleOrder/${orderId}`);
    const data = response.data
    return data
  } catch (error) {
    toast.error(error.message);
  }
}

export const updateOrderStatus = async (event, orderId) => {
  try {
    const response = await axiosInstance.post(`/order/orderstatus`,
      { orderId, status: event.target.value },
    );
    const data = response.data
    return data
  } catch (error) {
    console.log(error, 'Failed to update order status.');
  } 
};
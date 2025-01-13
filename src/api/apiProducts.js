import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../App";
import axiosInstance from "./axiosInstance";


export const getProductsApi = async (page = 1, pageSize = 10) => {
  try {
    const response = await axiosInstance.get(
      `/product/products?page=${page}&pageSize=${pageSize}`
    );
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Products could not be loaded");
  }
};

export const getProductApi = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/product/single/${productId}`
    );
    const data = response.data
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }
};

export const addProductApi = async ({productData})=> {
  try {
    const response = await axiosInstance.post("/product/add", productData);
    return response.data
  }  catch (error) {
    console.error(error.message);
    throw new Error("Product could not be created")
  }
}

export const deleteProductApi = async (productId) => {
  try {
    const response = await axiosInstance.post(`/product/remove`, { productId });
    const data = response.data
    return data
  } catch (error) {
    console.log(error, 'Failed to delete product.');
    throw new Error("Product could not be deleted")
  } 
};

export const editProductApi = async ({productId, editData})=> {

  try{
    const response = await axiosInstance.put("/product/edit", {productId,editData});
    const data = response.data
    return data
  } catch (error) {
    console.error(error);
    throw new Error("Product could not be edit");
  }
}

export const updateProductStatus = async (event, productId) => {
  try {
    const response = await axiosInstance.post(`/product/productstatus`,
      { productId, status: event.target.value },
    );
    const data = response.data
    return data
  } catch (error) {
    console.error(error);
    throw new Error("Product status could not be updated");
  } 
};


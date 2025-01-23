import axiosInstance from "./axiosInstance";


export const getProductsApi = async (page = 1, pageSize = 10) => {
  try {
    const {data} = await axiosInstance.get(
      `/product/products?page=${page}&pageSize=${pageSize}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Products could not be loaded");
  }
};

export const getProductApi = async (productId) => {
  try {
    const {data} = await axiosInstance.get(
      `/product/single/${productId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }
};

export const addProductApi = async (productData)=> {
  try {
    const {data} = await axiosInstance.post("/product/add", productData);
    return data
  }  catch (error) {
    console.error(error.message);
    throw new Error("Product could not be created")
  }
}

export const deleteProductApi = async (productId) => {
  try {
    const {data} = await axiosInstance.post(`/product/remove`,  {id : productId});
    return data
  } catch (error) {
    console.log(error, 'Failed to delete product.');
    throw new Error("Product could not be deleted")
  } 
};

export const editProductApi = async (datas, id)=> {
console.log(datas, id, 'EDITED DATA')
  try{
    const response = await axiosInstance.put(`/product/edit/${id}`, datas);
    const data = response.data
    return data
  } catch (error) {
    console.error(error);
    throw new Error("Product could not be edit");
  }
}

export const updateProductStatus = async ({ status, productId }) => {
  try {
    const response = await axiosInstance.post(`/product/productstatus`,
      { productId, status},
    );
    const data = response.data
    return data
  } catch (error) {
    console.error(error);
    throw new Error("Product status could not be updated");
  } 
};


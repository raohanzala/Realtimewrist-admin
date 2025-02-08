import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { backendUrl } from "../App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isProductLoading, setIsProductLoading] = useState(false)
  const [isOrdersLoading, setIsOrdersLoading] = useState(false)
  const [isOrderLoading, setIsOrderLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [usersLoading, setUsersLoading] = useState(false)

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)

  const [pageTitle, setPageTitle] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [productsPageCount, setProductsPageCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([])
  const [ordersPageCount, setOrdersPageCount] = useState(0)
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = (userToken) => {
    setToken(userToken);
    console.log(userToken, 'TOKEN SHOP')
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const handleError = (error, customMessage) => {
    console.error(error);
    toast.error(customMessage || 'An error occurred');
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchProducts(),  
          fetchOrders(),
          fetchAllUsers()
        ]);
      } catch (error) {
        handleError(error, 'Failed to load initial data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // 🛠️ Fetch paginated products
  // const fetchPaginatedList = async (page = 1, limit = 10) => {
  //   console.log(limit, 'limit')
  //   setProductLoading(true);
  //   try {
  //     const response = await axios.get(${backendUrl}/api/product/paginated-list?page=${page}&limit=${limit}, { headers: { token } });
  //     setAllProducts((prevProducts) => {
  //       const combinedProducts = [...prevProducts, ...response.data.products]
  //       const uniqueProducts = combinedProducts.filter(
  //         (item, index, array) => array.findIndex(p => p._id === item._id) === index
  //       );
  //       return uniqueProducts;
  //     });
  //     setCurrentPage(page);
  //     setTotalPages(response.data.totalPages);
  //   } catch (error) {
  //     handleError(error, 'Failed to fetch product list.');
  //   } finally {
  //     setProductLoading(false);
  //   }
  // };

  const fetchProducts = useCallback(async (page = 1, pageSize = 10) => {
    setIsProductLoading(true)
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/products?page=${page}&pageSize=${pageSize}`, { headers: { token } }
      );
      const data = response.data
      setAllProducts(data.products);
      setTotalProducts(data.totalProducts);
      setProductsPageCount(data.totalPages);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }finally{
      setIsProductLoading(false)
    }
  }, []);

  const fetchOrders = useCallback(async (page = 1, pageSize = 10) => {
setIsOrdersLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/api/order/orders?page=${page}&pageSize=${pageSize}`, { headers: { token } });
      const data = response.data
      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
      setOrdersPageCount(data.totalPages);
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }finally{
      setIsOrdersLoading(false)
    }
  }, []);

  // const fetchAllOrders = async () => {
  //   setIsLoading(true);
  //   try {
  //     console.log(token, 'Order Toke')
  //     const response = await axios.post(${backendUrl}/api/order/list, {}, { headers: { token } });
  //     console.log(response, 'ORDERS')
  //     setOrders(response.data.orders);
  //   } catch (error) {
  //     handleError(error, 'Failed to fetch orders.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchAllUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/user/users`, { headers: { token } });
      setAllUsers(response.data.users);
      setTotalUsers(response.data.totalUsers)
    } catch (error) {
      handleError(error, 'Failed to fetch users.');
    }finally{
      setUsersLoading(false)
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        fetchProducts()
        toast.success('Product deleted successfully')
      }
    } catch (error) {
      handleError(error, 'Failed to delete product.');
    } 
  };

  const updateOrderstatus = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/orderstatus`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated successfully');
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleError(error, 'Failed to update order status.');
    } 
  };
  const updateProductStatus = async (event, productId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/productstatus`,
        { productId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleError(error, 'Failed to update product status.');
    } 
  };

  const addProduct = async ({productData})=> {
    try {
      const response = await axios.post(backendUrl + "/api/product/add", productData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // setName("");
        // setDescription("");
        // setOldPrice("");
        // setNewPrice("");
        // setCategory("");
        // setSubcategory("");
        // setBestSeller(false);
        // setSizes([]);
        // setImage1(false);
        // setImage2(false);
        // setImage3(false);
        // setImage4(false);
        fetchProducts();
        // onClose();
      } else {
        toast.error(response.data.message);
      }
    }  catch (error) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  }

  const editProduct = async ({productId, editData})=> {

    try{
      const response = await axios.post(backendUrl + "/api/product/edit", {productId,editData}, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // setName("");
        // setDescription("");
        // setOldPrice("");
        // setNewPrice("");
        // setCategory("");
        // setSubcategory("");
        // setBestSeller(false);
        // setSizes([]);
        // setImage1(false);
        // setImage2(false);
        // setImage3(false);
        // setImage4(false);
        fetchProducts();
        // onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  }

  const singleOrder = async (orderId)=> {
    setIsOrderLoading(true)
    try {
      const response = await axios.get(backendUrl + `/api/order/singleOrder/${orderId}`, {
        headers: { token },
      });

      setOrder(response.data.order)

      console.log(response, 'SIngleOrder')
    } catch (error) {
      toast.error(error.message);
    }finally{
      setIsOrderLoading(false)
    }
  }


  const value = {
    
    totalUsers,
    totalProducts,
    totalOrders,

    setIsLoading,
    isLoading,
    isProductLoading,
    isOrdersLoading,
    isOrderLoading,
    actionLoading, 
    usersLoading,
    setActionLoading,

    setToken,
    token,

    editProduct,
    addProduct,
    
    allProducts,
    productsPageCount,
    ordersPageCount,
    orders,
    allUsers,
    pageTitle,
    setPageTitle,

    login, logout,

    fetchProducts,
    fetchOrders,
    fetchAllUsers,
    removeProduct,
    updateOrderstatus,
    updateProductStatus,
    singleOrder,
    order,

  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
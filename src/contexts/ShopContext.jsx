import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { backendUrl } from "../App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true); // Full page loader when app starts
  const [productLoading, setProductLoading] = useState(false); // Loader for products
  const [ordersLoading, setOrdersLoading] = useState(false); // Loader for orders
  const [usersLoading, setUsersLoading] = useState(false); // Loader for users
  const [actionLoading, setActionLoading] = useState(false); // Loader for button actions

  const [pageTitle, setPageTitle] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const currency = 'PKR'

  // Get token from localStorage when the app loads
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // Store token in context and localStorage
  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  // Clear token from context and localStorage on logout
  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const handleError = (error, customMessage) => {
    console.error(error);
    toast.error(customMessage || 'An error occurred');
  };
  console.log(token, 'TOEKN')

  // 📢 Call essential API calls on app start
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchPaginatedList(),  // Fetch paginated product list
          fetchAllOrders(),      // Fetch orders
          fetchAllUsers()        // Fetch all users
        ]);
      } catch (error) {
        handleError(error, 'Failed to load initial data.');
      } finally {
        setInitialLoading(false); // Hide the full-page loader when all requests are complete
      }
    };

    fetchInitialData();
  }, []);

  // 🛠️ Fetch paginated products
  const fetchPaginatedList = async (page = 1, limit = 10) => {
    console.log(limit, 'limit')
    setProductLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/paginated-list?page=${page}&limit=${limit}`, { headers: { token } });
      setAllProducts((prevProducts) => {
        const combinedProducts = [...prevProducts, ...response.data.products]
        const uniqueProducts = combinedProducts.filter(
          (item, index, array) => array.findIndex(p => p._id === item._id) === index
        );
        return uniqueProducts;
      });
      setCurrentPage(page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      handleError(error, 'Failed to fetch product list.');
    } finally {
      setProductLoading(false);
    }
  };

  // 🛠️ Fetch all orders
  const fetchAllOrders = async () => {
    setOrdersLoading(true);
    try {
      console.log(token, 'Order Toke')
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      console.log(response, 'ORDERS')
      setOrders(response.data.orders);
    } catch (error) {
      handleError(error, 'Failed to fetch orders.');
    } finally {
      setOrdersLoading(false);
    }
  };

  // 🛠️ Fetch all users
  const fetchAllUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/user/users`, { headers: { token } });
      setAllUsers(response.data.users);
    } catch (error) {
      handleError(error, 'Failed to fetch users.');
    } finally {
      setUsersLoading(false);
    }
  };

  // 🛠️ Remove product
  const removeProduct = async (id) => {
    setActionLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        setAllProducts(allProducts.filter(product => product.id !== id));
        toast.success('Product deleted successfully')
      }
    } catch (error) {
      handleError(error, 'Failed to remove product.');
    } finally {
      setActionLoading(false);
    }
  };

  // 🛠️ Status handler for updating order status
  const statusHandler = async (event, orderId) => {
    setActionLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order status updated successfully');
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      handleError(error, 'Failed to update order status.');
    } finally {
      setActionLoading(false);
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  }

  // Utility function to format timestamp into short date
  function timestampToShortDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  function formatAmount(amount) {
    if (typeof amount !== "number") {
      throw new Error("Input must be a number");
    }
    const [integerPart, decimalPart] = amount.toString().split(".");
    const formattedInteger = integerPart
      .replace(/\B(?=(\d{2})+(?=\d{3}))/g, ",")
      .replace(/(\d)(?=(\d{3})+$)/, "$1,");

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  }

  const value = {
    currency,
    
    initialLoading,
    setInitialLoading,
    productLoading,
    ordersLoading,
    usersLoading,
    setActionLoading,
    actionLoading,

    formatTimestamp,
    formatAmount,
    timestampToShortDate,

    setToken,
    token,

    allProducts,
    currentPage,
    totalPages,
    orders,
    allUsers,
    pageTitle,
    setPageTitle,

    login,logout,

    fetchPaginatedList,
    fetchAllOrders,
    fetchAllUsers,
    removeProduct,
    statusHandler
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

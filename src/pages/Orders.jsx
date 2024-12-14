import React, { useContext, useEffect, useState } from 'react';
import SearchSortBar from '../components/SearchSortBar'; // Import your custom SearchSortBar component
import toast from 'react-hot-toast'; // Toast notifications
import { backendUrl } from '../App'; // Import your backend URL
import axios from 'axios'; // Axios for HTTP requests
import { ShopContext } from '../contexts/ShopContext';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import OrderDrawer from '../components/OrderDrawer';

const Orders = ({ token }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { isLoading, setIsLoading, formatAmount,currency, setPageTitle, timestampToShortDate, orders } = useContext(ShopContext)

  console.log('Is Loading', orders)


  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  // Close drawer
  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setSelectedOrder(null);
    }, 300);
  };

  // Fetch orders on component mount
  useEffect(() => {
    // fetchAllOrders();
    setPageTitle('Orders');
    () => setIsLoading(false)
  }, [setIsLoading]);



  return (
    <div>
      {isLoading && <Loader type='full' />}
      <div className='mb-8'>

        <SearchSortBar placeholder="Search product" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />      </div>

      {/* Orders Table */}
      <div className="mt-1">
        <table className="min-w-full bg-white shadow-sm  border border-collapse table-auto">
          <thead>
            <tr className="bg-[#f2f2f2af] text-[#5c5c5c] text-sm uppercase">
              <th className=" py-3 px-1 max-w-fit ">S.No</th>
              <th className=" py-3 px-4">Product</th>
              <th className=" py-3 px-4">Customer</th>
              <th className=" py-3 px-4">Address</th>
              <th className=" py-3 px-4">Amount (PKR)</th>
              <th className=" py-3 px-4">Status</th>
              <th className=" py-3 px-4">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  onClick={() => handleOrderClick(order)}
                  className=" hover:bg-gray-50 text-center cursor-pointer text-sm border"
                >
                  <td className=" py-3 px-4">{index + 1}</td>
                  <td className=" py-3 px-4 text-left">{order.items[0]?.name || ''}</td>
                  <td className=" py-3 px-4 text-left">{order.address.firstName || 'Kashif Ameen'}</td>
                  <td className=" py-3 px-4 text-left truncate">{order.address.city || 'H-429, Lahore, Punjab'}</td>
                  <td className=" py-3 px-4">{currency} {formatAmount(order.amount) || '0'}</td>
                  <td
                    className={`py-3  px-4 text-sm font-semibold ${order.status === 'Pending'
                      ? 'text-yellow-500'
                      : order.status === 'Delivered'
                        ? 'text-green-500'
                        : 'text-red-500'
                      }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-4 text-sm ">{timestampToShortDate(order.date) || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 text-base text-center text-[#c3c3c3]"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        // onPageChange={handlePageChange}
        /> */}
      </div>

      {/* Drawer for Order Details */}
      {isDrawerOpen && <OrderDrawer selectedOrder={selectedOrder} closeDrawer={closeDrawer} isAnimating={isAnimating} />}


    </div>
  );
};

export default Orders;

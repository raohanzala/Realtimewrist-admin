import React, { useContext, useEffect, useState } from 'react';
import SearchSortBar from '../components/SearchSortBar';
import { ShopContext } from '../contexts/ShopContext';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import OrderDrawer from '../components/OrderDrawer';
import StatusLabel from '../components/StatusLabel';
import { CURRENCY, PAGE_SIZE } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';
import { formatAmount, timestampToShortDate } from '../helpers';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { isLoading, isOrdersLoading, setPageTitle, orders, ordersPageCount, fetchOrders, totalOrders } = useContext(ShopContext)

  console.log('Is Loading', orders)


  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setSelectedOrder(null);
    }, 300);
  };

  useEffect(() => {
    setPageTitle('Orders');
  }, []);

  return (
    <div>
      {isLoading && <Loader type='full' />}
      <div className='mb-8'>
        <SearchSortBar placeholder="Search product" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />
      </div>

      <div>
        <table className="min-w-full bg-white  border border-b-0 border-collapse table-auto">
          <thead>
            <tr className="bg-[#f2f2f2af] text-[#5c5c5c] font-semibold py-4 text-sm uppercase">
              <th className=" py-4 px-1 max-w-fit ">S.No</th>
              <td className=" py-4 px-4">Product</td>
              <td className=" py-4 px-4">Customer</td>
              <td className=" py-4 px-4">Address</td>
              <td className=" py-4 px-4">Amount</td>
              <td className=" py-4 px-4">Status</td>
              <td className=" py-4 px-4">Order Date</td>
            </tr>
          </thead>
          <tbody>
            {isOrdersLoading ?
              <SkeletonRow /> : orders?.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    onClick={() => handleOrderClick(order)}
                    className=" hover:bg-gray-50 cursor-pointer text-sm border"
                  >
                    <td className=" py-4 px-4 text-center">{(currentPage - 1) * PAGE_SIZE + (index + 1)}</td>
                    <td className=" py-4 px-4 text-left">{order?.items?.[0]?.name || ''}</td>
                    <td className=" py-4 px-4 text-left">{order?.address?.firstName || 'Kashif Ameen'}</td>
                    <td className=" py-4 px-4 text-left truncate">{order?.address?.city || 'H-429, Lahore, Punjab'}</td>
                    <td className=" py-4 px-4">{CURRENCY}{formatAmount(order?.amount) || '0'}</td>
                    <td
                      className={`py-4  px-4 text-sm font-semibold `}
                    >
                      <StatusLabel status={order?.status} />
                    </td>
                    <td className="py-4 px-4 text-sm ">{timestampToShortDate(order?.date) || 'N/A'}</td>
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
        <div className='border border-t-0'>
          <Pagination pageCount={ordersPageCount} fectchData={fetchOrders} totalData={totalOrders} />
        </div>
      </div>

      {isDrawerOpen && <OrderDrawer selectedOrder={selectedOrder} closeDrawer={closeDrawer} isAnimating={isAnimating} />}

    </div>
  );
};

const SkeletonRow = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <tr key={index} className="animate-pulse border">
          <td className="text-center">
            <div className="bg-gray-200 mx-auto rounded max-w-fit text-transparent">SNo</div>
          </td>

          <td className="py-4 px-4 text-left">
            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
          </td>

          <td className="py-4 px-4 text-left">
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          </td>

          <td className="py-4 px-4 text-left truncate">
            <div className="h-6 w-full bg-gray-200 rounded"></div>
          </td>

          <td className="py-4 px-4 text-left">
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
          </td>

          <td className="py-4 px-4 text-left">
            <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          </td>

          <td className="py-4 px-4 text-left">
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
};


export default Orders;

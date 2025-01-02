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
  // const isOrdersLoading = true

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
          <div className="bg-[#f2f2f2af] grid grid-cols-[0.3fr_1fr_1fr_1fr_0.5fr_0.5fr_0.8fr] text-[#5c5c5c] font-semibold py-4 px-8 text-sm uppercase">
            <div >S.No</div>
            <div>Product</div>
            <div>Customer</div>
            <div>Address</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Order Date</div>
          </div>
          <div>
            {isOrdersLoading ?
              <SkeletonRow /> : orders?.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    key={order._id}
                    onClick={() => handleOrderClick(order)}
                    className={` hover:bg-gray-50 cursor-pointer grid grid-cols-[0.3fr_1fr_1fr_1fr_0.5fr_0.5fr_0.8fr]  py-4 px-8  text-sm ${index === orders.length - 1 ? "" : "border-b"
                      }`}
                  >
                    <div >{(currentPage - 1) * PAGE_SIZE + (index + 1)}</div>
                    <div >{order?.items?.[0]?.name || ''}</div>
                    <div >{order?.address?.firstName || 'Kashif Ameen'}</div>
                    <div >{order?.address?.city || 'H-429, Lahore, Punjab'}</div>
                    <div>{CURRENCY}{formatAmount(order?.amount) || '0'}</div>
                    <div
                      className={`text-sm font-semibold `}
                    >
                      <StatusLabel status={order?.status} />
                    </div>
                    <div className="text-sm ">{timestampToShortDate(order?.date) || 'N/A'}</div>
                  </div>
                ))
              ) : (
                <p
                  className="py-4 text-base text-center text-[#c3c3c3]"
                >
                  No orders found.
                </p>
              )}
          </div>
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
        <div key={index} className="animate-pulse border-b grid grid-cols-[0.3fr_1fr_1fr_1fr_0.5fr_0.5fr_0.8fr]  py-4 px-8">
          <div className="w-1/2 h-5 bg-gray-200  rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </>
  );
};


export default Orders;
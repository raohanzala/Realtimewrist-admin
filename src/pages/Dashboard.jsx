import React, { useContext, useEffect } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Box from "../components/Box";
import HeadingLink from "../components/HeadingLink";
import Loader from "../components/Loader";
import { IoMdMore } from 'react-icons/io';
import { assets } from "../assets/assets";

const Dashboard = () => {
  const { setPageTitle, allUsers, formatAmount, orders, initialLoading, allProducts, currency, productLoading,
    ordersLoading,
    usersLoading, timestampToShortDate } = useContext(ShopContext);

  const totalRevenue = orders?.map((order) => order.amount)
    .reduce((total, amount) => total + amount, 0);

  useEffect(() => {
    setPageTitle("Dashboard");
  }, []);

  return (
    <div className="">
      {initialLoading && <Loader type='full' />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
            {ordersLoading ? <p>Loading...</p> : <>
              <p className="text-3xl font-bold text-blue-600 mt-2">{orders?.length}</p>
              <p className="text-sm text-gray-500 mt-1">+10% from last month</p></>}
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
            {ordersLoading ? <p>Loading...</p> : <><p className="text-3xl font-bold text-green-600 mt-2">
              {formatAmount(totalRevenue || 9000)} {currency}
            </p>
              <p className="text-sm text-gray-500 mt-1">+15% from last month</p></>}
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
            {productLoading ? <p>Loading...</p> : <><p className="text-3xl font-bold text-purple-600 mt-2">{allProducts?.length}</p>
              <p className="text-sm text-gray-500 mt-1">+5% from last month</p></>}
          </div>
        </Box>

        <Box>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-600">Active Users</h3>
            {usersLoading ? <p>Loading...</p> : <> <p className="text-3xl font-bold text-yellow-600 mt-2">{allUsers?.length}</p>
              <p className="text-sm text-gray-500 mt-1">+8% from last week</p></>}
          </div>
        </Box>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Box>
          <div className="bg-gray-100 w-full text-[#d2d2d2] h-full flex items-center justify-center">
            No data to show.
          </div>
        </Box>
        <Box>
          <HeadingLink title='Top Products' link='/list' />
          {productLoading ? <p>Loading...</p> : allProducts?.length > 0 ? <ul className="space-y-2">
            {allProducts.slice(0, 3).map((product) => (
              <li key={23892389} className={`flex justify-between ${'border-b'} items-center py-2 px-2 text-gray-700`}>
                <div className="flex gap-2 items-center">
                  <img src={product.image[0]} className="size-12 rounded-full" alt="" />
                  <div>
                  <h3>{product.name}</h3>
                  <div className="space-x-2 text-xs text-gray-400">
                    <span>{product.category}</span>
                    <span>{product.subCategory}</span>
                  </div>
                  </div>
                </div>
                <span className="font-bold">{currency} {formatAmount(product.newPrice)}</span>
              </li>
            ))}
          </ul> : <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-12">You have no products yet.</p></div>}
        </Box>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">

        <Box className='backdrop-blur-lg bg-none'>
          <HeadingLink title='Recent Orders' link='/orders' />
          <div className="overflow-x-auto">
            {ordersLoading ? <p>Loading...</p> : orders?.length > 0 ?
              <div>
                {
                  orders.slice(0, 3).map((order, index) => (<div className={`py-3 flex justify-between ${index !== 2 && 'border-b'} gap-5`} key={order._id}>
                    <div className="space-y-1">

                      <div className="flex gap-2 items-center">
                        <h2 className="font-medium text-lg">{892389}</h2>
                        <span
                          className={`py-1 px-2 rounded-sm text-xs font-bold 
                      ${order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' : ''} 
                      ${order.status === 'Packing' ? 'bg-yellow-100 text-yellow-800' : ''} 
                      ${order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : ''} 
                      ${order.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-800' : ''} 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <div className="text-sm">{order.items[0]?.name}</div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          .<div>{currency} {formatAmount(order.amount)}</div>.<div>{order.quantity} items</div>.<div>4 March, 2024</div>.<div>{order.address.firstName} {order.address.lastName}</div>.<div>Lines Area, Karachi</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">

                        <p>{order.address.city}</p> <p>{order.address.phone}</p>
                      </div>
                    </div>
                    <div>
                      <IoMdMore className="text-lg cursor-pointer" />
                    </div>
                  </div>
                  ))
                }
              </div>
              : <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-10 mt-2">You have no orders yet.</p></div>}
          </div>
        </Box>
        <Box>
          <HeadingLink title="Latest Customers" link='/users' />
          {usersLoading ? <p>Loading...</p> : allUsers?.length > 0 ?
            allUsers.slice(0, 6).map((user, index)=> (
          <div className={`flex  ${index !== 5 && 'border-b'} justify-between items-center py-2 px-2 cursor-pointer hover:bg-gray-100`} key={user._id}>
            <div className="flex gap-3 items-center">
              <img src={assets.rolex_yatch_master_1} className="size-10 rounded-full" />
              <div>
                <p>{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>

            </div>
            <p className="text-sm">{timestampToShortDate(user.date)}</p>
          </div>

            )): <div className="flex w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-10 mt-2">You have no customers yet.</p></div>
          }
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;

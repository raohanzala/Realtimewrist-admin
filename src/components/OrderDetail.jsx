import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { assets } from '../assets/assets';
import { CURRENCY } from '../utils/constants';
import SpinnerMini from './SpinnerMini';
import Box from './Box';
import StatusLabel from './StatusLabel';
import Button from './Button';
import { useOrder } from '../features/useOrder';
import { formatTimestamp, timestampToShortDate } from '../helpers';

export const OrderDetail = () => {

    const { orderId } = useParams();

    const {order, isPending} = useOrder()
    // const [order, setOrder] = useState(data?.order)

    console.log(order, 'ORDER PAGE')

    const { setPageTitle} = useContext(ShopContext)

    useEffect(()=> {
      // setOrder(data?.order)
        setPageTitle('Order Invoice')
    }, [])

    return (
      isPending ? <div className='w-full h-screen flex justify-center items-center'><SpinnerMini/> </div> :
        <div>
         <Box>
        <div className="p-4 rounded-md mb-4">
          <div className="flex flex-wrap justify-between">
            <div>
              <h2 className="text-xl font-bold">INVOICE</h2>
              <span className="font-medium flex gap-3">Status: <StatusLabel status={order?.status} /></span>
            </div>
            <div className="text-right mt-4 md:mt-0 space-y-1">
                <div className='w-[200px] h-auto ml-auto'><img className='w-full h-full' src={assets.logo2} alt="" /></div>
              {/* <p className="text-sm">59 Station Rd, Purls Bridge, United Kingdom</p> */}
              <p className="text-sm">+92-3249221933</p>
              <p className="text-sm">realtimewrist@gmail.com</p>
              <p className="text-sm">realtimewrist-admin.vercel.app</p>
            </div>
          </div>
          <div className='grid grid-cols-3'>

          <div className="mt-4">
            <p className="text-sm">DATE</p>
            <p className="font-medium">{timestampToShortDate(order?.date)}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm">INVOICE NO</p>
            <p className="font-medium">#11545</p>
          </div>
          <div className="mt-4 text-right">
            <p className="text-sm">INVOICE TO</p>
            <p className="font-medium">{order?.address?.name}</p>
            <p className="text-sm">{order?.address?.email}</p>
            <p className="text-sm">{order?.address?.phone}</p>
            <p className="text-sm">{order?.address?.whatsapp}</p>
          </div>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className='bg-[#f2f2f2af] border text-[#333] text-sm'>
                <td className=" border-gray-300 px-4 py-2 ">S.No</td>
                <td className=" border-gray-300 px-4 py-2 ">Product Name</td>
                <td className=" border-gray-300 px-4 py-2 ">Quantity</td>
                <td className=" border-gray-300 px-4 py-2 ">Item Price</td>
                <td className=" border-gray-300 px-4 py-2 ">Amount</td>
              </tr>
            </thead>
            <tbody>
              {order?.items?.map((item, index) => (
                <tr key={item._id}>
                  <td className=" border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className=" border-gray-300 px-4 py-2">{item.name}</td>
                  <td className=" border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className=" border-gray-300 px-4 py-2">${item.newPrice.toFixed(2)}</td>
                  <td className=" border-gray-300 px-4 py-2">${(item.newPrice.toFixed(2) * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="flex flex-wrap justify-between mt-4 p-4 bg-gray-100 rounded-md">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p className="text-sm">PAYMENT METHOD</p>
            <p className="font-medium">{order?.paymentMethod}</p>
          </div>
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p className="text-sm">SHIPPING COST</p>
            <p className="font-medium">$20.00</p>
          </div>
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p className="text-sm">DISCOUNT</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-sm">TOTAL AMOUNT</p>
            <p className="font-bold text-red-500">{CURRENCY}{order?.amount}</p>
          </div>
        </div>
  
      </Box>
        <div className="flex justify-between mt-6">
          <Button variant='secondary'>Download Invoice</Button>
          <Button variant='secondary'>Print Invoice</Button>
        </div>
        </div>
    );
}

const InvoiceSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
      <div className="p-4 rounded-md mb-4">
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse  border-gray-300">
          <thead>
            <tr>
              <th className=" border-gray-300 px-4 py-2 bg-[#e2c765]"></th>
              <th className=" border-gray-300 px-4 py-2 bg-[#e2c765]"></th>
              <th className=" border-gray-300 px-4 py-2 bg-[#e2c765]"></th>
              <th className=" border-gray-300 px-4 py-2 bg-[#e2c765]"></th>
              <th className=" border-gray-300 px-4 py-2 bg-[#e2c765]"></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className=" border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-6 mx-auto"></div>
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-40"></div>
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </td>
                <td className=" border-gray-300 px-4 py-2">
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-between mt-4 p-4 bg-gray-100 rounded-md">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-full md:w-auto">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <div className="h-10 bg-gray-300 rounded w-32 mr-2"></div>
        <div className="h-10 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
}
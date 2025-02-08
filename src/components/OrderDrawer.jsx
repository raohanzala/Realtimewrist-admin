import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import StatusLabel from './StatusLabel'
import { formatAmount, formatTimestamp } from '../helpers'
import { CURRENCY } from '../utils/constants'
import { useUpdateOrderStatus } from '../features/useUpdateOrderStatus'

const OrderDrawer = ({ selectedOrder, closeDrawer, isAnimating }) => {
  // const {  updateOrderstatus } = useContext(ShopContext)

    const {isLoading : isUpdating, updateStatus} =  useUpdateOrderStatus()
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50"
      onClick={closeDrawer}
    >
      <div
        className={`bg-white w-[400px] p-6 shadow-2xl transform overflow-y-scroll transition-transform duration-300 
        ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDrawer}
          aria-label="Close drawer"
          className="absolute top-4 right-4 text-gray-500 hover:text-primary-1 font-bold focus:outline-none"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>

        {selectedOrder ? (
          <>
            {/* Order Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Information</h3>
              <div className='mb-4'>
                <p className="text-gray-500 font-medium">Date</p>
                <p className="text-gray-800 text-sm">{formatTimestamp(selectedOrder.date)}</p>
              </div>
              <div className="gap-5 text-sm">
                <div className='mb-4'>
                  <p className="text-gray-500 font-medium">Order ID</p>
                  <p className="text-gray-800">{selectedOrder._id}</p>
                </div>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <p className="text-gray-500 font-medium">Amount</p>
                    <p className="text-gray-800 font-semibold">{CURRENCY}{formatAmount(selectedOrder.amount) || 9000}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium flex gap-1 items-center">Status
                      <StatusLabel status={selectedOrder.status} />
                    </p>
                    <select
                      onChange={(event) => updateStatus(event, selectedOrder._id)}
                      value={selectedOrder.status}
                      className="py-1 px-2 mt-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Customer Name</p>
                  <p className="text-gray-800">{selectedOrder.address.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-800">{selectedOrder.address.phone}</p>
                </div>
                
                <div className="text-gray-500 font-medium">
                  <p className="text-gray-500 font-medium">Address</p>
                  <p className="text-gray-800">{selectedOrder.address.city}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">WhatsApp</p>
                  <p className="text-gray-800">{selectedOrder.address.whatsapp}</p>
                </div>
              </div>
            </div>

            {/* Items Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Items</h3>
              <table className="w-full border border-gray-300 text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 font-medium text-gray-600">Item</th>
                    <th className="py-2 px-4 font-medium text-gray-600">Quantity</th>
                    <th className="py-2 px-4 font-medium text-gray-600">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4 text-center">{item.quantity}</td>
                      <td className="py-2 px-4">{CURRENCY}{formatAmount(item.newPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No order selected.</p>
        )}
      </div>
    </div>
  )
}

export default OrderDrawer
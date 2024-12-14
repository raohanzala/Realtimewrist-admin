import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'

const ProductDrawer = ({ title, selectedItem, closeDrawer, isAnimating }) => {

  const {formatTimestamp} = useContext(ShopContext)

  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50"
        onClick={closeDrawer}
      >
        <div
          className={`bg-white w-full sm:w-96 p-6 shadow-2xl transform overflow-y-auto scrollbar-hide h-[100vh] transition-transform duration-300 
            ${title ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeDrawer}
            aria-label="Close drawer"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          >
            ✕
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Details</h2>

          {selectedItem ? (
            <>
              {/* Product Images */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Images</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {selectedItem.image?.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Product image ${index + 1}`} 
                      className="w-32 h-32 rounded-lg object-cover border border-gray-200" 
                    />
                  ))}
                </div>
              </div>

              {/* Product Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-medium">Product ID</p>
                    <p className="text-gray-800">{selectedItem._id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Name</p>
                    <p className="text-gray-800">{selectedItem.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Category</p>
                    <p className="text-gray-800">{selectedItem.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Sub-Category</p>
                    <p className="text-gray-800">{selectedItem.subCategory}</p>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Pricing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-medium">Price</p>
                    <p className="text-gray-800 font-semibold">PKR {selectedItem.oldPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Sale Price</p>
                    <p className="text-green-600 font-semibold">PKR {selectedItem.newPrice}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 font-medium">Availability</p>
                    <p className={`text-sm font-semibold ${selectedItem.availibility ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedItem.availibility ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-medium">Bestseller</p>
                    <p className={`font-semibold ${selectedItem.bestSeller ? 'text-green-600' : 'text-gray-800'}`}>
                      {selectedItem.bestSeller ? "Yes" : "No"}
                    </p>
                  </div>
                  {selectedItem.sizes.length > 0 && (
                    <div className="col-span-2">
                      <p className="text-gray-500 font-medium">Available Sizes</p>
                      <p className="text-gray-800">{selectedItem.sizes.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{selectedItem.description}</p>
              </div>
            </>
          ) : (
            <div className='flex w-full h-full items-center justify-center'>

            <p className="text-gray-500">No product selected.</p>
            </div>
          )}
        </div>
      </div>


  )
}

export default ProductDrawer
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext';
import SearchSortBar from './SearchSortBar';
import { IoMdMore } from 'react-icons/io';
import { IoMdTrash } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import ConfirmationModal from './ConfirmationModal';
import AddProductModal from './AddProductModal';
import { FaPlus } from "react-icons/fa6";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Box from './Box';
import Loader from './Loader';
import Modal from './Modal';
import ProductDrawer from './ProductDrawer';

const ListProduct = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const itemsPerPage = 10;
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const columns = ["S.No", "Images", "Name", "Price", "Availability", "Category", "Action"];
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { initialLoading, productLoading, setPageTitle, currentPage, formatAmount, totalPages, allProducts, fetchPaginatedList, removeProduct } = useContext(ShopContext)

  const handleDropdownToggle = useCallback((productId) => {
    setActiveDropdown((prev) => (prev === productId ? null : productId));
  }, []);

  const observerRef = useRef(null); 
  const scrollTargetRef = useRef(null); 

  const loadMoreProducts = useCallback(() => {
    if (!isFetchingMore && currentPage < totalPages) {
      setIsFetchingMore(true);
      fetchPaginatedList(currentPage + 1, 10)
        .catch((error) => console.error('Error loading products:', error))
        .finally(() => setIsFetchingMore(false));
    }
  }, [isFetchingMore, currentPage, totalPages, fetchPaginatedList]);
  
  

  // Infinite scroll logic using IntersectionObserver
  useEffect(() => {
    // Disconnect any previously attached observer
    if (observerRef.current instanceof IntersectionObserver) {
      observerRef.current.disconnect();
    }
  
    // Create a new instance of the IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          console.log('Intersection triggered, loading more products...');
          loadMoreProducts();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );
  
    if (scrollTargetRef.current) {
      observerRef.current.observe(scrollTargetRef.current);
    }
  
    // Cleanup function to disconnect the observer
    return () => {
      if (observerRef.current instanceof IntersectionObserver) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreProducts, isFetchingMore]);
  
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete);
      setProductToDelete(null);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setProductToDelete(null);
    setIsModalVisible(false);
  };

  const handleProductClick = (order) => {
    setSelectedItem(order);
    setIsDrawerOpen(true);
    setActiveDropdown(false)
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeDrawer = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setSelectedItem(null);
    }, 300);
  };

  const handlePageChange = (page) => {
    fetchPaginatedList(page, itemsPerPage)
  };

  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPageTitle("All Products")
  }, [])

  return (
    <div>
      {initialLoading && <Loader type='full' />}
      <div className='flex gap-5 mb-4'>
        <SearchSortBar placeholder="Search product" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />
        <button onClick={() => setModalOpen(true)} className='px-4 border-0 bg-primary text-nowrap rounded-md text-white flex items-center justify-center gap-2 text-sm font-medium'><FaPlus />
          Add Product</button>
      </div>
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <OverviewCard
          title="Total Products"
          value={allProducts?.length || 0}
          icon={<IoMdMore className="text-xl text-primary" />}
        />
        <OverviewCard
          title="Total Revenue"
          value={`$${allProducts?.reduce((acc, prod) => acc + (prod.newPrice || 0), 0).toFixed(2)}`}
          icon={<MdRemoveRedEye className="text-xl text-green-600" />}
        />
        <OverviewCard
          title="Out of Stock"
          value={allProducts?.filter(prod => !prod.availibility).length}
          icon={<IoMdTrash className="text-xl text-red-500" />}
        />
        <OverviewCard
          title="Best Seller"
          value="Rolex Watch"
          icon={<BiPencil className="text-xl text-yellow-500" />}
        />
      </Box>
      <div className="mt-1 pb-5">
        <table className="min-w-full bg-white border shadow-sm">
          <thead>
            <tr className="bg-[#f2f2f2af] text-[#5c5c5c] text-sm">
              {columns.map((col) => (
                <th key={col} className={`py-3 px-4 border ${col === "S.No" && 'max-w-7'} `}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productLoading ? (
              Array(10).fill().map((_, i) => <SkeletonRow key={i} />)
            ) : (allProducts?.length > 0 ? (
              allProducts.map((product, index) => (
                <tr key={product._id} className="border-b text-center text-sm">
                  <td className="border py-2 px-4 border-r">{index + 1}</td>
                  <td className="py-2 px-4">
                    <LazyLoadImage
                      key={product.image[0]}
                      src={product.image[0]}
                      effect='blur'
                      alt={`Product ${product.name}`}
                      className="w-8 h-8 shrink-0 object-cover mx-auto rounded-sm transition-transform transform hover:scale-105 cursor-pointer"
                    />
                  </td>

                  <td className="border py-2 px-4 text-left">{product.name || 'Rolex Watch'}</td>
                  <td className="border py-2 px-4">{formatAmount(product.newPrice) || '3,999'}</td>
                  <td
                    className={`border py-2 px-4 text-left 
    ${product.availibility ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}`}
                  >
                    {product.availibility ? 'In Stock' : 'Out of Stock'}
                  </td>
                  <td className="border py-2 px-4 capitalize">{product.category || "Men's"}</td>

                  <td className="border py-2 px-4 text-xl relative cursor-pointer">
                    <button
                      aria-label={`Open actions for product ${product.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(product._id);
                        setSelectedItem(product);
                      }}
                    >
                      <IoMdMore className="m-auto" />
                    </button>

                    {activeDropdown === product._id && (
                      <div
                        className="absolute text-sm right-4 top-10 bg-white shadow-lg z-20 border rounded-sm p-1 w-36"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(null);
                        }}
                        ref={wrapperRef}
                      >
                        <ul className="text-left">
                          <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                            <BiPencil className='text-lg' />
                            Edit
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100 text-[red] cursor-pointer flex items-center gap-2" onClick={() => handleDeleteClick(product._id)}>
                            <IoMdTrash className='text-lg' />
                            Delete
                          </li>
                          <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={() => handleProductClick(product)}>
                            <MdRemoveRedEye className='text-lg' />
                            View Details
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>

              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="py-4 text-base text-center text-[#c3c3c3]"
                >
                  No products found.
                </td>
              </tr>)
            )}
          </tbody>
        </table>

<div ref={observerRef} className="h-10 w-full bg-red-300"></div>
{isFetchingMore && <Loader />}
        {/* { <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
      </div> 

      {isDrawerOpen && <ProductDrawer title={'Product Details'} selectedItem={selectedItem} closeDrawer={closeDrawer} isAnimating={isAnimating} />}

      <ConfirmationModal show={isModalVisible} title={'Delete Product'} message={'Are you sure you want to delete this product?'} confirmText={'Delete'} cancelText={'Cancel'} onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        onClose={() => setIsModalVisible(false)} />

      <Modal isOpen={isModalOpen} title='Add Product'
        onClose={() => setModalOpen(false)}>
        <AddProductModal onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}

const OverviewCard = ({ isLoading, title, value, icon }) => {
  return (
    <div className="p-4 rounded border flex items-center">
      <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-100 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-semibold text-gray-500">{title}</h3>
        {isLoading && isLoading ? (
          <div className="h-4 bg-gray-300 rounded w-12 mt-1"></div>
        ) : (
          <p className="text-md font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
};

// const OverviewCard = ({ title, value, icon }) => {
//   return (
//     <div className="bg-white border border-gray-200 p-2 rounded flex items-center justify-between">
//       <div className="flex flex-col">
//         <h3 className="text-xs font-semibold text-gray-500">{title}</h3>
//         <p className="text-md font-bold text-gray-800">{value}</p>
//       </div>
//       <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
//         {icon}
//       </div>
//     </div>
//   );
// };

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="w-12 h-12 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
    <td className="p-4"><div className="h-4 bg-gray-300 rounded"></div></td>
  </tr>
);


export default ListProduct
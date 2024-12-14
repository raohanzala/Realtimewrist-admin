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
import Loader from './Loader';
import Modal from './Modal';
import ProductDrawer from './ProductDrawer';
import ProductItem from './ProductItem';

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

      <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {allProducts.length > 0 && (
            allProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                description={item.description}
                newPrice={item.newPrice}
                oldPrice={item.oldPrice}
                id={item._id}
                image={item.image}
                size={item.sizes}
              />
            ))
          )}
        </div>




      <div ref={observerRef} className="h-10 w-full bg-red-300"></div>
      {isFetchingMore && <Loader />}
      {/* { <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}

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
import React, { useState } from 'react'
import SearchSortBar from './SearchSortBar';
import Button from './Button';
import { FaPlus } from 'react-icons/fa6';

const ProductsTableOperation = () => {

  const [isProductModal, setIsProductModal] = useState(false);

  return (
    <div className="flex gap-5 mb-8">
            <SearchSortBar
              placeholder="Search product"
              sortOptions={["recent", "date"]}
              filterOptions={["recent", "date"]}
            />
    
            <Button
              onClick={(e) => {setIsProductModal(true); e.stopPropagation()}}
              startIcon={<FaPlus />}
              variant="secondary"
              className='rounded'
            >
              Add Product
            </Button>
          </div>
  )
}

export default ProductsTableOperation
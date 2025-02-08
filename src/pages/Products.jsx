import React, { useState } from 'react'
import SearchSortBar from '../components/SearchSortBar';
import Button from '../components/Button';
import { FaPlus } from 'react-icons/fa6';
import ProductsTable from '../components/ProductsTable';
import AddProductForm from '../components/CreateProductForm';

const Products = () => {

  return (
    <div>
      {/* <div className="flex gap-5 mb-8">
        <SearchSortBar
          placeholder="Search product"
          sortOptions={["recent", "date"]}
          filterOptions={["recent", "date"]}
        />
        <AddProductForm />
      </div> */}
      <ProductsTable />
    </div>
  )
}

export default Products
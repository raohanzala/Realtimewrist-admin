import React, { useState, useEffect } from "react";
import axios from 'axios'; // For API calls
import { RiSearchLine } from "react-icons/ri";

const SearchSortBar = ({
  placeholder,
  sortOptions,
  filterOptions,
  className,
  onResults
}) => {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products', {
        params: {
          query: searchQuery,
          sortBy: sortBy,
          category: filterBy,
          page: page,
          limit: limit
        }
      });
      onResults(data.products); // Send products to parent
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Trigger fetch when any of the filters, search or sorting change
  useEffect(() => {
    fetchProducts();
  }, [searchQuery, sortBy, filterBy, page]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`w-full flex justify-between ${className}`}>
      {/* 🔍 Search Box */}
      <div className="flex items-center border border-gray-300 bg-white rounded-md overflow-hidden">
        <span className="flex items-center pl-3 text-[#5c5c5c]">
          <RiSearchLine />
        </span>
        <input
          className="py-[10px] px-2 text-sm w-64 focus:outline-none shadow-sm"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

<div className="flex gap-3">

      {/* ⏫ Sort Dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded-md shadow-sm focus:outline-none text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              Sort by {option}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 Filter Dropdown */}
      <div className="relative">
        <select
          value={filterBy}
          onChange={handleFilterChange}
          className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded-md shadow-sm focus:outline-none text-sm"
        >
          <option value="">All Categories</option> 
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              Filter by {option}
            </option>
          ))}
        </select>
      </div>
          </div>
    </div>
  );
};

export default SearchSortBar;

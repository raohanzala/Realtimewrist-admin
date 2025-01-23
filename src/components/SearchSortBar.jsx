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
      onResults(data.products); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
      <div className="flex items-center border border-gray-300 bg-white rounded overflow-hidden focus-within:shadow-md transition-shadow duration-300">
        <span className="flex items-center pl-3 text-[#5c5c5c]">
          <RiSearchLine />
        </span>
        <input
          className="py-[10px] px-2 text-sm w-64 focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex gap-3">
        <div className="relative">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded  text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                Sort by {option}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={filterBy}
            onChange={handleFilterChange}
            className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded  text-sm"
          >
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

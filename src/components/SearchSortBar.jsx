import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // For handling URL updates
import CustomSelect from "./CustomSelect";
import { BiArrowFromLeft, BiPrinter } from "react-icons/bi";
import { MdDateRange, MdHighQuality } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { CgFilters } from "react-icons/cg";

const SearchSortBar = ({
  placeholder,
  sortOptions,
  filterOptions,
  className,
}) => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Sync search parameters with the URL query
    const params = new URLSearchParams();

    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (filterBy) params.set("filterBy", filterBy);

    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, sortBy, filterBy, navigate]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleFilterChange = (value) => {
    setFilterBy(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`w-full flex justify-between ${className}`}>
      <div className="flex items-center border border-gray-300 bg-white rounded overflow-hidden focus-within:shadow-md transition-shadow duration-200">
        <span className="flex items-center pl-3 text-[#5c5c5c]">
          <RiSearchLine />
        </span>
        <input
          className="py-[8px] px-2 text-sm w-64 focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex gap-3">

        <CustomSelect icon={<BiPrinter />} options={['portrait', 'landscape']} />

        {sortOptions &&
          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
          />
        }

        {filterOptions &&
          <CustomSelect
            options={filterOptions}
            value={filterBy}
            icon={<CgFilters />}
            onChange={handleFilterChange}
            placeholder="Filter by category"
          />}

        {/* {sortOptions && (
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  Sort by {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {filterOptions && (
          <div className="relative">
            <select
              value={filterBy}
              onChange={handleFilterChange}
              className="border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded text-sm"
            >
              <option value="">All Categories</option>
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  Filter by {option}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SearchSortBar;

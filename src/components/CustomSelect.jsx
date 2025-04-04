import { useState, useEffect, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import { truncateText } from "../helpers";

const CustomSelect = ({ options, value, onChange, icon, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onChange(option); // This should update the value in the parent state
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full text-dark-3" ref={dropdownRef}>
      <div
        className="w-full flex gap-1 cursor-pointer capitalize truncate items-center border border-gray-300 bg-white text-sm px-3 py-2 h-full rounded outline-none transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {icon && <span className="text-lg">{icon}</span>}
        {(placeholder || value) && truncateText(value || placeholder, 16)}
        <BiChevronDown className={`w-4 h-4 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute left-[50%] -translate-x-[50%] w-full min-w-[160px] capitalize mt-2 bg-white border border-gray-200 rounded shadow-md z-50">
          <>
            {options.map((option) => (
              <div
                key={option}
                className={`flex gap-2 items-center truncate justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${value === option ? "bg-gray-100" : ""
                  }`}
                onClick={() => handleSelect(option)}
              >
                {truncateText(option, 16)}
                {value === option && <HiCheck className="w-4 h-4 shrink-0 text-primary" />}
              </div>
            ))}
          </>
        </div>
      )
      }
    </div >
  );
};

export default CustomSelect;

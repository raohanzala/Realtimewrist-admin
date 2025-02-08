import React from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const PopupMenu = ({ 
  actions = [], 
  position = { top: "5px", right: "2px" }, 
  onClose, 
  className = "", 
  style = {} 
}) => {
  const ref = useOutsideClick(onClose, false); // Detect outside clicks to close the popup

  return (
    <div
      ref={ref}
      className={`absolute z-20 bg-white rounded-sm shadow-md w-44 text-sm ${className}`}
      style={{ ...position, ...style }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="text-left">
        {actions.map((action, index) => (
          <li
            key={index}
            className="px-3 py-2 text-[#525252] hover:bg-gray-100 cursor-pointer flex items-center gap-4"
            onClick={()=> {action.onClick(); onClose()}}
          >
            {action.icon && <span className="text-lg text-[#8f8f8f]">{action.icon}</span>}
            {action.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopupMenu;

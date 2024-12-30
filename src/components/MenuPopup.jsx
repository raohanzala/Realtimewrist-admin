import React from 'react'
import { BiPencil } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';
import { MdRemoveRedEye } from 'react-icons/md';

const MenuPopup = ({wrapperRef, handleDeleteClick, handleEditClick, setActiveDropdown}) => {


  return (
    <div
            className="absolute text-sm right-2 top-5 bg-white z-20 rounded-sm w-44"
            style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(null);
            }}
            ref={wrapperRef}
          >
            <ul className="text-left ">
              <li 
                className="px-3 py-3 text-[#525252] hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                onClick={handleEditClick}
              >
                <BiPencil className="text-lg text-[#8f8f8f]" />
                Edit Product
              </li>
              <li 
                className="px-3 py-2 text-[#525252] hover:bg-gray-100  cursor-pointer flex items-center gap-4" 
                onClick={handleDeleteClick}
              >
                <IoMdTrash className="text-lg text-[#8f8f8f]" />
                Delete Product
              </li>
              <li 
                className="px-3 py-2 text-[#525252] hover:bg-gray-100 cursor-pointer flex items-center gap-4" 
                // onClick={() => handleProductClick(product)}
              >
                <MdRemoveRedEye className="text-lg text-[#8f8f8f]" />
                See Preview
              </li>
            </ul>
          </div>
  )
}

export default MenuPopup
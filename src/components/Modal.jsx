import React from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Modal = ({ title, children, isOpen, onClose }) => {

  const ref = useOutsideClick(onClose, false)

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur bg-black bg-opacity-30 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
         bg-white rounded shadow-lg max-h-[90vh] overflow-y-scroll scrollbar-hide p-6"
         ref={ref}
      >
        <div className='flex w-full justify-between items-center'>

          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className=" text-2xl ml-auto text-[#666666] hover:text-black "
          >
            &times;
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

const Modal = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" 
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-scroll scrollbar-hide p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-2xl mb-4 text-center font-semibold">{title}</h2>}

        {/* Modal Content */}
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

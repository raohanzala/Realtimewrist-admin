import React, { useContext } from 'react';
import Loader from './Loader';
import { ShopContext } from '../contexts/ShopContext';

const Button = ({ children, className = '', btnType, ...rest }) => {
  const { actionLoading } = useContext(ShopContext);
  
  const baseClasses = 'bg-[#232323] py-2 text-white px-6 rounded-md text-base min-w-8';
  const loadingClasses = actionLoading ? 'bg-gray-400 cursor-not-allowed' : '';
  const cancelClasses = btnType === 'cancel' ? 'bg-transparent border-2 text-[#000]' : '';

  return (
    <button 
      className={`${baseClasses} ${loadingClasses} ${cancelClasses} ${className} min-w-`} 
      disabled={actionLoading && btnType !== 'cancel'} 
      {...rest}
    >
      {actionLoading && btnType !== 'cancel' ? <Loader  className='size-5 border-white' /> : children}
    </button>
  );
}

export default Button;

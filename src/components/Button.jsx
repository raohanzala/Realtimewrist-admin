import React from 'react';

const Button = ({ children, startIcon, variant = 'primary', size = 'large', ...rest }) => {
  const baseStyles =
    'flex items-center justify-center text-nowrap min-w-[120px] rounded-sm space-x-2 transition-all';

  const variantStyles = {
    primary: 'bg-dark-2 text-white hover:bg-dark-1',
    secondary: 'bg-primary-1 hover:bg-primary-2 text-[#fff]',
    cancel: 'bg-white border-2 border-[#cccc] text-dark-3 min-w-[80px]',
    delete : 'bg-[red] text-white'
  };

  const sizes = {
    medium :  `py-2 px-5 text-sm`,
    large : `py-3 px-5 text-[14px]`
  }

  return (
    <button
      {...rest}
      className={`${baseStyles} ${variantStyles[variant]} ${sizes[size]} ${rest.className}`}
    >
      {startIcon && <span className='text-lg'>{startIcon}</span>}
      <div className="flex items-center justify-center w-full">
        {children}
      </div>
    </button>
  );
};

export default Button;

import React from 'react';

const Button = ({ children, startIcon, variant = 'primary', ...rest }) => {
  const baseStyles =
    'flex items-center justify-center rounded-sm text-nowrap min-w-[120px]  text-sm py-2 px-5 space-x-2 transition-all';

  const variantStyles = {
    primary: 'bg-dark-2 text-white hover:bg-dark-1',
    primaryBig: 'bg-dark-2 text-white hover:bg-dark-1 py-3 px-8 uppercase rounded',
    cancel: 'bg-white border-2 border-[#cccc] text-dark-3 min-w-[80px]',
    secondary: 'bg-primary-1 hover:bg-primary-2 text-[#fff]',
    delete : 'bg-[red] text-white'
  };

  return (
    <button
      {...rest}
      className={`${baseStyles} ${variantStyles[variant]} ${rest.className}`}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      <div className="flex items-center justify-center w-full">
        {children}
      </div>
    </button>
  );
};

export default Button;

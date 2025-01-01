import React from 'react';

const Button = ({ children, startIcon, variant = 'primary', ...rest }) => {
  const baseStyles =
    'flex items-center justify-center rounded-sm text-nowrap disabled:opacity-75 min-w-[120px] disabled:cursor-not-allowed text-sm py-2 px-5 space-x-2 transition-all';

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
      // style={{ minWidth: '120px' }} // Set a fixed minimum width for consistency
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <div className="flex items-center justify-center w-full">
        {children}
      </div>
    </button>
  );
};

export default Button;

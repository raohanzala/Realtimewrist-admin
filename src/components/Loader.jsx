import React from "react";

function Loader({ className, color = '#fce17e', type, ...rest }) {
  return (
    <div className={` w-full h-full flex justify-center z-[9999] items-center ${type === 'full' && 'bg-[rgba(0,0,0,0.3)] fixed inset-0 backdrop-blur '} `}>
        <div className={`size-10 border-4 border-[#fce17e] border-solid rounded-full animate-spin  border-t-transparent ${className} ${color && `border-${color}`}`} {...rest}></div> 
    </div>
  );
}

export default Loader;

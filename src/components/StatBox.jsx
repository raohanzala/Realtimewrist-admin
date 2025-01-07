import React from 'react'
import Box from './Box'

const StatBox = ({ bgColor, icon, title, isLoading, value, valueColor }) => {
  return (
    <div className='bg-white border-[#f3f4f6] border rounded overflow-hidden'>
      <div className="flex h-full items-center gap-4">
        <div className={`px-7 flex items-center justify-center h-full ${bgColor}`}>
          {icon}
        </div>
        <div className='p-2 py-5'>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default StatBox
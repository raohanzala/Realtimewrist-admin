import React from 'react'
import Box from './Box'

const StatBox = ({ bgColor, icon, title, isLoading, value, valueColor }) => {
  return (
    <Box>
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-full ${bgColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          )}
        </div>
      </div>
    </Box>
  );
};


export default StatBox
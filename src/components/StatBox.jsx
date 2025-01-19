const StatBox = ({ bgColor, icon, title, isLoading, value, valueColor }) => {
  return (
    <div className='bg-white border-[#f3f4f6] border rounded overflow-hidden'>
      <div className="flex h-full items-center gap-3 ">
        <div className={`px-7 flex items-center  justify-center h-full ${bgColor}`}>
          {icon}
        </div>
        <div className=' py-4'>
          <h3 className="text-lg font-semibold text-gray-600 ">{title}</h3>
          {isLoading ? (
            <p className="text-sm text-gray-700 animate-pulse">Loading...</p>
          ) : value ? (
            <p className={`text-2xl font-bold  ${valueColor}`}>{value}</p>
          ) : <p className='text-gray-400  font-extrabold'>_ _</p>}
        </div>
      </div>
    </div>
  );
};


export default StatBox
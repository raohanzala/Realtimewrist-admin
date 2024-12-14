import React from 'react'

const RecentOrderItem = () => {

    const description = "6-Speed Manual, S54 6-Cylinder, Southern-Owned, Some Modifications";
  
  // Limit description to the first 10 words
  const shortDescription = description.length > 40 ? description.slice(0, 40) + "..." : description;

  return (
    <div className="p-2 px-3 flex justify-between gap-2 items-center relative border-b mb-5">
    <div className="w-12 h-12 object-cover rounded-full flex-shrink-0 overflow-hidden">
      <img
        className="w-full h-full"
        src={
          "https://images.unsplash.com/photo-1549049950-48d5887197a0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt=""
      />
    </div>
    <div className="absolute -top-3 rounded-sm shadow-md -right-2 p-1 bg-gradient-to-r from-[#4ED493] to-[#4bc1b2]">
      <h3 className="text-xs uppercase text-white">Best selling</h3>
    </div>
    <div className="text-base mr-auto ml-4 text-[#333]">Room Spray</div>
    <p className="text-xs hidden lg:block text-[#7f7f7f] mr-auto">
      {shortDescription}
    </p>
    <div className='text-sm font-medium'> 1,899/- PKR</div>
  </div>
  )
}

export default RecentOrderItem
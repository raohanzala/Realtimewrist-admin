import React from 'react'
import HeadingLink from './HeadingLink'
import RecentOrderItem from './RecentOrderItem'

function RecentOrderSection() {
  return (
    <div>
    <HeadingLink heading="Recent Orders" link="/orders" />

    <div className="bg-white rounded-xl shadow-sm min-h-[380px] w-full px-5 py-7">
      <RecentOrderItem/>
      <RecentOrderItem/>
      <RecentOrderItem/>
      <RecentOrderItem/>
      <RecentOrderItem/>
    </div>
  </div>
  )
}

export default RecentOrderSection
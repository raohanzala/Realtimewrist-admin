import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import Box from './Box'
import HeadingLink from './HeadingLink'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { timestampToShortDate } from '../helpers'

const LatestCustomers = () => {

  const { allUsers, usersLoading } = useContext(ShopContext);

  return (
    <div className='min-h-64 flex flex-col'>
      <HeadingLink title="Latest Customers" link='/users' />
      {usersLoading ? <p>Loading...</p> : allUsers?.length > 0 ?
        allUsers.slice(0, 5).map((user, index) => (
          <div className={`flex  ${index !== 4 && 'border-b'} justify-between items-center py-2 px-2 cursor-pointer hover:bg-gray-100`} key={user._id}>
            <div className="flex gap-3 items-center">
              <div className="bg-gray-300 rounded-full text-2xl p-2 text-white">
                <BsFillPersonFill />
              </div>

              <div>
                <p>{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>

            </div>
            <p className="text-sm">{timestampToShortDate(user.date)}</p>
          </div>

        )) : <div className=" w-full h-full flex flex-1  items-center justify-center"> <p className=" text-[#d2d2d2] mb-10">You have no customers yet.</p></div>
      }
    </div>
  )
}

export default LatestCustomers
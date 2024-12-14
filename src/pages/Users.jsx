import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import Loader from '../components/Loader'
import SearchSortBar from '../components/SearchSortBar'
import { IoMdPerson } from "react-icons/io";

const Users = () => {

  const { initialLoading, allUsers, timestampToShortDate } = useContext(ShopContext)

  return (
    <div>
      {initialLoading && <Loader type='full' />}
      <SearchSortBar placeholder="Search product" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />

      <div className='grid gap-5 grid-cols-4 py-8'>
        {allUsers.map((user) => (
          <div className='rounded-md border relative overflow-hidden' key={user._id}>
            <div className='bg-primary py-1 px-2 text-white z-10 absolute text-xs top-0 right-0'>Customer</div>
            <div className='bg-gray-100 py-4'>
              <IoMdPerson className='text-5xl text-white m-auto' />
            </div>
            <div className='bg-white text-center py-3 px-2'>
              <h2>{user.name}</h2>
              <p className='text-sm text-gray-500'>{user.email}</p>

              <div className='flex justify-between text-xs text-gray-500 mt-3'>
                <p>Orders#2</p>
                <p>{timestampToShortDate(user.date)}</p>
              </div>
            </div>
          </div>
        ))
        }
      </div>

    </div>
  )
}

export default Users
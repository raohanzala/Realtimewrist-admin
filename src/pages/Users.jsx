import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import Loader from '../components/Loader'
import SearchSortBar from '../components/SearchSortBar'
import { IoMdPerson } from "react-icons/io";
import { timestampToShortDate } from '../helpers'

const Users = () => {

  const { isLoading, allUsers, usersLoading } = useContext(ShopContext)
  // const usersLoading = true

  return (
    <div>
      {isLoading && <Loader type='full' />}
      <SearchSortBar placeholder="Search product" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />

      <div className='grid gap-5 grid-cols-4 py-8'>
        {usersLoading ? <SkeletonRow /> : allUsers.length > 0 ? allUsers.map((user) => (
          <div className='rounded-md border relative overflow-hidden' key={user._id}>
            <div className='bg-primary-1 py-1 px-2 text-white z-10 absolute text-xs top-0 right-0'>Customer</div>
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
        )): <p className="py-4 text-base text-center text-[#c3c3c3]"
        >
          No users found.</p>
        }
      </div>

    </div>
  )
}

const SkeletonRow = () => {
  const skeletons = Array(8).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse border rounded-md"
        >
          <div className="w-full h-28 bg-gray-200"></div>

          <div className='py-4'>
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-2 m-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-2/4 m-auto"></div>
            <div className='flex justify-between text-xs text-gray-500 mt-3 px-2'>
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users
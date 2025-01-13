import HeadingLink from './HeadingLink'
import Empty from './Empty'
import SpinnerMini from './SpinnerMini'
import { useUsers } from '../features/useUsers'
import { timestampToShortDate } from '../helpers'
import { BsFillPersonFill } from 'react-icons/bs'
import Box from './Box'

const LatestCustomers = () => {

  const {users, isLoading} = useUsers()

  return (
    <Box>
    <div className='min-h-64 flex flex-col'>
      <HeadingLink title="Latest Customers" link='/users' />
      {isLoading ? <SpinnerMini variant='secondary'/> : users?.length > 0 ?
        users.slice(0, 5).map((user, index) => (
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

        )) : <div className=" w-full h-full flex flex-1  items-center justify-center"> <Empty resourceName='customers'/></div>
      }
    </div>
    </Box>
  )
}

export default LatestCustomers
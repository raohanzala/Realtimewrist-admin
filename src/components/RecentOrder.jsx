import HeadingLink from './HeadingLink'
import StatusLabel from './StatusLabel'
import { IoMdMore } from 'react-icons/io'
import { BsDot } from "react-icons/bs";
import { formatAmount } from '../helpers'
import { CURRENCY } from '../utils/constants'
import SpinnerMini from './SpinnerMini'
import Empty from './Empty'
import { useOrders } from '../features/useOrders'
import Box from './Box';

const RecentOrder = () => {
  const {orders, isLoading} = useOrders()
  return (
    <Box>
    <div className='min-h-64 flex flex-col'>
      <HeadingLink title='Recent Orders' link='/orders' />
        {isLoading ? <SpinnerMini variant='secondary'/> : orders?.length > 0 ?
          <div>
            {
              orders.slice(0, 3).map((order, index) => (<div className={`py-3 flex justify-between ${index !== 2 && 'border-b'} gap-5`} key={order._id}>
                <div className="space-y-1">

                  <div className="flex gap-2 items-center">
                    <h2 className="font-medium text-lg">{order._id}</h2>
                    <StatusLabel status={order.status} />
                  </div>
                  <div className="flex gap-3">
                    <div className="text-sm">{order?.items[0]?.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div>{CURRENCY} {formatAmount(order?.amount || 777)}</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{order?.quantity} items</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>4 March, 2024</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{order?.address?.name}</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>Lines Area, Karachi</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <p>{order?.address?.city}</p> <p>{order?.address?.phone}</p>
                  </div>
                </div>
                <div>
                  <IoMdMore className="text-lg cursor-pointer" />
                </div>
              </div>
              ))
            }
          </div>
          : <div className="flex flex-1 w-full h-full items-center justify-center"> <Empty resourceName='recent orders'/></div>}
    </div>
    </Box>
  )
}

export default RecentOrder
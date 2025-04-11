import HeadingLink from './HeadingLink'
import StatusLabel from './StatusLabel'
import { IoMdMore } from 'react-icons/io'
import { BsDot } from "react-icons/bs";
import { formatAmount, formatTimeAgo, truncateText } from '../helpers'
import { CURRENCY } from '../utils/constants'
import SpinnerMini from './SpinnerMini'
import Empty from './Empty'
import { useOrders } from '../features/useOrders'
import Box from './Box';
import { Link } from 'react-router-dom';

const RecentOrder = () => {
  const { orders, isLoading } = useOrders()
  return (
    <Box>
      <div className='min-h-64 flex flex-col'>
        <HeadingLink title='Recent Orders' link='/orders' />
        {isLoading ? <SpinnerMini variant='secondary' /> : orders?.length > 0 ?
          <div >
            {
              orders.slice(0, 4).map((order, index) => (<div className={`py-3 px-2 cursor-pointer flex hover:bg-gray-50 justify-between ${index !== 3 && 'border-b'} gap-2`} key={order._id}>
                <Link to={`/order/${order._id}`} className="space-y-1 ">

                  <div className="flex gap-2 items-center">
                    <h2 className="font-medium text-lg">{order._id}</h2>
                    <StatusLabel status={order.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm">{truncateText(order?.items[0]?.name, 18)}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <div>{CURRENCY} {formatAmount(order?.amount)}</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{order?.quantity} items</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{formatTimeAgo(order?.date)}</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{order?.address?.name}</div>
                      <BsDot className="text-gray-500 text-lg" />
                      <div>{order?.address?.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <p>+92 {order?.address?.phone}</p>
                  </div>
                </Link>
              </div>
              ))
            }
          </div>
          : <div className="flex flex-1 w-full h-full items-center justify-center"> <Empty resourceName='recent orders' /></div>}
      </div >
    </Box >
  )
}


export default RecentOrder
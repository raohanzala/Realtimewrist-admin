import HeadingLink from './HeadingLink'
import { formatAmount, formatTimeAgo, formatTimestamp, truncateText } from '../helpers';
import { CURRENCY } from '../utils/constants';
import Empty from './Empty';
import { useProducts } from '../features/useProducts';
import SpinnerMini from './SpinnerMini';
import Box from './Box';
import { useOrdersDetails } from '../features/useOrdersDetails';
import { Link } from 'react-router-dom';

const TopProducts = () => {


  const { topProducts, isPending, } = useOrdersDetails()

  return (
    <Box>
      <div className='min-h-64 flex flex-col'>

        <HeadingLink title='Top Products By Sale' link='/list' />
        {isPending ? <SpinnerMini variant='secondary' /> : topProducts?.length > 0 ? <ul >
          {topProducts.map((product, index) => (
            <Link to={`/product/${product.productId}`}
              key={product.productId}
              className={`flex justify-between ${index !== 4 && 'border-b'} cursor-pointer items-center gap-4 py-3 px-2 hover:bg-gray-50 transition-all`}
            >
              {/* Left: Product Image and Info */}
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  className="w-12 h-12 rounded-full object-cover border"
                  alt={product.name}
                />
                <div>
                  <h3 className="font-semibold text-sm">{truncateText(product.name, 16)}</h3>
                  <div className="text-xs text-gray-500">
                    Sold: <span className="font-medium">{product.totalSales}</span> pcs
                  </div>
                </div>
              </div>

              {/* Middle: Last Sold Date */}
              <div className="text-xs text-gray-400 w-28 text-center hidden sm:block">
                <div>Last Sold</div>
                <div className="text-gray-600">{formatTimeAgo(product.lastSoldDate)}</div>
              </div>

              {/* Right: Revenue */}
              <div className="text-right">
                <div className="text-xs text-gray-400">Total Revenue</div>
                <div className="font-bold text-green-600">
                  {CURRENCY}{formatAmount(product.totalRevenue)}
                </div>
              </div>
            </Link>
          ))}


        </ul> : <div className="flex flex-1 w-full h-full items-center justify-center"> <Empty resourceName='products' /></div>}
      </div>
    </Box>
  )
}

export default TopProducts
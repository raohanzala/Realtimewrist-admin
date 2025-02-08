import HeadingLink from './HeadingLink'
import { formatAmount } from '../helpers';
import { CURRENCY } from '../utils/constants';
import Empty from './Empty';
import { useProducts } from '../features/useProducts';
import SpinnerMini from './SpinnerMini';
import Box from './Box';

const TopProducts = () => {

  const {products, isLoading} = useProducts()
  return (
    <Box>
    <div className='min-h-64 flex flex-col'>
          <HeadingLink title='Top Products' link='/list' />
          {isLoading ? <SpinnerMini variant='secondary'/> : products?.length > 0 ? <ul className="space-y-2">
            {products.slice(0, 3).map((product) => (
              <li key={23892389} className={`flex justify-between ${'border-b'} items-center py-2 px-2 text-gray-700`}>
                <div className="flex gap-2 items-center">
                  <img src={product.images[0]} className="size-12 rounded-full object-cover" alt="" />
                  <div>
                    <h3>{product.name}</h3>
                    <div className="space-x-2 text-xs text-gray-400">
                      <span>{product.category.name}</span>
                      <span>{product.subCategory}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold">{CURRENCY}{formatAmount(product.newPrice)}</span>
              </li>
            ))}
          </ul> : <div className="flex flex-1 w-full h-full items-center justify-center"> <Empty resourceName='products'/></div>}
        </div>
        </Box>
  )
}

export default TopProducts
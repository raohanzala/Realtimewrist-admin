import React, { useContext } from 'react'
import HeadingLink from './HeadingLink'
import Box from './Box'
import { ShopContext } from '../contexts/ShopContext';
import { formatAmount } from '../helpers';
import { CURRENCY } from '../utils/constants';

const TopProducts = () => {

  const { allProducts, productLoading,} = useContext(ShopContext);
  return (
    <div className=' min-h-64 flex flex-col'>
          <HeadingLink title='Top Products' link='/list' />
          {productLoading ? <p>Loading...</p> : allProducts?.length > 0 ? <ul className="space-y-2">
            {allProducts.slice(0, 3).map((product) => (
              <li key={23892389} className={`flex justify-between ${'border-b'} items-center py-2 px-2 text-gray-700`}>
                <div className="flex gap-2 items-center">
                  <img src={product.images[0]} className="size-12 rounded-full object-cover" alt="" />
                  <div>
                    <h3>{product.name}</h3>
                    <div className="space-x-2 text-xs text-gray-400">
                      <span>{product.category}</span>
                      <span>{product.subCategory}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold">{CURRENCY}{formatAmount(product.newPrice)}</span>
              </li>
            ))}
          </ul> : <div className="flex flex-1 w-full h-full items-center justify-center"> <p className=" text-[#d2d2d2] mb-10">You have no products yet.</p></div>}
        </div>
  )
}

export default TopProducts
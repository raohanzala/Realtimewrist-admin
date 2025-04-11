import React from 'react'
import Box from './Box'
import HeadingLink from './HeadingLink'
import { useOrdersDetails } from '../features/useOrdersDetails'
import { formatAmount } from '../helpers'
import { CURRENCY } from '../utils/constants'
import { FiArrowDownRight, FiArrowUpRight, FiMinus } from 'react-icons/fi'

const TopOrderCities = () => {

  const { isPending, topCities } = useOrdersDetails()

  return (
    <Box>
      <HeadingLink title="Top Cities By Sale" />
      <div className='min-h-64 flex flex-col'>
        {topCities?.map((city, index) => (
          <div key={index} className={`  ${index !== 3 && 'border-b'} cursor-pointer hover:bg-gray-50 flex justify-between items-center py-3 border-b px-2`}>
            <div>
              <h2 className="text-base font-semibold">{city._id}</h2>
              <div className="text-xs text-gray-400">
                Orders: {city.totalOrders} • {city.orderChangePercent}% change
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                {CURRENCY}{formatAmount(city.totalSales)}
              </span>

              {/* Trend Arrow with Icon */}
              {city.trend === 'up' && (
                <FiArrowUpRight className="text-green-500 text-xl" title="Growing" />
              )}
              {city.trend === 'down' && (
                <FiArrowDownRight className="text-red-500 text-xl" title="Declining" />
              )}
              {city.trend === 'neutral' && (
                <FiMinus className="text-gray-400 text-xl" title="Stable" />
              )}
            </div>
          </div>
        ))}


      </div>
    </Box>
  )
}

export default TopOrderCities
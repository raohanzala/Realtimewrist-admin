import { IoBagCheckOutline, IoBarChartOutline, IoCalendarOutline, IoCashOutline, IoCubeOutline, IoPeopleOutline, IoTrendingUpOutline, IoWalletOutline } from 'react-icons/io5';
import { formatAmount } from '../helpers';
import { useOrdersDetails } from '../features/useOrdersDetails';
import { CURRENCY } from '../utils/constants';
import Box from './Box';

const DashboardStats2 = () => {

  const {
    isPending,
    todayOrdersValue,
    yesterdayOrdersValue,
    thisMonthOrdersValue,
    lastMonthOrdersValue,
    allTimeSalesValue,
  } = useOrdersDetails();

  const statsData = [
    {
      bgColor: 'bg-blue-100',
      iconBg: 'bg-blue-700', // Slightly darker shade for contrast
      icon: <IoBagCheckOutline className="text-white text-4xl" />, // Icon for orders
      title: 'Today Orders',
      value: todayOrdersValue,
      valueColor: 'text-blue-700',
    },
    {
      bgColor: 'bg-yellow-100',
      iconBg: 'bg-yellow-600',
      icon: <IoCalendarOutline className="text-white text-4xl" />, // Icon for yesterday (calendar)
      title: 'Yesterday Orders',
      value: yesterdayOrdersValue,
      valueColor: 'text-yellow-600',
    },
    {
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-600',
      icon: <IoTrendingUpOutline className="text-white text-4xl" />, // Icon for revenue (upward trend)
      title: 'This Month',
      value: thisMonthOrdersValue,
      valueColor: 'text-green-600',
    },
    {
      bgColor: 'bg-purple-100',
      iconBg: 'bg-purple-600',
      icon: <IoBarChartOutline className="text-white text-4xl" />, // Icon for last month's performance (bar chart)
      title: 'Last Month',
      value: lastMonthOrdersValue,
      valueColor: 'text-purple-600',
    },
    {
      bgColor: 'bg-red-100',
      iconBg: 'bg-red-600',
      icon: <IoWalletOutline className="text-white text-4xl" />, // Icon for all-time sales (wallet or earnings)
      title: 'All-Time Sales',
      value: allTimeSalesValue,
      valueColor: 'text-red-600',
    },
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
      {statsData.map(({ bgColor, iconBg, icon, title, value, valueColor }, index) => (
        <Box
          className={`p-6 rounded bg-white`}
          key={index}
        >
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full ${iconBg} mb-4`}>{icon}</div>
            <h3 className="text-gray-600 font-medium text-lg">{title}</h3>
            {isPending ? (
              <p className="text-gray-400 animate-pulse mt-2">Loading...</p>
            ) : value ? (
              <p className={`text-xl font-bold ${valueColor} mt-2`}>
                {CURRENCY}
                {formatAmount(value)}
              </p>
            ) : (
              <p className="text-gray-400 font-extrabold mt-2">_ _</p>
            )}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default DashboardStats2;

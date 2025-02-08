import { IoBagCheckOutline, IoCashOutline, IoCubeOutline, IoPeopleOutline } from 'react-icons/io5';
import StatBox from "../components/StatBox";
import { formatAmount } from '../helpers';
import { useOrders } from '../features/useOrders';
import { useProducts } from '../features/useProducts';
import { useUsers } from '../features/useUsers';
import { useOrdersDetails } from '../features/useOrdersDetails';

const DashboardTopStats = () => {

    const {isLoading : isOrdersLoading , totalOrders} = useOrders()
    const {isLoading : isProductLoading , totalProducts} = useProducts()
    const {isLoading : isUsersLoading, totalUsers} = useUsers()
    const {totalRevenue,
      totalRevenueAmount,
      completedOrders,
      averageOrderValue,
      pendingOrders,
      canceledOrders,
      topProducts,
      dailyOrders,
      repeatCustomers,
      averageCompletionTime} = useOrdersDetails()
  
  const statsData = [
    { bgColor: 'bg-[#F35C86]', title: 'Total Orders', isLoadingKey: isUsersLoading, valueKey: 'orders', valueColor: 'text-blue-600', value: totalOrders },
    { bgColor: 'bg-green-100', title: 'Total Revenue', isLoadingKey: isOrdersLoading, valueKey: 'totalRevenue', valueColor: 'text-green-600', value: 89},
    { bgColor: 'bg-purple-100', title: 'Total  Products', isLoadingKey: isProductLoading, valueKey: 'allProducts', valueColor: 'text-purple-600', value: totalProducts },
    { bgColor: 'bg-yellow-100', title: 'Active Users', isLoadingKey: isUsersLoading, valueKey: 'allUsers', valueColor: 'text-yellow-600', value: totalUsers },
    { bgColor: 'bg-yellow-100', title: 'Active Users', isLoadingKey: isUsersLoading, valueKey: 'allUsers', valueColor: 'text-yellow-600', value: totalUsers }
  ];

  return (
    <>
      {statsData.map(({ bgColor, icon, title, isLoadingKey, value, valueColor }, index) => (
        <div key={index} className={`rounded p-5 py-10 flex flex-col justify-center items-center text-[] ${bgColor}`}>
            <h2 className='text-lg'>{title}</h2>
            <p className='text-xl'>{value}</p>
        </div>

      ))}
    </>
  );
};

export default DashboardTopStats;
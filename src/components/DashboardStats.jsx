import { IoBagCheckOutline, IoCashOutline, IoCubeOutline, IoPeopleOutline } from 'react-icons/io5';
import StatBox from "../components/StatBox";
import { formatAmount } from '../helpers';
import { useOrders } from '../features/useOrders';
import { useProducts } from '../features/useProducts';
import { useUsers } from '../features/useUsers';
import { useOrdersDetails } from '../features/useOrdersDetails';

const DashboardStats = () => {

    const {isLoading : isOrdersLoading , totalOrders} = useOrders()
    const {isLoading : isProductLoading , totalProducts} = useProducts()
    const {isLoading : isUsersLoading, totalUsers} = useUsers()

    console.log(totalOrders)
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
    { bgColor: 'bg-blue-100', icon: <IoBagCheckOutline className="text-blue-600 text-3xl" />, title: 'Total Orders', isLoadingKey: isUsersLoading, valueKey: 'orders', valueColor: 'text-blue-600', value: totalOrders },
    { bgColor: 'bg-green-100', icon: <IoCashOutline className="text-green-600 text-3xl" />, title: 'Total Revenue', isLoadingKey: isOrdersLoading, valueKey: 'totalRevenue', valueColor: 'text-green-600', value: 89},
    { bgColor: 'bg-purple-100', icon: <IoCubeOutline className="text-purple-600 text-3xl" />, title: 'Total  Products', isLoadingKey: isProductLoading, valueKey: 'allProducts', valueColor: 'text-purple-600', value: totalProducts },
    { bgColor: 'bg-yellow-100', icon: <IoPeopleOutline className="text-yellow-600 text-3xl" />, title: 'Active Users', isLoadingKey: isUsersLoading, valueKey: 'allUsers', valueColor: 'text-yellow-600', value: totalUsers }
  ];

  return (
    <>
      {statsData.map(({ bgColor, icon, title, isLoadingKey, value, valueColor }, index) => (
        <StatBox 
          key={index} 
          bgColor={bgColor} 
          icon={icon} 
          title={title} 
          isLoading={isLoadingKey}
          value={statsData[index].title === 'Total Revenue'? formatAmount(value) : value}
          valueColor={valueColor} 
        />
      ))}
    </>
  );
};

export default DashboardStats;

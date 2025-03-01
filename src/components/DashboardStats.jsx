import { IoBagCheckOutline, IoCashOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCubeOutline, IoPeopleOutline, IoTimeOutline } from 'react-icons/io5';
import StatBox from "../components/StatBox";
import { formatAmount } from '../helpers';
import { useOrders } from '../features/useOrders';
import { useProducts } from '../features/useProducts';
import { useUsers } from '../features/useUsers';
import { useOrdersDetails } from '../features/useOrdersDetails';
import { useProductsDetials } from '../features/useProductsDetials';
import { useUsersDetails } from '../features/useUsersDetails';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line, Legend, ComposedChart } from 'recharts';

import { BiBarChart } from 'react-icons/bi';
import { FaProcedures } from 'react-icons/fa';
import { LiaProceduresSolid } from 'react-icons/lia';
import { MdWaterfallChart } from 'react-icons/md';
import { RiOrderPlayLine } from 'react-icons/ri';

const DashboardStats = () => {

    const {isLoading : isOrdersLoading , totalOrders} = useOrders()
    const {isLoading : isProductLoading } = useProducts()
    const {isLoading : isUsersLoading} = useUsers()
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

      const {totalProducts,
        productsByCategory,
        bestSellers,
        averagePrice,
        availabilityStatus,
        recentProducts,
        priceRange,
        productsBySubCategory,} = useProductsDetials()

     const {totalUsers,
      topCartUsers,
      averageCartSize,
      userGrowth,} =  useUsersDetails()

      console.log(topProducts)

  
      const statsData = [
        { 
          bgColor: 'bg-blue-100', 
          icon: <IoBagCheckOutline className="text-blue-700 text-4xl" />, // Blue for total orders
          title: 'Total Orders', 
          isLoadingKey: isUsersLoading, 
          valueKey: 'orders', 
          valueColor: 'text-blue-700', 
          value: totalOrders 
        },
        { 
          bgColor: 'bg-red-100', 
          icon: <IoCloseCircleOutline className="text-red-600 text-4xl" />, // Red for canceled orders
          title: 'Canceled Orders', 
          isLoadingKey: isOrdersLoading, 
          valueKey: 'totalRevenue', 
          valueColor: 'text-red-600', 
          value: canceledOrders 
        },
        { 
          bgColor: 'bg-green-100', 
          icon: <IoCheckmarkCircleOutline className="text-green-600 text-4xl" />, // Green for completed orders
          title: 'Completed Orders', 
          isLoadingKey: isProductLoading, 
          valueKey: 'allProducts', 
          valueColor: 'text-green-600', 
          value: completedOrders 
        },
        { 
          bgColor: 'bg-orange-100', 
          icon: <RiOrderPlayLine className="text-orange-600 text-4xl" />, // Green for completed orders
          title: 'Processing Orders', 
          isLoadingKey: isProductLoading, 
          valueKey: 'allProducts', 
          valueColor: 'text-orange-600', 
          value: completedOrders 
        },
        { 
          bgColor: 'bg-yellow-100', 
          icon: <IoTimeOutline className="text-yellow-500 text-4xl" />, // Yellow for pending orders
          title: 'Pending Orders', 
          isLoadingKey: isUsersLoading, 
          valueKey: 'allUsers', 
          valueColor: 'text-yellow-500', 
          value: pendingOrders 
        }
      ];
      
      

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">

      {statsData.map(({ bgColor, icon, title, isLoadingKey, value, valueColor }, index) => (
        <div className='bg-white border-[#f3f4f6] border rounded overflow-hidden' key={index}>
       <div className="flex h-full items-center gap-3 ">
         <div className={`px-5 flex items-center  justify-center h-full ${bgColor}`}>
           {icon}
         </div>
         <div className=' py-[14px]'>
           <h3 className="text-base font-semibold text-gray-600 ">{title}</h3>
           {isLoadingKey ? (
             <p className="text-sm text-gray-700 animate-pulse">Loading...</p>
            ) : value ? (
              <p className={`text-2xl font-bold  ${valueColor}`}>{value}</p>
            ) : <p className='text-gray-400  font-extrabold'>_ _</p>}
         </div>
       </div>
     </div>
      ))}
      </div>
    </>
  );
};

export default DashboardStats;

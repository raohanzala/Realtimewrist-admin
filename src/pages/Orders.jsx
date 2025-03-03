import React, { useContext, useEffect } from "react";
import SearchSortBar from "../components/SearchSortBar";
import { ShopContext } from "../contexts/ShopContext";
import Pagination from "../components/Pagination";
import { CURRENCY, PAGE_SIZE } from "../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import { formatAmount, timestampToShortDate, truncateText } from "../helpers";
import { LiaSearchPlusSolid } from "react-icons/lia";
import { FiPrinter } from "react-icons/fi";
import { useOrders } from "../features/useOrders";
import { useUpdateOrderStatus } from "../features/useUpdateOrderStatus";
import Empty from "../components/Empty";

const Orders = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { setPageTitle } = useContext(ShopContext);

  const { isPending, orders, totalPages, totalOrders } = useOrders();
  const { updateStatus } = useUpdateOrderStatus();

  const handleUpdateStatus = (status, orderId) => {
    updateStatus({ status, orderId });
  };

  useEffect(() => {
    setPageTitle("Orders");
  }, []);

  return (
    <div>
      <div className="mb-8">
      <SearchSortBar
          placeholder="Search order"
          sortOptions={["newest", 'amount-high-to-low','amount-low-to-high' , 'oldest']}
          filterOptions={["Pending",'Order Confirmed','Processing', 'Out for Delivery', 'Delivered', 'Canceled']}
        />
      </div>

      <div>
        <table className="min-w-full bg-white  border border-b-0 border-collapse table-auto">
          <div className="bg-[#f2f2f2af] grid grid-cols-[0.3fr_1fr_1fr_1.5fr_0.6fr_1fr_1fr_0.5fr] text-[#5c5c5c] font-semibold py-4 px-8 text-sm uppercase">
            <div>S.No</div>
            <div>Product</div>
            <div>Customer</div>
            <div>Address</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Order Date</div>
            <div className="ml-auto">Invoice</div>
          </div>
          <div>
            {isPending ? (
              <SkeletonRow />
            ) : orders?.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={order._id}
                  className={` hover:bg-gray-50 cursor-pointer items-center grid grid-cols-[0.3fr_1fr_1fr_1.5fr_0.6fr_1fr_1fr_0.5fr]  py-4 px-8  text-sm ${
                    index === orders.length - 1 ? "" : "border-b"
                  }`}
                >
                  <div>{(currentPage - 1) * PAGE_SIZE + (index + 1)}</div>
                  <div>{truncateText(order?.items?.[0]?.name,15 )}</div>
                  <div>{truncateText(order?.address?.name, 13)}</div>
                  <div>{order?.address?.city}</div>
                  <div>
                    {CURRENCY}
                    {formatAmount(order?.amount) || "0"}
                  </div>
                  <div>
                    <select
                      onChange={(event) =>
                        handleUpdateStatus(event.target.value, order._id)
                      }
                      value={order.status}
                      className="border py-1 px-1 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Order Confirmed">Order Confirmed</option>
                      <option value="Packing">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>
                  <div className="text-sm ">
                    {timestampToShortDate(order?.date) || "N/A"}
                  </div>
                  <div className="flex gap-3 ml-auto text-xl text-gray-500">
                    <FiPrinter />
                    <Link to={`/order/${order._id}`}>
                      <LiaSearchPlusSolid />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <Empty resourceName="orders" />
            )}
          </div>
        </table>
        <div className="border border-t-0">
          <Pagination pageCount={totalPages} totalData={totalOrders} />
        </div>
      </div>
    </div>
  );
};

const SkeletonRow = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse border-b grid grid-cols-[0.3fr_1fr_1fr_1fr_0.5fr_0.5fr_0.5fr_0.8fr]  py-4 px-8"
        >
          <div className="w-1/2 h-5 bg-gray-200  rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-5 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </>
  );
};

export default Orders;

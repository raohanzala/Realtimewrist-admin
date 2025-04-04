import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api-test/axiosInstance";

export function useProductsDetials() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/product/product-details`);
      return data
    },
  });

  const { totalProducts,
    productsByCategory,
    bestSellers,
    averagePrice,
    availabilityStatus,
    recentProducts,
    priceRange,
    productsBySubCategory } = data || {}

  return {
    isPending, error, totalProducts,
    productsByCategory,
    bestSellers,
    averagePrice,
    availabilityStatus,
    recentProducts,
    priceRange,
    productsBySubCategory
  };
}
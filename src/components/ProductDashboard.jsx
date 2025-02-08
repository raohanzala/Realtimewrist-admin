import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line, CartesianGrid } from 'recharts';

const ProductDashboard = () => {
  const totalProducts = 11;
  const productsByCategory = [
    { _id: "Men", totalProducts: 10 },
    { _id: "Women", totalProducts: 1 }
  ];
  const bestSellers = [
    {
      _id: "676fa752fb11315bd8a387e2",
      name: "Rolex yatch Master",
      description: "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
      oldPrice: 3000,
      newPrice: 200,
      category: "Men",
      subCategory: "quartz",
      availability: "Out of stock",
      images: [
        "https://res.cloudinary.com/dcpa9u8qy/image/upload/v1735370577/sg5lwmv9pk69bus8htuk.webp",
        "https://res.cloudinary.com/dcpa9u8qy/image/upload/v1735370575/sno3ol1isebhctwjzsvp.webp"
      ]
    },
    {
      _id: "67778ffdd27a1b86221ed2a8",
      name: "Rolex Yatch master ",
      description: "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
      oldPrice: 78823,
      newPrice: 33,
      category: "Men",
      subCategory: "quartz",
      availability: "In stock",
      images: [
        "https://res.cloudinary.com/dcpa9u8qy/image/upload/v1735888892/stl2pirqzxumpdbyd67a.webp"
      ]
    }
  ];
  const averagePrice = 18586.73;
  const availabilityStatus = [
    { _id: "Out of stock", count: 6 },
    { _id: "In stock", count: 5 }
  ];
  const recentProducts = [
    {
      _id: "67779140ab82efa86292ddd4",
      name: "Rolex Yatch master ",
      description: "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
      oldPrice: 344,
      newPrice: 0,
      category: "Men",
      subCategory: "quartz",
      availability: "In stock",
      images: [
        "https://res.cloudinary.com/dcpa9u8qy/image/upload/v1735889215/ibph8meznunkdd4hnjfs.webp",
        "https://res.cloudinary.com/dcpa9u8qy/image/upload/v1735889215/negrucyneu66hm5fduiq.webp"
      ]
    }
  ];
  const priceRange = [{ _id: null, minPrice: 0, maxPrice: 199999 }];
  const productsBySubCategory = [
    { _id: "quartz", totalProducts: 10 },
    { _id: "chain", totalProducts: 1 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      {/* Total Products and Categories */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Products by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productsByCategory}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar dataKey="totalProducts" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best Sellers */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Best Selling Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {bestSellers.map((product) => (
            <div key={product._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h4 className="font-semibold text-lg mt-2">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 text-sm text-gray-800">Price: ${product.newPrice}</div>
              <div className="mt-1 text-sm text-gray-500">Availability: {product.availability}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Average Price */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Average Product Price</h3>
        <div className="text-3xl font-bold text-gray-800">${averagePrice.toFixed(2)}</div>
      </div>

      {/* Product Availability Status */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Availability</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={availabilityStatus}
              dataKey="count"
              nameKey="_id"
              outerRadius={120}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Products by Subcategory */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Products by Subcategory</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productsBySubCategory}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar dataKey="totalProducts" fill="#82ca9d" />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Products */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recently Added Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {recentProducts.map((product) => (
            <div key={product._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h4 className="font-semibold text-lg mt-2">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2 text-sm text-gray-800">Price: ${product.newPrice}</div>
              <div className="mt-1 text-sm text-gray-500">Availability: {product.availability}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;

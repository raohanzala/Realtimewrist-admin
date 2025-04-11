import React, { useState } from "react";
import Header from "./SampleHeader";

const product = {
  _id: "1",
  title: "Men's Polo Shirt",
  slug: "mens-polo-shirt",
  description: "Premium quality polo shirt made from 100% cotton.",
  brand: "Nike",
  images: [
    "/images/polo1.jpg",
    "/images/polo2.jpg",
    "/images/polo3.jpg",
  ],
  price: 3500,
  discountPrice: 2800,
  stock: 20,
  variants: [
    { color: "Black", size: "M", stock: 5 },
    { color: "Black", size: "L", stock: 10 },
    { color: "Blue", size: "M", stock: 5 },
  ],
  highlights: ["100% Cotton", "Slim Fit", "Machine Washable"],
  tags: ["polo", "shirt", "cotton"],
  specifications: {
    Material: "Cotton",
    Fit: "Slim",
    Origin: "Made in Pakistan",
  },
};


export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);


  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-10">
        {/* Images Section */}
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow"
          />
          <div className="flex gap-3 mt-4">
            {product.images.map((img) => (
              <img
                key={img}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === img ? "border-black" : "border-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            {product.brand && (
              <p className="text-gray-500 mt-1">Brand: {product.brand}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">
              Rs. {product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="line-through text-gray-500 text-lg">
                Rs. {product.price}
              </span>
            )}
          </div>

          {/* Variant Selection */}
          {product.variants?.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 flex-wrap">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition ${selectedVariant === variant
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                      }`}
                  >
                    {variant.color || variant.size || variant.storage}
                    {variant.size && ` - ${variant.size}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {product.highlights?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Highlights:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="text-gray-700">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-3 text-lg font-semibold rounded hover:bg-gray-900 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}


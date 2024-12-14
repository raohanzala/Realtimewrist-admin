import React, { useContext, memo, useMemo, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductItem = memo(({ id, description, size, image, name, newPrice, oldPrice }) => {
  // const { currency = 'PKR' } = useContext(ShopContext);

  // Hover state
  const [isHovered, setIsHovered] = useState(false);

  // UseMemo to precompute offer percentage
  const offer = useMemo(() => Math.floor(((oldPrice - newPrice) / oldPrice) * 100), [oldPrice, newPrice]);

  // Precompute truncated text
  const shortDescription = useMemo(
    () => (description.length > 60 ? description.slice(0, 60) + '...' : description),
    [description]
  );
  const productName = useMemo(
    () => (name.length > 20 ? name.slice(0, 23) + '...' : name),
    [name]
  );

  // Ensure that we have more than one image before enabling hover effect
  const hasMultipleImages = image && image.length > 1;

  return (
    <Link to={`/product/${id}`}>
      <div
        className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Offer Label */}
        {offer > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full">
            -{offer}%
          </div>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
          {/* First Image (Default/Always Visible) */}
          <LazyLoadImage
            src={image[0]}
            effect="blur"
            className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${hasMultipleImages && isHovered ? 'opacity-0 scale-100' : 'opacity-100 scale-100'
              }`}
            style={{
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
            alt={name}
          />
          {/* Second Image (Only if hover and multiple images) */}
          {hasMultipleImages && isHovered && (
            <LazyLoadImage
              src={image[1]}
              effect="blur"
              className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                }`}
              style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
              alt={name}
            />
          )}
        </div>




        {/* Product Details */}
        <div className="text-center relative py-3 px-2">
          <p
            className={`absolute duration-200 transition-all z-40 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
              } -top-10 left-0 bg-primary py-2 font-semibold text-sm uppercase w-full text-center`}
          >
            Add to cart
          </p>
          <p className="text-sm tracking-wide font-semibold uppercase mb-1 text-gray-800">{productName}</p>
          <p className="text-xs text-gray-500">{shortDescription}</p>
          <div className="flex gap-2 justify-center items-center mt-2">
            {oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                {oldPrice}
              </p>
            )}
            <p className="text-lg font-semibold text-yellow-500">
              {newPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProductItem;

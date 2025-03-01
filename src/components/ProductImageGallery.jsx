import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductImageGallery = ({ image, setImage, product }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 ">
      <div
        className="w-full relative h-full max-h-[400px] md:max-h-[400px] lg:max-h-[500px] aspect-square border border-gray-200 rounded overflow-hidden cursor-pointer flex justify-start items-center"
        onClick={() => {
          setIsLightboxOpen(true);
        }}
      >
        {product?.oldPrice && product?.oldPrice > product?.newPrice && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white size-11 text-sm font-bold z-10 rounded-full">
            -{Math.floor(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
          </div>
        )}
        <LazyLoadImage
          src={image}
          className="w-full h-full object-cover "
          alt="Selected Product"
          effect="blur"
        />
      </div>
      <div className="flex gap-4">
        {product?.images?.map((item, index) => (
          <LazyLoadImage
            key={index}
            onClick={() => setImage(item)}
            src={item}
            className={`size-24 cursor-pointer rounded p-[2px] border-transparent border-2 object-cover object-center transition-all duration-300 ease-in-out
                  ${image === item ? "border-[red] border-2" : "shadow-lg border-[red]"}
                `}
            alt={`Thumbnail ${index + 1}`}
            effect="blur"
          />
        ))}
      </div>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={photoIndex}
        slides={product.images.map((src) => ({ src }))}
        on={{
          view: ({ index }) => setPhotoIndex(index),
        }}
      />
    </div>
  );
};

export default ProductImageGallery;

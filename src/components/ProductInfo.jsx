import { BsWhatsapp } from "react-icons/bs";
import { formatAmount } from "../helpers";
import { CURRENCY } from "../utils/constants";
import Button from "./Button";
import { FaRegEdit } from "react-icons/fa";

const ProductInfo = ({ productData, setIsProductModal }) => {
  return (
    <div>
      <h1 className="font-medium text-2xl uppercase">{productData?.name}</h1>
      <div className="flex items-center gap-3 mt-5">
        {productData?.oldPrice &&
          productData.oldPrice > productData?.newPrice && (
            <p className="text-lg text-gray-500 line-through">
              <span className=" py-1 px-2 rounded-md">
                {CURRENCY}
                {formatAmount(productData?.oldPrice)}
              </span>
            </p>
          )}
        <p className="text-2xl font-bold text-primary-1">
          {CURRENCY}
          {formatAmount(productData?.newPrice)}
        </p>
        {productData?.oldPrice &&
          productData?.oldPrice > productData?.newPrice && (
            <p className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
              Save{" "}
              {Math.floor(
                ((productData.oldPrice - productData.newPrice) /
                  productData.oldPrice) *
                  100)}
              %
            </p>
          )}
      </div>
      <p className="mt-5 text-gray-500 md:w-4/5 mb-5">{productData?.description}</p>
      <Button
          onClick={()=> setIsProductModal(true)}
          variant='secondary'
          size="large"
          startIcon={<FaRegEdit />}
        >
         EDIT PRODUCT
          {/* {!isSubmitting ? (productToEdit ? "Update Product" : "Add Product") : <SpinnerMini />} */}
        </Button>
      <hr className="mt-8" />
      <div className="mt-8 space-y-4">
  {/* Order via WhatsApp */}
  <div className="flex items-center gap-4 bg-green-100 text-green-800 py-3 px-3 rounded-lg border border-green-300">
    <BsWhatsapp size={28} className="text-green-600" />
    <p className="text-sm font-medium">
      <span className="font-semibold">Order via WhatsApp:</span>
      <a 
        href="https://wa.me/923278272361" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="ml-2 text-green-700 hover:underline"
      >
        +92 327 8272361
      </a>
    </p>
  </div>

  {/* Join WhatsApp Channel */}
  <div className="flex items-center gap-4 bg-blue-100 text-blue-800 py-3 px-3 rounded-lg border border-blue-300">
    <BsWhatsapp size={28} className="text-blue-600" />
    <p className="text-sm font-medium">
      <span className="font-semibold">Get the latest updates & exclusive offers!</span>
      <a 
        href="https://whatsapp.com/channel/your-channel-link" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="ml-2 text-blue-700 hover:underline font-semibold"
      >
        Join our WhatsApp Channel
      </a>
    </p>
  </div>

  {/* View WhatsApp Catalogue */}
  <div className="flex items-center gap-4 bg-yellow-100 text-yellow-800 py-3 px-3 rounded-lg border border-yellow-300">
    <BsWhatsapp size={28} className="text-yellow-600" />
    <p className="text-sm font-medium">
      <span className="font-semibold">Explore our full collection:</span>
      <a 
        href="https://wa.me/c/923278272361" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="ml-2 text-yellow-700 hover:underline"
      >
        Check Our WhatsApp Catalogue
      </a>
    </p>
  </div>
</div>
      <hr className="" />
      <div className="text-sm text-gray-500 mt-5">
        <p>100% same as pictures.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  );
};

export default ProductInfo;

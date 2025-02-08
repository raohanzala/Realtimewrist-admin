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
          {formatAmount(888)}
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
      <div className="py-6 flex gap-2 items-center">
        <BsWhatsapp size={25} />
        Order via WhatsApp : 03278272361
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

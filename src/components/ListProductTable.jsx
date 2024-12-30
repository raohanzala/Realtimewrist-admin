import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ShopContext } from "../contexts/ShopContext";
import SearchSortBar from "./SearchSortBar";
import { IoMdMore } from "react-icons/io";
import ConfirmationModal from "./ConfirmationModal";
import AddProductModal from "./AddProductModal";
import { FaPlus } from "react-icons/fa6";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "./Loader";
import Modal from "./Modal";
import MenuPopup from "./MenuPopup";
import Pagination from "./Pagination";
import { formatAmount, timestampToShortDate } from "../helpers";
import StatusLabel from "./StatusLabel";
import Button from "./Button";
import { CURRENCY } from "../utils/constants";

const ListProductTable = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  // const isProductLoading = true

  const {
    isLoading,
    isProductLoading,
    setPageTitle,
    allProducts,
    totalProducts,
    productsPageCount,
    removeProduct,
    fetchProducts,
    updateProductStatus,
  } = useContext(ShopContext);

  const handleDropdownToggle = useCallback((productId) => {
    setActiveDropdown((prev) => (prev === productId ? null : productId));
  }, []);

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsProductModal(true);
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete);
      setProductToDelete(null);
      setIsConfirmModal(false);
    }
  };

  const handleCancel = () => {
    setProductToDelete(null);
    setIsConfirmModal(false);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setPageTitle("All Products");
  }, []);

  return (
    <div>
      {isLoading && <Loader type="full" />}
      <div className="flex gap-5 mb-8">
        <SearchSortBar
          placeholder="Search product"
          sortOptions={["recent", "date"]}
          filterOptions={["recent", "date"]}
        />

        <Button
          onClick={() => setIsProductModal(true)}
          startIcon={<FaPlus />}
          variant="secondary"
        >
          Add Product
        </Button>
      </div>
      <div className="pb-5">
        <div className="border rounded-sm">
          <div className="grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8   items-center py-4 px-8 uppercase bg-[#f2f2f2af] text-[#5c5c5c] font-semibold text-sm ">
            <div>Images</div>
            <div>Name</div>
            <div>Price</div>
            <div>Availability</div>
            <div>Category</div>
            <div>Date</div>
            <div>Actions</div>
          </div>
          <div className="bg-white">
            {isProductLoading ? (
              <SkeletonRow />
            ) : allProducts?.length > 0 ? (
              allProducts.map((product, index) => (
                <div
                  key={product?._id || index}
                  className={`py-2 px-8 grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm ${
                    index === allProducts.length - 1 ? "" : "border-b"
                  }`}
                >
                  <img
                    src={product.images[0]}
                    className="w-20 -translate-x-6 scale-110 object-cover object-center"
                    style={{ aspectRatio: "1 / 1" }}
                    alt={product?.name || "Product image"}
                  />
                  <p className="uppercase font-medium truncate">
                    {product?.name || "N/A"}
                  </p>
                  <p>
                    {CURRENCY}
                    {formatAmount(product?.newPrice) || "N/A"}
                  </p>
                  <div>
                    <p className="text-gray-500 font-medium flex gap-1 items-center">
                      Status
                      <StatusLabel status={product.availability} />
                    </p>
                    <select
                      onChange={(event) =>
                        updateProductStatus(event, product._id)
                      }
                      value={product.availability}
                      className="py-1 px-2 mt-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
                    >
                      <option value="In stock">In stock</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  </div>
                  <p className="capitalize">{product?.category || "N/A"}</p>
                  <p>{timestampToShortDate(product?.date) || "N/A"}</p>
                  <div className="relative ml-auto">
                    <button
                      aria-label={`Open actions for product ${product?.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(product?._id);
                      }}
                    >
                      <IoMdMore className="ml-auto text-xl" />
                    </button>

                    {activeDropdown === product?._id && (
                      <MenuPopup
                        wrapperRef={wrapperRef}
                        setActiveDropdown={setActiveDropdown}
                        handleDeleteClick={() =>
                          handleDeleteClick(product?._id)
                        }
                        handleEditClick={() => handleEditClick(product)}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-base text-center text-[#c3c3c3]">
                {/* No products found. */}
              </p>
            )}
          </div>
          <div>
            <Pagination
              pageCount={productsPageCount}
              fectchData={fetchProducts}
              totalData={totalProducts}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isConfirmModal}
        title="Delete Product"
        onClose={() => setIsConfirmModal(false)}
      >
        <ConfirmationModal
          message={"Are you sure you want to delete this product?"}
          confirmText={"Delete"}
          cancelText={"Cancel"}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          onClose={() => setIsConfirmModal(false)}
        />
      </Modal>

      <Modal
        isOpen={isProductModal}
        title={productToEdit ? 'Edit Product' : "Add Product"}
        onClose={() => setIsProductModal(false)}
      >
        <AddProductModal
          onClose={() => setIsProductModal(false)}
          productToEdit={productToEdit}
        />
      </Modal>
    </div>
  );
};

const SkeletonRow = () => {
  const skeletons = Array(4).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="py-2 px-8 grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm border-b animate-pulse"
        >
          <div className="size-20 -translate-x-6 scale-110 bg-gray-200 rounded-sm"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/3"></div>
          <div className="size-6 bg-gray-200 rounded-full ml-auto"></div>
        </div>
      ))}
    </>
  );
};

export default ListProductTable;

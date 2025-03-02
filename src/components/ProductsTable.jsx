import { useCallback, useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import SearchSortBar from "./SearchSortBar";
import { IoMdMore, IoMdTrash } from "react-icons/io";
import ConfirmationModal from "./ConfirmationModal";
import AddProductForm from "./AddProductForm";
import { FaPlus } from "react-icons/fa6";
import "react-lazy-load-image-component/src/effects/blur.css";
import Modal from "./Modal";
import Pagination from "./Pagination";
import { formatAmount, timestampToShortDate, truncateText } from "../helpers";
import Button from "./Button";
import { CURRENCY } from "../utils/constants";
import { useProducts } from "../features/useProducts";
import { useUpdateProductStock } from "../features/useUpdateProductStock";
import { useDeleteProduct } from "../features/useDeleteProduct";
import Empty from "./Empty";
import { Link, useNavigate } from "react-router-dom";
import PopupMenu from "./PopupMenu";
import { BiPencil } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { useUpdateProductPublish } from "../features/useUpdateProductPublish";

const ProductTable = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isProductModal, setIsProductModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  const { setPageTitle } = useContext(ShopContext);
  const navigate = useNavigate();

  const {
    deleteProduct,
    isLoading: isDeleting,
    deletedData,
  } = useDeleteProduct();
  const { isLoading: isUpdating, updateStock } = useUpdateProductStock();
  const { products, isLoading, error, totalProducts, totalPages } =
    useProducts();

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
      await deleteProduct(productToDelete);
      setProductToDelete(null);
      setIsConfirmModal(false);
    }
  };

  const handleCancel = () => {
    setProductToDelete(null);
    setIsConfirmModal(false);
  };

  const { updatePublish } = useUpdateProductPublish();

  const handleTogglePublish = (productId, currentStatus) => {
    updatePublish({ productId, published: !currentStatus });
  };

  useEffect(() => {
    setPageTitle("All Products");
  }, []);

  const handleUpdateStock = (event, productId) => {
    const status = event.target.value;
    updateStock({ status, productId });
  };

  return (
    <div>
      {/* {isLoading && <Loader type="full" />} */}
      <div className="flex gap-5 mb-8">
        <SearchSortBar
          placeholder="Search product"
          sortOptions={[
            "price-low-high",
            "price-high-low",
            "date",
            "newest-arrivals",
            "oldest",
          ]}
          filterOptions={[
            "Men",
            "Women",
            "bestSeller",
            "in-stock",
            "out-of-stock",
          ]}
        />

        <Button
          onClick={(e) => {
            setIsProductModal(true);
            e.stopPropagation();
          }}
          startIcon={<FaPlus />}
          variant="secondary"
          className="self-center"
          size="medium"
        >
          Add Product
        </Button>
      </div>
      <div className="pb-5">
        <div className="border rounded-sm">
          <div className="grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8   items-center py-4 px-8 uppercase bg-[#f2f2f2af] text-[#5c5c5c] font-semibold text-sm ">
            <div>Images</div>
            <div>Name</div>
            <div>Price</div>
            <div>Availability</div>
            <div>Published</div>
            <div>Category</div>
            <div>Date</div>
            <div>Actions</div>
          </div>
          <div className="bg-white">
            {isLoading ? (
              <SkeletonRow />
            ) : products?.length > 0 ? (
              products.map((product, index) => (
                <div
                  key={product?._id || index}
                  className={`py-2 px-8 grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm ${
                    index === products.length - 1 ? "" : "border-b"
                  }`}
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.images[0]}
                      className="w-20 -translate-x-6 scale-110 object-cover object-center"
                      style={{ aspectRatio: "1 / 1" }}
                      alt={product?.name}
                    />
                  </Link>
                  <Link to={`/product/${product._id}`}>
                    <p className="uppercase font-medium truncate">
                      {truncateText( product?.name, 15) || "N/A"}
                    </p>
                  </Link>
                  <p>
                    {CURRENCY}
                    {formatAmount(product?.newPrice) || "N/A"}
                  </p>
                  <div>
                    <select
                      onChange={(event) =>
                        handleUpdateStock(event, product._id)
                      }
                      value={product.availability}
                      className="py-1 px-2 mt-2 border rounded bg-gray-100 hover:bg-gray-200 focus:outline-none w-full"
                    >
                      <option value="In stock">In stock</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">Published</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={product.published}
                        onChange={() =>
                          handleTogglePublish(product._id, product.published)
                        }
                      />
                      <div
                        className="w-11 h-6 bg-gray-300 rounded-full peer 
    peer-checked:after:translate-x-full peer-checked:after:border-white 
    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
    after:bg-white after:border-gray-300 after:border after:rounded-full 
    after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e2c765]"
                      ></div>
                    </label>
                  </div>
                  <p className="capitalize">
                    {product?.category.name || "N/A"}
                  </p>
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
                      <PopupMenu
                        actions={[
                          {
                            label: "Edit Product",
                            onClick: () => handleEditClick(product),
                            icon: <BiPencil />,
                          },
                          {
                            label: "Delete Product",
                            onClick: () => handleDeleteClick(product?._id),
                            icon: <IoMdTrash />,
                          },
                          {
                            label: "See Preview",
                            onClick: () => navigate(`/product/${product._id}`),
                            icon: <MdRemoveRedEye />,
                          },
                        ]}
                        position={{ top: "30px", right: "5px" }}
                        onClose={() => setActiveDropdown(null)}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Empty resourceName="products" />
            )}
          </div>
          <div>
            <Pagination pageCount={totalPages} totalData={totalProducts} />
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
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          onClose={() => setIsConfirmModal(false)}
        />
      </Modal>

      <Modal
        isOpen={isProductModal}
        title={productToEdit ? "Edit Product" : "Add Product"}
        onClose={() => {
          setIsProductModal(false);
          setProductToEdit(null);
        }}
      >
        <AddProductForm
          onClose={() => {
            setIsProductModal(false);
            setProductToEdit(null);
          }}
          productToEdit={productToEdit}
        />
      </Modal>
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
          className="py-2 px-8 grid grid-cols-[0.6fr_1fr_1fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm border-b animate-pulse"
        >
          <div className="size-20 -translate-x-6 scale-110 bg-gray-200 rounded-sm"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-6 bg-gray-200 rounded-sm w-1/3"></div>
          <div className="size-6 bg-gray-200 rounded-full ml-auto"></div>
        </div>
      ))}
    </>
  );
};

export default ProductTable;

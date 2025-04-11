import React, { useState, useEffect, useContext } from "react";
import { useCategories } from "../features/useCategories"; // Fetch categories hook
import { useDeleteCategory } from "../features/useDeleteCategory"; // Delete category hook
import { BiPencil } from "react-icons/bi";
import { IoMdMore, IoMdTrash } from "react-icons/io";
import PopupMenu from "./PopupMenu";
import Empty from "./Empty";
import Pagination from "./Pagination";
import AddProductForm from "./AddProductForm";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import AddCategory from "./AddCategory";
import SearchSortBar from "./SearchSortBar";
import { ShopContext } from "../contexts/ShopContext";

const CategoryTable = () => {
  const { isPending, categories, totalPages, totalCategories } =
    useCategories();
  const { isDeleting, deleteCategory } = useDeleteCategory();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { setPageTitle } = useContext(ShopContext);

  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(categoryToDelete);
    setIsConfirmModal(false);
  };

  const handleCancel = () => {
    setIsConfirmModal(false);
  };

  const handleDropdownToggle = (categoryId) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setIsCategoryModal(true);
  };

  useEffect(() => {
    setPageTitle("Categories");
  }, []);

  return (
    <div>
      <div className="flex gap-5 mb-8">
        <SearchSortBar
          placeholder="Search product"
        // sortOptions={[
        //   "price-low-to-high",
        //   "price-high-to-low",
        //   "date",
        //   "newest-arrivals",
        //   "oldest",
        // ]}
        // filterOptions={[
        //   "Men",
        //   "Women",
        //   "bestSeller",
        //   "in-stock",
        //   "out-of-stock",
        // ]}
        />
        <Button
          onClick={(e) => {
            setIsCategoryModal(true);
            e.stopPropagation();
          }}
          startIcon={<FaPlus />}
          variant="secondary"
          //   className="bg-primary-1"
          size="medium"
        >
          Add Category
        </Button>
      </div>

      <div className="pb-5">
        <div className="border rounded-sm">
          {/* Header */}
          <div className="bg-[#f2f2f2af] text-[#5c5c5c] font-semibold text-sm uppercase py-4 px-8">
            <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center">
              <div>Images</div>
              <div>Name</div>
              <div>Category ID</div>
              <div>Created At</div>
              <div>Total Categories</div>
              <div>Actions</div>
            </div>
          </div>

          <div className="bg-white">
            {isPending ? (
              <SkeletonRow />
            ) : categories?.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={category._id}
                  className={`py-2 px-8 grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm ${index === categories.length - 1 ? "" : "border-b"
                    }`}
                >
                  {/* Category Image */}
                  <div>
                    <img
                      src={category?.image || "/placeholder.png"}
                      className="w-20 h-20 -translate-x-6 scale-110 object-cover rounded-sm"
                      alt={category?.name || "Category Image"}
                    />
                  </div>

                  {/* Category Name */}
                  <p className="uppercase font-medium truncate">
                    {category?.name || "N/A"}
                  </p>

                  {/* Category ID */}
                  <p className="truncate">{category?._id || "N/A"}</p>

                  {/* Created At (Formatted Date) */}
                  <p>
                    {category?.createdAt
                      ? new Date(category.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* Total Products */}
                  <p>{category?.totalProducts ?? 0}</p>

                  {/* Actions Menu */}
                  <div className="relative ml-auto">
                    <button
                      aria-label={`Open actions for category ${category?.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(category?._id);
                      }}
                    >
                      <IoMdMore className="ml-auto text-xl" />
                    </button>

                    {activeDropdown === category?._id && (
                      <PopupMenu
                        actions={[
                          {
                            label: "Edit Category",
                            onClick: () => handleEditClick(category),
                            icon: <BiPencil />,
                          },
                          {
                            label: "Delete Category",
                            onClick: () => handleDeleteClick(category?._id),
                            icon: <IoMdTrash />,
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
              <Empty resourceName="categories" />
            )}
          </div>

          {/* Pagination */}
          <div>
            <Pagination pageCount={totalPages} totalData={totalCategories} />
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Deletion */}
      <Modal
        isOpen={isConfirmModal}
        title="Delete Category"
        onClose={() => setIsConfirmModal(false)}
      >
        <ConfirmationModal
          message={"Are you sure you want to delete this category?"}
          confirmText={"Delete"}
          cancelText={"Cancel"}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
          onClose={() => setIsConfirmModal(false)}
        />
      </Modal>

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={isCategoryModal}
        title={categoryToEdit ? "Edit Category" : "Add Category"}
        onClose={() => {
          setIsCategoryModal(false);
          setCategoryToEdit(null);
        }}
      >
        <AddCategory
          onClose={() => {
            setIsCategoryModal(false);
            setCategoryToEdit(null);
          }}
          category={categoryToEdit} // Pass the category to edit if available
        />
      </Modal>
    </div>
  );
};

export default CategoryTable;

const SkeletonRow = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="py-2 px-8 grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] gap-8 items-center text-sm border-b animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="size-20 -translate-x-6 scale-110 bg-gray-200 rounded-sm"></div>

          {/* Name */}
          <div className="h-6 bg-gray-200 rounded-sm w-3/4"></div>

          {/* ID */}
          <div className="h-6 bg-gray-200 rounded-sm w-2/3"></div>

          {/* Created At */}
          <div className="h-6 bg-gray-200 rounded-sm w-1/2"></div>

          {/* Total Products */}
          <div className="h-6 bg-gray-200 rounded-sm w-1/3"></div>

          {/* Actions */}
          <div className="size-6 bg-gray-200 rounded-full ml-auto"></div>
        </div>
      ))}
    </>
  );
};


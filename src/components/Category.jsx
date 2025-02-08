import React, { useState, useEffect } from 'react';
import { useAddCategory } from '../features/useAddCategory';
import { useDeleteCategory } from '../features/useDeleteCategory';
import { useCategories } from '../features/useCategories'; // Fetch categories hook

const CategoryManagement = () => {
  const [newCategory, setNewCategory] = useState('');
  const { isLoading, addCategory } = useAddCategory();
  const { isLoading: isDeleting, deleteCategory } = useDeleteCategory();
  const { isLoading: isFetching, categories } = useCategories(); // Fetch categories data

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory(''); // Clear the input after adding the category
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
  };

  if (isFetching) return <p>Loading categories...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Category Management</h2>

      {/* Add New Category */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="border p-2 rounded w-full mr-2"
        />
        <button
          onClick={handleAddCategory}
          disabled={!newCategory.trim() || isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>

      {/* Category List */}
      <ul>
        {categories?.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{category.name}</span>
            <button
              onClick={() => handleDeleteCategory(category._id)}
              disabled={isDeleting}
              className="text-red-500"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;

import React, { useState } from 'react'
import AddProductModal from './AddProductForm';
import { FaPlus } from 'react-icons/fa6';
import Button from './Button';
import Modal from './Modal';

const AddProductForm = () => {

  const [isProductModal, setIsProductModal] = useState(false);
  let productToEdit = {}

  return (
    <div>
      <Button
        onClick={(e) => { setIsProductModal(true); e.stopPropagation() }}
        startIcon={<FaPlus />}
        variant="secondary"
        className='rounded'
      >
        Add Product
      </Button>

      <Modal
        isOpen={isProductModal}
        title={productToEdit ? 'Edit Product' : "Add Product"}
        onClose={() => setIsProductModal(false)}
      >
        <AddProductModal
          onClose={() => setIsProductModal(false)}
          productToEdit={productToEdit || {}}
        />
      </Modal>
    </div>
  )
}

export default AddProductForm
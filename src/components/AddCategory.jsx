import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ShopContext } from '../contexts/ShopContext';
import FormRowVerticle from './FormRowVerticle';
import Button from './Button';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';
import Input from './Input';
import { useAddCategory } from '../features/useAddCategory';
import { useEditCategory } from '../features/useEditCategory';
import Modal from './Modal';
import CropImageModal from './CropImageModal';

const AddCategory = ({ onClose, category }) => {
  const { setPageTitle } = useContext(ShopContext);
  const { addCategory, isPending: isAdding } = useAddCategory();
  const { editCategory, isPending: isEditing } = useEditCategory();
  
  const [imagePreview, setImagePreview] = useState(category?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [croppingImage, setCroppingImage] = useState(null);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);

  const isEditingMode = Boolean(category);
  const isWorking = isAdding || isEditing;

  useEffect(() => {
    setPageTitle(isEditingMode ? "Edit Category" : "Add Category");
  }, [setPageTitle, isEditingMode]);

  const initialValues = {
    name: category?.name || "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(12, "Category name must be at most 12 characters")
    .required("Category name is required"),
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEditingMode) {
        editCategory(
          { categoryId: category._id, categoryData: formData },
          {
            onSuccess: () => {
              onClose();
            },
          }
        );
      } else {
        addCategory(formData, {
          onSuccess: () => {
            onClose();
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Image Change & Show Cropper
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      showCropper(file, (croppedImage) => {
        setImageFile(croppedImage);
        setImagePreview(URL.createObjectURL(croppedImage));
      });
    }
  };

  // Show Cropper
  const showCropper = (file, imageSetter) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCroppingImage(reader.result);
      setCurrentImageSetter(() => imageSetter);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] w-[400px] relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-4 w-full">
              <FormRowVerticle name='name' label='Title'>

              <Input
                name="name"
                type="text"
                placeholder="Enter category name"
                disabled={isWorking}
                />
                </FormRowVerticle>

              {/* Image Upload */}
              <div>
              <div className='text-dark-3 mb-1'>Image</div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  handleImageChange(event);
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                disabled={isWorking}
                className="border p-2 rounded w-full"
              />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              <Button
                type="button"
                disabled={isSubmitting || isWorking}
                variant="cancel"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting || isWorking}
              >
                {!isWorking ? (isEditingMode ? "Update Category" : "Add Category") : <SpinnerMini />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Crop Image Modal */}
      <Modal
        title="Crop Category Image"
        isOpen={croppingImage}
        onClose={() => setCroppingImage(null)}
      >
        <CropImageModal
          croppingImage={croppingImage}
          currentImageSetter={currentImageSetter}
          setCroppingImage={setCroppingImage}
        />
      </Modal>
    </div>
  );
};

export default AddCategory;

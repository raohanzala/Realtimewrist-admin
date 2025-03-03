import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ShopContext } from "../contexts/ShopContext";
import Button from "./Button";
import { assets } from "../assets/assets";
import Modal from "./Modal";
import CropImageModal from "./CropImageModal";
import SpinnerMini from "./SpinnerMini";
import Input from "./Input";
import FormRowVerticle from "./FormRowVerticle";
import { useAddProduct } from "../features/useAddProduct";
import { useEditProduct } from "../features/useEditProduct";
import { useCategories } from "../features/useCategories";

const AddProductForm = ({ onClose, productToEdit = {} }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);

  console.log(productToEdit, 'PRODUCT TO EDIT')


  const {
    setPageTitle,
  } = useContext(ShopContext);
  const { isPending, categories } = useCategories(true);

  console.log(categories, 'PRODUCT TO EDIT')


  const { addProduct, isPending: isAdding } = useAddProduct()
  const { editProduct, isPending: isEditing } = useEditProduct()
  const isWorking = isAdding || isEditing

  const showCropper = (file, imageSetter) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCroppingImage(reader.result);
      setCurrentImageSetter(() => imageSetter);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setPageTitle(productToEdit ? "Edit Product" : "Add Product");
  }, [productToEdit, setPageTitle]);

  const initialValues = {
    name: productToEdit?.name || "",
    description:
      productToEdit?.description ||
      "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
    oldPrice: productToEdit?.oldPrice || "",
    newPrice: productToEdit?.newPrice || "",
    category: productToEdit?.category?._id || "",
    gender: productToEdit?.gender || 'Men',
    bestSeller: productToEdit?.bestSeller || false,
  };


  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    oldPrice: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than 0"),
    newPrice: Yup.number().min(0, "Sale price must be greater than 0"),
    category: Yup.string().required("Category is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      const formData = await new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      if (productToEdit) {

        formData.append("productId", productToEdit._id);

        editProduct(formData, {
          onSuccess: () => {
            onClose();

          },
        });
      } else {

        addProduct(formData, {
          onSuccess: () => {
            onClose();
          },
        });
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-sm-lg w-full max-w-3xl max-h-[90vh] relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 text-sm lg:grid-cols-2 gap-6">
              <div>
                <FormRowVerticle name="name" label="Product Title">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter product name"
                    disabled={isWorking}
                  />
                </FormRowVerticle>

                <FormRowVerticle label="Product Description" name="description">
                  <Input
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    disabled={isWorking}
                  />
                </FormRowVerticle>

                <div className="grid grid-cols-2 gap-4">
                  <FormRowVerticle label="Price" name="oldPrice">
                    <Input
                      name="oldPrice"
                      type="number"
                      placeholder="Regular price"
                      min="0"
                      disabled={isWorking}
                    />
                  </FormRowVerticle>

                  <FormRowVerticle label="Sale Price" name="newPrice">
                    <Input
                      name="newPrice"
                      type="number"
                      placeholder="Sale price"
                      min="0"
                      disabled={isWorking}
                    />
                  </FormRowVerticle>
                </div>
              </div>
              <div>
                <label>Upload Images</label>
                <div className="flex gap-2 mt-2 mb-2">
                  {[image1, image2, image3, image4].map((image, index) => (
                    <label key={index} className={`cursor-pointer ${isWorking ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <img
                        src={
                          !image
                            ? assets.upload_area
                            : URL.createObjectURL(image)
                        }
                        alt=""
                        className="w-24 h-24 object-cover border rounded-sm"
                      />
                      <input
                        type="file"
                        hidden
                        disabled={isWorking}
                        onChange={(e) =>
                          showCropper(
                            e.target.files[0],
                            [setImage1, setImage2, setImage3, setImage4][index]
                          )
                        }
                      />
                    </label>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormRowVerticle label="Category" name="category">
                    <Input name="category" as="select" disabled={isWorking}>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </Input>
                  </FormRowVerticle>
                  <FormRowVerticle label="Gender" name="gender">
                    <Input
                      name="gender"
                      as="select"
                      disabled={isWorking}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </Input>
                  </FormRowVerticle>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Field
                    type="checkbox"
                    id="bestSeller"
                    name="bestSeller"
                    className="h-4 w-4"
                    disabled={isWorking}
                  />
                  <label htmlFor="bestSeller">Add to Best Seller</label>
                </div>
              </div>
            </div>
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
                {!isWorking ? (
                  productToEdit ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )
                ) : (
                  <SpinnerMini />
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        title="Crop Product Image"
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

export default AddProductForm;

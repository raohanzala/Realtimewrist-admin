import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../App";
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

const AddProductForm = ({ onClose, productToEdit = {} }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [currentImageSetter, setCurrentImageSetter] = useState(null);

  const {
    setPageTitle,
  } = useContext(ShopContext);

  const {addProduct, isPending : isAdding} = useAddProduct()
  const {editProduct, isPending : isEditing} = useEditProduct()
  const isWorking = isAdding || isEditing

  console.log(isWorking, 'LAODING...')

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
  }, [productToEdit]);

  const initialValues = {
    name: productToEdit?.name || "",
    description:
      productToEdit?.description ||
      "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
    oldPrice: productToEdit?.oldPrice || "",
    newPrice: productToEdit?.newPrice || "",
    category: productToEdit?.category || "Men",
    subCategory: productToEdit?.subCategory || "quartz",
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
    subCategory: Yup.string().required("Sub-category is required"),
  });
  
  // const { _id: productId, ...editValues } = productToEdit;
  // const isEditSession = Boolean(productId);
  // const initialValues = isEditSession ? editValues : {}

  console.log(initialValues, 'INITIALVALUES')

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
        const formDataEdit = { ...formData, productId: productToEdit._id };
        
        editProduct({formDataEdit, productId : productToEdit._id}, { 
          onSuccess: () => { 
            onClose();
          },
        });
      } else {
        console.log(formData, "FORMDATA");
        
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
                    <label key={index} className="cursor-pointer">
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
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                    </Input>
                  </FormRowVerticle>
                  <FormRowVerticle label="Sub-Category" name="subCategory">
                    <Input
                      name="subCategory"
                      as="select"
                      disabled={isWorking}
                    >
                      <option value="automatic">Automatic</option>
                      <option value="quartz">Quartz</option>
                      <option value="chain">Chain</option>
                      <option value="strap">Strap</option>
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

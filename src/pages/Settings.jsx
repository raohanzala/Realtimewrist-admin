import React from "react";
import Box from "../components/Box";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import FormRow from "../components/FormRow";
import * as Yup from "yup";
import Button from "../components/Button";
import SpinnerMini from "../components/SpinnerMini";

const Settings = () => {
  const initialValues = {
    name: "",
    // description:
    //   productToEdit?.description ||
    //   "Quartz Machine, Stainless Steel Chain, Date Working, Master Lock, Best Quality.",
    // oldPrice: productToEdit?.oldPrice || "",
    // newPrice: productToEdit?.newPrice || "",
    // category: productToEdit?.category || "Men",
    // subCategory: productToEdit?.subCategory || "quartz",
    // bestSeller: productToEdit?.bestSeller || false,
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    address: Yup.string(),
    whatsapp: Yup.string()
    .matches(/^\d+$/, 'WhatsApp number must be numeric')
    .trim(),
    contact: Yup.string()
    .matches(/^\d+$/, 'Phone number must be numeric')
    .trim(),
    email: Yup.string()
    .email('Invalid email address'),
    website: Yup.string(),
  });

  const onSubmitHandler = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="mx-auto max-w-screen-md">
            <FormRow label="Store name"
                name="store-name">
              <Input
                name="store-name"
                type="text"
                placeholder="Store name"
                disabled={isSubmitting}
              />
            </FormRow>
            <FormRow label="address"
                name="address">
              <Input
                name="address"
                type="text"
                placeholder="address"
                disabled={isSubmitting}
              />
            </FormRow>
            <FormRow label="whatsapp"
                name="whatsapp">
              <Input
                name="whatsapp"
                type="text"
                placeholder="whatsapp"
                disabled={isSubmitting}
              />
            </FormRow>
            <FormRow label="contact"
                name="contact">
              <Input
                name="contact"
                type="text"
                placeholder="contact"
                disabled={isSubmitting}
              />
            </FormRow>
            <FormRow label="email"
                name="email">
              <Input
                name="email"
                type="email"
                placeholder="email"
                disabled={isSubmitting}
              />
            </FormRow>
            <FormRow label="website"
                name="website">
              <Input
                name="website"
                type="text"
                placeholder="website"
                disabled={isSubmitting}
              />
            </FormRow>

            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {!isSubmitting ? "Save settings" : <SpinnerMini />}
            </Button>
          </Form>
        )}
      </Formik>

      <div>
        {/* <Input label="Product Description"
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  /> */}
      </div>
    </Box>
  );
};

export default Settings;

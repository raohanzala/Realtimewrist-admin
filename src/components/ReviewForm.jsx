import React from 'react'
import Box from './Box'
import { Formik, Form } from 'formik'
import Input from './Input'
import FormRow from './FormRow'
import Button from './Button'
import SpinnerMini from './SpinnerMini'
import * as Yup from "yup";


const ReviewForm = () => {

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
          .matches(/^\d+$/, "WhatsApp number must be numeric")
          .trim(),
        contact: Yup.string()
          .matches(/^\d+$/, "Phone number must be numeric")
          .trim(),
        email: Yup.string().email("Invalid email address"),
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
        <Form className="mx-auto max-w-screen-md my-8">
          <FormRow label="About para 1" name="about-1">
            <Input
              size="large"
              name="about-1"
              type="text"
              as='textarea'
              row={10}
              placeholder="About paragraph"
              disabled={isSubmitting}
            />
          </FormRow>
          <FormRow label="Missio para" name="mission">
            <Input
              size="large"
              name="mission"
              type="text"
              as='textarea'
              row={10}
              placeholder="Mission paragraph"
              disabled={isSubmitting}
            />
          </FormRow>
          <FormRow label="website" name="website">
            <Input
              size="large"
              name="website"
              type="text"
              placeholder="Website"
              disabled={isSubmitting}
            />
          </FormRow>

          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
          >
            {!isSubmitting ? "Save settings" : <SpinnerMini />}
          </Button>
        </Form>
      )}
    </Formik>
  </Box>
  )
}

export default ReviewForm
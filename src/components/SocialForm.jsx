import React from 'react'
import Box from './Box'
import { Form, Formik } from 'formik'
import FormRow from './FormRow'
import Input from './Input'
import Button from './Button'
import SpinnerMini from './SpinnerMini'
import * as Yup from "yup";


const SocialForm = () => {

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
        facebook: Yup.string().required('Facebook link is required'),
        instagram: Yup.string().required('Intsagram link is required'),
        whatsapp: Yup.string().required('WhatsApp link is required'),
          linkedin: Yup.string().required('Linkedin link is required'),
          youtube : Yup.string().required('Youtube link is required'),
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
                  <FormRow label="Facebook" name="facebook">
                    <Input
                      size="large"
                      name="facebook"
                      type="text"
                      placeholder="Facebook link"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="Whatsapp" name="whatsapp">
                    <Input
                      size="large"
                      name="whatsapp"
                      type="text"
                      placeholder="Whatsapp Link"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="instagram" name="instagram">
                    <Input
                      size="large"
                      name="instagram"
                      type="text"
                      placeholder="Instagram Link"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="linkedin" name="linkedin">
                    <Input
                      size="large"
                      name="linkedin"
                      type="email"
                      placeholder="Linkedin Link"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="youtube" name="youtube">
                    <Input
                      size="large"
                      name="youtube"
                      type="text"
                      placeholder="Youtube Link"
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

export default SocialForm
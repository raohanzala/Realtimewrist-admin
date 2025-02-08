import Box from './Box'
import { Formik, Form } from 'formik'
import FormRow from './FormRow'
import Input from './Input'
import Button from './Button'
import SpinnerMini from './SpinnerMini'
import * as Yup from "yup";


const ContactForm = () => {

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
      address: Yup.string().required('Address is required'),
      whatsapp: Yup.string().required('WhatsApp number is required')
        .matches(/^\d+$/, "WhatsApp number must be numeric")
        .trim(),
      contact : Yup.string().required('Contact number is required')
        .matches(/^\d+$/, "Contact number must be numeric")
        .trim(),
        email: Yup.string()
              .email('Invalid email address').required('Email is required'),
        website : Yup.string().required('Webiste link is required'),
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
                  <FormRow label="address" name="address">
                    <Input
                      size="large"
                      name="address"
                      type="text"
                      placeholder="Address"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="whatsapp" name="whatsapp">
                    <Input
                      size="large"
                      name="whatsapp"
                      type="text"
                      placeholder="Whatsapp"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="contact" name="contact">
                    <Input
                      size="large"
                      name="contact"
                      type="text"
                      placeholder="Contact"
                      disabled={isSubmitting}
                    />
                  </FormRow>
                  <FormRow label="email" name="email">
                    <Input
                      size="large"
                      name="email"
                      type="text"
                      placeholder="Email"
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
                    {!isSubmitting ? "Update settings" : <SpinnerMini />}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
  )
}

export default ContactForm
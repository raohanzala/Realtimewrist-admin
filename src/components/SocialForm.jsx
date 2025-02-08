import React, { useEffect } from 'react';
import Box from './Box';
import { Form, Formik } from 'formik';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SpinnerMini from './SpinnerMini';
import * as Yup from "yup";
import { useSocialLinks } from '../features/useSocialLinks'; 
import { useUpdateSocialLinks } from '../features/useUpdateSocialLinks';

const SocialForm = () => {
  const { data, isLoading, error } = useSocialLinks();
  console.log(data, 'DATA SOCIAL')
  
  const { isPending: isUpdating, updateLinks } = useUpdateSocialLinks();
  console.log(isUpdating)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading social links.</div>;
  }

  const initialValues = {
    facebook: data?.facebook || "",
    instagram: data?.instagram || "",
    whatsapp: data?.whatsapp || "",
    linkedin: data?.linkedin || "",
    youtube: data?.youtube || "",
  };

  const validationSchema = Yup.object({
    facebook: Yup.string()
      .url('Facebook link must be a valid URL')
      .required('Facebook link is required'),
  
    instagram: Yup.string()
      .url('Instagram link must be a valid URL')
      .required('Instagram link is required'),
  
    whatsapp: Yup.string()
      .url('WhatsApp link must be a valid URL')
      .required('WhatsApp link is required'),
  
    linkedin: Yup.string()
      .url('LinkedIn link must be a valid URL')
      .required('LinkedIn link is required'),
  
    youtube: Yup.string()
      .url('YouTube link must be a valid URL')
      .required('YouTube link is required'),
  });
  

  const onSubmitHandler = (values) => {
    updateLinks(values); 
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {() => (
          <Form className="mx-auto max-w-screen-md my-8">
            <FormRow label="Facebook" name="facebook">
              <Input
                size="large"
                name="facebook"
                type="text"
                placeholder="Facebook link"
                disabled={isUpdating}
              />
            </FormRow>

            <FormRow label="Whatsapp" name="whatsapp">
              <Input
                size="large"
                name="whatsapp"
                type="text"
                placeholder="Whatsapp Link"
                disabled={isUpdating}
              />
            </FormRow>

            <FormRow label="Instagram" name="instagram">
              <Input
                size="large"
                name="instagram"
                type="text"
                placeholder="Instagram Link"
                disabled={isUpdating}
              />
            </FormRow>

            <FormRow label="LinkedIn" name="linkedin">
              <Input
                size="large"
                name="linkedin"
                type="text"
                placeholder="LinkedIn Link"
                disabled={isUpdating}
              />
            </FormRow>

            <FormRow label="YouTube" name="youtube">
              <Input
                size="large"
                name="youtube"
                type="text"
                placeholder="YouTube Link"
                disabled={isUpdating}
              />
            </FormRow>

            <Button
              type="submit"
              variant="secondary"
              disabled={isUpdating}
            >
              {!(isUpdating) ? "Save settings" : <SpinnerMini />}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SocialForm;
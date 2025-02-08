import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Input from '../components/Input';
import Box from '../components/Box';
import Button from '../components/Button';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormRow from '../components/FormRow';
import ChangePassword from '../components/ChangePassword';

const EditProfile = () => {
  const [image, setImage] = useState(null);

  const { setPageTitle } = useContext(ShopContext)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

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
    fullName: Yup.string().required('Full Name is required'),
    contact: Yup.number().required('Contact is required'),
    email: Yup.string().email().required('Email is required'),
  });

  const onSubmitHandler = (e, values) => {
    e.preventDefault()
    console.log(values);
  };

  useEffect(() => {
    setPageTitle("Edit Profile")
  }, [])

  return (
    <>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form onSubmit={onSubmitHandler} className="space-y-3 px-5 py-3">
            <div className='mb-8'>
            <h2 className='text-dark-3 text-2xl'>Account</h2>
            <p className='text-sm text-gray-500'>Please configure your profile and fill in your information</p>
            </div>
            <div className="flex items-center">
              <div className="relative size-28">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className={`w-full h-full rounded-full object-cover border ${image ? 'border-primary-1' : ''}`}
                  />
                ) : (
                  <div className="w-full h-full rounded-full text-xs border  flex items-center justify-center">
                    <span className="text-gray-400 text">No Image</span>
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-col">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className='flex gap-3'>
                  <div
                    onClick={() => document.getElementById('image').click()}
                    className="  border cursor-pointer py-2 px-4 text-xs rounded text-gray-600 transition duration-200"
                  >
                    Upload Photo
                  </div>
                  {image && <div
                    className=" border cursor-pointer py-2 px-4 text-xs rounded text-[red] transition duration-200"
                  >
                    Remove Photo
                  </div>}
                </div>
                <p className='text-xs text-gray-500 mt-2'>

                  Pick a photo up to 4 MB
                </p>
              </div>
            </div>
            <div className="">
              <FormRow name="fullName" label="Full name">
                <Input
                  name="fullName"
                  type="text"
                  placeholder="Full name"
                  size='large'
                // disabled={actionLoading}
                />
              </FormRow>

              <FormRow name="email" label="Email Address">
                <Input
                  name="email"
                  type="text"
                  placeholder="Email address"
                  size='large'
                />
              </FormRow>
            </div>

            <div className='mt-6'>
              <Button
                type="submit"
                variant='secondary'
                
              >
                Save Settings
              </Button>
            </div>
          </Form>
        </Formik>
      </Box>

      <ChangePassword/>
    </>
  );
};

export default EditProfile;

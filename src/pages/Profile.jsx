import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Input from '../components/Input';
import Box from '../components/Box';
import Button from '../components/Button';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormRowVerticle from '../components/FormRowVerticle';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
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
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string(),
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
    <div className='grid grid-cols-2'>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >

          <Form onSubmit={onSubmitHandler} className="space-y-8 p-5">
            <div className="flex items-center">
              <div className="relative size-24">
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
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormRowVerticle name="firstName" label="First name">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    // disabled={actionLoading}
                  />
                </FormRowVerticle>

                <FormRowVerticle name="lastName" label="Last name">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                  />
                </FormRowVerticle>

                <FormRowVerticle name="email" label="Email Address">
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </FormRowVerticle>

                <FormRowVerticle name="contact" label="Contact">
                  <Input
                    name="contact"
                    type="number"
                    placeholder="Contact"
                  />
                </FormRowVerticle>


            </div>

            <div>
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
    </div>
  );
};

export default Profile;

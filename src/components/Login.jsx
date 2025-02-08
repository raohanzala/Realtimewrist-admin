import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import toast from 'react-hot-toast';
import Logo from './Logo';
import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import Button from './Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CgSpinner } from 'react-icons/cg';
import SpinnerMini from './SpinnerMini';
import { useLogin } from '../features/useLogin';
import Input from './Input';



function Login() {

  // const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const {isPending, loginFnc} = useLogin()

const initialValues = {
  email : '',
  password : ''
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


  const handleSubmit = async (values, {setSubmitting}) => {
    console.log(values)
    loginFnc(values)
  }

  console.log(isPending, 'Loading')

  return (
    <div className="flex items-center justify-center min-h-screen px-5 fixed backdrop-blur-md inset-0 bg-gray-100">
      <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-white rounded shadow-lg">
        <img
          src={assets.logo2}
          alt="Logo"
          className="w-[50%] m-auto mb-3"
        />
        <h2 className=" font-bold text-center text-xl sm:text-2xl text-gray-800 mb-1">Admin Dashboard</h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-5">Sign in to your admin account</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Admin Email</label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  disabled={isSubmitting}
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  disabled={isSubmitting}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <Button
                type="submit"
                variant='primary'
                size='large'
                className="w-full"
                disabled={isSubmitting}
              >
                {!(isSubmitting || isPending) ? 'Login' : <SpinnerMini/>}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login
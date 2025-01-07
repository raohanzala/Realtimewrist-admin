import React from 'react'
import {Field, ErrorMessage } from 'formik';


const Input = ({ label, name, type = "text", as = "input", ...props }) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <Field
        as={as}
        id={name}
        name={name}
        type={type}
        className="w-full mt-1 text-sm p-2 border rounded-sm"
        {...props}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default Input
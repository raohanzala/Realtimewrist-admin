import { ErrorMessage } from 'formik'
import React from 'react'

const FormRow = ({ label, name, children }) => {
  return (
    <div className="grid grid-cols-[10rem_2fr_1.2fr] items-center gap-9 mb-2">
    {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
    {children}
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </div>
  )
}

export default FormRow
import { ErrorMessage } from 'formik'
import React from 'react'

const FormRowVerticle = ({ label, name, children }) => {
  return (
    <div className="mb-2">
    {label && <label htmlFor={name} className="mb-1 capitalize text-dark-3">{label}</label>}
    {children}
    <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
  </div>
  )
}

export default FormRowVerticle
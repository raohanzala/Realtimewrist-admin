import React from 'react'

const FormRowVerticle = ({ label, error, children }) => {
  return (
    <div className="block mb-4">
    {label && <label htmlFor={children.props.id} className="text-base text-dark-3">{label}</label>}
    {children}
    {error && <div className='text-xs color-[red]'>{error}</div>}
  </div>
  )
}

export default FormRowVerticle
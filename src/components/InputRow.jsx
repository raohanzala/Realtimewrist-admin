import {Field, ErrorMessage } from 'formik';

const InputRow = ({ label, name, type = "text", as = "input", ...props }) => {
  return (
    <div className="grid items-center grid-cols-[24rem_1fr_1.2fr]">
      <label htmlFor={name} className="mb-1 capitalize">
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

export default InputRow
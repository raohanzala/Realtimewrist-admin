import {Field, ErrorMessage } from 'formik';

const Input = ({  name, type = "text", as = "input", ...props }) => {
  return (
      <Field
        as={as}
        id={name}
        name={name}
        type={type}
        className="w-full mt-1 text-sm p-2 py-3 border rounded"
        {...props}
      />
  );
};

export default Input
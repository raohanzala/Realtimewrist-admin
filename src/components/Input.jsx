import {Field, ErrorMessage } from 'formik';

const Input = ({  name, type = "text", as = "input", size = 'medium', ...props }) => {
  const sizes = {
    medium :  `py-2 `,
    large : `py-3`
  }

  return (
      <Field
        as={as}
        id={name}
        name={name}
        type={type}
        className={`w-full mt-1 text-sm p-2 border rounded ${sizes[size]}`}
        {...props}
      />
  );
};

export default Input
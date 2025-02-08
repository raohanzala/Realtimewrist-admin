import {Field } from 'formik';

const FileInput = ({  name, ...props }) => {

  return (
      <Field
        as={File}
        id={name}
        name={name}
        type={'file'}
        className={`w-full mt-1 text-sm p-2 border rounded file:cursor-pointer`}
        {...props}
      />
  );
};

export default FileInput
import React, { useState } from 'react'
import Box from './Box'
import Button from './Button'
import Modal from './Modal'
import { Form, Formik } from 'formik'
import FormRow from './FormRow'
import Input from './Input'
import * as Yup from "yup";
import FormRowVerticle from './FormRowVerticle'
import axiosInstance from '../api-test/axiosInstance'

const ChangePassword = () => {
  const [isPasswordModal, setIsPasswordModal] = useState(false)
  const [isAdminModal, setIsAdminModal] = useState(false)
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);



  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Current password is required"),
    newEmail: Yup.string().email("Invalid email"), // Optional
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .when("confirmPasswords", {
        is: (value) => value && value.length > 0,
        then: Yup.string().required("New password is required"),
      })
  });



  const validationSchemaAdmin = Yup.object({
    name: Yup.string().required("Admin name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const { email, password, newEmail, newPassword } = values;

      // Ensure at least one field (newEmail or newPassword) is provided
      if (!newEmail && !newPassword) {
        setErrors({ general: "Please provide a new email or new password" });
        setSubmitting(false);
        return;
      }

      const response = await axiosInstance.put("/user/admin/update-credentials", {
        email,
        password,
        newEmail: newEmail || undefined, // Avoid sending empty fields
        newPassword: newPassword || undefined,
      });

      if (response.data.success) {
        setMessage("Admin credentials updated successfully!");
        resetForm();
        setIsPasswordModal(false); // Close modal on success
      } else {
        setErrors({ general: response.data.message || "Failed to update credentials" });
      }
    } catch (err) {
      setErrors({ general: "Failed to update credentials. Please try again." });
    } finally {
      setSubmitting(false); // Ensure this runs even if validation fails
    }
  };



  const handleSubmitAdmin = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const { name, email, password, confirmPassword } = values;

      // Check if passwords match
      if (password !== confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }

      // Send request to create admin
      const response = await axiosInstance.post("/user/create/admin", { name, email, password });

      if (response.data.success) {
        alert("Admin created successfully!"); // You can replace this with a message state
        resetForm();
      } else {
        setErrors({ email: response.data.message || "Failed to create admin" });
      }
    } catch (error) {
      console.error(error);
      setErrors({ email: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className='mt-8'>
      <Box>
        <div className='py-3 px-4 flex items-center justify-between'>
          <div>
            <p className='text-lg text-dark-3'>Email/Password</p>
            <p className='text-sm text-gray-500'>Change admin eamil or password</p>
          </div>

          <div>
            <div className='text-sm text-gray-500 border rounded py-2 px-3 hover:border-primary-1 hover:text-dark-3 cursor-pointer transition-all duration-200' onClick={(e) => { setIsPasswordModal(true); e.stopPropagation(); }}>Update email/password            </div>
          </div>
        </div>
        <hr />
        <div className=' py-3 px-4 flex items-center justify-between'>
          <div>
            <p className='text-lg text-dark-3'>Admin</p>
            <p className='text-sm text-gray-500'>Create admin</p>
          </div>

          <div>
            <div className='text-sm text-gray-500 border rounded py-2 px-3 hover:border-primary-1 hover:text-dark-3 cursor-pointer' onClick={(e) => { setIsAdminModal(true); e.stopPropagation(); }}>Create new admin</div>
          </div>
        </div>
      </Box>

      {isPasswordModal && (
        <Modal onClose={() => setIsPasswordModal(false)} isOpen={isPasswordModal} title={"Change Email/Password"}>
          <div className="w-[400px]">
            {message && <div className="text-green-500">{message}</div>}
            {error && <div className="text-red-500">{error}</div>}

            <Formik
              initialValues={{
                email: "",
                password: "",
                newEmail: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="py-3">
                  <FormRowVerticle name="email" label="Current Email">
                    <Input name="email" type="email" placeholder="Current Email" size="large" disabled={isSubmitting} />
                  </FormRowVerticle>

                  <FormRowVerticle name="password" label="Current Password">
                    <Input name="password" type="password" placeholder="Current Password" size="large" disabled={isSubmitting} />
                  </FormRowVerticle>

                  <FormRowVerticle name="newEmail" label="New Email (optional)">
                    <Input name="newEmail" type="email" placeholder="New Email" size="large" disabled={isSubmitting} />
                  </FormRowVerticle>

                  <FormRowVerticle name="newPassword" label="New Password (optional)">
                    <Input name="newPassword" type="password" placeholder="New Password" size="large" disabled={isSubmitting} />
                  </FormRowVerticle>

                  <FormRowVerticle name="confirmPassword" label="Confirm New Password">
                    <Input name="confirmPassword" type="password" placeholder="Confirm Password" size="large" disabled={isSubmitting} />
                  </FormRowVerticle>

                  <div className="flex justify-between items-center mt-6">
                    <Button type="button" variant="cancel" onClick={() => setIsPasswordModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="secondary" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Confirm"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}


      {isAdminModal && (
        <Modal onClose={() => setIsAdminModal(false)} isOpen={isAdminModal} title="Create Admin">
          <div className="w-[400px]">



            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchemaAdmin}
              onSubmit={handleSubmitAdmin}
            >
              {({ errors, isSubmitting }) => (
                <Form className="py-3">
                  {error && <div className="text-red-500">{error}</div>}
                  {errors.general && <div className="text-red-500">{errors.general}</div>}
                  <FormRowVerticle name="name" label="Admin Name">
                    <Input name="name" type="text" placeholder="Enter admin name" size="large" />
                  </FormRowVerticle>

                  <FormRowVerticle name="email" label="Email">
                    <Input name="email" type="email" placeholder="Enter email" size="large" />
                  </FormRowVerticle>

                  <FormRowVerticle name="password" label="Password">
                    <Input name="password" type="password" placeholder="Enter password" size="large" />
                  </FormRowVerticle>

                  <FormRowVerticle name="confirmPassword" label="Confirm Password">
                    <Input name="confirmPassword" type="password" placeholder="Confirm password" size="large" />
                  </FormRowVerticle>

                  <div className="flex justify-between items-center mt-6">
                    <Button type="button" variant="cancel" onClick={() => setIsAdminModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="secondary" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Admin"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}

    </div>
  )
}

export default ChangePassword

// import React, { useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import Box from "./Box";
// import Button from "./Button";
// import Modal from "./Modal";
// import Input from "./Input";
// import FormRowVerticle from "./FormRowVerticle";

// const ChangePassword = () => {
//   const [isPasswordModal, setIsPasswordModal] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const validationSchema = Yup.object().shape({
//     password: Yup.string().required("Current password is required"),
//     newPassword: Yup.string()
//       .min(6, "New password must be at least 6 characters")
//       .required("New password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//       .required("Confirm password is required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setMessage(null);
//     setError(null);

//     try {
//       const token = localStorage.getItem("adminToken"); // Get admin token
//       const { data } = await axios.put(
//         "https://yourapi.com/api/admin/change-password",
//         values,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (data.success) {
//         setMessage("Password changed successfully!");
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }

//     setSubmitting(false);
//   };

//   return (
//     <div className="mt-8">
//       <Box>
//         <div className="py-3 px-4 flex items-center justify-between">
//           <div>
//             <p className="text-lg text-dark-3">Password</p>
//             <p className="text-sm text-gray-500">Change your password</p>
//           </div>
//           <div>
//             <div
//               className="text-sm text-gray-500 hover:text-dark-3 cursor-pointer"
//               onClick={() => setIsPasswordModal(true)}
//             >
//               Change Password
//             </div>
//           </div>
//         </div>
//       </Box>

//       {isPasswordModal && (
//         <Modal onClose={() => setIsPasswordModal(false)} isOpen={isPasswordModal} title={"Change Password"}>
//           <div className="w-[400px]">
//             <Formik
//               initialValues={{ password: "", newPassword: "", confirmPassword: "" }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="py-3">
//                   <FormRowVerticle name="password" label="Current Password">
//                     <Field name="password" type="password" placeholder="Current Password" as={Input} />
//                   </FormRowVerticle>

//                   <FormRowVerticle name="newPassword" label="New Password">
//                     <Field name="newPassword" type="password" placeholder="New Password" as={Input} />
//                   </FormRowVerticle>

//                   <FormRowVerticle name="confirmPassword" label="Confirm Password">
//                     <Field name="confirmPassword" type="password" placeholder="Confirm Password" as={Input} />
//                   </FormRowVerticle>

//                   {message && <p className="text-green-600">{message}</p>}
//                   {error && <p className="text-red-600">{error}</p>}

//                   <div className="flex justify-between items-center mt-6">
//                     <Button type="button" variant="cancel" onClick={() => setIsPasswordModal(false)}>
//                       Cancel
//                     </Button>
//                     <Button type="submit" variant="secondary" disabled={isSubmitting}>
//                       {isSubmitting ? "Updating..." : "Confirm"}
//                     </Button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ChangePassword;

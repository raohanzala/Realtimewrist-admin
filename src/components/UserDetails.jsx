import { Form, Formik } from 'formik'
import React from 'react'
import FormRowVerticle from './FormRowVerticle'
import Input from './Input'
import Button from './Button'
import { formatTimeAgo } from '../helpers'

const UserDetails = ({user, setProfileModal}) => {

  const initialValues = {
name : user.name,
email : user.email,
password : user?.local,
date : user.date,
cartData : user.cartData

  }


  return (
    <div className='w-full min-w-96 max-h-[90vh] '>
          <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          // onSubmit={onSubmitHandler}
          >
            {({ isSubmitting }) => (
              <Form className='space-y-3'>

                <FormRowVerticle label="User name" name="name">
                  <Input
                    name="name"
                    // disabled={true}
                    readOnly
                    
                    rows={3}
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
                <FormRowVerticle label="Email Address" name="email">
                  <Input
                    name="email"
                    readOnly
                    rows={3}
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
                <FormRowVerticle label="User Password" name="password">
                  <Input
                    name="password"
                    readOnly
                    rows={3}
                    type='password'
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
              </Form>
            )}
          </Formik>

          <div className='flex gap-5 text-dark-3 items-center mt-4'>
            <div>Cart Length:</div>
            {user.cartData.length}
          </div>
          <div className='text-dark-3 text-xs'>{formatTimeAgo(user.date)}</div>

          <div className='mt-8'>
            <Button variant='cancel' type="button"
              onClick={() => setProfileModal(false)}>Cancel</Button>
          </div>
        </div>
  )
}

export default UserDetails
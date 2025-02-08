import React, { useState } from 'react'
import Box from './Box'
import Button from './Button'
import Modal from './Modal'
import { Form, Formik } from 'formik'
import FormRow from './FormRow'
import Input from './Input'
import FormRowVerticle from './FormRowVerticle'

const ChangePassword = () => {
  const [isPasswordModal, setIsPasswordModal] = useState(false)
  return (
    <div className='mt-8'>
    <Box>
      <div className='py-3 px-4 flex items-center justify-between'>
        <div>
        <p className='text-lg text-dark-3'>Password</p>
        <p className='text-sm text-gray-500'>Change your password</p>
        </div>

        <div>
          <div className='text-sm text-gray-500 hover:text-dark-3 cursor-pointer' onClick={(e)=> {setIsPasswordModal(true); e.stopPropagation();}}>Change Password</div>
        </div>
      </div>
      <hr />
      <div className=' py-3 px-4 flex items-center justify-between'>
        <div>
        <p className='text-lg text-dark-3'>Password</p>
        <p className='text-sm text-gray-500'>Change your password</p>
        </div>

        <div>
          <div className=''>Change Password</div>
        </div>
      </div>
    </Box>

    {
      isPasswordModal && <Modal onClose={()=> setIsPasswordModal(false)} isOpen={isPasswordModal} title={'Change Password'}>
        <div className='w-[400px]'>
        <Formik
          // initialValues={initialValues}
          // validationSchema={validationSchema}
          // onSubmit={onSubmitHandler}
        >
          <Form className=" py-3">
            <div className="">
              <FormRowVerticle name="password" label="Password">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  size='large'
                // disabled={actionLoading}
                />
              </FormRowVerticle>
              <FormRowVerticle name="newPassword" label="New Password">
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="New password"
                  size='large'
                // disabled={actionLoading}
                />
              </FormRowVerticle>

              <FormRowVerticle name="confirmPassword" label="Confirm password">
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  size='large'
                />
              </FormRowVerticle>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button
                type="button"
                // disabled={isSubmitting || isWorking}
                variant="cancel"
                onClick={()=>setIsPasswordModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant='secondary'
                
              >
                Confirm
              </Button>
            </div>
          </Form>
        </Formik>
        </div>
      </Modal>
    }
    </div>
  )
}

export default ChangePassword
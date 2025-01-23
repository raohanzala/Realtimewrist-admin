import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import SearchSortBar from '../components/SearchSortBar'
import { IoMdMore, IoMdPerson } from "react-icons/io";
import { timestampToShortDate } from '../helpers'
import { useUsers } from '../features/useUsers'
import Empty from '../components/Empty'
import Modal from '../components/Modal';
import FormRowVerticle from '../components/FormRowVerticle';
import Input from '../components/Input';
import { Form, Formik } from 'formik';
import Button from '../components/Button';
import ConfirmationModal from '../components/ConfirmationModal';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';

const Users = () => {
  const [isProfilePopup, setProfilePopup] = useState(false);
  const [isProfileModal, setProfileModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const { setPageTitle } = useContext(ShopContext)

  const { users, isLoading } = useUsers()
  console.log(users, isLoading, 'QUERY USERS')

  const handleProfilePopup = (e) => {
    e.stopPropagation();
    setProfilePopup((prevState) => !prevState);
  };
  const handleProfileModal = (e) => {
    e.stopPropagation();
    setProfileModal((prevState) => !prevState);
    setProfilePopup(false)
  };
  const handleDeleteUser = (e)=> {
    e.stopPropagation();
    setProfilePopup(false)
  }

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      // await removeProduct(productToDelete);
      console.log(productToDelete, 'TO DELTE')
      setProductToDelete(null);
      setIsConfirmModal(false);
    }
  };

  useEffect(() => {
    setPageTitle('Users')
  }, [setPageTitle])

  return (
    <div>
      <SearchSortBar placeholder="Search user" sortOptions={['recent', 'date']} filterOptions={['recent', 'date']} />

      <div className='grid gap-5 grid-cols-4 py-8'>
        {/* {isLoading ? <SkeletonRow /> : users?.length > 0 ? users?.map((user) => (
          <div className='rounded-md border relative overflow-hidden' key={user._id}>
            <div className='bg-primary-1 py-1 px-2 text-white z-10 absolute text-xs top-0 right-0'>Customer</div>
            <div className='bg-gray-100 py-4'>
              <IoMdPerson className='text-5xl text-white m-auto' />
            </div>
            <div className='bg-white text-center py-3 px-2'>
              <h2>{user.name}</h2>
              <p className='text-sm text-gray-500'>{user.email}</p>

              <div className='flex justify-between text-xs text-gray-500 mt-3'>
                <p>Orders#2</p>
                <p>{timestampToShortDate(user.date)}</p>
              </div>
            </div>
          </div>
        )): <div className='col-span-4'><Empty resourceName="users" /></div> 
        } */}
        <div className='rounded-md border relative overflow-hidden' key={7}>
          <div className={` absolute top-1 right-1 text-gray-500 rounded py-1 ${isProfilePopup ? 'bg-gray-50' : ''}`} onClick={handleProfilePopup}>
            <IoMdMore className="text-xl cursor-pointer " />
            {isProfilePopup && <div className='absolute top-8 w-32 cursor-pointer rounded -left-28 bg-white' style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
              <ul className='text-xs text-nowrap'>
                <li className='flex items-center gap-1 p-3 hover:bg-gray-100' onClick={handleProfileModal}><MdRemoveRedEye size={14}/> View details</li>
                <li className='p-3 hover:bg-gray-100' onClick={handleDeleteClick}> Delete user</li>
              </ul>
            </div>}
          </div>
          <div className='bg-gray-100 py-4'>
            <IoMdPerson className='text-5xl text-white m-auto' />
          </div>
          <div className='bg-white text-center py-3 px-2'>
            <h2>Rao Hassan</h2>
            <p className='text-sm text-gray-500'>asdfkj</p>

            <div className='flex justify-between text-xs text-gray-500 mt-3'>
              <p>Orders#2</p>
              <p>{timestampToShortDate(67777)}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isConfirmModal}
        title="Delete User"
        onClose={() => setIsConfirmModal(false)}
      >
        <ConfirmationModal
          message={"Are you sure you want to delete this user?"}
          confirmText={"Delete"}
          cancelText={"Cancel"}
          onConfirm={handleConfirmDelete}
          onCancel={null}
          onClose={() => setIsConfirmModal(false)}
        />
      </Modal>

      <Modal
        isOpen={isProfileModal}
        title={"User Details"}
        onClose={() => setProfileModal(false)}
      >
        <div className='w-full min-w-96 max-h-[90vh] '>
          <Formik
          // initialValues={initialValues}
          // validationSchema={validationSchema}
          // onSubmit={onSubmitHandler}
          >
            {({ isSubmitting }) => (
              <Form >

                <FormRowVerticle label="User name" name="name">
                  <Input
                    name="name"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
                <FormRowVerticle label="Email Address" name="email">
                  <Input
                    name="userName"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
                <FormRowVerticle label="User Password" name="password">
                  <Input
                    name="password"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </FormRowVerticle>
              </Form>
            )}
          </Formik>

          <div className='mt-8'>
            <Button variant='cancel' type="button"
              onClick={() => setProfileModal(false)}>Cancel</Button>
          </div>
        </div>

      </Modal>
    </div>
  )
}

const SkeletonRow = () => {
  const skeletons = Array(8).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse border rounded-md"
        >
          <div className="w-full h-28 bg-gray-200"></div>

          <div className='py-4 bg-white'>
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-2 m-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-2/4 m-auto"></div>
            <div className='flex justify-between text-xs text-gray-500 mt-3 px-2'>
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
              <div className="h-2 bg-gray-200 rounded-sm w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users
import React from 'react'
import Button from './Button'
import SpinnerMini from './SpinnerMini'

const ConfirmationModal = ({
  message = 'Are you sure?',
  confirmText = 'Ok',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onClose,
  isLoading
}) => {

  console.log('Is de;et', isLoading)


  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <div>
      <p className='mb-4'>{message}</p>
      <div className='flex justify-between'>
        <Button variant='cancel' onClick={() => {
          if (onCancel) onCancel();
          handleClose();
        }}>{cancelText}</Button>
        <Button variant='delete' onClick={() => {
          if (onConfirm) onConfirm();
          // handleClose();
        }}>{!isLoading ? confirmText : <SpinnerMini />}</Button>
      </div>
    </div>
  )
}

export default ConfirmationModal
import React from 'react'

const ConfirmationModal = ({
  message = 'Are you sure?',
  confirmText = 'Ok',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onClose }) => {


  const handleClose=()=> {
    if(onClose) onClose()
  }

  return (
      <div>
        <p className='mb-4'>{message}</p>

        <div className='flex justify-between'>
          <button className='text-[#333] border-0' onClick={()=> {
            if (onCancel) onCancel();
            handleClose();
            }}>{cancelText}</button>
          <button className=' text-[red] border-0' onClick={() => {
              if (onConfirm) onConfirm();
              handleClose();
            }}>{confirmText}</button>
        </div>
      </div>
  )
}

export default ConfirmationModal
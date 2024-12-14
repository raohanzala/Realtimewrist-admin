import React from 'react'

const ConfirmationModal = ({ show = false,
  title = 'Confirmation Modal',
  message = 'Are you sure?',
  confirmText = 'Ok',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  onClose }) => {

  if (!show) return null

  const handleClose=()=> {
    if(onClose) onClose()
  }

  return (
    <div className='bg-black bg-opacity-20 w-full h-full fixed inset-0 flex justify-center items-center' onClick={handleClose}>
      <div className='bg-white rounded py-5 px-8 shadow-lg' onClick={(e)=> e.stopPropagation()}>
        <h1 className='font-semibold mb-3 text-lg'>{title}</h1>
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
    </div>
  )
}

export default ConfirmationModal
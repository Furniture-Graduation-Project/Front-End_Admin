import React from 'react'
import { Button } from '@/components/ui/button'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80'>
        <h2 className='text-lg font-semibold dark:text-gray-100'>{title}</h2>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>{description}</p>
        <div className='mt-4 flex justify-end space-x-2'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal

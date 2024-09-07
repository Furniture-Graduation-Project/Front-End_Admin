import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Trash, Edit } from 'lucide-react'
import { Account } from '@/interface/account'

const accounts: Account[] = [
  {
    id: 1,
    type: 'Admin',
    provider: 'Google',
    expires_at: '2024-12-31',
    status: 'active'
  },
  {
    id: 2,
    type: 'User',
    provider: 'Facebook',
    expires_at: '2025-06-15',
    status: 'active'
  },
  {
    id: 3,
    type: 'Guest',
    provider: 'Twitter',
    expires_at: '2023-09-20',
    status: 'inactive'
  }
]

const AccountDetail = () => {
  const { id } = useParams<{ id: string }>()
  const accountId = Number(id)
  const account = accounts.find((acc) => acc.id === accountId)

  if (!account) {
    return <p>Account not found</p>
  }

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      <h2 className='text-2xl font-semibold mb-7'>Account Details</h2>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <span className='font-bold'>ID:</span>
            <span>{account.id}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-bold'>Type:</span>
            <span>{account.type}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-bold'>Provider:</span>
            <span>{account.provider}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-bold'>Expires At:</span>
            <span>{account.expires_at}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-bold'>Status:</span>
            <span>{account.status}</span>
          </div>
        </div>
        <div className='mt-6'>
          <Button variant='outline' className='mr-2'>
            <Edit size={18} className='mr-2' />
            Edit
          </Button>
          <Button variant='outline' color='red'>
            <Trash size={18} className='mr-2' />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AccountDetail

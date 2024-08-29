import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CircleAlert, FileDown, Trash2 } from 'lucide-react'
import SenderInformation from './_component/SenderInformation'

const MessageList = () => {
  return (
    <div className='bg-white rounded-lg w-full p-10 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 place-self-center space-y-5 sm:space-y-0 sm:flex justify-between'>
        <Input className='rounded-2xl w-full sm:w-[330px] bg-slate-100' placeholder='Search Mail' />
        <div className='flex justify-center sm:justify-end'>
          <Button className='rounded-r-none border-2 bg-white'>
            <FileDown className='text-black' />
          </Button>
          <Button className='rounded-none border-2 bg-white'>
            <CircleAlert className='text-black' />
          </Button>
          <Button className='rounded-l-none border-2 bg-white'>
            <Trash2 className='text-black' />
          </Button>
        </div>
      </div>

      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
      <SenderInformation />
    </div>
  )
}

export default MessageList

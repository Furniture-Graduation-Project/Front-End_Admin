import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CircleAlert, FileDown, Trash2 } from 'lucide-react'
import React from 'react'
import SenderInformation from './components/SenderInformation'
import MessLeft from './components/MessLeft'

const MessageList = () => {
  return (
    <>
      <div className='min-h-screen bg-[#F5F6FA]'>
        <p className='p-10 text-[32px] font-bold'>Inbox</p>

        <div className='flex gap-10 ml-10 mr-10'>
          <MessLeft />
          <div className='bg-white rounded-lg w-[70%] p-10 '>
            <div className='flex justify-between'>
              <Input className='rounded-2xl w-[330px] bg-slate-100' placeholder='Search Mail' />
              <div className='flex'>
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
        </div>
      </div>
    </>
  )
}

export default MessageList

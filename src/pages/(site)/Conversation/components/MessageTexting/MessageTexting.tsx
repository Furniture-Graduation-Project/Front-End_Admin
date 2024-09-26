import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileImage, Mic, Paperclip, PrinterIcon, Send, Star, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import MessageContent from './_component/MessageContent'
import { Link } from 'react-router-dom'

const MessageTexting: React.FC = () => {
  return (
    <div className='bg-white rounded-lg w-full p-10 '>
      <div className='flex justify-between'>
        <div className='flex mt-2'>
          <Link to={`/conversation`}>
            <ArrowLeft className='bg-slate-200 rounded-lg' />
          </Link>
          <p className='font-bold text-[20px] ml-3 relative -mt-[3px]'>Minerva Barnett</p>
          <Button className='bg-[#eebdff] text-[#D456FD] h-[22px] ml-4'>Friend</Button>
        </div>

        <div className='flex'>
          <Button className='rounded-r-none border-2 bg-white'>
            <PrinterIcon className='text-black' />
          </Button>
          <Button className='rounded-none border-2 bg-white'>
            <Star className='text-black' />
          </Button>
          <Button className='rounded-l-none border-2 bg-white'>
            <Trash className='text-black' />
          </Button>
        </div>
      </div>

      <div className='h-[1px] bg-gray-300 my-4 relative -m-5'></div>

      <div className='mb-16'>
        <MessageContent
          text='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.'
          sender='other'
          time='10:15 AM'
          avatarSrc='/404.png'
        />
        <MessageContent
          text='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.'
          sender='me'
          time='10:16 AM'
        />
        <MessageContent
          text="The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company."
          sender='other'
          time='10:17 AM'
          avatarSrc='/404.png'
        />
      </div>

      <div className='absolute bottom-5 left-5 right-5 flex justify-center items-center space-x-6'>
        <Mic />
        <Input placeholder='Write message' className='border-none' />
        <Paperclip />
        <FileImage />
        <Button className='bg-blue-600 w-[150px]'>
          Send <Send className='w-[15px] h-[15px] ml-1' />
        </Button>
      </div>
      <div className='absolute bottom-16 left-5 right-5 h-[1px] bg-gray-300 mb-4 -m-5'></div>
    </div>
  )
}

export default MessageTexting

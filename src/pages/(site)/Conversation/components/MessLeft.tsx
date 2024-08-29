import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Star, Send, Pencil, TriangleAlert, MessageCircleQuestion, Trash2 } from 'lucide-react'
import React from 'react'

const MessLeft = () => {
  return (
    <>
      <div className='bg-white rounded-lg p-10 w-[30%]'>
        <Button className='bg-blue-600 w-[255px]'>+ Compase</Button>
        <p className='mt-8 font-bold text-[18px]'>My Email</p>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between mt-5'>
          <div className='flex items-center'>
            <Mail />
            <p className='ml-2'>Inbox</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <Star />
            <p className='ml-2'>Starred</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <Send />
            <p className='ml-2'>Send</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <Pencil />
            <p className='ml-2'>Draft</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <TriangleAlert />
            <p className='ml-2'>Spam</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <MessageCircleQuestion />
            <p className='ml-2'>Important</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <Button className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between '>
          <div className='flex items-center'>
            <Trash2 />
            <p className='ml-2'>Bin</p>
          </div>
          <p className='text-right'>123</p>
        </Button>

        <p className='mt-7 font-bold text-[18px]'>Label</p>

        <div className='mt-8 ml-5 flex items-center'>
          <Input type='checkbox' className='w-[20px] h-[20px]' />
          <p className='font-bold ml-5'>Primary</p>
        </div>

        <div className='mt-6 ml-5 flex'>
          <Input type='checkbox' className='w-[20px] h-[20px]' />
          <p className='font-bold ml-5'>Social</p>
        </div>
        <div className='mt-6 ml-5 flex'>
          <Input type='checkbox' className='w-[20px] h-[20px]' />
          <p className='font-bold ml-5'>Friends</p>
        </div>

        <Button className='w-[255px] mt-5 bg-white text-gray-400 hover:bg-slate-200'>+ Create New Label</Button>
      </div>
    </>
  )
}

export default MessLeft

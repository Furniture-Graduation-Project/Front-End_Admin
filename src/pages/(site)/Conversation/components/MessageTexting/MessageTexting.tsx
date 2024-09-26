import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CornerDownLeft, Mic, Paperclip, PrinterIcon, Star, Trash } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import MessageContent from './_component/MessageContent'
import { Link } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

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
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MessageTexting

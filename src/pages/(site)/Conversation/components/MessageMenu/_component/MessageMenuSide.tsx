import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IMessageButton, IMessageLabel, IMessageMenu } from '@/interface/messageMenu'

const MessageMenuSide = ({ menu }: { menu: IMessageMenu }) => {
  return (
    <div className='bg-white rounded-lg p-10 w-full hidden sm:block'>
      <Button className='bg-blue-600 w-[255px]'>+ Compose</Button>
      <p className='mt-8 font-bold text-[18px]'>My Email</p>

      {menu.buttons.map(({ icon: Icon, text, count }: IMessageButton) => (
        <Button
          key={text}
          className='bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] flex items-center justify-between mt-5'
        >
          <div className='flex items-center'>
            <Icon />
            <p className='ml-2'>{text}</p>
          </div>
          <p className='text-right'>{count}</p>
        </Button>
      ))}

      <p className='mt-7 font-bold text-[18px]'>Label</p>

      {menu.labels.map(({ text }: IMessageLabel) => (
        <div key={text} className='mt-6 ml-5 flex'>
          <Input type='checkbox' className='w-[20px] h-[20px]' />
          <p className='font-bold ml-5'>{text}</p>
        </div>
      ))}

      <Button className='w-[255px] mt-5 bg-white text-gray-400 hover:bg-slate-200'>+ Create New Label</Button>
    </div>
  )
}

export default MessageMenuSide

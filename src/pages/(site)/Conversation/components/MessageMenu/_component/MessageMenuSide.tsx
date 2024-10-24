import { Button } from '@/components/ui/button'
import { IMessageButton, IMessageMenu } from '@/interface/message'
import { Link } from 'react-router-dom'

const MessageMenuSide = ({ menu }: { menu: IMessageMenu }) => {
  return (
    <div className='bg-white rounded-lg p-10 w-full h-full hidden sm:block border border-gray-200'>
      <Button className='bg-blue-600 w-[255px]'>+ Tin nhắn mới</Button>
      <p className='mt-8 font-bold text-[18px]'>Hộp thư</p>

      {menu.buttons.map(({ icon: Icon, text, count, path }: IMessageButton, index: number) => (
        <Link
          to={path}
          key={text}
          className={`bg-white hover:bg-blue-300 text-black w-[255px] h-[43px] p-2 rounded-md flex items-center justify-between mt-1 ${index === 0 ? 'bg-blue-300' : ''}`}
        >
          <div className='flex items-center'>
            <Icon />
            <p className='ml-2'>{text}</p>
          </div>
          <p className='text-right'>{count}</p>
        </Link>
      ))}
    </div>
  )
}

export default MessageMenuSide

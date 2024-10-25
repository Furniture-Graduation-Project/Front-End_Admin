import { Button } from '@/components/ui/button'
import { IMessageButton, IMessageMenu } from '@/interface/message'
import { NavLink } from 'react-router-dom'

const MessageMenuSide = ({ menu }: { menu: IMessageMenu }) => {
  return (
    <div className='bg-white dark:bg-slate-800 rounded-lg p-10 w-full h-full hidden sm:block border border-gray-200 dark:border-slate-700'>
      <Button className='bg-blue-600 dark:bg-blue-500 text-white w-[255px]'>+ Tin nhắn mới</Button>
      <p className='mt-8 font-bold text-[18px] dark:text-slate-200'>Hộp thư</p>

      {menu.buttons.map(({ icon: Icon, text, count, path }: IMessageButton) => (
        <NavLink
          to={path}
          key={text}
          className={({ isActive }) =>
            `w-[255px] h-[43px] p-2 rounded-md flex items-center justify-between mt-1 transition-colors ${
              isActive ? 'bg-blue-300 dark:bg-blue-600' : 'bg-white dark:bg-slate-700'
            } hover:bg-blue-300 dark:hover:bg-blue-600 text-black dark:text-white`
          }
        >
          <div className='flex items-center'>
            <Icon />
            <p className='ml-2'>{text}</p>
          </div>
          <p className='text-right'>{count}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default MessageMenuSide

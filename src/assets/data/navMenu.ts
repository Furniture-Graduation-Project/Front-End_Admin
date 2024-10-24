import { BarChart, Bot, CreditCard, Folder, User, UserCog } from 'lucide-react'

const navMenu = {
  user: {
    name: 'John Doe',
    avatar: 'https://github.com/eduardo-oliveira.png',
    email: 'Gj5fY@example.com'
  },
  navMain: [
    {
      title: 'Thống kê',
      url: '/dashboard',
      icon: BarChart
    },
    {
      title: 'Sản Phẩm',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Danh Sách',
          url: '/product'
        },
        {
          title: 'Thêm Mới',
          url: '/product/add'
        }
      ]
    },
    {
      title: 'Danh Mục',
      url: '#',
      icon: Folder,
      items: [
        {
          title: 'Danh Sách',
          url: '/category'
        },
        {
          title: 'Thêm Mới',
          url: '/category/add'
        }
      ]
    },
    {
      title: 'Nhắn Tin',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Danh Sách',
          url: '/conversation'
        },
        {
          title: 'Thêm Mới',
          url: '/conversation/texting'
        }
      ]
    },
    {
      title: 'Đơn Hàng',
      url: '/order',
      icon: CreditCard
    },

    {
      title: 'Khách Hàng',
      url: '/account',
      icon: User
    },
    {
      title: 'Nhân Viên',
      url: '#',
      icon: UserCog,
      items: [
        {
          title: 'Danh Sách',
          url: '/employee'
        },
        {
          title: 'Thêm Mới',
          url: '/employee/add'
        }
      ]
    }
  ]
}
export default navMenu

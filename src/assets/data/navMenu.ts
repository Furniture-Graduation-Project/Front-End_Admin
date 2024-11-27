import {
  Anvil,
  BarChart,
  CreditCard,
  Folder,
  Mails,
  Newspaper,
  Package,
  TicketCheck,
  User,
  UserCog
} from 'lucide-react'

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
      icon: BarChart,
      roles: ['admin', 'product', 'order', 'support']
    },
    {
      title: 'Sản Phẩm',
      url: '/product',
      icon: Package,
      roles: ['admin', 'product', 'order', 'support']
    },
    {
      title: 'Danh Mục',
      url: '/category',
      icon: Folder,
      roles: ['admin', 'product']
    },
    {
      title: 'Chất liệu',
      url: '/material',
      icon: Anvil,
      roles: ['admin', 'product']
    },
    {
      title: 'Nhắn Tin',
      url: '/conversation',
      icon: Mails,
      roles: ['admin', 'support']
    },
    {
      title: 'Đơn Hàng',
      url: '/order',
      icon: CreditCard,
      roles: ['admin', 'order']
    },
    {
      title: 'Khách Hàng',
      url: '/account',
      icon: User,
      roles: ['admin', 'product', 'order', 'support']
    },
    {
      title: 'Nhân Viên',
      url: '/employee',
      icon: UserCog,
      roles: ['admin']
    },
    {
      title: 'Bài viết',
      url: '/blog',
      icon: Newspaper,
      roles: ['admin', 'support']
    },
    {
      title: 'Mã giảm giá',
      url: '/voucher',
      icon: TicketCheck,
      roles: ['admin', 'product']
    }
  ]
}

export default navMenu

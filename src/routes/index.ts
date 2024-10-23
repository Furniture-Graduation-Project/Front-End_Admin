import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import Signin from '@/pages/(auth)/Signin'
import Signup from '@/pages/(auth)/Signup'
import page404 from '@/pages/(site)/404/404'
import MessageTexting from '@/pages/(site)/Conversation/components/MessageTexting/MessageTexting'
import Conversation from '@/pages/(site)/Conversation/Conversation'
import MessageList from '@/pages/(site)/Conversation/components/MessgeList/MessageList'
import Dashboard from '@/pages/(site)/Dashboard/Dashboard'
import ProductList from '@/pages/(site)/Product/ProductList'
import ProductAdd from '@/pages/(site)/Product/ProductAdd'
import ProductEdit from '@/pages/(site)/Product/ProductEdit'
import Product from '@/pages/(site)/Product/Product'
import CategoryList from '@/pages/(site)/Category/CategoryList'
import CategoryAdd from '@/pages/(site)/Category/CategoryAdd'
import Category from '@/pages/(site)/Category/Category'
import CategoryEdit from '@/pages/(site)/Category/CategoryEdit'
import Voucher from '@/pages/(site)/Voucher/Voucher'
import VoucherList from '@/pages/(site)/Voucher/VoucherList'
import VoucherAdd from '@/pages/(site)/Voucher/VoucherAdd'
import VoucherEdit from '@/pages/(site)/Voucher/VoucherEdit'
import Promotion from '@/pages/(site)/Promotion/Promotion'
import PromotionList from '@/pages/(site)/Promotion/PromotionList'
import PromotionAdd from '@/pages/(site)/Promotion/PromotionAdd'
import PromotionEdit from '@/pages/(site)/Promotion/PromotionEdit'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  { path: '/dashboard', component: Dashboard, layout: MainLayout },

  {
    path: '/category',
    component: Category,
    layout: MainLayout,
    children: [
      { path: '', component: CategoryList },
      { path: 'add', component: CategoryAdd },
      { path: 'edit/:id', component: CategoryEdit }
    ]
  },
  {
    path: '/product',
    component: Product,
    layout: MainLayout,
    children: [
      { path: '', component: ProductList },
      { path: 'add', component: ProductAdd },
      { path: 'edit', component: ProductEdit }
    ]
  },
  {
    path: '/conversation',
    component: Conversation,
    layout: MainLayout,
    children: [
      { path: '', component: MessageList },
      { path: 'texting', component: MessageTexting }
    ]
  },
  {
    path: '/voucher',
    component: Voucher,
    layout: MainLayout,
    children: [
      { path: '', component: VoucherList },
      { path: 'add', component: VoucherAdd },
      { path: ':id/edit', component: VoucherEdit }
    ]
  },
  {
    path: '/promotion',
    component: Promotion,
    layout: MainLayout,
    children: [
      { path: '', component: PromotionList },
      { path: 'add', component: PromotionAdd },
      { path: 'edit', component: PromotionEdit }
    ]
  },
  { path: '/*', component: page404, layout: AuthLayout }
]

export default routes

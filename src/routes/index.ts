import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import Signin from '@/pages/(auth)/Signin'
import page404 from '@/pages/(site)/404/404'
import MessageTexting from '@/pages/(site)/Conversation/components/MessageTexting/MessageTexting'
import Conversation from '@/pages/(site)/Conversation/Conversation'
import MessageList from '@/pages/(site)/Conversation/components/MessageList/MessageList'
import Dashboard from '@/pages/(site)/Dashboard/Dashboard'
import ProductList from '@/pages/(site)/Product/_components/ProductList'
import ProductAdd from '@/pages/(site)/Product/_components/ProductAdd'
import ProductEdit from '@/pages/(site)/Product/_components/ProductEdit'
import Product from '@/pages/(site)/Product/Product'
import CategoryList from '@/pages/(site)/Category/_components/CategoryList'
import CategoryAdd from '@/pages/(site)/Category/_components/CategoryAdd'
import Category from '@/pages/(site)/Category/Category'
import CategoryEdit from '@/pages/(site)/Category/_components/CategoryEdit'
import Voucher from '@/pages/(site)/Voucher/Voucher'
import VoucherList from '@/pages/(site)/Voucher/VoucherList'
import VoucherAdd from '@/pages/(site)/Voucher/VoucherAdd'
import VoucherEdit from '@/pages/(site)/Voucher/VoucherEdit'
import AccountPage from '@/pages/(site)/Account/AccountPage'
import AccountDetail from '@/pages/(site)/Account/components/AccountDetail/AccountDetail'
import AccountLayout from '@/pages/(site)/Account/AccountLayout'
import EmployeePage from '@/pages/(site)/Employee/EmployeePage'
import AddEmployeeForm from '@/pages/(site)/Employee/_components/EmployeeAdd'
import EmployeeEdit from '@/pages/(site)/Employee/_components/EmployeeEdit'
import EmployeeList from '@/pages/(site)/Employee/_components/EmployeeList'
import SettingsPage from '@/pages/(site)/Setting/Setting'
import OrderPage from '@/pages/(site)/Order/OrderPage'
import OrderList from '@/pages/(site)/Order/components/OrderList'
import OrderEdit from '@/pages/(site)/Order/components/OrderEdit'
import SettingAccount from '@/pages/(site)/Setting/_component/SettingAccount'
import SettingPassword from '@/pages/(site)/Setting/_component/SettingPassword'
import BlogList from '@/pages/(site)/Blog/BlogList'
import BlogAdd from '@/pages/(site)/Blog/BlogAdd'
import BlogEdit from '@/pages/(site)/Blog/BlogEdit'
import Blog from '@/pages/(site)/Blog/Blog'
import Material from '@/pages/(site)/Material/Material'
import AddMaterialForm from '@/pages/(site)/Material/_components/MaterialAdd'
import MaterialEdit from '@/pages/(site)/Material/_components/MaterialEdit'
import MaterialList from '@/pages/(site)/Material/_components/MaterialList'
import ProductInfo from '@/pages/(site)/Product/_components/ProductInfomation'
import OrderReturn from '@/pages/(site)/Order/components/OrderReturn'
import Unauthorized from '@/pages/(site)/Unauthorized/unauthorized'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: MainLayout,
    guard: ['product', 'admin', 'support', 'order']
  },

  {
    path: '/category',
    component: Category,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: CategoryList,
        guard: ['product', 'admin']
      },
      {
        path: 'add',
        component: CategoryAdd,
        guard: ['product', 'admin']
      },
      {
        path: 'edit/:id',
        component: CategoryEdit,
        guard: ['product', 'admin']
      }
    ]
  },
  {
    path: '/material',
    component: Material,
    layout: MainLayout,
    children: [
      { path: '', component: MaterialList, guard: ['product', 'admin'] },
      { path: 'add', component: AddMaterialForm, guard: ['product', 'admin'] },
      { path: 'edit/:id', component: MaterialEdit, guard: ['product', 'admin'] }
    ]
  },
  {
    path: '/product',
    component: Product,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: ProductList,
        guard: ['product', 'admin', 'support', 'order']
      },
      {
        path: 'add',
        component: ProductAdd,
        guard: ['product', 'admin']
      },
      {
        path: 'edit/:id',
        component: ProductEdit,
        guard: ['product', 'admin']
      },
      {
        path: 'info/:id',
        component: ProductInfo,
        guard: ['product', 'admin', 'support', 'order']
      }
    ]
  },
  // {
  //   path: '/conversation',
  //   component: Conversation,
  //   layout: MainLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: MessageList,
  //       guard:['support', 'admin'])
  //     },
  //     {
  //       path: 'texting/:id',
  //       component: MessageTexting,
  //       guard:['support', 'admin'])
  //     }
  //   ]
  // },
  // {
  //   path: '/voucher',
  //   component: Voucher,
  //   layout: MainLayout,
  //   children: [
  //     { path: '', component: VoucherList, guard:['product', 'admin']) },
  //     { path: 'add', component: VoucherAdd, guard:['product', 'admin']) },
  //     { path: ':id/edit', component: VoucherEdit, guard:['product', 'admin']) }
  //   ]
  // },
  {
    path: '/order',
    component: OrderPage,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: OrderList,
        guard: ['order', 'admin']
      },
      {
        path: 'edit/:id',
        component: OrderEdit,
        guard: ['order', 'admin']
      },
      {
        path: 'return/:id',
        component: OrderReturn,
        guard: ['order', 'admin']
      }
    ]
  },

  {
    path: '/blog',
    component: Blog,
    layout: MainLayout,
    children: [
      { path: '', component: BlogList, guard: ['support', 'admin'] },
      { path: 'add', component: BlogAdd, guard: ['support', 'admin'] },
      { path: 'edit/:id', component: BlogEdit, guard: ['support', 'admin'] }
    ]
  },
  {
    path: '/employee',
    component: EmployeePage,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: EmployeeList,
        guard: ['admin']
      },
      {
        path: 'add',
        component: AddEmployeeForm,
        guard: ['admin']
      },
      {
        path: 'edit/:id',
        component: EmployeeEdit,
        guard: ['admin']
      }
    ]
  },
  {
    path: '/account',
    component: AccountLayout,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: AccountPage
      },
      {
        path: ':id',
        component: AccountDetail
      }
    ]
  },
  {
    path: '/setting',
    component: SettingsPage,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: SettingAccount,
        guard: ['support', 'admin', 'product', 'order']
      },
      {
        path: 'security',
        component: SettingPassword,
        guard: ['support', 'admin', 'product', 'order']
      }
    ]
  },
  { path: '/*', component: page404, layout: AuthLayout },
  { path: '/unauthorized', component: Unauthorized, layout: AuthLayout }
]

export default routes

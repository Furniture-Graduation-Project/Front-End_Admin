// routes/index.ts
import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import Signin from '@/pages/(auth)/Signin'
import Signup from '@/pages/(auth)/Signup'
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
import CategoryEdit from '@/pages/(site)/Category/_components/CategoryEdit'
import AccountPage from '@/pages/(site)/Account/AccountPage'
import AccountDetail from '@/pages/(site)/Account/components/AccountDetail/AccountDetail'
import AccountLayout from '@/pages/(site)/Account/AccountLayout'
import EmployeePage from '@/pages/(site)/Employee/EmployeePage'
import AddEmployeeForm from '@/pages/(site)/Employee/_components/EmployeeAdd'
import EmployeeEdit from '@/pages/(site)/Employee/_components/EmployeeEdit'
import EmployeeList from '@/pages/(site)/Employee/_components/EmployeeList'
import SettingsPage from '@/pages/(site)/Settings/page'
import OrderPage from '@/pages/(site)/Order/OrderPage'
import OrderList from '@/pages/(site)/Order/components/OrderList'
import OrderEdit from '@/pages/(site)/Order/components/OrderEdit'
import Category from '@/pages/(site)/Category/Category'
import { checkPermissions } from '@/utils/checkPermissions'
import Unauthorized from '@/pages/(site)/Unauthorized/unauthorized'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: MainLayout
  },
  {
    path: '/category',
    component: Category,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: CategoryList,
        guard: () => checkPermissions(['product', 'admin'])
      },
      {
        path: 'add',
        component: CategoryAdd,
        guard: () => checkPermissions(['product', 'admin'])
      },
      {
        path: 'edit/:id',
        component: CategoryEdit,
        guard: () => checkPermissions(['product', 'admin'])
      }
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
        guard: () => checkPermissions(['product', 'admin'])
      },
      {
        path: 'add',
        component: ProductAdd,
        guard: () => checkPermissions(['product', 'admin'])
      },
      {
        path: 'edit/:id',
        component: ProductEdit,
        guard: () => checkPermissions(['product', 'admin'])
      }
    ]
  },
  {
    path: '/conversation',
    component: Conversation,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: MessageList,
        guard: () => checkPermissions(['support', 'admin'])
      },
      {
        path: 'texting/:id',
        component: MessageTexting,
        guard: () => checkPermissions(['support', 'admin'])
      }
    ]
  },
  {
    path: '/order',
    component: OrderPage,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: OrderList,
        guard: () => checkPermissions(['order', 'admin'])
      },
      {
        path: 'edit/:id',
        component: OrderEdit,
        guard: () => checkPermissions(['order', 'admin'])
      }
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
        guard: () => checkPermissions(['admin'])
      },
      {
        path: 'add',
        component: AddEmployeeForm,
        guard: () => checkPermissions(['admin'])
      },
      {
        path: 'edit/:id',
        component: EmployeeEdit,
        guard: () => checkPermissions(['admin'])
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
    layout: MainLayout
  },
  { path: '/*', component: page404, layout: AuthLayout },
  { path: '/unauthorized', component: Unauthorized, layout: AuthLayout }
]

export default routes

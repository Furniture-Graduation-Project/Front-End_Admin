/* eslint-disable react-hooks/rules-of-hooks */
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
import Category from '@/pages/(site)/Category/Category'
import CategoryEdit from '@/pages/(site)/Category/_components/CategoryEdit'
import Voucher from '@/pages/(site)/Voucher/Voucher'
import VoucherList from '@/pages/(site)/Voucher/VoucherList'
import VoucherAdd from '@/pages/(site)/Voucher/VoucherAdd'
import VoucherEdit from '@/pages/(site)/Voucher/VoucherEdit'
import Promotion from '@/pages/(site)/Promotion/Promotion'
import PromotionList from '@/pages/(site)/Promotion/PromotionList'
import PromotionAdd from '@/pages/(site)/Promotion/PromotionAdd'
import PromotionEdit from '@/pages/(site)/Promotion/PromotionEdit'
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
import Unauthorized from '@/pages/(site)/Unauthorized/unauthorized'
import useCheckPermissions from '@/hooks/useCheckPermissions'
import Material from '@/pages/(site)/Material/Material'
import AddMaterialForm from '@/pages/(site)/Material/_components/MaterialAdd'
import MaterialEdit from '@/pages/(site)/Material/_components/MaterialEdit'
import MaterialList from '@/pages/(site)/Material/_components/MaterialList'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  { path: '/dashboard', component: Dashboard, layout: MainLayout },

  {
    path: '/category',
    component: Category,
    layout: MainLayout,
    children: [
      {
        path: '',
        component: CategoryList,
        guard: () => useCheckPermissions(['product', 'admin'])
      },
      {
        path: 'add',
        component: CategoryAdd,
        guard: () => useCheckPermissions(['product', 'admin'])
      },
      {
        path: 'edit/:id',
        component: CategoryEdit,
        guard: () => useCheckPermissions(['product', 'admin'])
      }
    ]
  },
  {
    path: '/material',
    component: Material,
    layout: MainLayout,
    children: [
      { path: '', component: MaterialList, guard: () => useCheckPermissions(['product', 'admin']) },
      { path: 'add', component: AddMaterialForm, guard: () => useCheckPermissions(['product', 'admin']) },
      { path: 'edit/:id', component: MaterialEdit, guard: () => useCheckPermissions(['product', 'admin']) }
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
        guard: () => useCheckPermissions(['product', 'admin', 'support', 'order'])
      },
      {
        path: 'add',
        component: ProductAdd,
        guard: () => useCheckPermissions(['product', 'admin'])
      },
      {
        path: 'edit/:id',
        component: ProductEdit,
        guard: () => useCheckPermissions(['product', 'admin'])
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
        guard: () => useCheckPermissions(['support', 'admin'])
      },
      {
        path: 'texting/:id',
        component: MessageTexting,
        guard: () => useCheckPermissions(['support', 'admin'])
      }
    ]
  },
  {
    path: '/voucher',
    component: Voucher,
    layout: MainLayout,
    children: [
      { path: '', component: VoucherList, guard: () => useCheckPermissions(['product', 'admin']) },
      { path: 'add', component: VoucherAdd, guard: () => useCheckPermissions(['product', 'admin']) },
      { path: ':id/edit', component: VoucherEdit, guard: () => useCheckPermissions(['product', 'admin']) }
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
        guard: () => useCheckPermissions(['order', 'admin'])
      },
      {
        path: 'edit/:id',
        component: OrderEdit,
        guard: () => useCheckPermissions(['order', 'admin'])
      }
    ]
  },

  {
    path: '/blog',
    component: Blog,
    layout: MainLayout,
    children: [
      { path: '', component: BlogList, guard: () => useCheckPermissions(['support', 'admin']) },
      { path: 'add', component: BlogAdd, guard: () => useCheckPermissions(['support', 'admin']) },
      { path: 'edit/:id', component: BlogEdit, guard: () => useCheckPermissions(['support', 'admin']) }
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
        guard: () => useCheckPermissions(['admin'])
      },
      {
        path: 'add',
        component: AddEmployeeForm,
        guard: () => useCheckPermissions(['admin'])
      },
      {
        path: 'edit/:id',
        component: EmployeeEdit,
        guard: () => useCheckPermissions(['admin'])
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
        guard: () => useCheckPermissions(['support', 'admin', 'product', 'order'])
      },
      {
        path: 'security',
        component: SettingPassword,
        guard: () => useCheckPermissions(['support', 'admin', 'product', 'order'])
      }
    ]
  },
  { path: '/*', component: page404, layout: AuthLayout },
  { path: '/unauthorized', component: Unauthorized, layout: AuthLayout }
]

export default routes

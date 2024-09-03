import { IRoute } from '@/interface/route'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

import Signin from '@/pages/(auth)/Signin'
import Signup from '@/pages/(auth)/Signup'
import page404 from '@/pages/(site)/404/404'

import Dashboard from '@/pages/(site)/Dashboard/Dashboard'
import ProductAdd from '@/pages/(site)/Product/ProductAdd'
import ProductEdit from '@/pages/(site)/Product/ProductEdit'
import ProductList from '@/pages/(site)/Product/ProductList'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  { path: '/dashboard', component: Dashboard, layout: MainLayout },
  { path: '/products', component: ProductList, layout: MainLayout },
  { path: '/products/add', component: ProductAdd, layout: MainLayout },
  { path: '/products/edit', component: ProductEdit, layout: MainLayout },
  { path: '/*', component: page404, layout: AuthLayout }
  // { path: '/*', component: Signin, layout: AuthLayout }
]

export default routes

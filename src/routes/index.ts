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
import AccountList from '@/pages/(site)/Account/components/AccountList/AccountList'
import AccountDetail from '@/pages/(site)/Account/components/AccountDetail/AccountDetail'
import Account from '@/pages/(site)/Account/Account'

const routes: IRoute[] = [
  { path: '/', component: Signin, layout: AuthLayout },
  { path: '/signup', component: Signup, layout: AuthLayout },
  { path: '/dashboard', component: Dashboard, layout: MainLayout },
  { path: '/product', component: ProductList, layout: MainLayout, children: [{ path: '', component: ProductList }] },
  {
    path: '/account',
    component: Account,
    layout: MainLayout,
    children: [
      { path: '', component: AccountList },
      { path: ':id', component: AccountDetail }
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
  { path: '/*', component: page404, layout: AuthLayout }
]

export default routes

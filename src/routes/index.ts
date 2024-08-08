import { IRoute } from "@/interface/route"

import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"

import Signin from "@/pages/(auth)/Signin"
import Signup from "@/pages/(auth)/Signup"

import Dashboard from "@/pages/(site)/Dashboard/Dashboard"

const routes : IRoute[] = [
    { path: "/", component: Signin, layout: AuthLayout },
    { path: "/signup", component: Signup, layout: AuthLayout },
    { path: "/dashboard", component: Dashboard, layout: MainLayout },

    { path: "/*", component: Signin, layout: AuthLayout },
]

export default routes

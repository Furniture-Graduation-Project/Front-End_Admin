import { Route, Routes, Navigate } from 'react-router-dom' // Thêm Navigate vào import
import { IRoute } from '@/interface/route'
import routes from '@/routes'
import { ThemeProvider } from './context/ThemeProvider'

const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, component: Component, layout: Layout, children, guard }: IRoute) => {
    // Kiểm tra quyền truy cập
    const hasAccess = guard ? guard() : true

    return (
      <Route
        key={path}
        path={path}
        element={
          hasAccess ? (
            Layout ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              <Component />
            )
          ) : (
            // Nếu không có quyền, chuyển hướng đến trang không có quyền truy cập
            <Navigate to='/unauthorized' />
          )
        }
      >
        {children && renderRoutes(children)}
      </Route>
    )
  })

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>{renderRoutes(routes)}</Routes>
    </ThemeProvider>
  )
}

export default App

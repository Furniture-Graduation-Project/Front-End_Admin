import { Route, Routes, Navigate } from 'react-router-dom'
import { IRoute } from '@/interface/route'
import routes from '@/routes'
import { ThemeProvider } from './context/ThemeProvider'
import { AuthProvider } from './context/AuthContext'
import useCheckPermissions from './hooks/useCheckPermissions'
import { Loader2 } from 'lucide-react'
// import { useEffect } from 'react'

const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, component: Component, layout: Layout, children, guard }: IRoute) => {
    const Element = () => {
      const hasPermission = useCheckPermissions(guard || [])

      if (hasPermission === null && guard) {
        return (
          <div className='fixed top-0 left-0 z-[999] w-full h-full flex items-center justify-center bg-white'>
            <Loader2 size='100' className='animate-spin' />
          </div>
        )
      }
      if (hasPermission === false && guard) {
        console.log('lioad')

        return <Navigate to='/unauthorized' />
      }

      return Layout ? (
        <Layout>
          <Component />
        </Layout>
      ) : (
        <Component />
      )
    }

    return (
      <Route key={path} path={path} element={<Element />}>
        {children && renderRoutes(children)}
      </Route>
    )
  })

const App = () => {
  // useEffect(() => {
  //   const handleRightClick = (e: MouseEvent) => e.preventDefault()
  //   document.addEventListener('contextmenu', handleRightClick)
  //   return () => {
  //     document.removeEventListener('contextmenu', handleRightClick)
  //   }
  // }, [])

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <Routes>{renderRoutes(routes)}</Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App

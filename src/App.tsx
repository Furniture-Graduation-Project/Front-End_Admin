import { Route, Routes } from 'react-router-dom'
import { IRoute } from '@/interface/route'
import routes from '@/routes'
import { ThemeProvider } from './context/ThemeProvider'

const renderRoutes = (routes: IRoute[]) =>
  routes.map(({ path, component: Component, layout: Layout, children }: IRoute) => (
    <Route
      key={path}
      path={path}
      element={
        Layout ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Component />
        )
      }
    >
      {children && renderRoutes(children)}
    </Route>
  ))

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Routes>{renderRoutes(routes)}</Routes>
    </ThemeProvider>
  )
}

export default App

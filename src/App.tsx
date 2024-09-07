import { Route, Routes } from 'react-router-dom'
import { IRoute } from '@/interface/route'
import routes from '@/routes'

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
  return <Routes>{renderRoutes(routes)}</Routes>
}

export default App

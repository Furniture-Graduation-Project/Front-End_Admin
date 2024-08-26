import { Route, Routes } from 'react-router-dom'
import { IRoute } from './interface/route'
import routes from './routes'
const App = () => {
  return (
    <Routes location={location} key={location.pathname}>
      {routes.map(({ path, component: Component, layout: Layout }: IRoute) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout key={path}>
              <Component />
            </Layout>
          }
        />
      ))}
    </Routes>
  )
}

export default App

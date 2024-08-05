import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import MainLayout from './layouts/MainLayout'
const App = () => {
  return (
    <MainLayout>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </MainLayout>
  )
}

export default App

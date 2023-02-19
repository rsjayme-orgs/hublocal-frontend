import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { CreateAccountForm } from '../components/CreateAccountForm'
import { LoginForm } from '../components/LoginForm'
import { Companies } from '../pages/Companies'
import { Locations } from '../pages/Locations'
import Login from '../pages/Login'
import { JustPublicRoute } from './justPublicRoute'
import { PrivateRoute } from './privateRoute'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JustPublicRoute />}>
          <Route path="/" element={<Login />}>
            <Route index element={<LoginForm />} />
            <Route path="register" element={<CreateAccountForm />} />
          </Route>
        </Route>

        <Route path="/companies" element={<PrivateRoute />}>
          <Route index element={<Companies />} />
        </Route>

        <Route path="/locations/:companyId" element={<PrivateRoute />}>
          <Route index element={<Locations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

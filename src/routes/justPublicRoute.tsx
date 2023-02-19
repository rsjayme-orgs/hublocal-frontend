import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function JustPublicRoute() {
  const { signed } = useAuth()

  return signed ? <Navigate to="/companies" /> : <Outlet />
}

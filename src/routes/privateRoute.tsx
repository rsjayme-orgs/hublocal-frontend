import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute() {
  const { signed, loading } = useAuth()

  if (loading) return null

  return signed ? <Outlet /> : <Navigate to="/" />
}

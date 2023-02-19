import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute() {
  const { signed, loading } = useAuth()

  console.log('loading', loading)

  useEffect(() => {
    console.log('loading', loading)
  }, [loading])

  if (loading) return null

  console.log('signed', signed)

  return signed ? <Outlet /> : <Navigate to="/" />
}

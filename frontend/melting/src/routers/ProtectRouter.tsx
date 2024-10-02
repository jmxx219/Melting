import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const ProtectedRoute = () => {
  const { isLogin } = useAuth()

  if (!isLogin) {
    return <Navigate to="/login" replace /> // If not logged in, redirect to login page
  }

  return <Outlet /> // If logged in, render child routes
}

export default ProtectedRoute

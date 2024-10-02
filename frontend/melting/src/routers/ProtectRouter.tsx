import { useAuth } from '@/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLogin } = useAuth()

  console.log(isLogin)

  if (!isLogin) {
    return <Navigate to="/login" replace /> // If not logged in, redirect to login page
  }

  return <Outlet /> // If logged in, render child routes
}

export default ProtectedRoute

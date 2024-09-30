import { createContext, useContext, useState, ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  isLogin: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const login = () => {
    setIsLogin(true)
    queryClient.setQueryData(['isLogin'], true)
  }

  const logout = () => {
    setIsLogin(false)
    queryClient.setQueryData(['isLogin'], false)
  }

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

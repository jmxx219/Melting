import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface AuthContextType {
  isLogin: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    // 로컬 스토리지에서 로그인 상태를 가져옴
    const storedLogin = localStorage.getItem('isLogin')
    return storedLogin === 'true'
  })
  const queryClient = useQueryClient()

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem('isLogin', String(isLogin))
  }, [isLogin])

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

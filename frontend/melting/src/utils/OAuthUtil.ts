import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OAuthRedirectHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const init = params.get('init')

    // 쿠키 확인 로직
    const checkCookie = (name: string) => {
      return document.cookie
        .split(';')
        .some((item) => item.trim().startsWith(`${name}=`))
    }

    if (checkCookie('your_auth_cookie_name')) {
      console.log('Auth cookie is set')
      if (init === 'false') {
        navigate('/signup')
      } else if (init === 'true') {
        navigate('/main')
      }
    } else {
      console.error('Auth cookie is not set')
      navigate('/login') // 로그인 실패로 간주하고 로그인 페이지로 리다이렉트
    }
  }, [navigate])

  return null
}

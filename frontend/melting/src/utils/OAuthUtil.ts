import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL

export default function OAuthRedirectHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `${VITE_API_BASE_URL}/oauth2/authorize/${'kakao'}?redirect_url=${VITE_LOCAL_URL}/login/callback`,
      {
        mode: 'no-cors',
        // "credentials": "include"
      },
    )
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const init = params.get('init') // 쿼리스트링에서 'init' 값 확인

    if (init === 'false') {
      // 신규 유저인 경우 회원가입 페이지로 이동
      navigate('/signup')
    } else if (init === 'true') {
      // 기존 유저인 경우 메인 페이지로 이동
      navigate('/main')
    } else {
      // 쿼리스트링 값이 없거나 올바르지 않은 경우 처리
      console.error('Invalid redirect URL')
    }
  }, [navigate])

  return null // 리다이렉션 처리만 하고 렌더링할 UI는 없음
}

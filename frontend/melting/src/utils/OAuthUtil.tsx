import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext.tsx'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL

export default function OAuthRedirectHandler() {
  const navigate = useNavigate()
  const { provider } = useParams<{ provider: string }>()

  useEffect(() => {
    if (!provider) {
      console.error('Provider not specified')
      return
    }

    const redirectUrl = encodeURIComponent(
      `${VITE_LOCAL_URL}/login/callback/${provider}`,
    )

    fetch(
      `${VITE_API_BASE_URL}/oauth2/authorize/${provider}?redirect_url=${redirectUrl}`,
      {
        mode: 'no-cors',
        // credentials: "include"
      },
    )
  }, [provider])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const init = params.get('init')
    const { login } = useAuth()

    login()
    if (init === 'false') {
      navigate('/signup')
    } else if (init === 'true') {
      navigate('/main')
    } else {
      console.error('Invalid redirect URL')
    }
  }, [navigate])

  return null
}

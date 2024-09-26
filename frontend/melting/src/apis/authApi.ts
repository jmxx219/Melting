const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL
const VITE_API_MEMBERS_PATH = import.meta.env.VITE_API_MEMBERS_PATH

export default function login(provider: 'kakao' | 'google') {
  window.location.href = `${VITE_API_BASE_URL}/oauth2/authorize/${provider}?redirect_url=${VITE_LOCAL_URL}/login/callback`
}

// export function reissue() {}

// export function logout() {}

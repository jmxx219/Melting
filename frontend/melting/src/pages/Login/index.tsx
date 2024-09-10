import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img src="/images/logo.png" className="mb-10" />
        <LoginForm />
      </div>
    </>
  )
}

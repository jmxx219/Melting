import LoginForm from '@/components/auth/LoginButton'

export default function LoginPage() {
  return (
    <div className="w-full px-4">
      <div className="mb-20 w-full flex justify-center">
        <img src="/images/logo/logo.png" className="" />
      </div>
      <LoginForm />
    </div>
  )
}

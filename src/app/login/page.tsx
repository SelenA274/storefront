import LoginForm from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <LoginForm />
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/register" className="underline">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}
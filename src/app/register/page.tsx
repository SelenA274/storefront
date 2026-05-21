import RegisterForm from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <RegisterForm />
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </main>
  )
}
import VerifyEmailForm from "@/features/auth/components/VerifyEmailForm"

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-sm text-gray-500">Enter the code sent to your email</p>
        <VerifyEmailForm />
      </div>
    </main>
  )
}
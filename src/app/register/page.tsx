import RegisterForm from "@/features/auth/components/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-[#fde8ed] items-center justify-center flex-col gap-4 p-16">
        <p className="font-serif text-8xl text-[#c97a8f] opacity-20">V</p>
        <h2 className="font-serif text-4xl text-gray-900 text-center">Join the <br />VELO family</h2>
        <p className="text-gray-400 text-center max-w-xs">Create your account and start your luxury beauty journey.</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div>
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest text-gray-900">VELO</Link>
            <h1 className="font-serif text-2xl mt-6 mb-2">Create account</h1>
            <p className="text-gray-400 text-sm">Join us today</p>
          </div>
          <RegisterForm />
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#c97a8f] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
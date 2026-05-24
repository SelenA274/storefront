import LoginForm from "@/features/auth/components/LoginForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-[#fde8ed] items-center justify-center flex-col gap-4 p-16">
        <p className="font-serif text-8xl text-[#c97a8f] opacity-20">V</p>
        <h2 className="font-serif text-4xl text-gray-900 text-center">Beauty is your <br />superpower</h2>
        <p className="text-gray-400 text-center max-w-xs">Discover luxury beauty essentials curated just for you.</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div>
            <Link href="/" className="font-serif text-3xl font-bold tracking-widest text-gray-900">VELO</Link>
            <h1 className="font-serif text-2xl mt-6 mb-2">Welcome back</h1>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>
          <LoginForm />
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#c97a8f] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
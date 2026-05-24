import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 text-lg">Page not found.</p>
      <Link href="/" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
        Go Home
      </Link>
    </main>
  )
}
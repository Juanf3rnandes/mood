import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const href = user ? 'journal' : 'new-user'

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-white to-gray-50 flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto mb-4">
        <h1 className="text-6xl text-black">
          The Mood Journal, the best app, period.
        </h1>
        <p className="text-2xl text-black/60 mb-4">
          The best app for tracking your mood, all you have to do is be honest
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 rounded-lg px-4 py-4 text-white text-xl hover:bg-blue-600/80">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

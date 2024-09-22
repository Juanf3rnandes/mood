'use client'

import { CreateNewJournal } from '@/util/api'
import { useRouter } from 'next/navigation'

const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const response = await CreateNewJournal()
    router.push(`/journal/${response.id}`)
  }

  return (
    <div className="rounde-lg bg-white cursor-pointer overflow-hidden">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntry

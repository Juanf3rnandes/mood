import Entry from '@/app/components/Entrys'
import NewEntry from '@/app/components/NewEntry'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import Link from 'next/link'

const getJournalEntries = async () => {
  const userID = await getUserFromClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      ownerId: userID.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

export default async function Journal() {
  const entries = await getJournalEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full overflow-auto">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 py-2">
        <NewEntry />
        {entries.map((entrie, index) => (
          <Link key={index} href={`journal/${entrie.id}`}>
            <Entry entry={entrie} />
          </Link>
        ))}
      </div>
    </div>
  )
}

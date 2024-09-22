import Editor from '@/app/components/Editor'
import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      ownerId_id: {
        ownerId: user.id,
        id,
      },
    },
  })
  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  return (
    <div className=" h-full w-full grid grid-cols-3 overflow-auto">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div>AI Stuff</div>
    </div>
  )
}
export default EntryPage

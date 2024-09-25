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

const getAnalysis = async (journalId: string) => {
  const analysis = await prisma.analysis.findMany({
    where: {
      id: journalId,
    },
  })
  return analysis
}

const analysysMock = [
  { name: 'Summary', value: '' },
  { name: 'Subject', value: '' },
  { name: 'Mood', value: '' },
  {
    name: 'Negative',
    value: 'false',
  },
]

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysys = await getAnalysis(params.id)

  return (
    <div className=" h-full w-full grid grid-cols-3 overflow-auto">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="flex flex-col text-center top-0">
        <div className="px-6 py-10">
          <h2 className="text-2xl">Analysys</h2>
          <ul>
            {!analysys.length &&
              analysysMock.map((v, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{v.name}</span>
                  <span>{v.value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default EntryPage

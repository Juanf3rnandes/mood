import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const user = await getUserFromClerkID()

  const { content } = await request.json()
  const updateEntry = await prisma.journalEntry.update({
    where: {
      ownerId_id: {
        ownerId: user.id,
        id: params.id,
      },
    },
    data: { content },
  })

  return NextResponse.json({ data: updateEntry })
}

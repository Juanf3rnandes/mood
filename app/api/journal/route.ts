import { getUserFromClerkID } from '@/util/auth'
import { prisma } from '@/util/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserFromClerkID()
  const journal = await prisma.journalEntry.create({
    data: {
      ownerId: user.id,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: journal })
}

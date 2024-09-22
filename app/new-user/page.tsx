import { prisma } from '@/util/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  if (!user || user == null) {
    redirect('/sign-up')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0].emailAddress as string,
      },
    })
  }

  redirect('/journal')
}

const newUser = async () => {
  await createNewUser()
  return <h2>...loading</h2>
}

export default newUser

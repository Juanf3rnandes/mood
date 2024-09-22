import { UserButton } from '@clerk/nextjs'
import { ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute border-r border-black/10 w-[200px] h-full  top-0 left-0 text-2xl">
        <span className="px-4 my-4"> MOOD</span>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="  w-full h-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] w-[calc(100vw-200px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AccountSidebar from '../Components/layout/AccountSidebar'
import { Toaster } from "react-hot-toast";
import mongoose from 'mongoose'
import PAGE from '@/models/Page'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Link Folio',
  description: 'Organize Your links in one place',
}

export default async function AppLayout({ children }) {

  await mongoose.connect(process.env.CONNECT_MONGO_URI)
  const session = await getServerSession(authOptions)
  const userPage = await PAGE.findOne({ owner: session?.user?.email })


  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <main className='flex min-h-screen'>
          <aside className="bg-[#2c2f32] text-gray-300 w-48 p-4 shadow-lg">
            <div className='sticky top-0'>
              <AccountSidebar session={session} userPage={userPage} />
            </div>
          </aside>
          <div className='w-full sm:px-16 px-0 mt-8'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

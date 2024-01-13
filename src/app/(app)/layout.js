import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AccountSidebar from '../Components/layout/AccountSidebar'
import { Toaster } from "react-hot-toast";
import mongoose from 'mongoose'
import PAGE from '@/models/Page'
import { RiMenuUnfoldFill } from "react-icons/ri";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'User Page',
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
        <main className='md:flex min-h-screen'>
          <label htmlFor='navCb' className='md:hidden cursor-pointer inline-flex gap-2 mt-2 border border-gray-400 p-2 rounded-xl'>
            <RiMenuUnfoldFill size={22} />
            <span>menu</span>
          </label>
          <input id='navCb' type='checkbox' className='hidden'/>
          <label htmlFor='navCb' className='hidden backdrop backdrop-filter backdrop-blur-sm bg-opacity-30 fixed inset-0 bg-black z-10'></label>
          <aside className="bg-[#2c2f32] text-gray-300 w-48 p-4 shadow-lg fixed md:static top-0 -left-48 bottom-0 z-20 transition-all duration-300">
            <div className='sticky top-0'>
              <AccountSidebar session={session} userPage={userPage} />
            </div>
          </aside>
          <div className='w-full md:px-16 px-0 mt-3'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

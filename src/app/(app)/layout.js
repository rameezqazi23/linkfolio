import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AccountSidebar from '../Components/layout/AccountSidebar'
// import Image from 'next/image';
// import Link from "next/link";
// import { FcSettings } from 'react-icons/fc'
// import { MdAnalytics } from "react-icons/md";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import LogoutButton from '../Components/buttons/LogoutButton'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Link Folio',
  description: 'Organize Your links in one place',
}

export default async function AppLayout({ children }) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='flex min-h-screen'>
          <aside className="bg-[#2c2f32] text-gray-300 w-48 p-4 shadow">
            <AccountSidebar session={session} />
          </aside>
          <div className='mx-auto px-8 mt-8'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

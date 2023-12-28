import { Inter } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Image from 'next/image';
import Link from "next/link";
import { FcSettings } from 'react-icons/fc'
import { MdAnalytics } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import LogoutButton from '../Components/buttons/LogoutButton'



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
          <aside className='bg-[#2c2f32] text-gray-300 w-48 p-4 shadow'>
            <Link href={'/account'} className='w-24 mx-auto pt-8'>
              <Image className='rounded-full cursor-pointer hover:w-24 mx-auto duration-200' src={session?.user?.image} width={80} height={80} alt='avatar' />
            </Link>
            <nav className='flex flex-col justify-center items-center mt-8 gap-4'>
              <Link className='flex justify-center items-center gap-2' href={'/account/analytics'}>
                <FcSettings className='hover:rotate-180 duration-200' size={22} />
                Setting
              </Link>
              <Link className='flex justify-center items-center gap-2' href={'/analytics'}>
                <MdAnalytics size={22} />
                Analytics
              </Link>
              <LogoutButton iconSize={22} iconLeft={true} />
              <Link className='flex justify-center text-sm hover:text-green-500 duration-200 items-center gap-2 border-gray-600 border-t pt-4' href={'/'}>
                <IoMdArrowRoundBack size={18} />
                Back to home
              </Link>
            </nav>
          </aside>
          <div className='mx-auto px-8'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

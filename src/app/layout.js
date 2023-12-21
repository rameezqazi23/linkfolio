import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './Components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Link Folio',
  description: 'Organize Your links in one place',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Navbar />
          <div className='max-w-4xl mx-auto px-8'>

            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

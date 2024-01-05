import { Inter } from 'next/font/google'
import '../../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Link Folio',
    description: 'Organize Your links in one place',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='max-w-4xl mx-auto px-8'>
                    {children}
                </div>
            </body>
        </html>
    )
}

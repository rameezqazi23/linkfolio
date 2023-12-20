import Image from 'next/image'
import { Navbar } from './Components';
import { HeroSection } from './Pages'


export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
    </main>

  )
}

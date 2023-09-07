import Board from '@/components/Board'
import Header from '@/components/Header' // @ is an alias which means go to the top level
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />
    </main>

  )
}

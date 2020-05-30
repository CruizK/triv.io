import Link from 'next/link'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


export default function Home() {

  
  return (
    <div className="container">
      <Header/>
      
      <Link href="/play">Play</Link>

      <Footer/>
    </div>
  )
}

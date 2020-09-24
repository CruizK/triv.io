import styles from './Home.module.css'
import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


export default function Home() {
  const [seed, setSeed] = useState('');

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <h1 className={styles.header}>Triv.io</h1>
        <div className={styles.buttons}>
          <input value={seed} onChange={e => setSeed(e.target.value)} 
          className={styles.seed} type="text" placeholder="Enter seed..." />
          <Link href={`/play/${seed != '' ? seed : 'test'}`} >
            <a className={styles.btn}>
              Play
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

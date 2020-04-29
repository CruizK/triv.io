import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export default function Home() {

  
  return (
    <div className="container">
      <Header/>
      


      <Footer/>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

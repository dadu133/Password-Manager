
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
function App() {
  
  return (
    <>
    <Navbar></Navbar>
    <div className='min-h-[80vh]'>

    <Manager></Manager>
    </div>
    <Footer></Footer>
    </>
  )
}

export default App

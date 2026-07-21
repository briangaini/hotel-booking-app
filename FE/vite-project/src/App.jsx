import { Outlet } from 'react-router-dom'
import './App.css'
// The useState import is commented out to prevent subtle hook errors
// import { useState } from 'react' 

import Navbar from './components/Navbar.jsx'

function App() {
  // The state declaration is commented out
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-bgPrimary min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex-grow'>
          <Outlet/>
        </div>
        <footer className='mt-auto'>Footer</footer>
      </div>
    </>
  )
}

export default App

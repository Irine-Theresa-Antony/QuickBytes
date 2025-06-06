import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
<<<<<<< Updated upstream
import Admin from './components/Admin'
=======

import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'
import Admin from './components/Admin'


>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< Updated upstream
      <Admin/>
=======

  
     <Navbar/>
     <Routes>
     <Route path='/' element={<Display/>}></Route>
     <Route path='/admin' element={<Admin/>}></Route>
     </Routes>

>>>>>>> Stashed changes
    </>
  )
}

export default App

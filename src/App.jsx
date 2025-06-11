import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'
import SignUp from './components/SignUp'
import Login from './components/Login'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Routes>
     <Route path='/signup' element={<SignUp/>}></Route>
     <Route path='/login'element={<Login/>}></Route>
     </Routes>

    </>
  )
}

export default App

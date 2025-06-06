import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'
import DashboardPage from './components/DashboardPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     
     <Navbar/>
     <Routes>
     <Route path='/' element={<Display/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     </Routes>
     
    </>
  )
}

export default App

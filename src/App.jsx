import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'
import DashboardPage from './components/DashboardPage'
import Terms from './components/Terms'
import Complaints from './components/Complaints'
import Profile from './components/Profile'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     
     <Navbar/>
     <Routes>
     <Route path='/' element={<Display/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     <Route path='/terms' element={<Terms/>}></Route>
     <Route path='/complaints' element={<Complaints/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
     </Routes>
     
    </>
  )
}

export default App

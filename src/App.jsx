import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Admin from './components/Admin'


import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './components/Display'




import DashboardPage from './components/DashboardPage'
import Custom from './components/Custom'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>

  
     



     
     <Navbar/>
     <Routes>
     <Route path='/' element={<Display/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     <Route path='/admin' element={<Admin/>}></Route>
     <Route path='/custom' element={<Custom/>}></Route>
     </Routes>
     

    </>
  )
}

export default App

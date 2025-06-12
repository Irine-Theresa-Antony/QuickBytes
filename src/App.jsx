import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Admin from './components/Admin'


import { Route, Routes } from 'react-router-dom'


import SignUp from './components/SignUp'
import Login from './components/Login'

import DashboardPage from './components/DashboardPage'
import Terms from './components/Terms'
import Complaints from './components/Complaints'
import Profile from './components/Profile'
import Custom from './components/Custom'
import Display from './Components/Display'
import Navbar from './Components/Navbar'




function App() {
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState('general'); // State to manage selected category
  const [country, setCountry] = useState('us'); // Default country

  return (
    <>


  
     <Navbar setCategory={setCategory} setCountry={setCountry}/>
     <Routes>
     <Route path='/' element={<Display category={category}/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     <Route path='/terms' element={<Terms/>}></Route>
     <Route path='/complaints' element={<Complaints/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
     <Route path='/admin' element={<Admin/>}></Route>
     <Route path='/c' element={<Custom/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
     <Route path='/login'element={<Login/>}></Route>

     </Routes>
     

    </>
  )
}

export default App

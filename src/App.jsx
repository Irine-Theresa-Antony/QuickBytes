import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Display from './Components/Display'




function App() {
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState('general'); // State to manage selected category
  const [country, setCountry] = useState('us'); // Default country

  return (
    <>

  
     <Navbar setCategory={setCategory} setCountry={setCountry}/>
     <Routes>
     <Route path='/' element={<Display category={category}/>}></Route>
     
     </Routes>

    </>
  )
}

export default App

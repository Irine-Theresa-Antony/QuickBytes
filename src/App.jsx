import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import DashboardPage from './components/DashboardPage'
import Terms from './components/Terms'
import Complaints from './components/Complaints'
import Profile from './components/Profile'
import Custom from './components/Custom'
import Navbar from './Components/Navbar'
import Display from './components/Display'
import Admin from './components/Admin'
import Viewcustom from './Components/Viewcustom'




function App() {
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState('general'); // State to manage selected category
  const [country, setCountry] = useState('us'); // Default country
  const [search, setSearch] = useState('');
  const [likedArticles, setLikedArticles] = useState([]);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  

  return (
    <>



  
     <Navbar setCategory={setCategory} setCountry={setCountry} setSearch={setSearch} setShowLikedOnly={setShowLikedOnly}/>
     <Routes>
     <Route path='/' element={<Display category={category} country={country} search={search} showLikedOnly={showLikedOnly}
       likedArticles={likedArticles} setLikedArticles={setLikedArticles}/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     <Route path='/terms' element={<Terms/>}></Route>
     <Route path='/complaints' element={<Complaints/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
     <Route path='/c' element={<Custom/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
     <Route path='/login'element={<Login/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/viewcustom' element={<Viewcustom/>}></Route>
     </Routes>
     



    </>
  )
}

export default App

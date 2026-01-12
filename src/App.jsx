import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import DashboardPage from './components/DashboardPage'
import Terms from './components/Terms'
import Complaints from './components/Complaints'
import Review from './components/Review'
import Profile from './components/Profile'
import Custom from './components/Custom'

import Market from './components/Market'
import Navbar from './Components/Navbar'
import Display from './Components/Display'
import Viewcustom from './Components/Viewcustom'
import  Filter  from './Components/Filter'
import UserView from './Components/UserView'
import MyNotes from './Components/MyNotes'

import Admin from './Components/Admin'
import UserCompTab from './Components/UserCompTab'
import ReportNews from './Components/ReportNews'

import AdminReport from './Components/AdminReport'
import Message from './Components/Message'
import Addtomarket from './Components/Addtomarket'





function App() {
  const location = useLocation();
  const [count, setCount] = useState(0)
  const [category, setCategory] = useState('general'); // State to manage selected category
  const [country, setCountry] = useState('us'); // Default country
  const [search, setSearch] = useState('');
  const [likedArticles, setLikedArticles] = useState([]);
  const [showLikedOnly, setShowLikedOnly] = useState(false);


  const hideNavbarRoutes=['/signup','/login'];

  return (
    <>
     <Navbar setShowLikedOnly={setShowLikedOnly}/>
     {location.pathname === '/home' && (
     <Filter
     setCategory={setCategory}
     setCountry={setCountry}
     setSearch={setSearch}
     />)}

      
     <Routes>
     <Route path='/home' element={<Display showLikedOnly={showLikedOnly} category={category}
        country={country} search={search} likedArticles={likedArticles} setLikedArticles={setLikedArticles}/>}></Route>
     <Route path='/r' element={<DashboardPage/>}></Route>
     <Route path='/terms' element={<Terms/>}></Route>
     <Route path='/complaints' element={<Complaints/>}></Route>
     <Route path='/profile' element={<Profile/>}></Route>
     <Route path='/reviews' element={<Review/>}></Route>
     <Route path='/c' element={<Custom/>}></Route>
     <Route path='/signup' element={<SignUp/>}></Route>
     <Route path='/login'element={<Login/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/admin/usercomp' element={<UserCompTab/>}></Route>
      <Route path='/viewcustom' element={<Viewcustom/>}></Route>
      <Route path='/viewuser' element={<UserView/>}></Route>
      <Route path='/mynote'element={<MyNotes/>}></Route>
      <Route path='/addtomarket'element={<Addtomarket/>}></Route>
     <Route path='/market'element={<Market/>}></Route>
     <Route path='/message'element={<Message/>}></Route>

     <Route path='/report'element={<ReportNews/>}></Route>
     <Route path='/adminreport'element={<AdminReport/>}></Route>
     </Routes>
     
    </>
  )
}

export default App

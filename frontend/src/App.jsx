import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';
import {Toaster} from 'react-hot-toast';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App
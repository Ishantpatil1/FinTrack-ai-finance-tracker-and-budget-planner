import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import './App.css' 


function App() {
  return (
    <>
    <Router>
      < Navbar />

      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>

      < Footer />
    </Router>
    </>
  )
}

export default App

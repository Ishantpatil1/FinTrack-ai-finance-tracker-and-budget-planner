import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AboutPage from "./pages/AboutPage";
import PrivateRoute from './components/PrivateRoute';
import './App.css'


function App() {
  return (
    <>
      <Router>
        < Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
        < Footer />
      </Router>
    </>
  )
}

export default App

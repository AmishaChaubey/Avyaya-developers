import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact';
import GalleryPage from './pages/Gallery';


const App = () => {
  return (
    <div>
<Navbar/>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/gallery' element={<GalleryPage/>}/>
     
      </Routes>
<Footer/>

      
    </div>
  )
}

export default App

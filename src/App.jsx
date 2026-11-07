import React from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx' 
import Navbar from './components/Navbar.jsx'
import Features from './components/Features.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <main className="bg-[#171717] min-h-screen w-screen overflow-x-hidden text-white">
      <Navbar/>
      <Hero/>
      <About/>
      <Features/>
      <Contact/>
      <Footer/>
    </main>
  )
}

export default App

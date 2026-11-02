import React from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx' 

const App = () => {
  return (
    <main className="bg-[#171717] min-h-screen w-screen overflow-x-hidden text-white">
      <Hero/>
      <About/>
    </main>
  )
}

export default App

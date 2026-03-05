import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'

import './App.css'
import { Header } from './components/Header'

function HashScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const elementId = location.hash.replace('#', '')
    const element = document.getElementById(elementId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return null
}


function App() {

  return (
    <>
    <HashScrollHandler />
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
      </main>
    </div>
  )
}

export default App

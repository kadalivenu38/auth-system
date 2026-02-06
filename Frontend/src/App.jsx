import { useState } from 'react'
import Signup from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

function App() {
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);
  const [home, setHome] = useState(false);
  
  const showRegister = ()=>{
    setRegister(true);
    setLogin(false);
    setHome(false);
  }
  const showLogin = ()=>{
    setLogin(true);
    setRegister(false);
    setHome(false);
  }
  const showHome = ()=>{
    setHome(true);
    setRegister(false);
    setLogin(false);
  }
  const handleLogout = ()=>{
    localStorage.clear();
    showRegister();
  }

  return (
    <>
      {register && <Signup showLogin = {showLogin} />}
      {login && <Login showRegister = {showRegister} showHome = {showHome} />}
      {home && <Home handleLogout = {handleLogout} />}
    </>
  )
}

export default App

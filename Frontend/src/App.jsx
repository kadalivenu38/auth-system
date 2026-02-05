import { useState } from 'react'
import Signup from './pages/Registration'
import Login from './pages/Login'
import './App.css'

function App() {
  const [register, setRegister] = useState(true);
  const [login, setLogin] = useState(false);
  
  const showRegister = ()=>{
    setRegister(true);
    setLogin(false);
  }
  const showLogin = ()=>{
    setLogin(true);
    setRegister(false);
  }
  return (
    <>
      {register && <Signup showLogin = {showLogin} />}
      {login && <Login/>}
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login';
import Navbar from './components/Navbar'

function App() {
  const [login, setLogin] = useState(false);

  return (
    <div className="App">
      <Navbar login={login} setLogin={setLogin}/>
      <Home/>
      <div className='login absolute top-[18%] left-[30%] w-[30%]'>
          {
            login ? <Login setLogin={setLogin} /> : null
          }
      </div>
    </div>
  )
}

export default App

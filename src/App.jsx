import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import CrearCita from './pages/CrearCita'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Registro' element={<Registro />}></Route>
          <Route path='/CrearCita' element={<CrearCita />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

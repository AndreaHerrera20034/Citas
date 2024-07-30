import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import CrearCita from './pages/CrearCita'
import Calendario from './pages/Calendario'
import Historial from './pages/Historial'
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
          <Route path='/Calendario' element={<Calendario />}></Route>
          <Route path='/Historial' element={<Historial />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router'
import './App.css'
import Home from './comp/homme'
import Chat from './comp/chat'
import Login from './login'
import Sigin from './sign'
// import test from ''
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:room' element={<Chat />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign' element={<Sigin/>}/>
      </Routes>
    </>
  )
}
export default App;

import { Route, Routes } from 'react-router'
import './App.css'
import Home from './comp/homme'
import Chat from './comp/chat'
// import test from ''
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path=':room' element={<Chat/>}/>
      </Routes>
    </>
  )
}

export default App;

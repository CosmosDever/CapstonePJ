import {
  BrowserRouter,Routes,Route,} from "react-router-dom";
import Login from './page/login';
import Signup from './page/signup';
import './App.css'

function App() {


  return (
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
